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
            "name": "x"
          },
          "init": {
            "type": "Literal",
            "value": 2,
            "raw": "2"
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
            "name": "y"
          },
          "init": {
            "type": "Literal",
            "value": "",
            "raw": "\"\""
          }
        }
      ],
      "kind": "var"
    },
    {
      "type": "SwitchStatement",
      "discriminant": {
        "type": "Identifier",
        "name": "x"
      },
      "cases": [
        {
          "type": "SwitchCase",
          "test": {
            "type": "Literal",
            "value": 1,
            "raw": "1"
          },
          "consequent": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "AssignmentExpression",
                "operator": "+=",
                "left": {
                  "type": "Identifier",
                  "name": "y"
                },
                "right": {
                  "type": "Literal",
                  "value": "positive",
                  "raw": "\"positive\""
                }
              }
            },
            {
              "type": "BreakStatement",
              "label": null
            }
          ]
        },
        {
          "type": "SwitchCase",
          "test": {
            "type": "Literal",
            "value": 2,
            "raw": "2"
          },
          "consequent": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "AssignmentExpression",
                "operator": "+=",
                "left": {
                  "type": "Identifier",
                  "name": "y"
                },
                "right": {
                  "type": "Literal",
                  "value": "positive",
                  "raw": "\"positive\""
                }
              }
            },
            {
              "type": "BreakStatement",
              "label": null
            }
          ]
        },
        {
          "type": "SwitchCase",
          "test": {
            "type": "Literal",
            "value": 3,
            "raw": "3"
          },
          "consequent": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "AssignmentExpression",
                "operator": "+=",
                "left": {
                  "type": "Identifier",
                  "name": "y"
                },
                "right": {
                  "type": "Literal",
                  "value": "positive",
                  "raw": "\"positive\""
                }
              }
            },
            {
              "type": "BreakStatement",
              "label": null
            }
          ]
        },
        {
          "type": "SwitchCase",
          "test": {
            "type": "UnaryExpression",
            "operator": "-",
            "argument": {
              "type": "Literal",
              "value": 1,
              "raw": "1"
            },
            "prefix": true
          },
          "consequent": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "AssignmentExpression",
                "operator": "+=",
                "left": {
                  "type": "Identifier",
                  "name": "y"
                },
                "right": {
                  "type": "Literal",
                  "value": "negative",
                  "raw": "\"negative\""
                }
              }
            },
            {
              "type": "BreakStatement",
              "label": null
            }
          ]
        },
        {
          "type": "SwitchCase",
          "test": {
            "type": "UnaryExpression",
            "operator": "-",
            "argument": {
              "type": "Literal",
              "value": 2,
              "raw": "2"
            },
            "prefix": true
          },
          "consequent": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "AssignmentExpression",
                "operator": "+=",
                "left": {
                  "type": "Identifier",
                  "name": "y"
                },
                "right": {
                  "type": "Literal",
                  "value": "negative",
                  "raw": "\"negative\""
                }
              }
            },
            {
              "type": "BreakStatement",
              "label": null
            }
          ]
        },
        {
          "type": "SwitchCase",
          "test": {
            "type": "UnaryExpression",
            "operator": "-",
            "argument": {
              "type": "Literal",
              "value": 3,
              "raw": "3"
            },
            "prefix": true
          },
          "consequent": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "AssignmentExpression",
                "operator": "+=",
                "left": {
                  "type": "Identifier",
                  "name": "y"
                },
                "right": {
                  "type": "Literal",
                  "value": "negative",
                  "raw": "\"negative\""
                }
              }
            },
            {
              "type": "BreakStatement",
              "label": null
            }
          ]
        },
        {
          "type": "SwitchCase",
          "test": {
            "type": "Literal",
            "value": 0,
            "raw": "0"
          },
          "consequent": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "AssignmentExpression",
                "operator": "+=",
                "left": {
                  "type": "Identifier",
                  "name": "y"
                },
                "right": {
                  "type": "Literal",
                  "value": "zero",
                  "raw": "\"zero\""
                }
              }
            },
            {
              "type": "BreakStatement",
              "label": null
            }
          ]
        },
        {
          "type": "SwitchCase",
          "test": null,
          "consequent": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "AssignmentExpression",
                "operator": "+=",
                "left": {
                  "type": "Identifier",
                  "name": "y"
                },
                "right": {
                  "type": "Literal",
                  "value": "dunno",
                  "raw": "\"dunno\""
                }
              }
            }
          ]
        }
      ]
    }
  ],
  "sourceType": "module"
};


