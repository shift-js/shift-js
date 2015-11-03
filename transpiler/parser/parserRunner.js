var util = require('util');
var diff = require('deep-diff').diff;
var helpers = require('./helperFunctions.js');
var makeParse = require('./parser');

var expected = {
    "type": "Program",
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
              "type": "Literal",
              "value": "Hello",
              "raw": '"Hello"'
            }
          ]
        }
      }
    ],
    "sourceType": "module"
  };
var tokenStream = [
  { type: "NATIVE_METHOD",              value: "print"},
  { type: "INVOCATION_START",           value: "(" },
  { type: "STRING",                     value: "Hello" },
  { type: "INVOCATION_END",             value: ")" },
  { type: "TERMINATOR",                 value: "EOF" },
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