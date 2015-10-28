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
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "value": false,
            "raw": "false"
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "b"
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
      "type": "IfStatement",
      "test": {
        "type": "Identifier",
        "name": "a"
      },
      "consequent": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "UpdateExpression",
              "operator": "++",
              "argument": {
                "type": "Identifier",
                "name": "b"
              },
              "prefix": false
            }
          }
        ]
      },
      "alternate": null
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "BOOLEAN",              value: "false" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "b" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "PUNCTUATION",          value: "(" },
  { type: "IDENTIFIER",           value: "a" },
  { type: "PUNCTUATION",          value: ")" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "b" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "+" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "PUNCTUATION",          value: "}" },
  { type: "TERMINATOR",           value: "EOF"},
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

