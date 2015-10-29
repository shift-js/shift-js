var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var swiftCode = String.raw`let justOverOneMillion = 1_000_000.000_000_1`;
     
var swiftCodeAnswers = [
    { type: "DECLARATION_KEYWORD",        value: "let" },
    { type: "IDENTIFIER",                 value: "justOverOneMillion" },
    { type: "OPERATOR",                   value: "=" },
    { type: "NUMBER",                     value: "1000000.0000001" },
    { type: "TERMINATOR",                 value: "EOF" }
];

var ans = lexer(swiftCode);
var i = 0;
var mapped = ans.map(function(obj){
    obj['index'] = i;
    i++;
    return obj;
});
console.log(mapped);
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

