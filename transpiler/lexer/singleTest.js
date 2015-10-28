var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`class Counter {
                                var count = 0
                                func increment() {
                                    ++count
                                }
                                func incrementBy(amount: Int) {
                                    count += amount
                                }
                                func reset() {
                                    count = 0
                                }
                            }
                            var someCounter = Counter()
                            someCounter.incrementBy(5)`;
     
var swiftCodeAnswers = [
         { type: "DECLARATION_KEYWORD",        value: "class" },
         { type: "IDENTIFIER",                 value: "Counter" },
         { type: "CLASS_DEFINITION_START",     value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "DECLARATION_KEYWORD",        value: "var" },
         { type: "IDENTIFIER",                 value: "count" },
         { type: "OPERATOR",                   value: "=" },
         { type: "NUMBER",                     value: "0" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "DECLARATION_KEYWORD",        value: "func"},
         { type: "IDENTIFIER",                 value: "increment" },
         { type: "PARAMS_START",               value: "(" },
         { type: "PARAMS_END",                 value: ")" }, 
         { type: "STATEMENTS_START",           value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "OPERATOR",                   value: "+" },
         { type: "OPERATOR",                   value: "+" },
         { type: "IDENTIFIER",                 value: "count" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "STATEMENTS_END",             value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "DECLARATION_KEYWORD",        value: "func"},
         { type: "IDENTIFIER",                 value: "incrementBy" },
         { type: "PARAMS_START",               value: "(" },
         { type: "IDENTIFIER",                 value: "amount" },
         { type: "PUNCTUATION",                value: ":" }, 
         { type: "TYPE_NUMBER",                value: "Int" },  
         { type: "PARAMS_END",                 value: ")" }, 
         { type: "STATEMENTS_START",           value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "IDENTIFIER",                 value: "count" },
         { type: "OPERATOR",                   value: "+" },
         { type: "OPERATOR",                   value: "=" },
         { type: "IDENTIFIER",                 value: "amount" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "STATEMENTS_END",             value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "DECLARATION_KEYWORD",        value: "func"},
         { type: "IDENTIFIER",                 value: "reset" },
         { type: "PARAMS_START",               value: "(" },
         { type: "PARAMS_END",                 value: ")" }, 
         { type: "STATEMENTS_START",           value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "IDENTIFIER",                 value: "count" },
         { type: "OPERATOR",                   value: "=" },
         { type: "NUMBER",                     value: "0" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "STATEMENTS_END",             value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "CLASS_DEFINITION_END",       value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         {type: "DECLARATION_KEYWORD",         value: "var" },
         { type: "IDENTIFIER",                 value: "someCounter" },
         { type: "OPERATOR",                   value: "=" },
         { type: "IDENTIFIER",                 value: "Counter" },
         { type: "INITIALIZATION_START",       value: "(" }, 
         { type: "INITIALIZATION_END",         value: ")" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "IDENTIFIER",                 value: "someCounter" },
         { type: "DOT_SYNTAX",                 value: "." },
         { type: "IDENTIFIER",                 value: "incrementBy" },
         { type: "INVOCATION_START",           value: "(" }, 
         { type: "NUMBER",                     value: "5" },
         { type: "INVOCATION_END",             value: ")" }, 
         { type: "TERMINATOR",                 value: "EOF"}
        ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

