var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`var name: String = "Joe"; var age: Int = 45;`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",  value: "var" },
   { type: "IDENTIFIER",           value: "name" },
   { type: "PUNCTUATION",          value: ":" },
   { type: "TYPE_STRING",          value: "String"},
   { type: "OPERATOR",             value: "=" },
   { type: "STRING",               value: "Joe" },
   { type: "PUNCTUATION",          value: ";" },
   { type: "DECLARATION_KEYWORD",  value: "var" },
   { type: "IDENTIFIER",           value: "age" },
   { type: "PUNCTUATION",          value: ":" },
   { type: "TYPE_NUMBER",          value: "Int"},
   { type: "OPERATOR",             value: "=" },
   { type: "NUMBER",               value: "45" },
   { type: "PUNCTUATION",          value: ";" },
   { type: "TERMINATOR",           value: "EOF" }
];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

