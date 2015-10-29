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
            "name": "gameInProgress"
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
            "name": "score"
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
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "typeOfScore"
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
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "PAT"
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
      "type": "WhileStatement",
      "test": { "type": "Identifier", "name": "gameInProgress" },
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "IfStatement",
            "test":
            { "type": "BinaryExpression",
              "operator": "!=",
              "left": { "type": "Identifier", "name": "typeOfScore" },
              "right": { "type": "Literal",  "value": "", "raw": "\"\"" }
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [/*We have ExpressionStatement in here*/
                {
                  "type": "IfStatement",
                  "test": {
                    "type": "BinaryExpression",
                    "operator": "==",
                    "left": { "type": "Identifier", "name": "typeOfScore" },
                    "right": { "type": "Literal", "value": "TD", "raw": "\"TD\"" }
                  },
                  "consequent": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "expression": {
                          "type": "AssignmentExpression",
                          "operator": "+=",
                          "left": { "type": "Identifier", "name": "score" },
                          "right": {"type": "Literal", "value": 6, "raw": "6" }
                        }
                      }
                    ]
                  },
                  "alternate": {
                    "type": "IfStatement",
                    "test": {
                      "type": "BinaryExpression",
                      "operator": "==",
                      "left": { "type": "Identifier", "name": "typeOfScore" },
                      "right": { "type": "Literal", "value": "PAT", "raw": "\"PAT\"" }
                    },
                    "consequent": {
                      "type": "BlockStatement",
                      "body": [
                        {
                          "type": "IfStatement",
                          "test": {
                            "type": "BinaryExpression",
                            "operator": "==",
                            "left": {
                              "type": "Identifier",
                              "name": "PAT"
                            },
                            "right": {
                              "type": "Literal",
                              "value": "TD",
                              "raw": "\"TD\""
                            }
                          },
                          "consequent": {
                            "type": "BlockStatement",
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "expression": {
                                  "type": "AssignmentExpression",
                                  "operator": "+=",
                                  "left": { "type": "Identifier", "name": "score" },
                                  "right": { "type": "Literal", "value": 2, "raw": "2" }
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
                                  "operator": "+=",
                                  "left": { "type": "Identifier", "name": "score" },
                                  "right": { "type": "Literal", "value": 1, "raw": "1" }
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "alternate": {
                      "type": "IfStatement",
                      "test": {
                        "type": "BinaryExpression",
                        "operator": "==",
                        "left": {
                          "type": "Identifier",
                          "name": "typeOfScore"
                        },
                        "right": {
                          "type": "Literal",
                          "value": "FG",
                          "raw": "\"FG\""
                        }
                      },
                      "consequent": {
                        "type": "BlockStatement",
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "expression": {
                              "type": "AssignmentExpression",
                              "operator": "+=",
                              "left": { "type": "Identifier", "name": "score" },
                              "right": { "type": "Literal", "value": 3, "raw": "3" }
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
                              "operator": "+=",
                              "left": { "type": "Identifier", "name": "score" },
                              "right": { "type": "Literal", "value": 2, "raw": "2" }
                            }
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": { "type": "Identifier", "name": "typeOfScore" },
                    "right": { "type": "Literal", "value": "", "raw": "\"\"" }
                  }
                }
              ]
            },
            "alternate": null
          }
        ]
      }
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: 'DECLARATION_KEYWORD',         value: 'var' },
  { type: 'IDENTIFIER',                  value: 'gameInProgress' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'BOOLEAN',                     value: 'false' },
  { type: 'PUNCTUATION',                 value: ';' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'DECLARATION_KEYWORD',         value: 'var' },
  { type: 'IDENTIFIER',                  value: 'score' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'NUMBER',                      value: '0' },
  { type: 'PUNCTUATION',                 value: ';' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'DECLARATION_KEYWORD',         value: 'var' },
  { type: 'IDENTIFIER',                  value: 'typeOfScore' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'STRING',                      value: '' },
  { type: 'PUNCTUATION',                 value: ';' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'DECLARATION_KEYWORD',         value: 'var' },
  { type: 'IDENTIFIER',                  value: 'PAT' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'STRING',                      value: '' },
  { type: 'PUNCTUATION',                 value: ';' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STATEMENT_KEYWORD',           value: 'while' },
  { type: 'IDENTIFIER',                  value: 'gameInProgress' },
  { type: 'PUNCTUATION',                 value: '{' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STATEMENT_KEYWORD',           value: 'if' },
  { type: 'IDENTIFIER',                  value: 'typeOfScore' },
  { type: 'OPERATOR',                    value: '!' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'STRING',                      value: '' },
  { type: 'PUNCTUATION',                 value: '{' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STATEMENT_KEYWORD',           value: 'if' },
  { type: 'IDENTIFIER',                  value: 'typeOfScore' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'STRING',                      value: 'TD' },
  { type: 'PUNCTUATION',                 value: '{' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'IDENTIFIER',                  value: 'score' },
  { type: 'OPERATOR',                    value: '+' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'NUMBER',                      value: '6' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'PUNCTUATION',                 value: '}' },
  { type: 'STATEMENT_KEYWORD',           value: 'else' },
  { type: 'STATEMENT_KEYWORD',           value: 'if' },
  { type: 'IDENTIFIER',                  value: 'typeOfScore' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'STRING',                      value: 'PAT' },
  { type: 'PUNCTUATION',                 value: '{' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STATEMENT_KEYWORD',           value: 'if' },
  { type: 'IDENTIFIER',                  value: 'PAT' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'STRING',                      value: 'TD' },
  { type: 'PUNCTUATION',                 value: '{' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'IDENTIFIER',                  value: 'score' },
  { type: 'OPERATOR',                    value: '+' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'NUMBER',                      value: '2' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'PUNCTUATION',                 value: '}' },
  { type: 'STATEMENT_KEYWORD',           value: 'else' },
  { type: 'PUNCTUATION',                 value: '{' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'IDENTIFIER',                  value: 'score' },
  { type: 'OPERATOR',                    value: '+' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'PUNCTUATION',                 value: '}' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'PUNCTUATION',                 value: '}' },
  { type: 'STATEMENT_KEYWORD',           value: 'else' },
  { type: 'STATEMENT_KEYWORD',           value: 'if' },
  { type: 'IDENTIFIER',                  value: 'typeOfScore' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'STRING',                      value: 'FG' },
  { type: 'PUNCTUATION',                 value: '{' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'IDENTIFIER',                  value: 'score' },
  { type: 'OPERATOR',                    value: '+' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'NUMBER',                      value: '3' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'PUNCTUATION',                 value: '}' },
  { type: 'STATEMENT_KEYWORD',           value: 'else' },
  { type: 'PUNCTUATION',                 value: '{' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'IDENTIFIER',                  value: 'score' },
  { type: 'OPERATOR',                    value: '+' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'NUMBER',                      value: '2' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'PUNCTUATION',                 value: '}' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'IDENTIFIER',                  value: 'typeOfScore' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'STRING',                      value: '' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'PUNCTUATION',                 value: '}' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'PUNCTUATION',                 value: '}' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'TERMINATOR',                  value: 'EOF' }
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

