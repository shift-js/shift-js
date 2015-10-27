var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`func nameAndAge( var name: String, var age: Int) -> (name: String, age: Int) {
                          return (name, age)
                      }
                      let person = nameAndAge("Steve", age: 45)`;
     
var swiftCodeAnswers = [
          { type: "DECLARATION_KEYWORD",        value: "func"},
          { type: "IDENTIFIER",                 value: "nameAndAge" },
          { type: "PARAMS_START",               value: "(" },
          { type: "DECLARATION_KEYWORD",        value: "var"},
          { type: "IDENTIFIER",                 value: "name" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_STRING",                value: "String" },
          { type: "PUNCTUATION",                value: "," },
          { type: "DECLARATION_KEYWORD",        value: "var"}, 
          { type: "IDENTIFIER",                 value: "age" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_NUMBER",                value: "Int" }, 
          { type: "PARAMS_END",                 value: ")" }, 
          
          { type: "RETURN_ARROW",               value: "->" },
          
          { type: "TUPLE_START",                value: "(" },
          { type: "TUPLE_ELEMENT_NAME",         value: "name" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_STRING",                value: "String" },
          { type: "PUNCTUATION",                value: "," }, 
          { type: "TUPLE_ELEMENT_NAME",         value: "age" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_NUMBER",                value: "Int" }, 
          { type: "TUPLE_END",                  value: ")" }, 
          { type: "STATEMENTS_START",           value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENT_KEYWORD",          value: "return"},
          { type: "TUPLE_START",                value: "("},
          { type: "IDENTIFIER",                 value: "name" },
          { type: "PUNCTUATION",                value: "," }, 
          { type: "IDENTIFIER",                 value: "age" },
          { type: "TUPLE_END",                  value: ")"},
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENTS_END",             value: "}" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "let"},
          { type: "IDENTIFIER",                 value: "person" },
          { type: "OPERATOR",                   value: "=" }, 
          { type: "IDENTIFIER",                 value: "nameAndAge" },
          { type: "INVOCATION_START",           value: "(" }, 
          { type: "STRING",                     value: "Steve" },   
          { type: "PUNCTUATION",                value: "," },
          { type: "IDENTIFIER",                 value: "age" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "45" },   
          { type: "INVOCATION_END",             value: ")" }, 
          { type: "TERMINATOR",                 value: "EOF"}
        ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

