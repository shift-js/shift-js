var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var makeParse = require('./parser');

var expected = {};
var tokenStream = [
  { type: 'DECLARATION_KEYWORD',         value: 'let' },
  { type: 'IDENTIFIER',                  value: 'interestingNumbers' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'DICTIONARY_START',            value: '[' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STRING',                      value: 'Prime' },
  { type: 'PUNCTUATION',                 value: ':' },
  { type: 'ARRAY_START',                 value: '[' },
  { type: 'NUMBER',                      value: '2' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '3' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '5' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '7' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '11' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '13' },
  { type: 'ARRAY_END',                   value: ']' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STRING',                      value: 'Fibonacci' },
  { type: 'PUNCTUATION',                 value: ':' },
  { type: 'ARRAY_START',                 value: '[' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '2' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '3' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '5' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '8' },
  { type: 'ARRAY_END',                   value: ']' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STRING',                      value: 'Square' },
  { type: 'PUNCTUATION',                 value: ':' },
  { type: 'ARRAY_START',                 value: '[' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '4' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '9' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '16' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '25' },
  { type: 'ARRAY_END',                   value: ']' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'DICTIONARY_END',              value: ']' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: "DECLARATION_KEYWORD",         value: "var" },
  { type: "IDENTIFIER",                  value: "largest" },
  { type: "OPERATOR",                    value: "=" },
  { type: "NUMBER",                      value: "0" },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: "STATEMENT_KEYWORD",           value: "for" },
  { type: 'PUNCTUATION',                 value: '(' },
  { type: "IDENTIFIER",                  value: "kind" },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: "IDENTIFIER",                  value: "numbers" },
  { type: 'PUNCTUATION',                 value: ')' },
  { type: "STATEMENT_KEYWORD",           value: "in" },
  { type: "IDENTIFIER",                  value: "interestingNumbers" },
  { type: "PUNCTUATION",                 value: "{" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "STATEMENT_KEYWORD",           value: "for" },
  { type: "IDENTIFIER",                  value: "number" },
  { type: "STATEMENT_KEYWORD",           value: "in" },
  { type: "IDENTIFIER",                  value: "numbers" },
  { type: "PUNCTUATION",                 value: "{" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "STATEMENT_KEYWORD",           value: "if" },
  { type: "IDENTIFIER",                  value: "number" },
  { type: "OPERATOR",                    value: ">" },
  { type: "IDENTIFIER",                  value: "largest" },
  { type: "PUNCTUATION",                 value: "{" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "IDENTIFIER",                  value: "largest" },
  { type: "OPERATOR",                    value: "=" },
  { type: "IDENTIFIER",                  value: "number" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "PUNCTUATION",                 value: "}" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "PUNCTUATION",                 value: "}" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "PUNCTUATION",                 value: "}" },
  { type: "TERMINATOR",                  value: "EOF"},
];
var parser = makeParse();

/**
 * First time
 */

var actual = parser(tokenStream);

console.log("############################");
console.log("############################");
console.log("##### BEGIN AST OUTPUT #####");
console.log(util.inspect(actual, {
  colors: true,
  depth: null
}));
console.log("############################");
console.log("############################");
console.log("############################");
console.log(util.inspect(expected, {
  colors: true,
  depth: null
}));
console.log("############################");
console.log("############################");
console.log("########## DIFF ############");
var dfrnc = diff(actual,expected);
console.log(dfrnc);

