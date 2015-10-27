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
var prefix = require('./prefix');
var stmt = require('./stmt');
var statements = require('./statements');
var statement = require('./statement');

var declarations = {
  symbols: function(obj) {
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
    symbol(obj, original_symbol, "(literal)").nud = helpers.itself;
    symbol(obj, original_symbol, "this").nud = function() {
      scope.reserve(this);
      this.type = "this";
      return this;
    };
  },

  assignments: function(obj) {
    assignment(obj, "=");
    assignment(obj, "+=");
    assignment(obj, "-=");
    assignment(obj, "*=");
    assignment(obj, "/=");
  },

  infixes: function(obj) {
    infix(obj, "?", 20, function(left) {
      this.type = "ConditionalExpression";
      if(left.type === "IDENTIFIER") {
        left.type = "Identifier";
        left.name = left.value;
        delete left.value;
      }
      this.test = left;
      this.consequent = expression(obj, 0);
      obj = advance(obj, ":");
      this.alternate = expression(obj, 0);
      delete this.value;
      return this;
    });

    infixr(obj, "&&", 30);
    infixr(obj, "||", 30);
    infixr(obj, "===", 40);
    infixr(obj, "==", 40);
    infixr(obj, "!==", 40);
    infixr(obj, "!=", 40);
    infixr(obj, "<", 40);
    infixr(obj, "<=", 40);
    infixr(obj, ">", 40);
    infixr(obj, ">=", 40);
    infix(obj, "+", 50);
    infix(obj, "-", 50);
    infix(obj, "*", 60);
    infix(obj, "/", 60);
    infix(obj, "%", 60);
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

    infix(obj, "[", 80, function(left) {
      this.type = "MemberExpression";
      this.computed = true;
      if(left.type === 'IDENTIFIER'){
        left.name = left.value;
        left.type = "Identifier";
        delete left.value;
      }
      this.object = left;
      this.property = expression(obj, 0);
      delete this.value;
      obj = advance(obj, "]");
      return this;
    });

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
  },

  prefixes: function(obj) {
    prefix(obj, "+");
    prefix(obj, "!");
    prefix(obj, "++");
    prefix(obj, "--");
    prefix(obj, "-");
    prefix(obj, "typeof");

    prefix(obj, "(", function() {
      var e = expression(obj, 0);
      obj = advance(obj, ")");
      return e;
    });

    //prefix("function", function() {
    //  var a = [];
    //  obj.scope = new_scope(obj, original_scope);
    //  if (obj.token.type === "name") {
    //    obj.scope.define(token);
    //    this.name = obj.token.value;
    //    obj = advance(obj);
    //  }
    //  obj = advance(obj, "(");
    //  if (obj.token.id !== ")") {
    //    while (true) {
    //      if (obj.token.type !== "name") {
    //        obj.token.error("Expected a parameter name.");
    //      }
    //      obj.scope.define(token);
    //      a.push(obj.token);
    //      obj = advance(obj);
    //      if (obj.token.id !== ",") {
    //        break;
    //      }
    //      obj = advance(obj, ",");
    //    }
    //  }
    //  this.first = a;
    //  obj = advance(obj, ")");
    //  obj = advance(obj, "{");
    //  this.second = statements();
    //  obj = advance(obj, "}");
    //  this.type = "function";
    //  scope.pop();
    //  return this;
    //});

    prefix(obj, "[", function() {
      var a = [];
      if (obj.token.id !== "]") {
        while (true) {
          a.push(expression(obj, 0));
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
      this.elements = a;
      return this;
    });

    prefix(obj, "{", function() {
      var a = [], n, v;
      var tmpLookAhead = obj.tokens[obj.token_nr];
      if(tmpLookAhead.value === ",") {
        // Handle Tuples w/out keys
        var a = [];
        if (obj.token.id !== "]") {
          while (true) {
            a.push(expression(obj, 0));
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
        return this;
      }

      if ((obj.token.id !== "]" &&  obj.token.id !== ")") && tmpLookAhead.value !== ",") {
        while (true) {
          n = obj.token;
          if (n.type !== "IDENTIFIER" && n.type !== "name" && n.type !== "literal" && n.type !== "TUPLE_ELEMENT_NAME") {
            obj.token.error("Bad property name.");
          }
          obj = advance(obj);
          obj = advance(obj, ":");
          v = expression(obj, 0);

          var kvMap = {};
          kvMap.type = "Property";
          kvMap.computed = false;
          kvMap.kind = 'init';
          kvMap.method = false;
          kvMap.shorthand = false;

          if (n.type === "literal" && helpers.isNum(n.value)) {
            n.type = "Literal";
            n.raw = n.value;
            if (n.value.indexOf('.')) {
              n.value = parseFloat(n.value);
            } else {
              n.value = parseInt(n.value);
            }
          } else if (n.type === "literal" && helpers.isBool(n.value)) {
            n.type = "Identifier";
            n.name = n.value;
            delete n.raw;
            delete n.value;
          } else if (n.type === "literal") {
            // This is for type string
            n.type = "Literal";
            n.raw = '"' + n.value + '"';
          } else if(n.type === "TUPLE_ELEMENT_NAME") {
            n.type = "Identifier";
            n.name = n.value;
            delete n.value;
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

      this.type = "unary";
      delete this.value;
      this.type = "ObjectExpression";
      this.properties = a;
      return this;
    });
  },

  stmts: function(obj) {
    stmt(obj, "{", function() {
      obj.scope = new_scope(obj, original_scope);
      var a = statements(obj);
      obj = advance(obj, "}");
      obj.scope.pop();
      return a;
    });

    stmt(obj, "var", function() {
      var a = [], n, t;
      while (true) {
        n = obj.token;
        if (n.type !== "IDENTIFIER") {
          n.error("Expected a new variable identifier.");
        } else {
          n.type = "Identifier";
          n.name = n.value;
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
          t.declarations[0].init = expression(obj, 0);
          delete t.value;

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

    stmt(obj, "if", function() {
      if(obj.tokens[obj.token_nr].value === "(") {
        obj = advance(obj, "(");
        this.test = expression(obj, 0);
        obj = advance(obj, ")");
      } else {
        this.test = expression(obj, 0);
      }
      this.consequent = block(obj);
      if (obj.token.id === "else") {
        obj.scope.reserve(obj.token);
        obj = advance(obj, "else");
        this.alternate = obj.token.id === "if" ? statement(obj) : block(obj);
      } else {
        this.alternate = null;
      }
      this.type = "IfStatement";
      delete this.value;
      return this;
    });

    //stmt("return", function() {
    //  if (obj.token.id !== ";") {
    //    this.first = expression(obj, 0);
    //  }
    //  obj = advance(obj, ";");
    //  if (obj.token.id !== "}") {
    //    obj.token.error("Unreachable statement.");
    //  }
    //  return this;
    //});

    //stmt("break", function() {
    //  obj = advance(obj, ";");
    //  if (obj.token.id !== "}") {
    //    obj.token.error("Unreachable statement.");
    //  }
    //  return this;
    //});

    stmt(obj, "while", function() {
      this.type = "WhileStatement";
      if(obj.tokens[obj.token_nr-1].value === "(") {
        obj = advance(obj, "(");
        this.test = expression(obj, 0);
        obj = advance(obj, ")");
      } else {
        this.test = expression(obj, 0);
      }
      this.body = block(obj);
      delete this.value;
      return this;
    });

    stmt(obj, "for", function() {
      this.type = "ForStatement";
      if(obj.tokens[obj.token_nr-1].value === "(") {
        obj = advance(obj, "(");
        this.init = statements(obj, 1);
        this.test = expression(obj, 0);
        if(obj.token.value === ";") {
          obj = advance(obj, ";");
        }
        this.update = expression(obj, 0);
        obj = advance(obj, ")");
      } else {
        this.init = statements(obj, 1);
        this.test = expression(obj, 0);
        if(obj.token.value === ";") {
          obj = advance(obj, ";");
        }
        this.update = expression(obj, 0);
      }
      this.body = block(obj);
      delete this.value;
      return this;
    });

    stmt(obj, "repeat", function() {
      this.type = "DoWhileStatement";
      this.body = block(obj);
      if(obj.token.value === 'while') {
        obj = advance(obj);
      }
      if(obj.tokens[obj.token_nr-1].value === "(") {
        obj = advance(obj, "(");
        this.test = expression(obj, 0);
        obj = advance(obj, ")");
      } else {
        this.test = expression(obj, 0);
      }
      delete this.value;
      return this;
    });

  },
  constants: function(obj) {
    //constant("true", true);
    //constant("false", false);
    //constant("null", null);
    //constant("pi", 3.141592653589793);
    //constant("Object", {});
    //constant("Array", []);
  }


}

module.exports = declarations;