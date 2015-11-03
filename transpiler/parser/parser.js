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
var declarations = require('./declarations');
var statements = require('./statements');
var rearrangeTokensDynamicDictionaryAssignment = require('./rearrangeTokensDynamicDictionaryAssignment');
var rearrangeTokensDictionaryKeyValueIteration = require('./rearrangeTokensDictionaryKeyValueIteration');
var rearrangeTokensPrintToConsoleLog = require('./rearrangeTokensPrintToConsoleLog');
var rearrangeTokensVariadicParams = require('./rearrangeTokensVariadicParams');
var rearrangeTokensAddParens = require('./rearrangeTokensAddParens');

var makeParser = function() {

  var state = {};
  state.scope;
  state.symbolTable = {};
  state.token;
  state.tokens;
  state.index = 0;

  declarations.symbols(state);
  declarations.assignments(state);
  declarations.infixes(state);
  declarations.prefixes(state);
  declarations.stmts(state);
  declarations.constants(state);

  var parseTokenStream = function(inputTokens) {
    var intermediaryTokenStream = helpers.cleanUpTokenStream(inputTokens);
    var intermediary = rearrangeTokensDynamicDictionaryAssignment(intermediaryTokenStream);
    var intermediary2 = rearrangeTokensPrintToConsoleLog(intermediary);
    var intermediary3 = rearrangeTokensDictionaryKeyValueIteration(intermediary2);
    var intermediary4 = rearrangeTokensVariadicParams(intermediary3);
    state.tokens = rearrangeTokensAddParens(intermediary4);
    state.scope = newScope(state, originalScope);

    /* Define globally accessible objects */
    /* console */
    var identifierSymbol = state.symbolTable["(name)"];
    var identifierToken = Object.create(identifierSymbol);
    identifierToken.type = "Identifier";
    identifierToken.value = "console";
    state.scope.define(state, identifierToken);

    /* Array */
    var identifierSymbol = state.symbolTable["(name)"];
    var identifierToken = Object.create(identifierSymbol);
    identifierToken.type = "Identifier";
    identifierToken.value = "Array";
    state.scope.define(state, identifierToken);

    /* arguments */
    var identifierSymbol = state.symbolTable["(name)"];
    var identifierToken = Object.create(identifierSymbol);
    identifierToken.type = "Identifier";
    identifierToken.value = "arguments";

    state.scope.define(state, identifierToken);

    state = advance(state);

    /* Remove leading new lines */
    while(true) {
      if(state.token.value === "\\n") {
        state = advance(state);
      }
      else {
        break;
      }
    }

    var s = statements(state);
    state = advance(state);
    state.scope.pop();

    var bodyNodes;
    if(s) {
      bodyNodes = Array.isArray(s) ? s : [s];
    } else {
      bodyNodes = [];
    }

    if(bodyNodes.length >= 1) {
      for(var q=0; q<bodyNodes.length; q++) {
        var n = bodyNodes[q];
        if(n.type === "CallExpression"){
          var expressionStmtWrapper = {
            type: "ExpressionStatement",
            expression: n
          }
          bodyNodes[q] = expressionStmtWrapper;
        }
      }
    }


    var result = {
      type: 'Program',
      sourceType: 'module',
      body: bodyNodes
    };

    /**
     * Walk result tree and remove properties that don't conform to Esprima standard.
     * * */
    helpers.traverse(result, function(currentNode) {
      helpers.deletePropertyIfExists(currentNode, ['reserved', 'nud', 'led', 'std', 'lbp', 'scope', 'assignment']);
    });

    return result;
  };

  return parseTokenStream;
};

module.exports = makeParser;