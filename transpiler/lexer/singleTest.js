var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`class VideoMode {
                                var interlaced = false
                                var frameRate = 0.0
                            }
                            struct Resolution {
                                var width = 0
                                var height = 0
                            }`;
     
var swiftCodeAnswers = [
          { type: "DECLARATION_KEYWORD",        value: "class" },
          { type: "IDENTIFIER",                 value: "VideoMode" },
          { type: "CLASS_DEFINITION_START",     value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "interlaced" },
          { type: "OPERATOR",                   value: "=" },
          { type: "BOOLEAN",                    value: "false" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "frameRate" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "0.0" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "CLASS_DEFINITION_END",       value: "}" },
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
          { type: "TERMINATOR",                 value: "EOF"}
        ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