var tokenStream = [
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "x" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "2" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "switch" },
  { type: "IDENTIFIER",           value: "x" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "case" },


  { type: "NUMBER",               value: "1" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "positive" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "break" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "case" },
  { type: "NUMBER",               value: "2" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "positive" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "break" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},


  { type: "STATEMENT_KEYWORD",    value: "case" },
  { type: "NUMBER",               value: "3" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "positive" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "break" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},


  { type: "STATEMENT_KEYWORD",    value: "case" },
  { type: "OPERATOR",             value: "-" },
  { type: "NUMBER",               value: "1" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "negative" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "break" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},


  { type: "STATEMENT_KEYWORD",    value: "case" },
  { type: "OPERATOR",             value: "-" },
  { type: "NUMBER",               value: "2" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "negative" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "break" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},


  { type: "STATEMENT_KEYWORD",    value: "case" },
  { type: "OPERATOR",             value: "-" },
  { type: "NUMBER",               value: "3" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "negative" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "break" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "case" },
  //{ type: "OPERATOR",             value: "-" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "zero" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "break" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "default" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "dunno" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "STATEMENT_KEYWORD",    value: "break" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},

  //{ type: "TERMINATOR",           value: "\\n"},
  { type: "PUNCTUATION",          value: "}" },
  { type: "TERMINATOR",           value: "EOF"},


  //{ type: "PUNCTUATION",          value: "," },
  //{ type: "NUMBER",               value: "2" },
  //{ type: "PUNCTUATION",          value: "," },
  //{ type: "NUMBER",               value: "3" },
  //{ type: "PUNCTUATION",          value: ":" },
  //{ type: "TERMINATOR",           value: "\\n"},
  //{ type: "IDENTIFIER",           value: "y" },
  //{ type: "OPERATOR",             value: "+" },
  //{ type: "OPERATOR",             value: "=" },
  //{ type: "STRING",               value: "positive" },
  //{ type: "PUNCTUATION",          value: ";" },
  //{ type: "TERMINATOR",           value: "\\n"},
  //{ type: "STATEMENT_KEYWORD",    value: "case" },
  //{ type: "OPERATOR",             value: "-" },
  //{ type: "NUMBER",               value: "1" },
  //{ type: "PUNCTUATION",          value: "," },
  //{ type: "OPERATOR",             value: "-" },
  //{ type: "NUMBER",               value: "2" },
  //{ type: "PUNCTUATION",          value: "," },
  //{ type: "OPERATOR",             value: "-" },
  //{ type: "NUMBER",               value: "3" },
  //{ type: "PUNCTUATION",          value: ":" },
  //{ type: "TERMINATOR",           value: "\\n"},
  //{ type: "IDENTIFIER",           value: "y" },
  //{ type: "OPERATOR",             value: "+" },
  //{ type: "OPERATOR",             value: "=" },
  //{ type: "STRING",               value: "negative" },
  //{ type: "PUNCTUATION",          value: ";" },
  //{ type: "TERMINATOR",           value: "\\n"},
  //{ type: "STATEMENT_KEYWORD",    value: "case" },
  //{ type: "NUMBER",               value: "0" },
  //{ type: "PUNCTUATION",          value: ":" },
  //{ type: "TERMINATOR",           value: "\\n"},
  //{ type: "IDENTIFIER",           value: "y" },
  //{ type: "OPERATOR",             value: "+" },
  //{ type: "OPERATOR",             value: "=" },
  //{ type: "STRING",               value: "zero" },
  //{ type: "PUNCTUATION",          value: ";" },
  //{ type: "TERMINATOR",           value: "\\n"},
  //{ type: "STATEMENT_KEYWORD",    value: "default" },
  //{ type: "PUNCTUATION",          value: ":" },
  //{ type: "TERMINATOR",           value: "\\n"},
  //{ type: "IDENTIFIER",           value: "y" },
  //{ type: "OPERATOR",             value: "+" },
  //{ type: "OPERATOR",             value: "=" },
  //{ type: "STRING",               value: "dunno" },
  //{ type: "PUNCTUATION",          value: ";" },
  //{ type: "TERMINATOR",           value: "\\n"},
  //{ type: "PUNCTUATION",          value: "}" },
  //{ type: "TERMINATOR",           value: "EOF"},
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

//var escodegen = require('escodegen');
//console.log('JSJSJSJSJSJSJSJSJSJSJSJSJSJSJS');
//console.log(escodegen.generate(expected));
//console.log('JSJSJSJSJSJSJSJSJSJSJSJSJSJSJS');