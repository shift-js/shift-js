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
            "name": "someFunction"
          },
          "init": {
            "type": "FunctionExpression",
            "id": null,
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
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
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "right": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "someFunction"
        },
        "arguments": [
          {
            "type": "Literal",
            "value": 5,
            "raw": "5"
          }
        ]
      }
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",  value: "func"},
  { type: "IDENTIFIER",           value: "someFunction" },
  { type: "PARAMS_START",         value: "(" },
  { type: "DECLARATION_KEYWORD",  value: "var"},
  { type: "IDENTIFIER",           value: "a" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "TYPE_NUMBER",          value: "Int" },
  { type: "PARAMS_END",           value: ")" },
  { type: "STATEMENTS_START",     value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "+" },
  { type: "NUMBER",               value: "1" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENTS_END",       value: "}"},
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "someFunction" },
  { type: "INVOCATION_START",     value: "(" },
  { type: "NUMBER",               value: "5" },
  { type: "INVOCATION_END",       value: ")" },
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

