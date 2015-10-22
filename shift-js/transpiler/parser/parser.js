var util = require('util');
var esprima = require('esprima-ast-utils');
var fs = require('fs');
var R = require('ramda');
var tokenize = require('./tokens.js').tokenize;
//TODO: Tokenization Examples 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15 have no terminator punctuation. Inconsistent
//TODO: Test Case 13 IDENTIFIER "a" not a
//TODO: Test Case 14 IDENTIFIER "a" not a
//TODO Monday October 19th
//TODO Test cases 19 & 20 Use type PUNCTUATION rather than ARRAY_START || ARRAYEND
//TODO TEST 20 Doesn't define arr 20 (SAME WITH 19)
var test_inputs = require('./test_cases_parser_input');
var test_outputs = require('./test_cases_parser_output');
//TODO Transform test 21 in CleanUp function call
//TODO After parsing, post-parse CleanUp function needs to remove unnecessary keywords from nodes
//TODO    Examples would be:reserved, nud, led, std, lbp, scope



var make_parse = function () {

  var scope;
  var symbol_table = {};
  var token;
  var tokens;
  var token_nr;

  var itself = function () {
    return this;
  };

  Array.prototype.hasItem = function(val) {
    return this.indexOf(val) > -1;
  };

  var isNum = function(val) {
    return /^\d+.*$/.test(val);
  }

  var isBool = function(val) {
    return val === 'true' || val === 'false';
  };

  var original_scope = {
    define: function (n) {
      var t = this.def[n.value];
      if (typeof t === "object") {
        n.error(t.reserved ? "Already reserved." : "Already defined.");
      }
      this.def[n.value] = n;
      n.reserved = false;
      n.nud      = itself;
      n.led      = null;
      n.std      = null;
      n.lbp      = 0;
      n.scope    = scope;
      return n;
    },
    find: function (n) {
      var e = this, o;
      while (true) {
        o = e.def[n];
        if (o && typeof o !== 'function') {
          return e.def[n];
        }
        e = e.parent;
        if (!e) {
          o = symbol_table[n];
          return o && typeof o !== 'function' ? o : symbol_table["(name)"];
        }
      }
    },
    pop: function () {
      scope = this.parent;
    },
    reserve: function (n) {
      if (n.arity !== "name" || n.reserved) {
        return;
      }
      var t = this.def[n.value];
      if (t) {
        if (t.reserved) {
          return;
        }
        if (t.arity === "name") {
          n.error("Already defined.");
        }
      }
      this.def[n.value] = n;
      n.reserved = true;
    }
  };

  var new_scope = function () {
    var s = scope;
    scope = Object.create(original_scope);
    scope.def = {};
    scope.parent = s;
    return scope;
  };

  /**
   * Look forward one token in the collection
   */
  var advance = function (id) {

    var a, o, t, v;

    if (id && token.id !== id ){
      token.error("Expected '" + id + "'.");
    }

    if (token_nr >= tokens.length) {
      token = symbol_table["(end)"];
      return;
    }

    t = tokens[token_nr];
    token_nr += 1;
    v = t.value;
    a = t.type;

    var terminatorTokenTypes = ["ARRAY_END", "DICTIONARY_END", "TERMINATOR"];
    var primitiveTokenTypes = ["NUMBER", "BOOLEAN", "STRING"];
    var collectionStartTokenTypes = ["ARRAY_START", "DICTIONARY_START"];
    var verbTokenTypes = ["PUNCTUATION", "OPERATOR"];
    var nounTokenValues = ["DECLARATION_KEYWORD", "IDENTIFIER"];

    if(nounTokenValues.hasItem(a)) {
      if(a === "DECLARATION_KEYWORD") v = "var";
      o = scope.find(v);
    } else if(collectionStartTokenTypes.hasItem(a)) {
      var isObj = (a === "DICTIONARY_START");
      v = isObj ? '{' : '[';
      o = isObj ? symbol_table['{'] : symbol_table['['];
      if (!o) t.error("Unknown operator.");
    } else if(terminatorTokenTypes.hasItem(a) || verbTokenTypes.hasItem(a)) {
      o = symbol_table[v];
      if (!o) t.error("Unknown operator.");
    } else if (primitiveTokenTypes.hasItem(a)) {
      o = symbol_table["(literal)"];
      a = "literal";
    } else {
      t.error("Unexpected token.");
    }

    token = Object.create(o);
    token.value = v;
    token.arity = a;
    return token;

  };

  var expression = function (rbp) {
    var left;
    var t = token;
    advance();
    left = t.nud();

    if(t.value === "++") {
      //Pre-fix operator

      //left = token;
      //left.arity = "Rex";
      //left.prefix = false;
      //left.first = t;

      left = t;

      advance();
    } else if (token.value === "++") {
      //Post-fix incrementor

      left.type = "Identifier";
      left.name = left.value;
      delete left.value;
      delete left.arity;

      advance();
      return {
        "type": "UpdateExpression",
        "operator": "++",
        "prefix": false,
        "argument": left
      }
    } else if(t.operator === "+") {
      delete t.arity;
      delete t.value;
      token.name = token.value;
      token.type = "Identifier";
      delete token.value;
      delete token.arity;
      t.argument = token;//{ value: 'b', arity: 'IDENTIFIER' } bad
      // good { type: 'Identifier', name: 'b' }
    }


    while (rbp < token.lbp) {
      t = token;
      advance();
      left = t.led(left);
    }

    if(left.arity === "IDENTIFIER") {
      left.name = left.value;
      left.type = "Identifier";
      delete left.arity;
      delete left.value;
    } else if(left.arity === "literal" && isNum(left.value)) {
      // This is for type number
      left.type = "Literal";
      left.raw = left.value;
      if(left.value.indexOf('.')) {
        left.value = parseFloat(left.value);
      } else {
        left.value = parseInt(left.value);
      }
      delete t.arity;
    } else if(left.arity === "literal" && isBool(left.value)) {
      // This is for type boolean
      left.type = "Literal";
      left.raw = t.value;
      left.value = t.value === "true";
      delete t.arity;
    } else if(left.arity === "literal") {
      // This is for type string
      left.type = "Literal";
      left.raw = '"' + t.value + '"';
      delete t.arity;
    }

    return left;
  };

  var statement = function () {
    var n = token, v;

    if (n.std) {
      advance();
      scope.reserve(n);
      return n.std();
    }
    v = expression(0);
    if (!v.assignment && v.id !== "(") {
      v.error("Bad expression statement.");
    }
    advance(";");
    return v;
  };

  var statements = function () {
    var a = [], s;
    while (true) {
      if (token.id === "}" || token.id === "(end)" || token.id === "EOF") {
        break;
      }
      s = statement();
      if (s) {
        a.push(s);
      }
    }
    return a.length === 0 ? null : a.length === 1 ? a[0] : a;
  };

  var block = function () {
    var t = token;
    advance("{");
    return t.std();
  };

  var original_symbol = {
    nud: function () {
      this.error("Undefined.");
    },
    led: function (left) {
      this.error("Missing operator.");
    }
  };

  var symbol = function (id, bp) {
    var s = symbol_table[id];
    bp = bp || 0;
    if (s) {
      if (bp >= s.lbp) {
        s.lbp = bp;
      }
    } else {
      s = Object.create(original_symbol);
      s.id = s.value = id;
      s.lbp = bp;
      symbol_table[id] = s;
    }
    return s;
  };

  var constant = function (s, v) {
    var x = symbol(s);
    x.nud = function () {
      scope.reserve(this);
      this.value = symbol_table[this.id].value;
      this.arity = "literal";
      return this;
    };
    x.value = v;
    return x;
  };

  var infix = function (id, bp, led) {
    var s = symbol(id, bp);
    s.led = led || function (left) {
        //this.first = left;
        //this.second = expression(bp);

        delete this.value;
        delete this.arity;
        this.type = "BinaryExpression";
        this.operator = this.value;

        if(left.arity === "literal" && isNum(left.value)) {
          // This is for type number
          left.type = "Literal";
          delete left.arity;
          left.raw = left.value;
          if(left.value.indexOf('.') === -1) {
            left.value = parseFloat(left.value);
          } else {
            left.value = parseInt(left.value);
          }
        } else if(left.arity === "literal" && isBool(left.value)) {
          // This is for type boolean

        } else if(left.arity === "literal") {
          // This is for type string
          left.type = "Literal";
          delete left.arity;
          left.raw = '"'+left.value+'"';
        }

        this.left = left;
        this.right = expression(bp);

        return this;
      };
    return s;
  };

  var infixr = function (id, bp, led) {
    var s = symbol(id, bp);
    s.led = led || function (left) {
        //this.first = left;
        //this.second = expression(bp - 1);
        //this.arity = "binary";

        delete this.value;
        delete this.arity;
        this.type = "BinaryExpression";
        this.operator = this.value;

        if(left.arity === "literal" && isNum(left.value)) {
          // This is for type number
          left.type = "Literal";
          delete left.arity;
          left.raw = left.value;
          if(left.value.indexOf('.') === -1) {
            left.value = parseFloat(left.value);
          } else {
            left.value = parseInt(left.value);
          }
        } else if(left.arity === "literal" && isBool(left.value)) {
          // This is for type boolean

        } else if(left.arity === "literal") {
          // This is for type string
          left.type = "Literal";
          delete left.arity;
          left.raw = '"'+left.value+'"';
        }

        this.left = left;
        this.right = expression(bp - 1);

        return this;
      };
    return s;
  };

  var assignment = function (id) {
    return infixr(id, 10, function (left) {
      if (left.id !== "." && left.id !== "[" && left.arity !== "name") {
        left.error("Bad lvalue.");
      }
      this.first = left;
      this.second = expression(9);
      this.assignment = true;
      this.arity = "binary";
      return this;
    });
  };

  var prefix = function (id, nud) {
    var s = symbol(id);
    s.nud = nud || function () {
        scope.reserve(this);
        //this.first = expression(70);
        //this.arity = "unary";

        if(this.value === "++") {
          this.type = "UpdateExpression";
          this.operator = "++";
          this.prefix = true;
          this.argument = expression(70);
          delete this.arity;
          delete this.value;
          //TODO Why don't we: 'return this;'
        } else if(this.value === "+") {
          this.type = "UnaryExpression";
          this.prefix = true;
          this.operator = "+";
          return this;
        } else {
          this.type = "UnaryExpression";
          delete this.arity;
          this.operator = this.value;
          delete this.value;
          this.argument = expression(70);
          this.prefix = true;
          return this;
        }

      };
    return s;
  };

  //var postfix = function (id, nud) {
  //  var s = symbol(id);
  //  s.nud = nud || function () {
  //      scope.reserve(this);
  //      if(this.value === "++") {
  //        this.type = "UpdateExpression";
  //        this.operator = "++";
  //        this.prefix = false;
  //        this.argument = expression(70);
  //        delete this.arity;
  //        delete this.value;
  //      } else {
  //        this.type = "UnaryExpression";
  //        delete this.arity;
  //        this.operator = this.value;
  //        delete this.value;
  //        this.argument = expression(70);
  //        this.prefix = false;
  //        return this;
  //      }
  //      // this.first = expression(70);
  //      // this.arity = "unary";
  //      // return this;
  //    };
  //  return s;
  //};

  var stmt = function (s, f) {
    var x = symbol(s);
    x.std = f;
    return x;
  };

  symbol("EOF");
  symbol("(end)");
  symbol("(name)");
  symbol(":");
  symbol(";");
  symbol(")");
  symbol("]");
  symbol("}");
  symbol(",");
  symbol("else");

  constant("true", true);
  constant("false", false);
  constant("null", null);
  constant("pi", 3.141592653589793);
  constant("Object", {});
  constant("Array", []);

  symbol("(literal)").nud = itself;

  symbol("this").nud = function () {
    scope.reserve(this);
    this.arity = "this";
    return this;
  };

  assignment("=");
  assignment("+=");
  assignment("-=");

  infix("?", 20, function (left) {
    this.first = left;
    this.second = expression(0);
    advance(":");
    this.third = expression(0);
    this.arity = "ternary";
    return this;
  });

  infixr("&&", 30);
  infixr("||", 30);

  infixr("===", 40);
  infixr("==", 40);
  infixr("!==", 40);
  infixr("<", 40);
  infixr("<=", 40);
  infixr(">", 40);
  infixr(">=", 40);

  infix("+", 50);
  infix("-", 50);

  infix("*", 60);
  infix("/", 60);
  infix("%", 60);

  infix(".", 80, function (left) {
    this.first = left;
    if (token.arity !== "name") {
      token.error("Expected a property name.");
    }
    token.arity = "literal";
    this.second = token;
    this.arity = "binary";
    advance();
    return this;
  });

  infix("[", 80, function (left) {
    this.first = left;
    this.second = expression(0);
    this.arity = "binary";
    advance("]");
    return this;
  });

  infix("(", 80, function (left) {
    var a = [];
    if (left.id === "." || left.id === "[") {
      this.arity = "ternary";
      this.first = left.first;
      this.second = left.second;
      this.third = a;
    } else {
      this.arity = "binary";
      this.first = left;
      this.second = a;
      if ((left.arity !== "unary" || left.id !== "function") &&
        left.arity !== "name" && left.id !== "(" &&
        left.id !== "&&" && left.id !== "||" && left.id !== "?") {
        left.error("Expected a variable name.");
      }
    }
    if (token.id !== ")") {
      while (true) {
        a.push(expression(0));
        if (token.id !== ",") {
          break;
        }
        advance(",");
      }
    }
    advance(")");
    return this;
  });


  prefix("+");
  prefix("!");
  prefix("++");
  prefix("-");
  prefix("typeof");
  //postfix("++");

  prefix("(", function () {
    var e = expression(0);
    advance(")");
    return e;
  });

  prefix("function", function () {
    var a = [];
    new_scope();
    if (token.arity === "name") {
      scope.define(token);
      this.name = token.value;
      advance();
    }
    advance("(");
    if (token.id !== ")") {
      while (true) {
        if (token.arity !== "name") {
          token.error("Expected a parameter name.");
        }
        scope.define(token);
        a.push(token);
        advance();
        if (token.id !== ",") {
          break;
        }
        advance(",");
      }
    }
    this.first = a;
    advance(")");
    advance("{");
    this.second = statements();
    advance("}");
    this.arity = "function";
    scope.pop();
    return this;
  });

  prefix("[", function () {
    var a = [];
    if (token.id !== "]") {
      while (true) {
        a.push(expression(0));
        if (token.id !== ",") {
          break;
        }
        advance(",");
      }
    }
    advance("]");
    this.type = "ArrayExpression";
    delete this.value;
    delete this.raw;
    //this.first = a;
    this.elements = a;

    this.arity = "unary";
    delete this.arity;
    return this;
  });
  // added some comment to commit

  prefix("{", function () {
    var a = [], n, v;
    if (token.id !== "]") {
      while (true) {
        n = token;
        if (n.arity !== "IDENTIFIER" && n.arity !== "name" && n.arity !== "literal") {
          token.error("Bad property name.");
        }
        if(n.arity !== "IDENTIFIER") {

        } else {

        }
        advance();
        advance(":");
        v = expression(0);

        var kvMap = {};
        kvMap.type = "Property";
        kvMap.computed = false;
        kvMap.kind = 'init';
        kvMap.method = false;
        kvMap.shorthand = false;

        if(n.arity === "literal" && isNum(n.value)) {
          n.type = "Literal";
          n.raw = n.value;
          if(n.value.indexOf('.')) {
            n.value = parseFloat(n.value);
          } else {
            n.value = parseInt(n.value);
          }
          delete n.arity;
        } else if(n.arity === "literal" && isBool(n.value)) {
          n.type = "Identifier";
          n.name = n.value;
          delete n.raw;
          delete n.value;
          delete n.arity;
        } else if(n.arity === "literal") {
          // This is for type string
          delete n.arity;
          n.type = "Literal";
          n.raw = '"' + n.value + '"';
        }
        kvMap.key = n;
        kvMap.value = v;

        /* a.push(v); */
        a.push(kvMap);

        if (token.id !== ",") {
          break;
        }
        advance(",");
      }
    }
    advance("]");
    this.arity = "unary";
    delete this.arity;
    delete this.value;
    this.type = "ObjectExpression";
    this.properties = a;
    return this;
  });

  stmt("{", function () {
    new_scope();
    var a = statements();
    advance("}");
    scope.pop();
    return a;
  });

  stmt("var", function () {
    var a = [], n, t;
    while (true) {
      n = token;
      if (n.arity !== "IDENTIFIER") {
        n.error("Expected a new variable identifier.");
      } else {
        n.type = "Identifier";
        n.name = n.value;
        delete n.arity;
      }

      scope.define(n);
      delete n.value;

      advance();
      if (token.id === "=") {
        t = token;
        advance("=");

        t.type = 'VariableDeclaration';
        t.kind = 'var';
        t.declarations = [{
          type: 'VariableDeclarator',
          id:{},
          init:{}
        }];

        t.declarations[0].id = n;//TODO FIX
        t.declarations[0].init = expression(0);

        delete t.value;
        delete t.arity;

        a.push(t);
      }
      if (token.id !== ",") {
        break;
      }
      advance(",");
    }
    try {
      advance();
      //advance(";");//when actually was ("++")
    } catch(e) {
      advance("EOF");
    } // TODO Swift possible ways to terminate a var declaration: [semi-colon, newline, EOF]

    return a.length === 0 ? null : a.length === 1 ? a[0] : a;
  });

  stmt("if", function () {
    advance("(");
    this.first = expression(0);
    advance(")");
    this.second = block();
    if (token.id === "else") {
      scope.reserve(token);
      advance("else");
      this.third = token.id === "if" ? statement() : block();
    } else {
      this.third = null;
    }
    this.arity = "statement";
    return this;
  });

  stmt("return", function () {
    if (token.id !== ";") {
      this.first = expression(0);
    }
    advance(";");
    if (token.id !== "}") {
      token.error("Unreachable statement.");
    }
    this.arity = "statement";
    return this;
  });

  stmt("break", function () {
    advance(";");
    if (token.id !== "}") {
      token.error("Unreachable statement.");
    }
    this.arity = "statement";
    return this;
  });

  stmt("while", function () {
    advance("(");
    this.first = expression(0);
    advance(")");
    this.second = block();
    this.arity = "statement";
    return this;
  });

  /**
   * Make initial pass through input token stream removing ambiguity of certain token permutations to the parser.
   * Example 1: Characters of pre- and post-fix increment & decrement
   *        operators are lexed independently as separate operators.
   * Example 2: Swift, but not Javascript, allows for dynamic property
   *        look-ups within literal declarations of collections.
   **/
  function cleanUp(input) {
    for(var i=0; i<input.length; i++) {
      if(input[i].type === "STRING_INTERPOLATION_START" || input[i].type === "STRING_INTERPOLATION_END") {
        input[i].type = "OPERATOR";
        input[i].value = "+";
      }
      if(input[i].value === "!") {
        if(input[i+1].value === "=") {
          if(input[i+2].value === "=") {
            input.splice(i+1, 2);
            input[i].value = "!==";
            return input;
          }
        }
      }

      if(input[i].value === "+") {
        if(input[i+1].value === "+") {
          input.splice(i+1, 1);
          input[i].value = "++";
          return input;
        }
      }
      if(input[i].value === "-") {
        if(input[i+1].value === "-") {
          input.splice(i+1, 1);
          input[i].value = "--";
          return input;
        }
      }
    }
    return input;
  }

  return function (input_tokens) {
    tokens = cleanUp(input_tokens);
    token_nr = 0;
    new_scope();
    advance();
    var s = statements();
    try {
      advance("(end)");
    } catch(e) {
      advance("EOF");
    }

    scope.pop();

    var result = {
      type: 'Program',
      sourceType: 'module',
      body: Array.isArray(s) ? s : [s]
    };

    /**
     * Walk result tree and remove properties that don't conform to Esprima standard.
     * */
    traverse(result, function(currentNode) {
      deletePropertyIfExists(currentNode, ['reserved', 'nud', 'led', 'std', 'lbp', 'scope']);
    });

    return result;
  };
};

