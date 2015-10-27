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
  declarations.constants(obj);

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