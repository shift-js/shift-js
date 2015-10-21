/* EDGE CASES
Reassignment of already declared variable
Checking to see if variable is already declared
"var vara = 1"
identifier full character set
'var e = ["Eggs","Milk","Bacon"]'
address nonstandard spacing in swift code (not having pretty spaces between collection items)
Don't consider unicode characters
*/

/*
TODO:

Look into order of precidence in lexing
make sure punctuations that don't have spaces surrounding them are handled properly
error handling for swift
get rid of redundant checkForWhiteSpace and checking if next is undefined
think about escaped characters: maybe documentation can specify only JS escaped characters are supported
make tests that insert random spaces and try to get them to pass
refactor tests to include inserting ;
create another diff function that doesn't take into account the position of the element
refactor the testingSuite to be more automated in lexerTests3.js
*/

// var tokens = lexer(swiftCode).tokens;

// console.log(lexer(swiftCode[0]));


var swiftCode = require("./swiftCode").swiftCode;
var swiftCodeAnswers = require("./swiftCodeAnswers").swiftCodeAnswers;
var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;

var k = 24;
console.log(lexer(swiftCode[k]));
console.log(diff(lexer(swiftCode[k]),swiftCodeAnswers[k]));
console.log(deepEqual(lexer(swiftCode[k]),swiftCodeAnswers[k]));

// var arr = [];

// for (var i = 0; i < swiftCode.length; i++) {
//   // debugger;
//   arr.push([i+1,deepEqual(lexer(swiftCode[i]),swiftCodeAnswers[i])]);
// }

// console.log(arr);
