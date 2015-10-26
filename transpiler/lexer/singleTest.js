var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;


var swiftCode = String.raw`var empty = [String:UInt16]();`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",        value: "var" },
    { type: "IDENTIFIER",                 value: "empty" },
    { type: "OPERATOR",                   value: "=" },
    { type: "DICTIONARY_START",           value: "["},
    { type: "TYPE_STRING",                value: "String"},
    { type: "PUNCTUATION",                value: ":"},
    { type: "TYPE_NUMBER",                value: "UInt16"},
    { type: "DICTIONARY_END",             value: "]"},
    { type: "INVOCATION_START",           value: "(" }, 
    { type: "INVOCATION_END",             value: ")" },
    { type: "PUNCTUATION",                value: ";"},
    { type: "TERMINATOR",                 value: "EOF" }
  ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

