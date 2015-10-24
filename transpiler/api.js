var fs = require('fs');
var lexer = require('./lexer/lexer.js');
var parser = require('./parser/parser.js')();
var escodegen = require('escodegen');
var generator = escodegen.generate;

module.exports = {
  transpile: function(swiftString) {
    return generator(parser(lexer(swiftString)));
  },
  tokenize: function(swiftString) {
    return lexer(swiftString);
  },
  ast: function(tokens) {
    return lexer(parser(tokens));
  }
}
