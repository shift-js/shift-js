var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`func any(list: [Int], condition: ((Int) -> Bool)) -> Bool {
                                  for item in list {
                                      if condition(item) {
                                          return true
                                      }
                                  }
                                  return false
                              }`;
     
var swiftCodeAnswers = [
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "any" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "list" },
            { type: "PUNCTUATION",                value: ":" }, 
            { type: "ARRAY_START",                value: "["},
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "ARRAY_END",                  value: "]"},
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "condition" },
            { type: "PUNCTUATION",                value: ":" }, 
            { type: "PUNCTUATION",                value: "(" }, 
            { type: "PARAMS_START",               value: "(" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "RETURN_ARROW",               value: "->" }, 
            { type: "TYPE_BOOLEAN",               value: "Bool" },
            { type: "PUNCTUATION",                value: ")" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "RETURN_ARROW",               value: "->" }, 
            { type: "TYPE_BOOLEAN",               value: "Bool" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},
            
            { type: "STATEMENT_KEYWORD",          value: "for" },
            { type: "IDENTIFIER",                 value: "item" },
            { type: "STATEMENT_KEYWORD",          value: "in" },
            { type: "IDENTIFIER",                 value: "list" },
            { type: "PUNCTUATION",                value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENT_KEYWORD",          value: "if" },
            { type: "IDENTIFIER",                 value: "condition" },
            { type: "INVOCATION_START",           value: "(" }, 
            { type: "IDENTIFIER",                 value: "item" },  
            { type: "INVOCATION_END",             value: ")" }, 
            { type: "PUNCTUATION",                value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},
            
            { type: "STATEMENT_KEYWORD",          value: "return"},
            { type: "BOOLEAN",                    value: "true" },
            { type: "TERMINATOR",                 value: "\\n"},
            
            { type: "PUNCTUATION",                value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "PUNCTUATION",                value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},
            
            { type: "STATEMENT_KEYWORD",          value: "return"},
            { type: "BOOLEAN",                    value: "false" },
            { type: "TERMINATOR",                 value: "\\n"},
            
            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

