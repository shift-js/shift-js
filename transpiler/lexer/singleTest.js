var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`let interestingNumbers = [
                          "Prime": [2, 3, 5, 7, 11, 13],
                          "Fibonacci": [1, 1, 2, 3, 5, 8],
                          "Square": [1, 4, 9, 16, 25],
                      ]
                      var largest = 0
                      for (kind, numbers) in interestingNumbers {
                          for number in numbers {
                              if number > largest {
                                  largest = number
                              }
                          }
                      }`;
     
var swiftCodeAnswers = [
    { type: 'DECLARATION_KEYWORD',            value: 'let' },
    { type: 'IDENTIFIER',                     value: 'interestingNumbers' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'DICTIONARY_START',               value: '[' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'STRING',                         value: 'Prime' },
    { type: 'PUNCTUATION',                    value: ':' },
    { type: 'ARRAY_START',                    value: '[' },
    { type: 'NUMBER',                         value: '2' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '3' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '5' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '7' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '11' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '13' },
    { type: 'ARRAY_END',                      value: ']' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'STRING',                         value: 'Fibonacci' },
    { type: 'PUNCTUATION',                    value: ':' },
    { type: 'ARRAY_START',                    value: '[' },
    { type: 'NUMBER',                         value: '1' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '1' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '2' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '3' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '5' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '8' },
    { type: 'ARRAY_END',                      value: ']' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'STRING',                         value: 'Square' },
    { type: 'PUNCTUATION',                    value: ':' },
    { type: 'ARRAY_START',                    value: '[' },
    { type: 'NUMBER',                         value: '1' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '4' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '9' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '16' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'NUMBER',                         value: '25' },
    { type: 'ARRAY_END',                      value: ']' },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'DICTIONARY_END',                 value: ']' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: "DECLARATION_KEYWORD",            value: "var" },
    { type: "IDENTIFIER",                     value: "largest" },
    { type: "OPERATOR",                       value: "=" },
    { type: "NUMBER",                         value: "0" },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: "STATEMENT_KEYWORD",              value: "for" },
    { type: 'PUNCTUATION',                    value: '(' },
    { type: "IDENTIFIER",                     value: "kind" },
    { type: 'PUNCTUATION',                    value: ',' },
    { type: "IDENTIFIER",                     value: "numbers" },
    { type: 'PUNCTUATION',                    value: ')' },
    { type: "STATEMENT_KEYWORD",              value: "in" },
    { type: "IDENTIFIER",                     value: "interestingNumbers" }, 
    { type: "PUNCTUATION",                    value: "{" },
    { type: "TERMINATOR",                     value: "\\n"},
    { type: "STATEMENT_KEYWORD",              value: "for" },
    { type: "IDENTIFIER",                     value: "number" },
    { type: "STATEMENT_KEYWORD",              value: "in" },
    { type: "IDENTIFIER",                     value: "numbers" }, 
    { type: "PUNCTUATION",                    value: "{" },
    { type: "TERMINATOR",                     value: "\\n"},
    { type: "STATEMENT_KEYWORD",              value: "if" },
    { type: "IDENTIFIER",                     value: "number" },
    { type: "OPERATOR",                       value: ">" },
    { type: "IDENTIFIER",                     value: "largest" },
    { type: "PUNCTUATION",                    value: "{" },
    { type: "TERMINATOR",                     value: "\\n"},
    { type: "IDENTIFIER",                     value: "largest" },
    { type: "OPERATOR",                       value: "=" },
    { type: "IDENTIFIER",                     value: "number" },
    { type: "TERMINATOR",                     value: "\\n"},
    { type: "PUNCTUATION",                    value: "}" },
    { type: "TERMINATOR",                     value: "\\n"},
    { type: "PUNCTUATION",                    value: "}" },
    { type: "TERMINATOR",                     value: "\\n"},
    { type: "PUNCTUATION",                    value: "}" },
    { type: "TERMINATOR",                     value: "EOF"},

  ];
>>>>>>> affaa96b9af006616380ac951fb4803fb1c50222

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

