var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;


var swiftCode = String.raw`var sum = 0
                      for i in 0..<5 {
                          sum += i
                      }`;
     
var swiftCodeAnswers = [
    { type: 'DECLARATION_KEYWORD',            value: 'var' },
    { type: 'IDENTIFIER',                     value: 'sum' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'NUMBER',                         value: '0' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: "STATEMENT_KEYWORD",              value: "for" },
    { type: "IDENTIFIER",                     value: "i" },
    { type: "STATEMENT_KEYWORD",              value: "in" },
    { type: 'NUMBER',                         value: '0' },
    { type: 'HALF-OPEN_RANGE',                value: '..<'},
    { type: 'NUMBER',                         value: '5' },
    { type: "PUNCTUATION",                    value: "{" },
    { type: "TERMINATOR",                     value: "\\n"},
    { type: "IDENTIFIER",                     value: "sum" },
    { type: "OPERATOR",                       value: "+" },
    { type: "OPERATOR",                       value: "=" },
    { type: "IDENTIFIER",                     value: "i" },
    { type: "TERMINATOR",                     value: "\\n"},
    { type: "PUNCTUATION",                    value: "}" },
    { type: "TERMINATOR",                     value: "EOF"},
  ];


console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

