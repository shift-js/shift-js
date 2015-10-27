var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`let start = 0; let end = 10; let range = start..<end; let fullRange = start...end;`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",            value: "let" },
    { type: "IDENTIFIER",                 value: "start" },
    { type: "OPERATOR",                   value: "=" },
    { type: "NUMBER",                     value: "0" },
    { type: "PUNCTUATION",                value: ";" },
    { type: "DECLARATION_KEYWORD",        value: "let" },
    { type: "IDENTIFIER",                 value: "end" },
    { type: "OPERATOR",                   value: "=" },
    { type: "NUMBER",                     value: "10" },
    { type: "PUNCTUATION",                value: ";" },
    { type: "DECLARATION_KEYWORD",        value: "let" },
    { type: "IDENTIFIER",                 value: "range" },
    { type: "OPERATOR",                   value: "=" },
    { type: "IDENTIFIER",                 value: "start" },
    { type: "HALF-OPEN_RANGE",            value: "..<" },
    { type: "IDENTIFIER",                 value: "end" },
    { type: "PUNCTUATION",                value: ";" },
    { type: "DECLARATION_KEYWORD",        value: "let" },
    { type: "IDENTIFIER",                 value: "fullRange" },
    { type: "OPERATOR",                   value: "=" },
    { type: "IDENTIFIER",                 value: "start" },
    { type: "CLOSED_RANGE",               value: "..." },
    { type: "IDENTIFIER",                 value: "end" },
    { type: "PUNCTUATION",                value: ";" },
    { type: "TERMINATOR",                 value: "EOF"}
  ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

