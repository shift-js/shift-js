var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`class ParentClass {
                                static func returnTen() -> Int {
                                    return 10
                                }
                                class func returnString() -> String {
                                    return "my string"
                                }
                            }
                            ParentClass.returnTen()
                            ParentClass.returnString()`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",        value: "class" },
    { type: "IDENTIFIER",                 value: "ParentClass" },
    { type: "CLASS_DEFINITION_START",     value: "{" },
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
    
    { type: "DECLARATION_KEYWORD",        value: "class"},
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
    
    { type: "IDENTIFIER",                 value: "ParentClass" },
    { type: "DOT_SYNTAX",                 value: "." },
    { type: "IDENTIFIER",                 value: "returnTen" },
    { type: "INVOCATION_START",           value: "(" },
    { type: "INVOCATION_END",             value: ")" },
    { type: "TERMINATOR",                 value: "\\n"},
    
    { type: "IDENTIFIER",                 value: "ParentClass" },
    { type: "DOT_SYNTAX",                 value: "." },
    { type: "IDENTIFIER",                 value: "returnString" },
    { type: "INVOCATION_START",           value: "(" },
    { type: "INVOCATION_END",             value: ")" },
    { type: "TERMINATOR",                 value: "EOF"}
];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

