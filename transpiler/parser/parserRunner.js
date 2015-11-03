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
        "name": "returnWorld"
      },
      "params": [],
      "defaults": [],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ReturnStatement",
            "argument": {
              "type": "Literal",
              "value": "World",
              "raw": "\"World\""
            }
          }
        ]
      },
      "generator": false,
      "expression": false
    },
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Identifier",
        "name": "printInput"
      },
      "params": [
        {
          "type": "Identifier",
          "name": "input"
        }
      ],
      "defaults": [],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "MemberExpression",
                "computed": false,
                "object": {
                  "type": "Identifier",
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "name": "log"
                }
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "name": "input"
                }
              ]
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
          "name": "printInput"
        },
        "arguments": [
          {
            "type": "BinaryExpression",
            "operator": "+",
            "left": {
              "type": "BinaryExpression",
              "operator": "+",
              "left": {
                "type": "Literal",
                "value": "Hello, ",
                "raw": "\"Hello, \""
              },
              "right": {
                "type": "CallExpression",
                "callee": {
                  "type": "Identifier",
                  "name": "returnWorld"
                },
                "arguments": []
              }
            },
            "right": {
              "type": "Literal",
              "value": "!",
              "raw": "\"!\""
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: 'DECLARATION_KEYWORD', value: 'func' },
  { type: 'IDENTIFIER', value: 'returnWorld' },
  { type: 'PARAMS_START', value: '(' },
  { type: 'PARAMS_END', value: ')' },
  { type: 'RETURN_ARROW', value: '->' },
  { type: 'TYPE_STRING', value: 'String' },
  { type: 'STATEMENTS_START', value: '{' },
  { type: 'TERMINATOR', value: '\\n' },

  { type: 'STATEMENT_KEYWORD', value: 'return' },
  { type: 'STRING', value: 'World' },
  { type: 'TERMINATOR', value: '\\n' },

  { type: 'STATEMENTS_END', value: '}' },
  { type: 'TERMINATOR', value: '\\n' },

  { type: 'DECLARATION_KEYWORD', value: 'func' },
  { type: 'IDENTIFIER', value: 'printInput' },
  { type: 'PARAMS_START', value: '(' },
  { type: 'IDENTIFIER', value: 'input' },
  { type: 'PUNCTUATION', value: ':' },
  { type: 'TYPE_STRING', value: 'String' },
  { type: 'PARAMS_END', value: ')' },
  { type: 'STATEMENTS_START', value: '{' },
  { type: 'TERMINATOR', value: '\\n' },

  { type: 'NATIVE_METHOD', value: 'print' },
  { type: 'INVOCATION_START', value: '(' },
  { type: 'IDENTIFIER', value: 'input' },
  { type: 'INVOCATION_END', value: ')' },
  { type: 'TERMINATOR', value: '\\n' },

  { type: 'STATEMENTS_END', value: '}' },
  { type: 'TERMINATOR', value: '\\n' },

  { type: 'IDENTIFIER', value: 'printInput' },
  { type: 'INVOCATION_START', value: '(' },
  { type: 'STRING', value: 'Hello, ' },
  { type: 'STRING_INTERPOLATION_START', value: '\\(' },
  { type: 'IDENTIFIER', value: 'returnWorld' },
  { type: 'INVOCATION_START', value: '(' },
  { type: 'INVOCATION_END', value: ')' },
  { type: 'STRING_INTERPOLATION_END', value: ')' },
  { type: 'STRING', value: '!' },
  { type: 'INVOCATION_END', value: ')' },
  { type: 'TERMINATOR', value: 'EOF' }
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