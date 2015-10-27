var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`func someFunction(a: Int){
                    a = a + 1;
                }
                someFunction(5);`;
     
var swiftCodeAnswers = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "PARAMS_START",         value: "(" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: ":" }, 
          { type: "TYPE_NUMBER",          value: "Int" }, 
          { type: "PARAMS_END",           value: ")" },  
          { type: "STATEMENTS_START",     value: "{" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENTS_END",       value: "}"},
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "INVOCATION_START",     value: "(" }, 
          { type: "NUMBER",               value: "5" },   
          { type: "INVOCATION_END",       value: ")" }, 
          { type: "PUNCTUATION",          value: ";" },    
          { type: "TERMINATOR",           value: "EOF"}
        ]

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

