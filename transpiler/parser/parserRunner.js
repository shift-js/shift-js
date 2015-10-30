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
            "name": "interestingNumbers"
          },
          "init": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "Prime",
                  "raw": "\"Prime\""
                },
                "computed": false,
                "value": {
                  "type": "ArrayExpression",
                  "elements": [
                    {
                      "type": "Literal",
                      "value": 2,
                      "raw": "2"
                    },
                    {
                      "type": "Literal",
                      "value": 3,
                      "raw": "3"
                    },
                    {
                      "type": "Literal",
                      "value": 5,
                      "raw": "5"
                    },
                    {
                      "type": "Literal",
                      "value": 7,
                      "raw": "7"
                    },
                    {
                      "type": "Literal",
                      "value": 11,
                      "raw": "11"
                    },
                    {
                      "type": "Literal",
                      "value": 13,
                      "raw": "13"
                    }
                  ]
                },
                "kind": "init",
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "Fibonacci",
                  "raw": "\"Fibonacci\""
                },
                "computed": false,
                "value": {
                  "type": "ArrayExpression",
                  "elements": [
                    {
                      "type": "Literal",
                      "value": 1,
                      "raw": "1"
                    },
                    {
                      "type": "Literal",
                      "value": 1,
                      "raw": "1"
                    },
                    {
                      "type": "Literal",
                      "value": 2,
                      "raw": "2"
                    },
                    {
                      "type": "Literal",
                      "value": 3,
                      "raw": "3"
                    },
                    {
                      "type": "Literal",
                      "value": 5,
                      "raw": "5"
                    },
                    {
                      "type": "Literal",
                      "value": 8,
                      "raw": "8"
                    }
                  ]
                },
                "kind": "init",
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "Square",
                  "raw": "\"Square\""
                },
                "computed": false,
                "value": {
                  "type": "ArrayExpression",
                  "elements": [
                    {
                      "type": "Literal",
                      "value": 1,
                      "raw": "1"
                    },
                    {
                      "type": "Literal",
                      "value": 4,
                      "raw": "4"
                    },
                    {
                      "type": "Literal",
                      "value": 9,
                      "raw": "9"
                    },
                    {
                      "type": "Literal",
                      "value": 16,
                      "raw": "16"
                    },
                    {
                      "type": "Literal",
                      "value": 25,
                      "raw": "25"
                    }
                  ]
                },
                "kind": "init",
                "method": false,
                "shorthand": false
              }
            ]
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
            "name": "largest"
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
      "type": "ForInStatement",
      "left": {
        "type": "VariableDeclaration",
        "declarations": [
          {
            "type": "VariableDeclarator",
            "id": {
              "type": "Identifier",
              "name": "kind"
            },
            "init": null
          }
        ],
        "kind": "var"
      },
      "right": {
        "type": "Identifier",
        "name": "interestingNumbers"
      },
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "numbers"
                },
                "init": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                    "type": "Identifier",
                    "name": "interestingNumbers"
                  },
                  "property": {
                    "type": "Identifier",
                    "name": "kind"
                  }
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "ForInStatement",
            "left": {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "number"
                  },
                  "init": null
                }
              ],
              "kind": "var"
            },
            "right": {
              "type": "Identifier",
              "name": "numbers"
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "IfStatement",
                  "test": {
                    "type": "BinaryExpression",
                    "operator": ">",
                    "left": {
                      "type": "Identifier",
                      "name": "number"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "largest"
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
                            "name": "largest"
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "number"
                          }
                        }
                      }
                    ]
                  },
                  "alternate": null
                }
              ]
            },
            "each": false
          }
        ]
      },
      "each": false
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: 'DECLARATION_KEYWORD',         value: 'let' },
  { type: 'IDENTIFIER',                  value: 'interestingNumbers' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'DICTIONARY_START',            value: '[' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STRING',                      value: 'Prime' },
  { type: 'PUNCTUATION',                 value: ':' },
  { type: 'ARRAY_START',                 value: '[' },
  { type: 'NUMBER',                      value: '2' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '3' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '5' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '7' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '11' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '13' },
  { type: 'ARRAY_END',                   value: ']' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STRING',                      value: 'Fibonacci' },
  { type: 'PUNCTUATION',                 value: ':' },
  { type: 'ARRAY_START',                 value: '[' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '2' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '3' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '5' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '8' },
  { type: 'ARRAY_END',                   value: ']' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STRING',                      value: 'Square' },
  { type: 'PUNCTUATION',                 value: ':' },
  { type: 'ARRAY_START',                 value: '[' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '4' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '9' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '16' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '25' },
  { type: 'ARRAY_END',                   value: ']' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'DICTIONARY_END',              value: ']' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: "DECLARATION_KEYWORD",         value: "var" },
  { type: "IDENTIFIER",                  value: "largest" },
  { type: "OPERATOR",                    value: "=" },
  { type: "NUMBER",                      value: "0" },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: "STATEMENT_KEYWORD",           value: "for" },
  { type: 'PUNCTUATION',                 value: '(' },
  { type: "IDENTIFIER",                  value: "kind" },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: "IDENTIFIER",                  value: "numbers" },
  { type: 'PUNCTUATION',                 value: ')' },
  { type: "STATEMENT_KEYWORD",           value: "in" },
  { type: "IDENTIFIER",                  value: "interestingNumbers" },
  { type: "PUNCTUATION",                 value: "{" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "STATEMENT_KEYWORD",           value: "for" },
  { type: "IDENTIFIER",                  value: "number" },
  { type: "STATEMENT_KEYWORD",           value: "in" },
  { type: "IDENTIFIER",                  value: "numbers" },
  { type: "PUNCTUATION",                 value: "{" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "STATEMENT_KEYWORD",           value: "if" },
  { type: "IDENTIFIER",                  value: "number" },
  { type: "OPERATOR",                    value: ">" },
  { type: "IDENTIFIER",                  value: "largest" },
  { type: "PUNCTUATION",                 value: "{" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "IDENTIFIER",                  value: "largest" },
  { type: "OPERATOR",                    value: "=" },
  { type: "IDENTIFIER",                  value: "number" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "PUNCTUATION",                 value: "}" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "PUNCTUATION",                 value: "}" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "PUNCTUATION",                 value: "}" },
  { type: "TERMINATOR",                  value: "EOF"},
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