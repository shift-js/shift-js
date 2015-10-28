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
            "name": "diceRoll"
          },
          "init": {
            "type": "Literal",
            "value": 6,
            "raw": "6"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "BinaryExpression",
        "operator": "==",
        "left": {
          "type": "UpdateExpression",
          "operator": "++",
          "argument": {
            "type": "Identifier",
            "name": "diceRoll"
          },
          "prefix": true
        },
        "right": {
          "type": "Literal",
          "value": 7,
          "raw": "7"
        }
      }
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "diceRoll" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "6" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "+" },
  { type: "IDENTIFIER",           value: "diceRoll" },
  { type: "OPERATOR",             value: "=" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "7" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "EOF"}
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

