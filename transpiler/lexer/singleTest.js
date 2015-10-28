var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`struct Counter {
                                var count = 0
                                mutating func increment() {
                                    self = Counter(count: ++count)
                                }
                            }`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",        value: "struct" },
    { type: "IDENTIFIER",                 value: "Counter" },
    { type: "STRUCT_DEFINITION_START",    value: "{" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "DECLARATION_KEYWORD",        value: "var" },
    { type: "IDENTIFIER",                 value: "count" },
    { type: "OPERATOR",                   value: "=" },
    { type: "NUMBER",                     value: "0" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "mutating"},
    { type: "DECLARATION_KEYWORD",        value: "func"},
    { type: "IDENTIFIER",                 value: "increment" },
    { type: "PARAMS_START",               value: "(" },
    { type: "PARAMS_END",                 value: ")" }, 
    { type: "STATEMENTS_START",           value: "{" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "self" },
    { type: "OPERATOR",                   value: "=" },
    { type: "IDENTIFIER",                 value: "Counter" },
    { type: "INITIALIZATION_START",       value: "(" },
    { type: "IDENTIFIER",                 value: "count" },
    { type: "PUNCTUATION",                value: ":" },
    { type: "OPERATOR",                   value: "+" },
    { type: "OPERATOR",                   value: "+" },
    { type: "IDENTIFIER",                 value: "count" },
    { type: "INITIALIZATION_END",         value: ")" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "STATEMENTS_END",             value: "}" },
    { type: "TERMINATOR",                 value: "\\n"},

    { type: "STRUCT_DEFINITION_END",      value: "}" },
    { type: "TERMINATOR",                 value: "EOF"}
];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