function deletePropertyIfExists(node, propertyArray) {
  for(var i=0; i<propertyArray.length; i++) {
    var prop = propertyArray[i];
    var hasProp = node.hasOwnProperty(prop);
    if(hasProp) {
      delete node[prop];
    }
  }
}
function traverse(node, func) {
  func(node);
  if(node.scope) {
    delete node.scope;
  }
  for (var key in node) {
    if (node.hasOwnProperty(key)) {
      var child = node[key];
      if (typeof child === 'object' && child !== null) {
        if (Array.isArray(child)) {
          child.forEach(function(node) {
            traverse(node, func);
          });
        } else {
          traverse(child, func);
        }
      }
    }
  }
}
var outputthing = {
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "a"
          },
          "init": {
            "type": "ConditionalExpression",
            "test": {
              "type": "BinaryExpression",
              "operator": "==",
              "left": {
                "type": "Literal",
                "value": 6,
                "raw": "6"
              },
              "right": {
                "type": "Literal",
                "value": 7,
                "raw": "7"
              }
            },
            "consequent": {
              "type": "Literal",
              "value": 1,
              "raw": "1"
            },
            "alternate": {
              "type": "UnaryExpression",
              "operator": "-",
              "argument": {
                "type": "Literal",
                "value": 1,
                "raw": "1"
              },
              "prefix": true
            }
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "module"
};
var parser = make_parse();
console.log("############################");
console.log("############################");
console.log("##### BEGIN AST OUTPUT #####");
console.log( util.inspect(parser([{ type: "DECLARATION_KEYWORD",        value: "var" },
  { type: "IDENTIFIER",                 value: "a" },
  { type: "OPERATOR",                   value: "=" },
  { type: "PUNCTUATION",                value: "(" },
  { type: "NUMBER",                     value: "6" },
  { type: "OPERATOR",                   value: "=" },
  { type: "OPERATOR",                   value: "=" },
  { type: "NUMBER",                     value: "7" },
  { type: "PUNCTUATION",                value: ")" },
  { type: "OPERATOR",                   value: "?" },
  { type: "NUMBER",                     value: "1" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "OPERATOR",                   value: "-" },
  { type: "NUMBER",                     value: "1" },
  { type: "TERMINATOR",                 value: "EOF"}]), { colors:true, depth:null }) );
console.log("############################");
console.log("############################");
console.log("############################");
console.log( util.inspect(outputthing, { colors:true, depth:null } ) );
console.log("############################");
console.log("############################");
console.log("############################");

module.exports = make_parse;
