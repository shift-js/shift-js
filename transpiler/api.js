// External dependencies.
var fs = require('fs');
var lexer = require('./lexer/lexer.js');
var make_parser = require('./parser/parser.js');
var escodegen = require('escodegen');
var generator = escodegen.generate;
var parser;

// Formatting options used by the generator.
var options = {
  format: {
    indent: {
      style: '  ',
    }
  }
};

// API methods used by the command line tool and the web playground.
var api = {
  // Compiles a string of Swift code to JavaScript.
  compile: function(swiftString) {
    parser = make_parser();
    return generator(parser(lexer(swiftString)), options);
  },
  // Converts a string of Swift code to tokens.
  tokenize: function(swiftString) {
    return JSON.stringify(lexer(swiftString), null, 2);
  },
  // Converts a string of Swift code to an abstract syntax tree.
  ast: function(swiftString) {
    parser = make_parser();
    return JSON.stringify(parser(lexer(swiftString)), null, 2);
  }
};

// Exports the API methods for use in other files.
module.exports = api;
