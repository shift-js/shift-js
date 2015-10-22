/* EDGE CASES
Reassignment of already declared variable
Checking to see if variable is already declared
"var vara = 1"
identifier full character set
'var e = ["Eggs","Milk","Bacon"]'
address nonstandard spacing in swift code (not having pretty spaces between collection items)
*/

/*
TODO:

Look into order of precidence in lexing
make sure punctuations that don't have spaces surrounding them are handled properly
*/

// var tokens = lexer(swiftCode).tokens;

// console.log(lexer(swiftCode[0]));


var swiftCode = require("./swiftCode").swiftCode;
var swiftCodeAnswers = require("./swiftCodeAnswers").swiftCodeAnswers;
var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;

// var k = 5;
// console.log(lexer(swiftCode[k]));
// console.log(deepEqual(lexer(swiftCode[k]),swiftCodeAnswers[k]));

var arr = [];

for (var i = 0; i < swiftCode.length; i++) {
  // debugger;
  arr.push(deepEqual(lexer(swiftCode[i]),swiftCodeAnswers[i]));
}

console.log(arr);
