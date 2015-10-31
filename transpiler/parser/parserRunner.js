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
          "name": "name"
        },
        "init": {

          "type": "Literal",
          "value": "Joe",
          "raw": "\"Joe\""
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
          "name": "arr"
        },
        "init": {

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
          "name": "tup"
        },
        "init": {

          "type": "ObjectExpression",
          "properties": [
            {

              "type": "Property",
              "key": {

                "type": "Literal",
                "value": 0,
                "raw": "0"
              },
              "computed": false,
              "value": {

                "type": "Literal",
                "value": 1,
                "raw": "1"
              },
              "kind": "init",
              "method": false,
              "shorthand": false
            },
            {

              "type": "Property",
              "key": {

                "type": "Literal",
                "value": 1,
                "raw": "1"
              },
              "computed": false,
              "value": {

                "type": "Literal",
                "value": 2,
                "raw": "2"
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

          "type": "BinaryExpression",
          "operator": "+",
          "left": {

            "type": "Literal",
            "value": "Hello, ",
            "raw": "'Hello, '"
          },
          "right": {

            "type": "Identifier",
            "name": "name"
          }
        }
      ]
    }
  },
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

          "type": "BinaryExpression",
          "operator": "*",
          "left": {

            "type": "Literal",
            "value": 5,
            "raw": "5"
          },
          "right": {

            "type": "BinaryExpression",
            "operator": "+",
            "left": {

              "type": "Literal",
              "value": 1,
              "raw": "1"
            },
            "right": {

              "type": "Literal",
              "value": 1,
              "raw": "1"
            }
          }
        }
      ]
    }
  },
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

          "type": "MemberExpression",
          "computed": true,
          "object": {

            "type": "Identifier",
            "name": "arr"
          },
          "property": {

            "type": "Literal",
            "value": 1,
            "raw": "1"
          }
        }
      ]
    }
  },
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

          "type": "MemberExpression",
          "computed": true,
          "object": {

            "type": "Identifier",
            "name": "tup"
          },
          "property": {

            "type": "Literal",
            "value": 0,
            "raw": "0"
          }
        }
      ]
    }
  }
],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",        value: "var" },
  { type: "IDENTIFIER",                 value: "name" },
  { type: "OPERATOR",                   value: "=" },
  { type: "STRING",                     value: "Joe" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "DECLARATION_KEYWORD",        value: "var" },
  { type: "IDENTIFIER",                 value: "arr" },
  { type: "OPERATOR",                   value: "=" },
  { type: "ARRAY_START",                value: "[" },
  { type: "NUMBER",                     value: "1" },
  { type: "PUNCTUATION",                value: "," },
  { type: "NUMBER",                     value: "2" },
  { type: "ARRAY_END",                  value: "]" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "DECLARATION_KEYWORD",        value: "var" },
  { type: "IDENTIFIER",                 value: "tup" },
  { type: "OPERATOR",                   value: "=" },
  { type: "TUPLE_START",                value: "(" },
  { type: "NUMBER",                     value: "1" },
  { type: "PUNCTUATION",                value: "," },
  { type: "NUMBER",                     value: "2" },
  { type: "TUPLE_END",                  value: ")" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "NATIVE_METHOD",              value: "print"},
  { type: "INVOCATION_START",           value: "(" },
  { type: "IDENTIFIER",                 value: "name" },
  { type: "INVOCATION_END",             value: ")" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "NATIVE_METHOD",              value: "print"},
  { type: "INVOCATION_START",           value: "(" },
  { type: "STRING",                     value: "Hello, " },
  { type: "STRING_INTERPOLATION_START", value: "\\(" },
  { type: "IDENTIFIER",                 value: "name" },
  { type: "STRING_INTERPOLATION_END",   value: ")" },
  { type: "STRING",                     value: "" },
  { type: "INVOCATION_END",             value: ")" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "NATIVE_METHOD",              value: "print"},
  { type: "INVOCATION_START",           value: "(" },
  { type: "NUMBER",                     value: "5" },
  { type: "OPERATOR",                   value: "*" },
  { type: "PUNCTUATION",                value: "(" },
  { type: "NUMBER",                     value: "1" },
  { type: "OPERATOR",                   value: "+" },
  { type: "NUMBER",                     value: "1" },
  { type: "PUNCTUATION",                value: ")" },
  { type: "INVOCATION_END",             value: ")" },
  { type: "TERMINATOR",                 value: "\\n"},
  { type: "NATIVE_METHOD",              value: "print"},
  { type: "INVOCATION_START",           value: "(" },
  { type: "IDENTIFIER",                 value: "arr" },
  { type: "SUBSTRING_LOOKUP_START",     value: "[" },
  { type: "NUMBER",                     value: "1" },
  { type: "SUBSTRING_LOOKUP_END",       value: "]" },
  { type: "INVOCATION_END",             value: ")" },
  { type: "TERMINATOR",                 value: "\\n"},

  { type: "NATIVE_METHOD",              value: "print"},
  { type: "INVOCATION_START",           value: "(" },
  { type: "IDENTIFIER",                 value: "tup" },
  { type: "DOT_SYNTAX",                 value: "." },
  { type: "NUMBER",                     value: "0"},
  { type: "INVOCATION_END",             value: ")" },
  { type: "TERMINATOR",                 value: "EOF" }
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