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
            "name": "arrays"
          },
          "init": {
            "type": "ArrayExpression",
            "elements": [
              {
                "type": "ArrayExpression",
                "elements": [
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
                  }
                ]
              },
              {
                "type": "ArrayExpression",
                "elements": [
                  {
                    "type": "Literal",
                    "value": 4,
                    "raw": "4"
                  },
                  {
                    "type": "Literal",
                    "value": 5,
                    "raw": "5"
                  },
                  {
                    "type": "Literal",
                    "value": 6,
                    "raw": "6"
                  }
                ]
              },
              {
                "type": "ArrayExpression",
                "elements": [
                  {
                    "type": "Literal",
                    "value": 7,
                    "raw": "7"
                  },
                  {
                    "type": "Literal",
                    "value": 8,
                    "raw": "8"
                  },
                  {
                    "type": "Literal",
                    "value": 9,
                    "raw": "9"
                  }
                ]
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
            "name": "total"
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
              "value": 0,
              "raw": "0"
            }
          }
        ],
        "kind": "var"
      },
      "test": {
        "type": "BinaryExpression",
        "operator": "<",
        "left": {
          "type": "Identifier",
          "name": "i"
        },
        "right": {
          "type": "Literal",
          "value": 3,
          "raw": "3"
        }
      },
      "update": {
        "type": "UpdateExpression",
        "operator": "++",
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
            "type": "ForStatement",
            "init": {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "j"
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
            "test": {
              "type": "BinaryExpression",
              "operator": "<",
              "left": {
                "type": "Identifier",
                "name": "j"
              },
              "right": {
                "type": "Literal",
                "value": 3,
                "raw": "3"
              }
            },
            "update": {
              "type": "UpdateExpression",
              "operator": "++",
              "argument": {
                "type": "Identifier",
                "name": "j"
              },
              "prefix": false
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "+=",
                    "left": {
                      "type": "Identifier",
                      "name": "total"
                    },
                    "right": {
                      "type": "MemberExpression",
                      "computed": true,
                      "object": {
                        "type": "MemberExpression",
                        "computed": true,
                        "object": {
                          "type": "Identifier",
                          "name": "arrays"
                        },
                        "property": {
                          "type": "Identifier",
                          "name": "i"
                        }
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "j"
                      }
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "arrays" },
  { type: "OPERATOR",             value: "=" },
  { type: "ARRAY_START",          value: "[" },
  { type: "ARRAY_START",          value: "[" },
  { type: "NUMBER",               value: "1" },
  { type: "PUNCTUATION",          value: "," },
  { type: "NUMBER",               value: "2" },
  { type: "PUNCTUATION",          value: "," },
  { type: "NUMBER",               value: "3" },
  { type: "ARRAY_END",            value: "]" },
  { type: "PUNCTUATION",          value: "," },
  { type: "ARRAY_START",          value: "[" },
  { type: "NUMBER",               value: "4" },
  { type: "PUNCTUATION",          value: "," },
  { type: "NUMBER",               value: "5" },
  { type: "PUNCTUATION",          value: "," },
  { type: "NUMBER",               value: "6" },
  { type: "ARRAY_END",            value: "]" },
  { type: "PUNCTUATION",          value: "," },
  { type: "ARRAY_START",          value: "[" },
  { type: "NUMBER",               value: "7" },
  { type: "PUNCTUATION",          value: "," },
  { type: "NUMBER",               value: "8" },
  { type: "PUNCTUATION",          value: "," },
  { type: "NUMBER",               value: "9" },
  { type: "ARRAY_END",            value: "]" },
  { type: "ARRAY_END",            value: "]" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "total" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "for" },
  { type: "PUNCTUATION",          value: "(" },
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "<" },
  { type: "NUMBER",               value: "3" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "+" },
  { type: "PUNCTUATION",          value: ")" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "for" },
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "j" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "IDENTIFIER",           value: "j" },
  { type: "OPERATOR",             value: "<" },
  { type: "NUMBER",               value: "3" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "IDENTIFIER",           value: "j" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "+" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "total" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "IDENTIFIER",           value: "arrays" },
  { type: "SUBSTRING_LOOKUP_START",     value: "[" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "SUBSTRING_LOOKUP_END",     value: "]" },
  { type: "SUBSTRING_LOOKUP_START",     value: "[" },
  { type: "IDENTIFIER",           value: "j" },
  { type: "SUBSTRING_LOOKUP_END",     value: "]" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "PUNCTUATION",          value: "}" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "PUNCTUATION",          value: "}" },
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

