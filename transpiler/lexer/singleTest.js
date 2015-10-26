var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;


var swiftCode = String.raw`func sayHello(var firstName: String, var lastName: String) -> String {
    func giveString() -> String {
      return firstName + " " + lastName
    }
    return giveString()
}`;
     
var swiftCodeAnswers = [
  { type: "DECLARATION_KEYWORD",  value: "func"},
  { type: "IDENTIFIER",           value: "sayHello" },
  { type: "PARAMS_START",         value: "(" },
  { type: "DECLARATION_KEYWORD",  value: "var"},
  { type: "IDENTIFIER",           value: "firstName" },
  { type: "PUNCTUATION",          value: ":" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "PUNCTUATION",          value: "," },
  { type: "DECLARATION_KEYWORD",  value: "var"},
  { type: "IDENTIFIER",           value: "lastName" },
  { type: "PUNCTUATION",          value: ":" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "PARAMS_END",           value: ")" }, 
  { type: "RETURN_ARROW",         value: "->" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "STATEMENTS_START",     value: "{" },  
  { type: "TERMINATOR",           value: "\\n"},

  { type: "DECLARATION_KEYWORD",  value: "func"},
  { type: "IDENTIFIER",           value: "giveString" },
  { type: "PARAMS_START",         value: "(" },
  { type: "PARAMS_END",           value: ")" }, 
  { type: "RETURN_ARROW",         value: "->" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "STATEMENTS_START",     value: "{" },  
  { type: "TERMINATOR",           value: "\\n"},  

  { type: "STATEMENT_KEYWORD",    value: "return"}, 
  { type: "IDENTIFIER",           value: "firstName" },
  { type: "OPERATOR",             value: "+" },
  { type: "STRING",               value: " " },
  { type: "OPERATOR",             value: "+" },
  { type: "IDENTIFIER",           value: "lastName" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENTS_END",       value: "}" },  
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "return"}, 
  { type: "IDENTIFIER",           value: "giveString" },
  { type: "INVOCATION_START",     value: "(" }, 
  { type: "INVOCATION_END",       value: ")" },   
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENTS_END",       value: "}" },  
  { type: "TERMINATOR",           value: "EOF"}
];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

