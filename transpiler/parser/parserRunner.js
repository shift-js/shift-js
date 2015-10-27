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
            "value": 0,
            "raw": "0"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "ForStatement",
      "init": {
        "type": "VariableDeclaration",
        "declarations": [
          {
            "type": "VariableDeclarator",
            "id": {
              "type": "Identifier",
              "name": "i"
            },
            "init": {
              "type": "Literal",
              "value": 10,
              "raw": "10"
            }
          }
        ],
        "kind": "var"
      },
      "test": {
        "type": "BinaryExpression",
        "operator": ">",
        "left": {
          "type": "Identifier",
          "name": "i"
        },
        "right": {
          "type": "Literal",
          "value": 0,
          "raw": "0"
        }
      },
      "update": {
        "type": "UpdateExpression",
        "operator": "--",
        "argument": {
          "type": "Identifier",
          "name": "i"
        },
        "prefix": false
      },
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "UpdateExpression",
              "operator": "++",
              "argument": {
                "type": "Identifier",
                "name": "a"
              },
              "prefix": false
            }
          }
        ]
      }
    },
    {
      "type": "EmptyStatement"
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "for" },
  { type: "PUNCTUATION",          value: "(" },
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "10" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: ">" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "-" },
  { type: "OPERATOR",             value: "-" },
  { type: "PUNCTUATION",          value: ")" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "+" },
  { type: "PUNCTUATION",          value: "}" },
  { type: "PUNCTUATION",          value: ";" },
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

