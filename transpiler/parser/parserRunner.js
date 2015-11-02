var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var makeParse = require('./parser');

var expected = {
  "type": "Program",
  "body": [
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Identifier",
        "name": "addSevenInts"
      },
      "params": [
        {
          "type": "Identifier",
          "name": "first"
        },
        {
          "type": "Identifier",
          "name": "second"
        },
        {
          "type": "Identifier",
          "name": "third"
        },
        {
          "type": "Identifier",
          "name": "fourth"
        },
        {
          "type": "Identifier",
          "name": "fifth"
        },
        {
          "type": "Identifier",
          "name": "sixth"
        },
        {
          "type": "Identifier",
          "name": "seventh"
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
                "name": "sum"
              },
              "right": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                  "type": "BinaryExpression",
                  "operator": "+",
                  "left": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                          "type": "BinaryExpression",
                          "operator": "+",
                          "left": {
                            "type": "Identifier",
                            "name": "first"
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "second"
                          }
                        },
                        "right": {
                          "type": "Identifier",
                          "name": "third"
                        }
                      },
                      "right": {
                        "type": "Identifier",
                        "name": "fourth"
                      }
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "fifth"
                    }
                  },
                  "right": {
                    "type": "Identifier",
                    "name": "sixth"
                  }
                },
                "right": {
                  "type": "Identifier",
                  "name": "seventh"
                }
              }
            }
          },
          {
            "type": "ReturnStatement",
            "argument": {
              "type": "Identifier",
              "name": "sum"
            }
          }
        ]
      },
      "generator": false,
      "expression": false
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "addSevenInts"
        },
        "arguments": [
          {
            "type": "Literal",
            "value": 143242134,
            "raw": "143242134"
          },
          {
            "type": "Literal",
            "value": 34543,
            "raw": "34543"
          },
          {
            "type": "Literal",
            "value": 4,
            "raw": "4"
          },
          {
            "type": "Literal",
            "value": 6,
            "raw": "6"
          },
          {
            "type": "Literal",
            "value": 0,
            "raw": "0"
          },
          {
            "type": "Literal",
            "value": 56,
            "raw": "56"
          },
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
  { type: "DECLARATION_KEYWORD",        value: "func"},
  { type: "IDENTIFIER",                 value: "addSevenInts" },
  { type: "PARAMS_START",               value: "(" },
  { type: "IDENTIFIER",                 value: "first" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "TYPE_NUMBER",                value: "Int" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "second" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "TYPE_NUMBER",                value: "Int" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "third" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "TYPE_NUMBER",                value: "Int" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "fourth" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "TYPE_NUMBER",                value: "Int" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "fifth" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "TYPE_NUMBER",                value: "Int" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "sixth" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "TYPE_NUMBER",                value: "Int" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "seventh" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "TYPE_NUMBER",                value: "Int" },
  { type: "PARAMS_END",                 value: ")" },
  { type: "RETURN_ARROW",               value: "->" },

  { type: "TYPE_NUMBER",                value: "Int" },
  { type: "STATEMENTS_START",           value: "{" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "DECLARATION_KEYWORD",        value: "let" },
  { type: "IDENTIFIER",                 value: "sum" },
  { type: "OPERATOR",                   value: "=" },
  { type: "IDENTIFIER",                 value: "first" },
  { type: "OPERATOR",                   value: "+" },
  { type: "IDENTIFIER",                 value: "second" },
  { type: "OPERATOR",                   value: "+" },
  { type: "IDENTIFIER",                 value: "third" },
  { type: "OPERATOR",                   value: "+" },
  { type: "IDENTIFIER",                 value: "fourth" },
  { type: "OPERATOR",                   value: "+" },
  { type: "IDENTIFIER",                 value: "fifth" },
  { type: "OPERATOR",                   value: "+" },
  { type: "IDENTIFIER",                 value: "sixth" },
  { type: "OPERATOR",                   value: "+" },
  { type: "IDENTIFIER",                 value: "seventh" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "STATEMENT_KEYWORD",          value: "return"},
  { type: "IDENTIFIER",                 value: "sum" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "STATEMENTS_END",             value: "}" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "IDENTIFIER",                 value: "addSevenInts" },
  { type: "INVOCATION_START",           value: "(" },
  { type: "NUMBER",                     value: "143242134" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "second" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "NUMBER",                     value: "34543" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "third" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "NUMBER",                     value: "4" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "fourth" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "NUMBER",                     value: "6" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "fifth" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "NUMBER",                     value: "0" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "sixth" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "NUMBER",                     value: "56" },
  { type: "PUNCTUATION",                value: "," },
  { type: "IDENTIFIER",                 value: "seventh" },
  { type: "PUNCTUATION",                value: ":" },
  { type: "NUMBER",                     value: "5" },
  { type: "INVOCATION_END",             value: ")" },
  { type: "TERMINATOR",                 value: "EOF"}

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