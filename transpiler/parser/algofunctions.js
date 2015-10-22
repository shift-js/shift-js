var util = require('util');
var esprima = require('esprima-ast-utils');
var fs = require('fs');
var R = require('ramda');
var tokenize = require('./tokens.js').tokenize;
var tests = require('./test_cases_parser_input');

function parseDictionary(tokens) {
  var temp;
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'DICTIONARY_START') {
      for (var j = 0; j < tokens.length; j++) {
        if(tokens[j].type === 'DICTIONARY_END') {
          temp = tokens[j]
          tokens.splice(i + 1, 0, tokens[j]);
        }
        if (tokens[j].value === ';') {
          tokens[i + 2] = tokens[j];
        }

      }
    }
  }
  // console.log(tokens[0].type);
  return tokens;
}

parseDictionary(tests[20])