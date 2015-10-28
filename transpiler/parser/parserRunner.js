var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var makeParse = require('./parser');

var expected = {
  "type": "Program",
  "body": [],
  "sourceType": "module"
};
var tokenStream = [
  { type: "COMMENT_START", value: "//"},
  { type: "COMMENT", value: " function body goes here"},
  { type: "TERMINATOR", value: "\\n"},
  { type: "COMMENT_START", value: "//"},
  { type: "COMMENT", value: " firstParameterName and secondParameterName refer to"},
  { type: "TERMINATOR", value: "\\n"},
  { type: "COMMENT_START", value: "//"},
  { type: "COMMENT", value: " the argument values for the first and second parameters"},
  { type: "TERMINATOR", value: "\\n"},
  { type: "TERMINATOR", value: "EOF"}
];
var parser = makeParse();

/**
 * First time
 */

var actual = parser(tokenStream);

console.log("############################");
console.log("############################");
console.log("##### BEGIN AST OUTPUT #####");
console.log(util.inspect(actual, {
  colors: true,
  depth: null
}));
console.log("############################");
console.log("############################");
console.log("############################");
console.log(util.inspect(expected, {
  colors: true,
  depth: null
}));
console.log("############################");
console.log("############################");
console.log("########## DIFF ############");
var dfrnc = diff(actual,expected);
console.log(dfrnc);

