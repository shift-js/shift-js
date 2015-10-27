var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`struct FixedLengthRange {
                          var firstValue: Int
                          let length: Int
                      }

                      let rangeOfOneHundred = FixedLengthRange(firstValue: 1, length: 100)`;
     
var swiftCodeAnswers = [
          { type: "DECLARATION_KEYWORD",        value: "struct" },
          { type: "IDENTIFIER",                 value: "FixedLengthRange" },
          { type: "STRUCT_DEFINITION_START",    value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "firstValue" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "TYPE_NUMBER",                value: "Int"},
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "length" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "TYPE_NUMBER",                value: "Int"},
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STRUCT_DEFINITION_END",      value: "}" },
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "rangeOfOneHundred" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "FixedLengthRange" },
          { type: "INITIALIZATION_START",       value: "(" }, 
          { type: "IDENTIFIER",                 value: "firstValue" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "1" },
          { type: "PUNCTUATION",                value: "," },
          { type: "IDENTIFIER",                 value: "length" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "100" },
          { type: "INITIALIZATION_END",         value: ")" }, 
          { type: "TERMINATOR",                 value: "EOF"}
        ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

