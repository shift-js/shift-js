var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;


var swiftCode = String.raw`func greet(name: String, day: String) -> String {
                        return "Hello \(name), today is \(day)."
                    }
                    greet("Bob", day: "Tuesday")`;
     
var swiftCodeAnswers = [
  { type: "DECLARATION_KEYWORD",        value: "func"},
  { type: "IDENTIFIER",                 value: "greet" },
  { type: "PARAMS_START",               value: "(" },
  { type: "IDENTIFIER",                 value: "name" },
  { type: "PUNCTUATION",                value: ":" }, 
  { type: "TYPE_STRING",                value: "String" }, 
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "day" },
  { type: "PUNCTUATION",                value: ":" }, 
  { type: "TYPE_STRING",                value: "String" }, 
  { type: "PARAMS_END",                 value: ")" }, 
  { type: "RETURN_ARROW",               value: "->" }, 
  { type: "TYPE_STRING",                value: "String" }, 
  { type: "STATEMENTS_START",           value: "{" },  
  { type: "TERMINATOR",                 value: "\\n"},
  { type: "STATEMENT_KEYWORD",          value: "return"},
  { type: "STRING",                     value: "Hello " },
  { type: "STRING_INTERPOLATION_START", value: "\\(" },
  { type: "IDENTIFIER",                 value: "name" },
  { type: "STRING_INTERPOLATION_END",   value: ")" },
  { type: "STRING",                     value: ", today is " },
  { type: "STRING_INTERPOLATION_START", value: "\\(" },
  { type: "IDENTIFIER",                 value: "day" },
  { type: "STRING_INTERPOLATION_END",   value: ")" },
  { type: "STRING",                     value: "." },
  { type: "TERMINATOR",                 value: "\\n"},
  { type: "STATEMENTS_END",             value: "}" },
  { type: "IDENTIFIER",                 value: "greet" },
  { type: "INVOCATION_START",           value: "(" }, 
  { type: "STRING",                     value: "Bob" },   
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "day" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "STRING",                     value: "Tuesday" },   
  { type: "INVOCATION_END",             value: ")" }, 
  { type: "TERMINATOR",                 value: "EOF"}
];


console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

