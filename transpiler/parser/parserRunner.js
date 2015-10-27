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
            "name": "b"
          },
          "init": {
            "type": "Literal",
            "value": true,
            "raw": "true"
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
            "name": "c"
          },
          "init": {
            "type": "Literal",
            "value": 0,
            "raw": "0"
          }
        }
      ],
      "kind": "var"
    }
  ],
  "sourceType": "module"
};
var tokenStream = [
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "b" },
  { type: "OPERATOR",             value: "=" },
  { type: "BOOLEAN",              value: "true" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "c" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ";" },
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

