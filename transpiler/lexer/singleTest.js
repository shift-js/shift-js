var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`func addSevenInts(first: Int, second: Int, third: Int, fourth: Int, fifth: Int, sixth: Int, seventh: Int) -> Int {
                          let sum = first + second + third + fourth + fifth + sixth + seventh
                          return sum
                      }
                      addSevenInts(143242134, second: 34543, third: 4, fourth: 6, fifth: 0, sixth: 56, seventh: 5)`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",        value: "func"},
    { type: "IDENTIFIER",                 value: "addSevenInts" },
    { type: "PARAMS_START",               value: "(" },
    { type: "IDENTIFIER",                 value: "first" },
    { type: "PUNCTUATION",                value: ":" }, 
    { type: "TYPE_NUMBER",                value: "Int" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "second" },
    { type: "PUNCTUATION",                value: ":" }, 
    { type: "TYPE_NUMBER",                value: "Int" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "third" },
    { type: "PUNCTUATION",                value: ":" }, 
    { type: "TYPE_NUMBER",                value: "Int" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "fourth" },
    { type: "PUNCTUATION",                value: ":" }, 
    { type: "TYPE_NUMBER",                value: "Int" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "fifth" },
    { type: "PUNCTUATION",                value: ":" }, 
    { type: "TYPE_NUMBER",                value: "Int" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "sixth" },
    { type: "PUNCTUATION",                value: ":" }, 
    { type: "TYPE_NUMBER",                value: "Int" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "seventh" },
    { type: "PUNCTUATION",                value: ":" }, 
    { type: "TYPE_NUMBER",                value: "Int" },
    { type: "PARAMS_END",                 value: ")" },
    { type: "RETURN_ARROW",               value: "->" },
    
    { type: "TYPE_NUMBER",                value: "Int" },
    { type: "STATEMENTS_START",           value: "{" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "DECLARATION_KEYWORD",        value: "let" },
    { type: "IDENTIFIER",                 value: "sum" },
    { type: "OPERATOR",                   value: "=" },
    { type: "IDENTIFIER",                 value: "first" },
    { type: "OPERATOR",                   value: "+" },
    { type: "IDENTIFIER",                 value: "second" },
    { type: "OPERATOR",                   value: "+" },
    { type: "IDENTIFIER",                 value: "third" },
    { type: "OPERATOR",                   value: "+" },
    { type: "IDENTIFIER",                 value: "fourth" },
    { type: "OPERATOR",                   value: "+" },
    { type: "IDENTIFIER",                 value: "fifth" },
    { type: "OPERATOR",                   value: "+" },
    { type: "IDENTIFIER",                 value: "sixth" },
    { type: "OPERATOR",                   value: "+" },
    { type: "IDENTIFIER",                 value: "seventh" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "STATEMENT_KEYWORD",          value: "return"},
    { type: "IDENTIFIER",                 value: "sum" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "STATEMENTS_END",             value: "}" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "IDENTIFIER",                 value: "addSevenInts" },
    { type: "INVOCATION_START",           value: "(" },
    { type: "NUMBER",                     value: "143242134" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "second" },
    { type: "PUNCTUATION",                value: ":" },
    { type: "NUMBER",                     value: "34543" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "third" },
    { type: "PUNCTUATION",                value: ":" },
    { type: "NUMBER",                     value: "4" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "fourth" },
    { type: "PUNCTUATION",                value: ":" },
    { type: "NUMBER",                     value: "6" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "fifth" },
    { type: "PUNCTUATION",                value: ":" },
    { type: "NUMBER",                     value: "0" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "sixth" },
    { type: "PUNCTUATION",                value: ":" },
    { type: "NUMBER",                     value: "56" },
    { type: "PUNCTUATION",                value: "," },
    { type: "IDENTIFIER",                 value: "seventh" },
    { type: "PUNCTUATION",                value: ":" },
    { type: "NUMBER",                     value: "5" },
    { type: "INVOCATION_END",             value: ")" },
    { type: "TERMINATOR",                 value: "EOF"}
  ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

