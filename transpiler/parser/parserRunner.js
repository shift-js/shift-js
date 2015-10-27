var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var make_parse = require('./parser');

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
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "value": 1,
            "raw": "1"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "operator": "=",
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "right": {
          "type": "Literal",
          "value": 2,
          "raw": "2"
        }
      }
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "1" },
  { type: "PUNCTUATION",          value: ";"},
  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "2" },
  { type: "TERMINATOR",           value: "EOF"}
];
var parser = make_parse();

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

