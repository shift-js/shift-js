var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`class Medley {
                          var a = 1
                          var b = "hai, world"
                          let c = true
                          /* Comment 1 
                          
                          */ var d = 1 // Comment 2
                          var e = ["Eggs", "Milk", "Bacon"];
                          var f = ["one": 1, "two": 2, "three": 3]
                          let http200Status = (statusCode: 200, description: "OK")
                          var g = 5 + 6 / 4 - (-16 % 4.2) * 55
                          let h = 6 != 9
                          var i = "Stephen" + " " + "Tabor" + "!"
                      }`;
     
var swiftCodeAnswers = [
          { type: "DECLARATION_KEYWORD",        value: "class" },
          { type: "IDENTIFIER",                 value: "Medley" },
          { type: "CLASS_DEFINITION_START",     value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "a" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "1" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "b" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "hai, world" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "c" },
          { type: "OPERATOR",                   value: "=" },
          { type: "BOOLEAN",                    value: "true" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "MULTI_LINE_COMMENT_START",   value: "/*"},
          { type: "COMMENT",                    value: " Comment 1 "},
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "MULTI_LINE_COMMENT_END",     value: "*/"},
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "d" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "1" },
          { type: "COMMENT_START",              value: "//"},
          { type: "COMMENT",                    value: " Comment 2"},
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "e" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "[" },
          { type: "STRING",                     value: "Eggs" },
          { type: "PUNCTUATION",                value: "," },
          { type: "STRING",                     value: "Milk" },
          { type: "PUNCTUATION",                value: "," },
          { type: "STRING",                     value: "Bacon" },
          { type: "ARRAY_END",                  value: "]" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "f" },
          { type: "OPERATOR",                   value: "=" },
          { type: "DICTIONARY_START",           value: "[" },
          { type: "STRING",                     value: "one" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "1" },
          { type: "PUNCTUATION",                value: "," },
          { type: "STRING",                     value: "two" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "2" },
          { type: "PUNCTUATION",                value: "," },
          { type: "STRING",                     value: "three" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "3" },
          { type: "DICTIONARY_END",             value: "]" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "http200Status" },
          { type: "OPERATOR",                   value: "=" },
          { type: "TUPLE_START",                value: "("},
          { type: "TUPLE_ELEMENT_NAME",         value: "statusCode"},
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "200"},
          { type: "PUNCTUATION",                value: "," },
          { type: "TUPLE_ELEMENT_NAME",         value: "description"},
          { type: "PUNCTUATION",                value: ":" },
          { type: "STRING",                     value: "OK"},
          { type: "TUPLE_END",                  value: ")"},
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "g" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "5" },
          { type: "OPERATOR",                   value: "+" },
          { type: "NUMBER",                     value: "6" },
          { type: "OPERATOR",                   value: "/" },
          { type: "NUMBER",                     value: "4" },
          { type: "OPERATOR",                   value: "-" },
          { type: "PUNCTUATION",                value: "(" },
          { type: "OPERATOR",                   value: "-" },
          { type: "NUMBER",                     value: "16" },
          { type: "OPERATOR",                   value: "%" },
          { type: "NUMBER",                     value: "4.2" },
          { type: "PUNCTUATION",                value: ")" },
          { type: "OPERATOR",                   value: "*" },
          { type: "NUMBER",                     value: "55" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "h" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "6" },
          { type: "OPERATOR",                   value: "!" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "9" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "i" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "Stephen" },
          { type: "OPERATOR",                   value: "+" },
          { type: "STRING",                     value: " " },
          { type: "OPERATOR",                   value: "+" },
          { type: "STRING",                     value: "Tabor" },
          { type: "OPERATOR",                   value: "+" },
          { type: "STRING",                     value: "!" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "CLASS_DEFINITION_END",       value: "}" },
          { type: "TERMINATOR",                 value: "EOF"}
        ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

