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
    state.tokens = helpers.cleanUpTokenStream(inputTokens);
    state.scope = newScope(state, originalScope);
    state = advance(state);
    var s = statements(state);
    state = advance(state);
    state.scope.pop();

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

module.exports = makeParser;