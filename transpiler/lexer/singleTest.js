var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`var tup = ("one", two: 2); var one = tup.0; var two = tup.1; var twoRedux = tup.two;`;
     
var swiftCodeAnswers = [
   { type: "DECLARATION_KEYWORD",            value: "var" },
   { type: "IDENTIFIER",                     value: "tup" },
   { type: "OPERATOR",                       value: "=" },
   { type: "TUPLE_START",                    value: "("},
   { type: "STRING",                         value: "one"},
   { type: "PUNCTUATION",                    value: "," },
   { type: "TUPLE_ELEMENT_NAME",             value: "two"},
   { type: "PUNCTUATION",                    value: ":" },
   { type: "NUMBER",                         value: "2"},
   { type: "TUPLE_END",                      value: ")"},
   { type: "PUNCTUATION",                    value: ";" },

   { type: "DECLARATION_KEYWORD",            value: "var" },
   { type: "IDENTIFIER",                     value: "one" },    
   { type: "OPERATOR",                       value: "=" },
   { type: "IDENTIFIER",                     value: "tup" },
   { type: "DOT_SYNTAX",                     value: "." },
   { type: "NUMBER",                         value: "0"},
   { type: "PUNCTUATION",                    value: ";" },
   
   { type: "DECLARATION_KEYWORD",            value: "var" },
   { type: "IDENTIFIER",                     value: "two" },    
   { type: "OPERATOR",                       value: "=" },
   { type: "IDENTIFIER",                     value: "tup" },
   { type: "DOT_SYNTAX",                     value: "." },
   { type: "NUMBER",                         value: "1"},
   { type: "PUNCTUATION",                    value: ";" },
   
   { type: "DECLARATION_KEYWORD",            value: "var" },
   { type: "IDENTIFIER",                     value: "twoRedux" },    
   { type: "OPERATOR",                       value: "=" },
   { type: "IDENTIFIER",                     value: "tup" },
   { type: "DOT_SYNTAX",                     value: "." },
   { type: "TUPLE_ELEMENT_NAME",             value: "two"},
   { type: "PUNCTUATION",                    value: ";" },
   { type: "TERMINATOR",                     value: "EOF" }

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

