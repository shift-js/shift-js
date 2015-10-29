var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`var firstBase, secondBase, thirdBase: String`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "firstBase" },
        { type: "PUNCTUATION",          value: "," },
        { type: "IDENTIFIER",           value: "secondBase" },
        { type: "PUNCTUATION",          value: "," },
        { type: "IDENTIFIER",           value: "thirdBase" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String"},
        { type: "TERMINATOR",           value: "EOF" }
];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

