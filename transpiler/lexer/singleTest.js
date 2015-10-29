var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`class SuperClass {
                              var a = 0
                              var b = 1
                              func incrementA() {
                                  ++a
                              }
                              static func returnTen() -> Int {
                                  return 10
                              }
                              final func returnString() -> String {
                                  return "my string"
                              }
                          }

                          class SubClass: SuperClass {
                              override func incrementA() {
                                  a++
                              }
                          }`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",        value: "class" },
    { type: "IDENTIFIER",                 value: "SuperClass" },
    { type: "CLASS_DEFINITION_START",     value: "{" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "DECLARATION_KEYWORD",        value: "var" },
    { type: "IDENTIFIER",                 value: "a" },
    { type: "OPERATOR",                   value: "=" },
    { type: "NUMBER",                     value: "0" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "DECLARATION_KEYWORD",        value: "var" },
    { type: "IDENTIFIER",                 value: "b" },
    { type: "OPERATOR",                   value: "=" },
    { type: "NUMBER",                     value: "1" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "DECLARATION_KEYWORD",        value: "func"},
    { type: "IDENTIFIER",                 value: "incrementA" },
    { type: "PARAMS_START",               value: "(" },
    { type: "PARAMS_END",                 value: ")" }, 
    { type: "STATEMENTS_START",           value: "{" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "OPERATOR",                   value: "+" },
    { type: "OPERATOR",                   value: "+" },
    { type: "IDENTIFIER",                 value: "a" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "STATEMENTS_END",             value: "}" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "DECLARATION_KEYWORD",        value: "static"},
    { type: "DECLARATION_KEYWORD",        value: "func"},
    { type: "IDENTIFIER",                 value: "returnTen" },
    { type: "PARAMS_START",               value: "(" },
    { type: "PARAMS_END",                 value: ")" }, 
    { type: "RETURN_ARROW",               value: "->" },
    { type: "TYPE_NUMBER",                value: "Int" },  
    { type: "STATEMENTS_START",           value: "{" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "STATEMENT_KEYWORD",          value: "return"},
    { type: "NUMBER",                     value: "10" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "STATEMENTS_END",             value: "}" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "final"},
    { type: "DECLARATION_KEYWORD",        value: "func"},
    { type: "IDENTIFIER",                 value: "returnString" },
    { type: "PARAMS_START",               value: "(" },
    { type: "PARAMS_END",                 value: ")" }, 
    { type: "RETURN_ARROW",               value: "->" },
    { type: "TYPE_STRING",                value: "String" },  
    { type: "STATEMENTS_START",           value: "{" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "STATEMENT_KEYWORD",          value: "return"},
    { type: "STRING",                     value: "my string" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "STATEMENTS_END",             value: "}" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "CLASS_DEFINITION_END",       value: "}" },
    { type: "TERMINATOR",                 value: "\\n"},
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "DECLARATION_KEYWORD",        value: "class" },
    { type: "IDENTIFIER",                 value: "SubClass" },
    { type: "INHERITANCE_OPERATOR",       value: ":" },
    { type: "IDENTIFIER",                 value: "SuperClass" },
    { type: "CLASS_DEFINITION_START",     value: "{" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "override"},
    { type: "DECLARATION_KEYWORD",        value: "func"},
    { type: "IDENTIFIER",                 value: "incrementA" },
    { type: "PARAMS_START",               value: "(" },
    { type: "PARAMS_END",                 value: ")" }, 
    { type: "STATEMENTS_START",           value: "{" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "IDENTIFIER",                 value: "a" },
    { type: "OPERATOR",                   value: "+" },
    { type: "OPERATOR",                   value: "+" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "STATEMENTS_END",             value: "}" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "CLASS_DEFINITION_END",       value: "}" },
    { type: "TERMINATOR",                 value: "EOF"}
];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

