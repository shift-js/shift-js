var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var advance = require('./advance');
var newScope = require('./newScope');
var originalScope = require('./originalScope');
var originalSymbol = require('./originalSymbol');
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


// Declarations is where most of the logic of the parser is held
// Functions are declared here and invoked inside an object then exported to other modules
var declarations = {
  symbols: function(state) {
    symbol(state, originalSymbol, "EOF");
    symbol(state, originalSymbol, "\n");
    symbol(state, originalSymbol, "\\n");
    symbol(state, originalSymbol, "(end)");
    symbol(state, originalSymbol, "(name)").nud = helpers.itself;
    symbol(state, originalSymbol, ":");
    symbol(state, originalSymbol, ";");
    symbol(state, originalSymbol, ")");
    symbol(state, originalSymbol, "]");
    symbol(state, originalSymbol, "}");
    symbol(state, originalSymbol, ",");
    symbol(state, originalSymbol, "else").nud = helpers.itself;
    symbol(state, originalSymbol, "(literal)").nud = helpers.itself;
    symbol(state, originalSymbol, "this").nud = function() {
      state.scope.reserve(this);
      this.type = "this";
      return this;
    };
  },

  assignments: function(state) {
    assignment(state, "=");
    assignment(state, "+=");
    assignment(state, "-=");
    assignment(state, "*=");
    assignment(state, "/=");
  },

  infixes: function(state) {
    infix(state, "?", 20, function(left) {
      this.type = "ConditionalExpression";
      if(left.type === "IDENTIFIER") {
        left.type = "Identifier";
        left.name = left.value;
        delete left.value;
      }
      this.test = left;
      this.consequent = expression(state, 0);
      state = advance(state, ":");
      this.alternate = expression(state, 0);
      delete this.value;
      return this;
    });

    infixr(state, "&&", 30);
    infixr(state, "||", 30);
    infixr(state, "===", 40);
    infixr(state, "==", 40);
    infixr(state, "!==", 40);
    infixr(state, "!=", 40);
    infixr(state, "<", 40);
    infixr(state, "<=", 40);
    infixr(state, ">", 40);
    infixr(state, ">=", 40);
    infix(state, "+", 50);
    infix(state, "-", 50);
    infix(state, "*", 60);
    infix(state, "/", 60);
    infix(state, "%", 60);

    infix(state, ".", 80, function(left) {
      this.type = "MemberExpression";
      this.computed = false;
      this.object = left;
      if(this.object.type === "IDENTIFIER") {
        this.object.type = "Identifier";
        this.object.name = this.object.value;
        delete this.object.value;
      } else if (this.object.type === "MemberExpression") {
        delete this.value;
      }

      if (state.token.type !== "IDENTIFIER") {
        state.token.error("Expected a property name.");
      }
      if (state.token.type === "IDENTIFIER") {
        state.token.type = "Identifier";
        state.token.name = state.token.value;
        delete state.token.value;
      }
      delete this.name;
      delete this.value;
      this.property = state.token;
      state = advance(state);
      return this;
    });

    infix(state, "[", 80, function(left) {
      this.type = "MemberExpression";
      this.computed = true;
      if (left.type === 'IDENTIFIER') {
        left.name = left.value;
        left.type = "Identifier";
        delete left.value;
      }
      this.object = left;
      this.property = expression(state, 0);
      delete this.value;
      state = advance(state, "]");
      return this;
    });

    infix(state, "(", 80, function(left) {
      var a = [], parentParentNode;
      if (left.id === "." || left.id === "[") {
        this.type = "MemberExpression";
        this.computed = false;
        delete this.value;
        this.object = left.object;
        delete this.object.value;
        this.property = left.property;
        if (!this.property.name) {
          this.property.name = this.property.value;
        }
        delete this.property.value;
        this.property.type = "Identifier";
        delete this.property.arity;

        parentParentNode = {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: this,
            arguments: a
          }
        };
      } else {
        this.object = left;
        this.arguments = a;
        if ((left.arity !== "unary" || left.id !== "function") &&
          left.type !== "IDENTIFIER" && left.id !== "(" &&
          left.id !== "&&" && left.id !== "||" && left.id !== "?") {
          left.error("Expected a variable name.");
        }
        parentParentNode = this;
      }

      if (state.token.id !== ")") {
        while (true) {
          var lookAheadOne = state.tokens[state.index];
          if (lookAheadOne.value === ":") {
            state = advance(state);
            state = advance(state);
          }
          a.push(expression(state, 0));
          if (state.token.id !== ",") {
            break;
          }
          state = advance(state, ",");
        }
      }
      state = advance(state, ")");
      return parentParentNode;
    });
  },

  prefixes: function(state) {
    prefix(state, "+");
    prefix(state, "!");
    prefix(state, "++");
    prefix(state, "--");
    prefix(state, "-");
    prefix(state, "typeof");

    prefix(state, "(", function() {
      var e = expression(state, 0, true);
      state = advance(state, ")");
      return e;
    });

    prefix(state, "new", function() {
      var newExpressionStmt = {};
      newExpressionStmt.type = "NewExpression";
      newExpressionStmt.callee = state.token;
      state = advance(state);
      var tmpVarArgs = expression(state);
      if (!Array.isArray(tmpVarArgs)) {
        tmpVarArgs = [tmpVarArgs];
      }
      newExpressionStmt.arguments = tmpVarArgs;
      return newExpressionStmt;
    });

    prefix(state, "func", function() {
      var a = [];
      state.scope = newScope(state, originalScope);
      if (state.token.type === "IDENTIFIER") {
        state.scope.define(state, state.token);
        this.name = state.token.value;
        state = advance(state);
      }
      state = advance(state, "(");
      if (state.token.id !== ")") {
        while (true) {
          if(state.token.value === "var") {
            state = advance(state);
          }
          if (state.token.type !== "IDENTIFIER") {
            state.token.error("Expected a parameter name.");
          }
          state.scope.define(state, state.token);
          state.token.type = "Identifier";
          state.token.name = state.token.value;
          delete state.token.value;

          a.push(state.token);
          state = advance(state);
          if (state.token.id === ":") {
            while (true) {
              if (state.token.value !== ',' && state.token.value !== '{') {
                state = advance(state);
              } else {
                break;
              }
            }
          }
          if (state.token.id !== ",") {
            break;
          }
          state = advance(state, ",");
        }
      }

      if (state.token.value === ")") {
        state = advance(state, ")");
      }
      if (state.token.value === "->") {
        state = advance(state);
        while (true) {
          if (state.token.value !== "{") {
            state = advance(state);
          } else {
            break;
          }
        }
      }
      state = advance(state, "{");
      while(true) {
        if(state.token.value === "\\n") {
          state = advance(state);
        } else {
          break;
        }
      }

      var tmpLookAhead = state.tokens[state.index];
      if (state.token.value === "var") {
        for (var p = 0; p < a.length; p++) {
          var param = a[p];
          var paramIdentity = param.name;
          if(tmpLookAhead.value === paramIdentity) {
            state.scope.delete(state, tmpLookAhead);
            state.tokens.splice(state.index - 1, 1);
            var t = state.tokens[state.index - 1];
            var tmpVar = state.scope.find(t.value, state.symbolTable);
            var tmpSymb = Object.create(tmpVar);
            tmpSymb.value = t.value;
            tmpSymb.type = t.type;
            state.token = tmpSymb;
          }
        }
      }
      var fnBody = statements(state);
      while (true) {
        if (state.token.value === "\\n") {
          state = advance(state);
        } else {
          break;
        }
      }
      state = advance(state, "}");
      var fnBodyArray = Array.isArray(fnBody) ? fnBody : [fnBody];
      if (fnBodyArray.length>0) {
        for(var w=0; w<fnBodyArray.length; w++) {
          var bodyStmt = fnBodyArray[w];
          if(bodyStmt.type === "CallExpression") {
            var expressionStmtWrapper = {
              type: 'ExpressionStatement',
              expression: bodyStmt
            };
            fnBodyArray[w] = expressionStmtWrapper;
          }
        }
      }

      this.type = "FunctionDeclaration";
      delete this.value;
      this.id = {
        type: "Identifier",
        name: this.name
      };
      delete this.name;
      this.params = a;
      this.defaults = [];
      this.body = {
        type: 'BlockStatement',
        body: fnBodyArray
      };
      this.generator = false;
      this.expression = false;
      state.scope.pop();
      return this;
    });

    prefix(state, "[", function() {
      var a = [];
      //Handle Array initializer syntax
      if(state.tokens[state.index].type === "ARRAY_END") {
        state = advance(state);
      } else {
        if (state.token.id !== "]") {
          while (true) {
            a.push(expression(state, 0));
            if (state.token.id !== ",") {
              break;
            }
            state = advance(state, ",");
          }
        }
      }
      state = advance(state, "]");
      this.type = "ArrayExpression";
      delete this.value;
      delete this.raw;
      this.elements = a;

      if(state.token.value === "(" && state.tokens[state.index].value === ")") {
        state = advance(state);
        state = advance(state);
      }

      return this;
    });

    prefix(state, "{", function() {
      var a = [], n, v;
      while (true) {
        if(state.token.value === "\\n") {
          state = advance(state);
        }
        else {
          break;
        }
      }

      if(state.tokens[state.index-1] && state.tokens[state.index+2]) {
        var firstTypeDeclaration = (state.tokens[state.index-1].type.indexOf("TYPE") > -1);
        var secondTypeDeclaration = (state.tokens[state.index+1].type.indexOf("TYPE") > -1);
        var dictionaryEnd = (state.tokens[state.index+2].type === "DICTIONARY_END");
      }
      //Check for Dictionary initializer syntax
      if(firstTypeDeclaration && secondTypeDeclaration && dictionaryEnd) {
        while (true) {
          if (state.token.value === "]") {
            state = advance(state, "]");
            break;
          }
          state = advance(state);
        }
        state = advance(state, "(");
        state = advance(state, ")");
        return {
          type: "ObjectExpression",
          properties: []
        };
      }

      var tmpLookAhead = state.tokens[state.index];
      if(tmpLookAhead.type === "DICTIONARY_END") {
        state = advance(state);
        this.type = "ObjectExpression";
        this.properties = [];
        delete this.value;
        delete this.raw;
        return this;
      }
      if (tmpLookAhead.value === ",") {
        // Handle Tuples w/out keys
        var a = [];
        if (state.token.id !== "]") {
          while (true) {
            a.push(expression(state, 0));
            if (state.token.id !== ",") {
              break;
            }
            state = advance(state, ",");
          }
        }
        state = advance(state, ")");
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
      //Get all things in dictionary
      if ((state.token.id !== "]" &&  state.token.id !== ")") && tmpLookAhead.value !== ",") {
        while (true) {
          n = state.token;
          if (n.type !== "IDENTIFIER" && n.type !== "literal" && n.type !== "TUPLE_ELEMENT_NAME") {
            state.token.error("Bad property name.");
          }
          state = advance(state);
          state = advance(state, ":");
          v = expression(state, 0);
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
          a.push(kvMap);
          if (state.token.id !== ",") {
            break;
          }
          while (true) {
            if(state.token.value === "\\n") {
              state = advance(state);
            }
            else {
              break;
            }
          }
          state = advance(state, ",");
          while (true) {
            if(state.token.value === "\\n") {
              state = advance(state);
            }
            else {
              break;
            }
          }
          if(state.token.type === "DICTIONARY_END") {
            break;
          }
        }
      }
      try {
        state = advance(state, "]");//TODO just one here
      } catch(e) {
        state = advance(state, ")");
      }
      delete this.value;
      this.type = "ObjectExpression";
      this.properties = a;
      return this;
    });
  },

  stmts: function(state) {
    stmt(state, "{", function() {
      state.scope = newScope(state, originalScope);
      var a = statements(state);
      state = advance(state, "}");
      state.scope.pop();
      return a;
    });

    stmt(state, "var", function() {
      var a = [], n, t;
      while (true) {
        n = state.token;
        if (n.type !== "IDENTIFIER") {
          n.error("Expected a new variable identifier.");
        } else {
          n.type = "Identifier";
          n.name = n.value;
        }
        state.scope.define(state, n);
        delete n.value;
        state = advance(state);

        //Type Declarations
        if(state.token.id === ":") {
          state = advance(state, ":");
          if(state.token.type === "TYPE_STRING") {
            state = advance(state);
          } else if(state.token.type === "TYPE_NUMBER") {
            state = advance(state);
          } else if(state.token.type === "TYPE_BOOLEAN") {
            state = advance(state);
          }
        }
        //Assignment to a variable declaration
        if (state.token.id === "=") {
          t = state.token;
          state = advance(state, "=");
          t.type = 'VariableDeclaration';
          t.kind = 'var';
          t.declarations = [{
            type: 'VariableDeclarator',
            id: {},
            init: {}
          }];
          t.declarations[0].id = n; //TODO FIX
          t.declarations[0].init = expression(state, 0);
          delete t.value;
          a.push(t);
        }
        //Uninitialized variable declaration
        else if ([";", ")"].hasItem(state.token.id)) {
          t = state.token;
          t.type = 'VariableDeclaration';
          t.kind = 'var';
          t.declarations = [{
            type: 'VariableDeclarator',
            id: {},
            init: {}
          }];
          t.declarations[0].id = n;
          t.declarations[0].init = null;
          delete t.value;
          a.push(t);
          if(state.token.id === ";") {
            state = advance(state);
          }
          break;
        } else if(state.token.type === "TERMINATOR") {
          state = advance(state);
        }

        if(state.token.id === ";") {
          state = advance(state);
        }
        if (state.token.id !== ",") {
          break;
        }
        state = advance(state, ",");
      }
      if([";", "var", "if", "while", "repeat", "for", "++", "--"].hasItem(state.token.value)) {
        return a.length === 0 ? null : a.length === 1 ? a[0] : a;
      } else if(state.token.type === "IDENTIFIER") {
        return a.length === 0 ? null : a.length === 1 ? a[0] : a;
      } else if(state.token.value === "\\n") {
        return a.length === 0 ? null : a.length === 1 ? a[0] : a;
      }
      state = advance(state);
      if(state.token.value === "var") {
        return a.length === 0 ? null : a.length === 1 ? a[0] : a;
      }
      while (true) {
        if(state.token.value === "\\n") {
          state = advance(state);
        }
        else {
          break;
        }
      }
      return a.length === 0 ? null : a.length === 1 ? a[0] : a;
    });

    stmt(state, "if", function() {
      state = advance(state, "(");
      this.test = expression(state, 0);
      if(this.test.type === "ExpressionStatement") {
        this.test = this.test.expression;
      }
      if (state.token.value === '\\n') {
        state = advance(state);
      }
      state = advance(state, ")");
      this.consequent = block(state);
      while (true) {
        if (state.token.value === '\\n') {
          state = advance(state);
        } else {
          break;
        }
      }
      //block directly followed by else or else if statement?
      if (state.token.id === "else") {
        state.scope.reserve(state.token);
        state = advance(state, "else");
        this.alternate = state.token.id === "if" ? statement(state) : block(state);
      } else {
        this.alternate = null;
      }
      this.type = "IfStatement";
      delete this.value;
      return this;
    });

    stmt(state, "return", function() {
      if (state.token.id !== ";") {
        this.argument = expression(state, 0);
      }
      while (true) {
        if(state.token.value === "\\n") {
          state = advance(state);
        } else {
          break;
        }
      }
      if(state.token.id === ";") {
        state = advance(state, ";");
      }
      while (true) {
        if(state.token.value === "\\n") {
          state = advance(state);
        } else {
          break;
        }
      }
      if (state.token.id !== "}") {
        state.token.error("Unreachable statement.");
      }
      this.type = "ReturnStatement";
      delete this.value;
      if(this.argument.type === "ExpressionStatement" && this.argument.expression.type === "CallExpression") {
        this.argument = this.argument.expression;
      }

      return this;
    });

    stmt(state, "break", function() {
      state = advance(state, ";");
      //TODO termination logic is different (for Switch stmts)
      if (state.token.id !== "}") {
        state.token.error("Unreachable statement.");
      }
      return this;
    });

    stmt(state, "while", function() {
      this.type = "WhileStatement";
      if(state.tokens[state.index-1].value === "(") {
        state = advance(state, "(");
        this.test = expression(state, 0);
        state = advance(state, ")");
      } else {
        this.test = expression(state, 0);
      }
      this.body = block(state);
      delete this.value;
      return this;
    });

    stmt(state, "for", function() {
      this.type = "ForStatement";
      //to distinguish this if from conventional for-loop below
      if (state.tokens[state.index-1].value === "(" && state.tokens[state.index+2].value === ")") {
        this.type = "ForInStatement"
        if (state.token.value === "(") {
          state = advance(state);
        }
        this.left = statements(state, 1, true);
        state = advance(state);
        this.each = false;
        this.right = {};
        this.right.type = "Identifier";
        this.right.name = state.token.value;
        state = advance(state);
      } else if (state.tokens[state.index-1].value === "(") {
        state = advance(state, "(");
        this.init = statements(state, 1);
        this.test = expression(state, 0);
        if (state.token.value === ";") {
          state = advance(state, ";");
        }
        this.update = expression(state, 0);
        state = advance(state, ")");
      }
      //for KEYWORD_DECLARATION IDENTIFIER "IN" IDENTIFIER { }
      else if(state.tokens[state.index-1].type === "IDENTIFIER" && state.tokens[state.index+1].type === "IDENTIFIER") {
        this.type = "ForInStatement";
        //Splice in a var keyword
        var symbVar = state.symbolTable["var"];
        var tkVar = Object.create(symbVar);
        tkVar.value = "var";
        tkVar.type = "DECLARATION_KEYWORD";
        state.tokens.splice(state.index-1, 0, tkVar);
        state.token = state.tokens[state.index-1];

        //Splice in an end parens
        var symbEndParen = state.symbolTable[")"];
        var tkEndParen = Object.create(symbEndParen);
        tkEndParen.value = ")";
        tkEndParen.type = "PUNCTUATION";
        state.tokens.splice(state.index+1, 0, tkEndParen);

        this.left = statements(state, 1, true);
        state = advance(state);
        this.each = false;
        this.right = {};
        this.right.type = "Identifier";
        this.right.name = state.token.value;
        state = advance(state);
      } else {
        this.init = statements(state, 1);
        this.test = expression(state, 0);
        if(state.token.value === ";") {
          state = advance(state, ";");
        }
        this.update = expression(state, 0);
      }
      this.body = block(state);
      delete this.value;
      return this;
    });

    stmt(state, "repeat", function() {
      this.type = "DoWhileStatement";
      this.body = block(state);
      if (state.token.value === 'while') {
        state = advance(state);
      }
      if (state.tokens[state.index-1].value === "(") {
        state = advance(state, "(");
        this.test = expression(state, 0);
        state = advance(state, ")");
      } else {
        this.test = expression(state, 0);
      }
      delete this.value;
      if (state.token.value === ";") {
        state = advance(state);
      }
      return this;
    });

  },
  constants: function(state) {

  }


};

module.exports = declarations;