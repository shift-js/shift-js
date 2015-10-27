var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var advance = require('./advance');
var new_scope = require('./new_scope');
var original_scope = require('./original_scope');
var original_symbol = require('./original_symbol');
var symbol = require('./symbol');

var make_parser = function() {

  var obj = {};
  obj.scope;
  obj.symbol_table = {};
  obj.token;
  obj.tokens;
  obj.token_nr = 0;

  /**
   * Begin parsing an expression phrase from the current token
   * Calls itself recursively depending on the context.
   **/
  var expression = function(rbp) {

    var left;
    var t = obj.token;
    obj = advance(obj);
    left = t.nud();

    if (t.value === "++" || t.value === "--") {
      //Pre-fix operator
      left = t;

      if(obj.token.value !== "}") {
        obj = advance(obj);
      }
    } else if (obj.token.value === "++" || obj.token.value === "--") {
      //Post-fix operators
      if(obj.token.value === "++") {
        left.type = "Identifier";
        left.name = left.value;
        delete left.value;
        delete left.arity;

        obj = advance(obj);
        return {
          "type": "UpdateExpression",
          "operator": "++",
          "prefix": false,
          "argument": left
        }
      } else {
        left.type = "Identifier";
        left.name = left.value;
        delete left.value;
        delete left.arity;
        obj = advance(obj);
        return {
          "type": "UpdateExpression",
          "operator": "--",
          "prefix": false,
          "argument": left
        }

      }
    } else if (t.operator === "+") {
      delete t.arity;
      delete t.value;
      obj.token.name = obj.token.value;
      obj.token.type = "Identifier";
      delete obj.token.value;
      delete obj.token.arity;
      t.argument = obj.token;
    }

    /**
     * Logic to handle the recursive case
     */
    while (rbp < obj.token.lbp) {
      t = obj.token;
      obj = advance(obj);
      left = t.led(left);
    }


    if (left.arity === "IDENTIFIER") {
      left.name = left.value;
      left.type = "Identifier";
      delete left.arity;
      delete left.value;
    }
    else if (left.arity === "literal" && helpers.isNum(left.value)) {
      left.type = "Literal";
      left.raw = left.value;
      if (left.value.indexOf('.')) {
        left.value = parseFloat(left.value);
      } else {
        left.value = parseInt(left.value);
      }
      delete t.arity;
    }
    else if (left.arity === "literal" && helpers.isBool(left.value)) {
      left.type = "Literal";
      left.raw = t.value;
      left.value = t.value === "true";
      delete t.arity;
    }
    else if (left.arity === "literal") {
      left.type = "Literal";
      left.raw = '"' + t.value + '"';
      delete t.arity;
    }

    return left;
  };

  var statement = function() {
    var n = obj.token, v;


    if (n.std) {
      obj = advance(obj);
      obj.scope.reserve(n);
      return n.std();
    }
    v = expression(0);

    if(obj.token.value === "}") {
      return v;
    }

    if (!v.assignment && v.id !== "(") {
      v.error("Bad expression statement.");
    }
    obj = advance(obj, ";");
    return v;
  };

  var statements = function(optionalNumLoops) {
    var a = [], s, count = 0;
    while (true) {
      if(count >= optionalNumLoops) break;
      if (obj.token.id === ";" || obj.token.id === "}" || obj.token.id === "(end)" || obj.token.id === "EOF") {
        if(obj.token.id === ";") {
          a.push({
            "type": "EmptyStatement"
          });
        }
        break;
      }
      s = statement();
      if (s) {
        a.push(s);
        count++;
      }
    }
    return a.length === 0 ? null : a.length === 1 ? a[0] : a;
  };

  var block = function() {
    var t = obj.token;
    obj = advance(obj, "{");
    var stdReturnVal = t.std();

    return {
      type: 'BlockStatement',
      body: [{
        type: 'ExpressionStatement',
        expression: stdReturnVal
      }]
    };

  };

  var constant = function(s, v) {
    var x = symbol(obj, original_symbol, s);
    x.nud = function() {
      scope.reserve(this);
      this.value = symbol_table[this.id].value;
      this.arity = "literal";
      return this;
    };
    x.value = v;
    return x;
  };

  var infix = function(id, bp, led) {
    var s = symbol(obj, original_symbol, id, bp);
    s.led = led || function(left) {
        //this.first = left;
        //this.second = expression(bp);

        delete this.value;
        delete this.arity;

        this.type = "BinaryExpression";
        this.operator = this.value;

        if(this.operator === "||") {
          this.type = "LogicalExpression";

        }

        if(left.arity === "IDENTIFIER") {
          left.type = "Identifier";
          left.name = left.value;
          delete left.arity;
          delete left.value;
        } else if(left.arity === "literal" && helpers.isNum(left.value)) {
          // This is for type number
          left.type = "Literal";
          delete left.arity;
          left.raw = left.value;
          if (left.value.indexOf('.') === -1) {
            left.value = parseFloat(left.value);
          } else {
            left.value = parseInt(left.value);
          }
        } else if (left.arity === "literal" && helpers.isBool(left.value)) {
          // This is for type boolean

        } else if (left.arity === "literal") {
          // This is for type string
          left.type = "Literal";
          delete left.arity;
          left.raw = '"' + left.value + '"';
        }

        this.left = left;
        this.right = expression(bp);

        return this;
      };
    return s;
  };

  var infixr = function(id, bp, led) {
    var s = symbol(obj, original_symbol, id, bp);
    s.led = led || function(left) {
        //this.first = left;
        //this.second = expression(bp - 1);
        //this.arity = "binary";
        delete this.value;
        delete this.arity;
        this.type = "BinaryExpression";
        this.operator = this.value;

        if(this.operator === "||") {
          this.type = "LogicalExpression";
          //   // this.left = expression(bp -1);
          //   // this.right = left;
          //   // this.left = "LogicalExpression";
        }

        if(left.arity === "IDENTIFIER") {
          left.type = "Identifier";
          left.name = left.value;
          delete left.arity;
          delete left.value;
        } else if(left.arity === "literal" && helpers.isNum(left.value)) {
          // This is for type number
          left.type = "Literal";
          delete left.arity;
          left.raw = left.value;
          if (left.value.indexOf('.') === -1) {
            left.value = parseFloat(left.value);
          } else {
            left.value = parseInt(left.value);
          }
        } else if (left.arity === "literal" && helpers.isBool(left.value)) {
          // This is for type boolean

        } else if (left.arity === "literal") {
          // This is for type string
          left.type = "Literal";
          delete left.arity;
          left.raw = '"' + left.value + '"';
        }
        // this.left = expression(bp- 1);
        // this.right = left;
        this.left = left;
        this.right = expression(bp - 1);

        return this;
      };
    return s;
  };

  var assignment = function(id) {
    return infixr(id, 10, function(left) {
      if (left.id !== "." && left.id !== "[" && left.arity !== "name" && left.id !== "(name)") {
        left.error("Bad lvalue.");
      }

      left.type = "Identifier";
      left.name = left.value;;
      delete left.arity;
      delete left.value;

      this.left = left;
      this.right = expression(9);
      this.assignment = true;
      delete this.assignment;
      this.operator = this.value;
      this.type = "AssignmentExpression";
      this.arity = "binary";
      delete this.value;
      delete this.arity;


      return this;
    });
  };

  var prefix = function(id, nud) {
    var s = symbol(obj, original_symbol, id);
    s.nud = nud || function() {
        obj.scope.reserve(this);
        //this.first = expression(70);
        //this.arity = "unary";

        if (this.value === "++" || this.value === "--") {
          this.type = "UpdateExpression";
          // this.operator = "++";
          this.operator = this.value;
          this.prefix = true;
          this.argument = expression(70);
          delete this.arity;
          delete this.value;
          //TODO Why don't we: 'return this;'
        } else if(this.value === "--") {
          this.type = "UpdateExpression";
          this.operator = "--";
          this.prefix = true;
          this.argument = expression(70);
          delete this.arity;
          delete this.value;
          //TODO Why don't we: 'return this;'
        } else if (this.value === "+") {
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

  var stmt = function(s, f) {
    var x = symbol(obj, original_symbol, s);
    x.std = f;
    return x;
  };

  symbol(obj, original_symbol, "EOF");
  symbol(obj, original_symbol, "(end)");
  symbol(obj, original_symbol, "(name)");
  symbol(obj, original_symbol, ":");
  symbol(obj, original_symbol, ";");
  symbol(obj, original_symbol, ")");
  symbol(obj, original_symbol, "]");
  symbol(obj, original_symbol, "}");
  symbol(obj, original_symbol, ",");
  symbol(obj, original_symbol, "else");

  constant("true", true);
  constant("false", false);
  constant("null", null);
  constant("pi", 3.141592653589793);
  constant("Object", {});
  constant("Array", []);

  symbol(obj, original_symbol, "(literal)").nud = helpers.itself;

  symbol(obj, original_symbol, "this").nud = function() {
    scope.reserve(this);
    this.arity = "this";
    return this;
  };

  assignment("=");
  assignment("+=");
  assignment("-=");
  assignment("*=");
  assignment("/=");

  infix("?", 20, function(left) {
    this.type = "ConditionalExpression";

    if(left.arity === "IDENTIFIER") {
      left.type = "Identifier";
      left.name = left.value;
      delete left.value;
      delete left.arity;
    }

    this.test = left;
    this.consequent = expression(0);
    obj = advance(obj, ":");
    this.alternate = expression(0);
    //this.arity = "ternary";
    delete this.value;
    delete this.arity;
    return this;
  });

  infixr("&&", 30);
  infixr("||", 30);

  infixr("===", 40);
  infixr("==", 40);
  infixr("!==", 40);
  infixr('!=', 40);
  infixr("<", 40);
  infixr("<=", 40);
  infixr(">", 40);
  infixr(">=", 40);

  infix("+", 50);
  infix("-", 50);

  infix("*", 60);
  infix("/", 60);
  infix("%", 60);

  infix(".", 80, function(left) {
    this.first = left;
    if (obj.token.arity !== "name") {
      obj.token.error("Expected a property name.");
    }
    obj.token.arity = "literal";
    this.second = obj.token;
    this.arity = "binary";
    obj = advance(obj);
    return this;
  });

  infix("[", 80, function(left) {
    this.type = "MemberExpression";
    this.computed = true;
    if(left.arity === 'IDENTIFIER'){
      left.name = left.value;
      left.type = "Identifier";
      delete left.value;
      delete left.arity;
    }

    this.object = left;
    //this.first = left;
    this.property = expression(0);
    //this.second = expression(0);
    //this.arity = "binary";
    delete this.arity;
    delete this.value;
    obj = advance(obj, "]");
    return this;
  });

  infix("(", 80, function(left) {
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
    if (obj.token.id !== ")") {
      while (true) {
        a.push(expression(0));
        if (obj.token.id !== ",") {
          break;
        }
        obj = advance(obj, ",");
      }
    }
    obj = advance(obj, ")");
    return this;
  });

  prefix("+");
  prefix("!");
  prefix("++");
  prefix("--");
  prefix("-");
  prefix("typeof");

  prefix("(", function() {
    var e = expression(0);
    obj = advance(obj, ")");
    return e;
  });

  prefix("function", function() {
    var a = [];
    obj.scope = new_scope(obj, original_scope);
    if (obj.token.arity === "name") {
      obj.scope.define(token);
      this.name = obj.token.value;
      obj = advance(obj);
    }
    obj = advance(obj, "(");
    if (obj.token.id !== ")") {
      while (true) {
        if (obj.token.arity !== "name") {
          obj.token.error("Expected a parameter name.");
        }
        obj.scope.define(token);
        a.push(obj.token);
        obj = advance(obj);
        if (obj.token.id !== ",") {
          break;
        }
        obj = advance(obj, ",");
      }
    }
    this.first = a;
    obj = advance(obj, ")");
    obj = advance(obj, "{");
    this.second = statements();
    obj = advance(obj, "}");
    this.arity = "function";
    scope.pop();
    return this;
  });

  prefix("[", function() {
    var a = [];
    if (obj.token.id !== "]") {
      while (true) {
        a.push(expression(0));
        if (obj.token.id !== ",") {
          break;
        }
        obj = advance(obj, ",");
      }
    }
    obj = advance(obj, "]");
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

  prefix("{", function() {
    var a = [], n, v;

    var tmpLookAhead = obj.tokens[obj.token_nr];
    if(tmpLookAhead.value === ",") {
      // Handle Tuples w/out keys

      var a = [];
      if (obj.token.id !== "]") {
        while (true) {
          a.push(expression(0));//TODO These are the properties
          if (obj.token.id !== ",") {
            break;
          }
          obj = advance(obj, ",");
        }
      }
      obj = advance(obj, ")");
      this.type = "ObjectExpression";
      delete this.value;
      delete this.raw;
      this.properties = [];

      for(var m=0; m<a.length; m++) {
        var currentValue = a[m];
        var kvMap = {};
        kvMap.type = "Property";
        kvMap.computed = false;
        kvMap.kind = 'init';
        kvMap.method = false;
        kvMap.shorthand = false;
        kvMap.key = {};
        kvMap.key.type = "Literal";
        var keyIndex = this.properties.length;
        kvMap.key.value = keyIndex;
        kvMap.key.raw = keyIndex.toString();
        kvMap.value = currentValue;
        this.properties.push(kvMap);
      }

      this.arity = "unary";
      delete this.arity;
      return this;

    }

    if ((obj.token.id !== "]" &&  obj.token.id !== ")") && tmpLookAhead.value !== ",") {
      while (true) {
        n = obj.token;
        if (n.arity !== "IDENTIFIER" && n.arity !== "name" && n.arity !== "literal" && n.arity !== "TUPLE_ELEMENT_NAME") {
          obj.token.error("Bad property name.");
        }
        if (n.arity !== "IDENTIFIER") {

        }
        obj = advance(obj);
        obj = advance(obj, ":");
        v = expression(0);

        var kvMap = {};
        kvMap.type = "Property";
        kvMap.computed = false;
        kvMap.kind = 'init';
        kvMap.method = false;
        kvMap.shorthand = false;

        if (n.arity === "literal" && helpers.isNum(n.value)) {
          n.type = "Literal";
          n.raw = n.value;
          if (n.value.indexOf('.')) {
            n.value = parseFloat(n.value);
          } else {
            n.value = parseInt(n.value);
          }
          delete n.arity;
        } else if (n.arity === "literal" && helpers.isBool(n.value)) {
          n.type = "Identifier";
          n.name = n.value;
          delete n.raw;
          delete n.value;
          delete n.arity;
        } else if (n.arity === "literal") {
          // This is for type string
          delete n.arity;
          n.type = "Literal";
          n.raw = '"' + n.value + '"';
        } else if(n.arity === "TUPLE_ELEMENT_NAME") {
          n.type = "Identifier";
          n.name = n.value;
          delete n.value;
          delete n.arity;
        }
        kvMap.key = n;
        kvMap.value = v;

        /* a.push(v); */
        a.push(kvMap);

        if (obj.token.id !== ",") {
          break;
        }
        obj = advance(obj, ",");
      }
    }

    try {
      obj = advance(obj, "]");
    } catch(e) {
      obj = advance(obj, ")");
    }

    this.arity = "unary";
    delete this.arity;
    delete this.value;
    this.type = "ObjectExpression";
    this.properties = a;
    return this;
  });

  stmt("{", function() {
    obj.scope = new_scope(obj, original_scope);
    var a = statements();
    obj = advance(obj, "}");
    obj.scope.pop();
    return a;
  });

  stmt("var", function() {
    var a = [], n, t;
    while (true) {
      n = obj.token;
      if (n.arity !== "IDENTIFIER") {
        n.error("Expected a new variable identifier.");
      } else {
        n.type = "Identifier";
        n.name = n.value;
        delete n.arity;
      }

      obj.scope.define(obj, n);
      delete n.value;

      obj = advance(obj);
      if (obj.token.id === "=") {
        t = obj.token;
        obj = advance(obj, "=");

        t.type = 'VariableDeclaration';
        t.kind = 'var';
        t.declarations = [{
          type: 'VariableDeclarator',
          id: {},
          init: {}
        }];

        t.declarations[0].id = n; //TODO FIX
        t.declarations[0].init = expression(0);

        delete t.value;
        delete t.arity;

        a.push(t);
      }
      if (obj.token.id === ";") {
        break;
        //return a.length === 0 ? null : a.length === 1 ? a[0] : a;
      }
      if (obj.token.id !== ",") {
        break;
      }
      obj = advance(obj, ",");
    }
    if(obj.token.value === "var") {
      return a.length === 0 ? null : a.length === 1 ? a[0] : a;
    }
    try {
      obj = advance(obj);
      //advance(";");//when actually was ("++")
    } catch (e) {
      obj = advance(obj, "EOF");
    }

    return a.length === 0 ? null : a.length === 1 ? a[0] : a;
  });

  stmt("if", function() {
    if(obj.tokens[obj.token_nr].value === "(") {
      obj = advance(obj, "(");
      this.test = expression(0);
      obj = advance(obj, ")");
    } else {
      this.test = expression(0);
    }
    this.consequent = block();
    if (obj.token.id === "else") {
      obj.scope.reserve(obj.token);
      obj = advance(obj, "else");
      this.alternate = obj.token.id === "if" ? statement() : block();
    } else {
      this.alternate = null;
    }
    this.arity = "statement";
    this.type = "IfStatement";
    delete this.arity;
    delete this.value;
    return this;
  });

  stmt("return", function() {
    if (obj.token.id !== ";") {
      this.first = expression(0);
    }
    obj = advance(obj, ";");
    if (obj.token.id !== "}") {
      obj.token.error("Unreachable statement.");
    }
    this.arity = "statement";
    return this;
  });

  stmt("break", function() {
    obj = advance(obj, ";");
    if (obj.token.id !== "}") {
      obj.token.error("Unreachable statement.");
    }
    this.arity = "statement";
    return this;
  });

  stmt("while", function() {
    this.type = "WhileStatement";
    if(obj.tokens[obj.token_nr-1].value === "(") {
      obj = advance(obj, "(");
      this.test = expression(0);
      obj = advance(obj, ")");
    } else {
      this.test = expression(0);
    }
    this.body = block();
    this.arity = "statement";
    delete this.arity;
    delete this.value;

    return this;
  });

  stmt("for", function() {
    this.type = "ForStatement";
    if(obj.tokens[obj.token_nr-1].value === "(") {
      obj = advance(obj, "(");
      //this.init = expression(0);
      this.init = statements(1);
      this.test = expression(0);
      if(obj.token.value === ";") {
        obj = advance(obj, ";");
      }
      this.update = expression(0);
      obj = advance(obj, ")");
    } else {
      this.init = statements(1);
      //this.init = expression(0);
      this.test = expression(0);
      if(obj.token.value === ";") {
        obj = advance(obj, ";");
      }
      this.update = expression(0);
      //this.test = expression(0);
      //this.test = statements();
    }
    this.body = block();
    this.arity = "statement";
    delete this.arity;
    delete this.value;

    return this;
  });

  stmt("repeat", function() {
    this.type = "DoWhileStatement";
    this.body = block();
    if(obj.token.value === 'while') {
      obj = advance(obj);
    }
    if(obj.tokens[obj.token_nr-1].value === "(") {
      obj = advance(obj, "(");
      this.test = expression(0);
      obj = advance(obj, ")");
    } else {
      this.test = expression(0);
    }
    this.arity = "statement";
    delete this.arity;
    delete this.value;

    return this;
  });



  var parseTokenStream = function(input_tokens) {

    obj.tokens = helpers.cleanUpTokenStream(input_tokens);
    obj.scope = new_scope(obj, original_scope);
    obj = advance(obj);
    var s = statements();
    obj = advance(obj);
    obj.scope.pop();

    var result = {
      type: 'Program',
      sourceType: 'module',
      body: Array.isArray(s) ? s : [s]
    };

    /**
     * Walk result tree and remove properties that don't conform to Esprima standard.
     * */
    helpers.traverse(result, function(currentNode) {
      helpers.deletePropertyIfExists(currentNode, ['reserved', 'nud', 'led', 'std', 'lbp', 'scope']);
    });

    return result;
  };

  return parseTokenStream;
};

module.exports = make_parser;