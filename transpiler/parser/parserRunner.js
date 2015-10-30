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
            "name": "e"
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
      "type": "IfStatement",
      "test": {
        "type": "BinaryExpression",
        "operator": "==",
        "left": {
          "type": "BinaryExpression",
          "operator": "+",
          "left": {
            "type": "Identifier",
            "name": "e"
          },
          "right": {
            "type": "Literal",
            "value": 1,
            "raw": "1"
          }
        },
        "right": {
          "type": "Literal",
          "value": 2,
          "raw": "2"
        }
      },
      "consequent": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "Identifier",
                "name": "e"
              },
              "right": {
                "type": "Literal",
                "value": 5,
                "raw": "5"
              }
            }
          }
        ]
      },
      "alternate": null
    },
    {
      "type": "EmptyStatement"
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "e" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "1" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "PUNCTUATION",          value: "(" },
  { type: "IDENTIFIER",           value: "e" },
  { type: "OPERATOR",             value: "+" },
  { type: "NUMBER",               value: "1" },
  { type: "PUNCTUATION",          value: ")" },
  { type: "OPERATOR",             value: "=" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "2" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "IDENTIFIER",           value: "e" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "5" },
  { type: "PUNCTUATION",          value: "}" },
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

var escodegen = require('escodegen');

//console.log('JSJSJSJSJSJSJSJSJSJSJSJSJSJSJS');
//console.log(escodegen.generate(expected));
//console.log('JSJSJSJSJSJSJSJSJSJSJSJSJSJSJS');