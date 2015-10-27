var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`var resolutionHeight = 480
                        struct Resolution {
                            var width = 0
                            var height = 0
                        }

                        let someResolution = Resolution(width: ((50 * 2) * 6) + 40, height: resolutionHeight)`;
     
var swiftCodeAnswers = [
         { type: "DECLARATION_KEYWORD",        value: "var" },
         { type: "IDENTIFIER",                 value: "resolutionHeight" },
         { type: "OPERATOR",                   value: "=" },
         { type: "NUMBER",                     value: "480" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "DECLARATION_KEYWORD",        value: "struct" },
         { type: "IDENTIFIER",                 value: "Resolution" },
         { type: "STRUCT_DEFINITION_START",    value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "DECLARATION_KEYWORD",        value: "var" },
         { type: "IDENTIFIER",                 value: "width" },
         { type: "OPERATOR",                   value: "=" },
         { type: "NUMBER",                     value: "0" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "DECLARATION_KEYWORD",        value: "var" },
         { type: "IDENTIFIER",                 value: "height" },
         { type: "OPERATOR",                   value: "=" },
         { type: "NUMBER",                     value: "0" },
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "STRUCT_DEFINITION_END",      value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},
         { type: "TERMINATOR",                 value: "\\n"},
         
         { type: "DECLARATION_KEYWORD",        value: "let" },
         { type: "IDENTIFIER",                 value: "someResolution" },
         { type: "OPERATOR",                   value: "=" },
         { type: "IDENTIFIER",                 value: "Resolution" },
         { type: "INITIALIZATION_START",       value: "(" }, 
         { type: "IDENTIFIER",                 value: "width" },
         { type: "PUNCTUATION",                value: ":" },
         
         { type: "PUNCTUATION",                value: "(" },
         { type: "PUNCTUATION",                value: "(" },
         { type: "NUMBER",                     value: "50" },
         { type: "OPERATOR",                   value: "*" },
         { type: "NUMBER",                     value: "2" },
         { type: "PUNCTUATION",                value: ")" },
         { type: "OPERATOR",                   value: "*" },
         { type: "NUMBER",                     value: "6" },
         { type: "PUNCTUATION",                value: ")" },
         { type: "OPERATOR",                   value: "+" },
         { type: "NUMBER",                     value: "40" },

         { type: "PUNCTUATION",                value: "," },
         { type: "IDENTIFIER",                 value: "height" },
         { type: "PUNCTUATION",                value: ":" },
         { type: "IDENTIFIER",                 value: "resolutionHeight" },
         { type: "INITIALIZATION_END",         value: ")" }, 
         { type: "TERMINATOR",                 value: "EOF"}
        ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

