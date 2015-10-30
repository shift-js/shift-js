var fs = require('fs');
var lexer = require('./lexer/lexer.js');
var make_parser = require('./parser/parser.js');
var escodegen = require('escodegen');
var generator = escodegen.generate;
var parser;

var options = {
  format: {
    indent: {
      style: '  ',
    }
  }
};

var api = {
  compile: function(swiftString) {
    parser = make_parser();
    return generator(parser(lexer(swiftString)), options);
  },
  tokenize: function(swiftString) {
    return lexer(swiftString);
  },
  ast: function(swiftString) {
    parser = make_parser();
    return parser(lexer(swiftString));
  }
};

module.exports = api;