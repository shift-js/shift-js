var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var makeParse = require('./parser');

var expected = {
  "type": "Program",
  "sourceType": "module",
  "body": []
};
var tokenStream = [
  { type: "MULTI_LINE_COMMENT_START", value: "/*"},
  { type: "TERMINATOR", value: "\\n"},
  { type: "COMMENT", value: "Comment 1"},

  { type: "TERMINATOR", value: "\\n"},
  { type: "COMMENT", value: "Comment 2"},
  { type: "TERMINATOR", value: "\\n"},

  { type: "MULTI_LINE_COMMENT_END", value: "*/"},
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

