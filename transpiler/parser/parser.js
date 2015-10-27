var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var advance = require('./advance');
var new_scope = require('./new_scope');
var original_scope = require('./original_scope');
var original_symbol = require('./original_symbol');
var symbol = require('./symbol');
var block = require('./block');
var expression = require('./expression');
var infix = require('./infix');
var infixr = require('./infixr');
var assignment = require('./assignment');
var declarations = require('./declarations');
var statements = require('./statements');

var make_parser = function() {

  var obj = {};
  obj.scope;
  obj.symbol_table = {};
  obj.token;
  obj.tokens;
  obj.token_nr = 0;

  declarations.symbols(obj);
  declarations.assignments(obj);
  declarations.infixes(obj);
  declarations.prefixes(obj);
  declarations.stmts(obj);

  //var statement = function() {
  //  var n = obj.token, v;
  //
  //  if (n.std) {
  //    obj = advance(obj);
  //    obj.scope.reserve(n);
  //    return n.std();
  //  }
  //  v = expression(obj, 0);
  //
  //  if(obj.token.value === "}") {
  //    return v;
  //  }
  //
  //  if (!v.assignment && v.id !== "(") {
  //    v.error("Bad expression statement.");
  //  }
  //  obj = advance(obj, ";");
  //  return v;
  //};
  //
  //var statements = function(optionalNumLoops) {
  //  var a = [], s, count = 0;
  //  while (true) {
  //    if(count >= optionalNumLoops) break;
  //    if (obj.token.id === ";" || obj.token.id === "}" || obj.token.id === "(end)" || obj.token.id === "EOF") {
  //      if(obj.token.id === ";") {
  //        a.push({
  //          "type": "EmptyStatement"
  //        });
  //      }
  //      break;
  //    }
  //    s = statement();
  //    if (s) {
  //      a.push(s);
  //      count++;
  //    }
  //  }
  //  return a.length === 0 ? null : a.length === 1 ? a[0] : a;
  //};

  //var constant = function(s, v) {
  //  var x = symbol(obj, original_symbol, s);
  //  x.nud = function() {
  //    scope.reserve(this);
  //    this.value = symbol_table[this.id].value;
  //    this.type = "literal";//"literal" -> "Literal"
  //    return this;
  //  };
  //  x.value = v;
  //  return x;
  //};

  //var assignment = function(id) {
  //  return infixr(obj, id, 10, function(left) {
  //    if (left.id !== "." && left.id !== "[" && left.type !== "name" && left.id !== "(name)") {
  //      left.error("Bad lvalue.");
  //    //}
  //    left.type = "Identifier";
  //    left.name = left.value;;
  //    delete left.value;
  //
  //    this.left = left;
  //    this.right = expression(obj, 9);
  //    this.assignment = true;
  //    delete this.assignment;
  //    this.operator = this.value;
  //    this.type = "AssignmentExpression";
  //    delete this.value;
  //    return this;
  //  });
  //};

  //var prefix = function(id, nud) {
  //  var s = symbol(obj, original_symbol, id);
  //  s.nud = nud || function() {
  //      obj.scope.reserve(this);
  //      if (this.value === "++" || this.value === "--") {
  //        this.type = "UpdateExpression";
  //        this.operator = this.value;
  //        this.prefix = true;
  //        this.argument = expression(obj, 70);
  //        delete this.value;
  //        //TODO Why don't we: 'return this;'
  //      } else if(this.value === "--") {
  //        this.type = "UpdateExpression";
  //        this.operator = "--";
  //        this.prefix = true;
  //        this.argument = expression(obj, 70);
  //        delete this.value;
  //        //TODO Why don't we: 'return this;'
  //      } else if (this.value === "+") {
  //        this.type = "UnaryExpression";
  //        this.prefix = true;
  //        this.operator = "+";
  //        return this;
  //      } else {
  //        this.type = "UnaryExpression";
  //        this.operator = this.value;
  //        delete this.value;
  //        this.argument = expression(obj, 70);
  //        this.prefix = true;
  //        return this;
  //      }
  //
  //    };
  //  return s;
  //};
  //
  //var stmt = function(s, f) {
  //  var x = symbol(obj, original_symbol, s);
  //  x.std = f;
  //  return x;
  //};

  //symbol(obj, original_symbol, "EOF");
  //symbol(obj, original_symbol, "(end)");
  //symbol(obj, original_symbol, "(name)");
  //symbol(obj, original_symbol, ":");
  //symbol(obj, original_symbol, ";");
  //symbol(obj, original_symbol, ")");
  //symbol(obj, original_symbol, "]");
  //symbol(obj, original_symbol, "}");
  //symbol(obj, original_symbol, ",");
  //symbol(obj, original_symbol, "else");

  //constant("true", true);
  //constant("false", false);
  //constant("null", null);
  //constant("pi", 3.141592653589793);
  //constant("Object", {});
  //constant("Array", []);

  //symbol(obj, original_symbol, "(literal)").nud = helpers.itself;
  //
  //symbol(obj, original_symbol, "this").nud = function() {
  //  scope.reserve(this);
  //  this.type = "this";
  //  return this;
  //};

  //assignment("=");
  //assignment("+=");
  //assignment("-=");
  //assignment("*=");
  //assignment("/=");

  //infix(obj, "?", 20, function(left) {
  //  this.type = "ConditionalExpression";
  //
  //  if(left.type === "IDENTIFIER") {
  //    left.type = "Identifier";
  //    left.name = left.value;
  //    delete left.value;
  //  }
  //
  //  this.test = left;
  //  this.consequent = expression(obj, 0);
  //  obj = advance(obj, ":");
  //  this.alternate = expression(obj, 0);
  //  delete this.value;
  //  return this;
  //});
  //
  //infixr(obj, "&&", 30);
  //infixr(obj, "||", 30);
  //infixr(obj, "===", 40);
  //infixr(obj, "==", 40);
  //infixr(obj, "!==", 40);
  //infixr(obj, "!=", 40);
  //infixr(obj, "<", 40);
  //infixr(obj, "<=", 40);
  //infixr(obj, ">", 40);
  //infixr(obj, ">=", 40);
  //infix(obj, "+", 50);
  //infix(obj, "-", 50);
  //infix(obj, "*", 60);
  //infix(obj, "/", 60);
  //infix(obj, "%", 60);

  //infix(obj, ".", 80, function(left) {
  //  this.first = left;
  //  if (obj.token.type !== "name") {
  //    obj.token.error("Expected a property name.");
  //  }
  //  obj.token.type = "literal";
  //  this.second = obj.token;
  //  this.type = "binary";
  //  obj = advance(obj);
  //  return this;
  //});

  //infix(obj, "[", 80, function(left) {
  //  this.type = "MemberExpression";
  //  this.computed = true;
  //  if(left.type === 'IDENTIFIER'){
  //    left.name = left.value;
  //    left.type = "Identifier";
  //    delete left.value;
  //  }
  //  this.object = left;
  //  this.property = expression(obj, 0);
  //  delete this.value;
  //  obj = advance(obj, "]");
  //  return this;
  //});

  //infix(obj, "(", 80, function(left) {
  //  var a = [];
  //  if (left.id === "." || left.id === "[") {
  //    this.type = "ternary";
  //    this.first = left.first;
  //    this.second = left.second;
  //    this.third = a;
  //  } else {
  //    this.type = "binary";
  //    this.first = left;
  //    this.second = a;
  //    if ((left.type !== "unary" || left.id !== "function") &&
  //      left.type !== "name" && left.id !== "(" &&
  //      left.id !== "&&" && left.id !== "||" && left.id !== "?") {
  //      left.error("Expected a variable name.");
  //    }
  //  }
  //  if (obj.token.id !== ")") {
  //    while (true) {
  //      a.push(expression(obj, 0));
  //      if (obj.token.id !== ",") {
  //        break;
  //      }
  //      obj = advance(obj, ",");
  //    }
  //  }
  //  obj = advance(obj, ")");
  //  return this;
  //});

  //prefix("+");
  //prefix("!");
  //prefix("++");
  //prefix("--");
  //prefix("-");
  //prefix("typeof");
  //
  //prefix("(", function() {
  //  var e = expression(obj, 0);
  //  obj = advance(obj, ")");
  //  return e;
  //});
  //
  ////prefix("function", function() {
  ////  var a = [];
  ////  obj.scope = new_scope(obj, original_scope);
  ////  if (obj.token.type === "name") {
  ////    obj.scope.define(token);
  ////    this.name = obj.token.value;
  ////    obj = advance(obj);
  ////  }
  ////  obj = advance(obj, "(");
  ////  if (obj.token.id !== ")") {
  ////    while (true) {
  ////      if (obj.token.type !== "name") {
  ////        obj.token.error("Expected a parameter name.");
  ////      }
  ////      obj.scope.define(token);
  ////      a.push(obj.token);
  ////      obj = advance(obj);
  ////      if (obj.token.id !== ",") {
  ////        break;
  ////      }
  ////      obj = advance(obj, ",");
  ////    }
  ////  }
  ////  this.first = a;
  ////  obj = advance(obj, ")");
  ////  obj = advance(obj, "{");
  ////  this.second = statements();
  ////  obj = advance(obj, "}");
  ////  this.type = "function";
  ////  scope.pop();
  ////  return this;
  ////});
  //
  //prefix("[", function() {
  //  var a = [];
  //  if (obj.token.id !== "]") {
  //    while (true) {
  //      a.push(expression(obj, 0));
  //      if (obj.token.id !== ",") {
  //        break;
  //      }
  //      obj = advance(obj, ",");
  //    }
  //  }
  //  obj = advance(obj, "]");
  //  this.type = "ArrayExpression";
  //  delete this.value;
  //  delete this.raw;
  //  this.elements = a;
  //  return this;
  //});
  //
  //prefix("{", function() {
  //  var a = [], n, v;
  //  var tmpLookAhead = obj.tokens[obj.token_nr];
  //  if(tmpLookAhead.value === ",") {
  //    // Handle Tuples w/out keys
  //    var a = [];
  //    if (obj.token.id !== "]") {
  //      while (true) {
  //        a.push(expression(obj, 0));
  //        if (obj.token.id !== ",") {
  //          break;
  //        }
  //        obj = advance(obj, ",");
  //      }
  //    }
  //    obj = advance(obj, ")");
  //    this.type = "ObjectExpression";
  //    delete this.value;
  //    delete this.raw;
  //    this.properties = [];
  //    for(var m=0; m<a.length; m++) {
  //      var currentValue = a[m];
  //      var kvMap = {};
  //      kvMap.type = "Property";
  //      kvMap.computed = false;
  //      kvMap.kind = 'init';
  //      kvMap.method = false;
  //      kvMap.shorthand = false;
  //      kvMap.key = {};
  //      kvMap.key.type = "Literal";
  //      var keyIndex = this.properties.length;
  //      kvMap.key.value = keyIndex;
  //      kvMap.key.raw = keyIndex.toString();
  //      kvMap.value = currentValue;
  //      this.properties.push(kvMap);
  //    }
  //    return this;
  //  }
  //
  //  if ((obj.token.id !== "]" &&  obj.token.id !== ")") && tmpLookAhead.value !== ",") {
  //    while (true) {
  //      n = obj.token;
  //      if (n.type !== "IDENTIFIER" && n.type !== "name" && n.type !== "literal" && n.type !== "TUPLE_ELEMENT_NAME") {
  //        obj.token.error("Bad property name.");
  //      }
  //      obj = advance(obj);
  //      obj = advance(obj, ":");
  //      v = expression(obj, 0);
  //
  //      var kvMap = {};
  //      kvMap.type = "Property";
  //      kvMap.computed = false;
  //      kvMap.kind = 'init';
  //      kvMap.method = false;
  //      kvMap.shorthand = false;
  //
  //      if (n.type === "literal" && helpers.isNum(n.value)) {
  //        n.type = "Literal";
  //        n.raw = n.value;
  //        if (n.value.indexOf('.')) {
  //          n.value = parseFloat(n.value);
  //        } else {
  //          n.value = parseInt(n.value);
  //        }
  //      } else if (n.type === "literal" && helpers.isBool(n.value)) {
  //        n.type = "Identifier";
  //        n.name = n.value;
  //        delete n.raw;
  //        delete n.value;
  //      } else if (n.type === "literal") {
  //        // This is for type string
  //        n.type = "Literal";
  //        n.raw = '"' + n.value + '"';
  //      } else if(n.type === "TUPLE_ELEMENT_NAME") {
  //        n.type = "Identifier";
  //        n.name = n.value;
  //        delete n.value;
  //      }
  //      kvMap.key = n;
  //      kvMap.value = v;
  //
  //      /* a.push(v); */
  //      a.push(kvMap);
  //
  //      if (obj.token.id !== ",") {
  //        break;
  //      }
  //      obj = advance(obj, ",");
  //    }
  //  }
  //
  //  try {
  //    obj = advance(obj, "]");
  //  } catch(e) {
  //    obj = advance(obj, ")");
  //  }
  //
  //  this.type = "unary";
  //  delete this.value;
  //  this.type = "ObjectExpression";
  //  this.properties = a;
  //  return this;
  //});

  //stmt("{", function() {
  //  obj.scope = new_scope(obj, original_scope);
  //  var a = statements();
  //  obj = advance(obj, "}");
  //  obj.scope.pop();
  //  return a;
  //});
  //
  //stmt("var", function() {
  //  var a = [], n, t;
  //  while (true) {
  //    n = obj.token;
  //    if (n.type !== "IDENTIFIER") {
  //      n.error("Expected a new variable identifier.");
  //    } else {
  //      n.type = "Identifier";
  //      n.name = n.value;
  //    }
  //
  //    obj.scope.define(obj, n);
  //    delete n.value;
  //
  //    obj = advance(obj);
  //    if (obj.token.id === "=") {
  //      t = obj.token;
  //      obj = advance(obj, "=");
  //
  //      t.type = 'VariableDeclaration';
  //      t.kind = 'var';
  //      t.declarations = [{
  //        type: 'VariableDeclarator',
  //        id: {},
  //        init: {}
  //      }];
  //
  //      t.declarations[0].id = n; //TODO FIX
  //      t.declarations[0].init = expression(obj, 0);
  //      delete t.value;
  //
  //      a.push(t);
  //    }
  //    if (obj.token.id === ";") {
  //      break;
  //      //return a.length === 0 ? null : a.length === 1 ? a[0] : a;
  //    }
  //    if (obj.token.id !== ",") {
  //      break;
  //    }
  //    obj = advance(obj, ",");
  //  }
  //  if(obj.token.value === "var") {
  //    return a.length === 0 ? null : a.length === 1 ? a[0] : a;
  //  }
  //  try {
  //    obj = advance(obj);
  //    //advance(";");//when actually was ("++")
  //  } catch (e) {
  //    obj = advance(obj, "EOF");
  //  }
  //
  //  return a.length === 0 ? null : a.length === 1 ? a[0] : a;
  //});
  //
  //stmt("if", function() {
  //  if(obj.tokens[obj.token_nr].value === "(") {
  //    obj = advance(obj, "(");
  //    this.test = expression(obj, 0);
  //    obj = advance(obj, ")");
  //  } else {
  //    this.test = expression(obj, 0);
  //  }
  //  this.consequent = block(obj);
  //  if (obj.token.id === "else") {
  //    obj.scope.reserve(obj.token);
  //    obj = advance(obj, "else");
  //    this.alternate = obj.token.id === "if" ? statement() : block(obj);
  //  } else {
  //    this.alternate = null;
  //  }
  //  this.type = "IfStatement";
  //  delete this.value;
  //  return this;
  //});
  //
  ////stmt("return", function() {
  ////  if (obj.token.id !== ";") {
  ////    this.first = expression(obj, 0);
  ////  }
  ////  obj = advance(obj, ";");
  ////  if (obj.token.id !== "}") {
  ////    obj.token.error("Unreachable statement.");
  ////  }
  ////  return this;
  ////});
  //
  ////stmt("break", function() {
  ////  obj = advance(obj, ";");
  ////  if (obj.token.id !== "}") {
  ////    obj.token.error("Unreachable statement.");
  ////  }
  ////  return this;
  ////});
  //
  //stmt("while", function() {
  //  this.type = "WhileStatement";
  //  if(obj.tokens[obj.token_nr-1].value === "(") {
  //    obj = advance(obj, "(");
  //    this.test = expression(obj, 0);
  //    obj = advance(obj, ")");
  //  } else {
  //    this.test = expression(obj, 0);
  //  }
  //  this.body = block(obj);
  //  delete this.value;
  //  return this;
  //});
  //
  //stmt("for", function() {
  //  this.type = "ForStatement";
  //  if(obj.tokens[obj.token_nr-1].value === "(") {
  //    obj = advance(obj, "(");
  //    this.init = statements(1);
  //    this.test = expression(obj, 0);
  //    if(obj.token.value === ";") {
  //      obj = advance(obj, ";");
  //    }
  //    this.update = expression(obj, 0);
  //    obj = advance(obj, ")");
  //  } else {
  //    this.init = statements(1);
  //    this.test = expression(obj, 0);
  //    if(obj.token.value === ";") {
  //      obj = advance(obj, ";");
  //    }
  //    this.update = expression(obj, 0);
  //  }
  //  this.body = block(obj);
  //  delete this.value;
  //  return this;
  //});
  //
  //stmt("repeat", function() {
  //  this.type = "DoWhileStatement";
  //  this.body = block(obj);
  //  if(obj.token.value === 'while') {
  //    obj = advance(obj);
  //  }
  //  if(obj.tokens[obj.token_nr-1].value === "(") {
  //    obj = advance(obj, "(");
  //    this.test = expression(obj, 0);
  //    obj = advance(obj, ")");
  //  } else {
  //    this.test = expression(obj, 0);
  //  }
  //  delete this.value;
  //  return this;
  //});

  var parseTokenStream = function(input_tokens) {
    obj.tokens = helpers.cleanUpTokenStream(input_tokens);
    obj.scope = new_scope(obj, original_scope);
    obj = advance(obj);
    var s = statements(obj);
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
      helpers.deletePropertyIfExists(currentNode, ['reserved', 'nud', 'led', 'std', 'lbp', 'scope', 'assignment']);
    });

    return result;
  };

  return parseTokenStream;
};

module.exports = make_parser;