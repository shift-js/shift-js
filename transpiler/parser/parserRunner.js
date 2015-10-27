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
            "name": "f"
          },
          "init": {
            "type": "Literal",
            "value": true,
            "raw": "true"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "IfStatement",
      "test": {
        "type": "UnaryExpression",
        "operator": "!",
        "argument": {
          "type": "Identifier",
          "name": "f"
        },
        "prefix": true
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
                "name": "f"
              },
              "right": {
                "type": "Literal",
                "value": true,
                "raw": "true"
              }
            }
          }
        ]
      },
      "alternate": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "Identifier",
                "name": "f"
              },
              "right": {
                "type": "Literal",
                "value": false,
                "raw": "false"
              }
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
  { type: "IDENTIFIER",           value: "f" },
  { type: "OPERATOR",             value: "=" },
  { type: "BOOLEAN",              value: "true" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "OPERATOR",             value: "!" },
  { type: "IDENTIFIER",           value: "f" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "IDENTIFIER",           value: "f" },
  { type: "OPERATOR",             value: "=" },
  { type: "BOOLEAN",              value: "true" },
  { type: "PUNCTUATION",          value: "}" },
  { type: "STATEMENT_KEYWORD",    value: "else" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "IDENTIFIER",           value: "f" },
  { type: "OPERATOR",             value: "=" },
  { type: "BOOLEAN",              value: "false" },
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

