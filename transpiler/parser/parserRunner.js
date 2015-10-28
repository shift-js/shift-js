var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var makeParse = require('./parser');

var expected = {
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "empty"
          },
          "init": {
            "type": "ObjectExpression",
            "properties": []
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",        value: "var" },
  { type: "IDENTIFIER",                 value: "empty" },
  { type: "OPERATOR",                   value: "=" },
  { type: "DICTIONARY_START",           value: "["},
  { type: "PUNCTUATION",                value: ":"},
  { type: "DICTIONARY_END",             value: "]"},
  { type: "TERMINATOR",                 value: "EOF" }
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

