var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`func addOne(input: Int) -> Int {
                                return input + 1
                            }
                            addOne(((17 * 4) - 3) * 5)`;
     
var swiftCodeAnswers = [
         { type: "DECLARATION_KEYWORD",        value: "func"},
         { type: "IDENTIFIER",                 value: "addOne" },
         { type: "PARAMS_START",               value: "(" },
         { type: "IDENTIFIER",                 value: "input" },
         { type: "PUNCTUATION",                value: ":" }, 
         { type: "TYPE_NUMBER",                value: "Int" }, 
         { type: "PARAMS_END",                 value: ")" }, 
         { type: "RETURN_ARROW",               value: "->" },  
         { type: "TYPE_NUMBER",                value: "Int" }, 
         { type: "STATEMENTS_START",           value: "{" },  
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "STATEMENT_KEYWORD",          value: "return"},
         { type: "IDENTIFIER",                 value: "input" },
         { type: "OPERATOR",                   value: "+" },
         { type: "NUMBER",                     value: "1" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "STATEMENTS_END",             value: "}" },  
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "IDENTIFIER",                 value: "addOne" },
         { type: "INVOCATION_START",           value: "(" },
         { type: "PUNCTUATION",                value: "(" },
         { type: "PUNCTUATION",                value: "(" }, 
         { type: "NUMBER",                     value: "17" },   
         { type: "OPERATOR",                   value: "*" },
         { type: "NUMBER",                     value: "4" },   
         { type: "PUNCTUATION",                value: ")" }, 
         { type: "OPERATOR",                   value: "-" },
         { type: "NUMBER",                     value: "3" },   
         { type: "PUNCTUATION",                value: ")" }, 
         { type: "OPERATOR",                   value: "*" },
         { type: "NUMBER",                     value: "5" },   
         { type: "INVOCATION_END",             value: ")" }, 
         { type: "TERMINATOR",                 value: "EOF"}
        ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

