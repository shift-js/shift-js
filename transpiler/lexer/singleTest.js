var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`var d = [1, 2]; var one = d[0];`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",        value: "var" },
    { type: "IDENTIFIER",                 value: "d" },
    { type: "OPERATOR",                   value: "=" },
    { type: "ARRAY_START",                value: "[" },
    { type: "NUMBER",                     value: "1" },
    { type: "PUNCTUATION",                value: "," },
    { type: "NUMBER",                     value: "2" },
    { type: "ARRAY_END",                  value: "]" },
    { type: "PUNCTUATION",                value: ";" },
    { type: "DECLARATION_KEYWORD",        value: "var" },
    { type: "IDENTIFIER",                 value: "one" },
    { type: "OPERATOR",                   value: "=" },
    { type: "IDENTIFIER",                 value: "d" },
    { type: "SUBSTRING_LOOKUP_START",     value: "[" },
    { type: "NUMBER",                     value: "0" },
    { type: "SUBSTRING_LOOKUP_END",       value: "]" },
    { type: "PUNCTUATION",                value: ";" },    
    { type: "TERMINATOR",                 value: "EOF"}
];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

