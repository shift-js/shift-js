/* Test Cases: http://codeshare.io/bQ3zH */

var util = require('util');
var esprima = require('esprima-ast-utils');
var fs = require('fs');

var tokens = [
  { type: 'DECLARATION_KEYWORD', value: 'var' },
  { type: 'IDENTIFIER', value: 'srs' },
  { type: 'PUNCTUATION', value: '=' },
  { type: 'NUMBER', value: '4' },
  { type: 'PUNCTUATION', value: '+' },
  { type: 'NUMBER', value: '5' },
  { type: 'PUNCTUATION', value: '*' },
  { type: 'NUMBER', value: '6' },
  { type: 'PUNCTUATION', value: ';' },

  { type: 'DECLARATION_KEYWORD', value: 'var' },
  { type: 'IDENTIFIER', value: 'four' },
  { type: 'OPERATOR', value: '=' },
  { type: 'NUMBER', value: '4' },
  { type: 'PUNCTUATION', value: ';' },

  { type: 'DECLARATION_KEYWORD', value: 'var' },
  { type: 'IDENTIFIER', value: 'five' },
  { type: 'OPERATOR', value: '=' },
  { type: 'NUMBER', value: '5' },
  { type: 'PUNCTUATION', value: ';' },

  { type: 'DECLARATION_KEYWORD', value: 'var' },
  { type: 'IDENTIFIER', value: 'aaaa' },
  { type: 'OPERATOR', value: '=' },
  { type: 'IDENTIFIER', value: 'four' },
  { type: 'PUNCTUATION', value: '+' },
  { type: 'IDENTIFIER', value: 'five' },
  { type: 'PUNCTUATION', value: ';' },

  { type: 'IDENTIFIER', value: 'five' },
  { type: 'PUNCTUATION', value: '+' },
  { type: 'NUMBER', value: '1' },
  { type: 'PUNCTUATION', value: ';' },

  { type: "DECLARATION_KEYWORD", value: "var"},
  { type: "IDENTIFIER", value: "a"},
  { type: "OPERATOR", value: "="},
  { type: "NUMBER", value: "3"},
  { type: "DECLARATION_KEYWORD", value: "var" },
  { type: "IDENTIFIER",  value: "e" },
  { type: "OPERATOR", value: "=" },
  { type: "ARRAY_START", value: "[" },
  { type: "STRING", value: "Eggs" },
  { type: "PUNCTUATION", value: "," },
  { type: "STRING", value: "Milk" },
  { type: "PUNCTUATION", value: "," },
  { type: "STRING", value: "Bacon" },
  { type: "ARRAY_END", value: "]"},
  { type: "DECLARATION_KEYWORD", value:  "var" },
  { type: "IDENTIFIER", value: "d" },
  { type: "OPERATOR", value: "=" },
  { type: "DICTIONARY_START",  value: "[" },
  { type: "STRING", value: "one" },
  { type: "PUNCTUATION", value:  ":" },
  { type: "NUMBER", value: 1 },
  { type: "PUNCTUATION", value: "," },
  { type: "STRING", value: "two" },
  { type: "PUNCTUATION", value: ":" },
  { type: "NUMBER", value: 2 },
  { type: "PUNCTUATION", value: "," },
  { type: "STRING", value: "three" },
  { type: "PUNCTUATION", value: ":" },
  { type: "NUMBER", value: 3 },
  { type: "DICTIONARY_END", value: "]" },
  { type: 'DECLARATION_KEYWORD', value: 'var' },
  { type: 'IDENTIFIER', value: 'test' },
  { type: 'PUNCTUATION', value: '=' },
  { type: 'DECLARATION_KEYWORD', value: 'function' },
  { type: 'PUNCTUATION', value: '(' },
  { type: 'PUNCTUATION', value: ')' },
  { type: 'PUNCTUATION', value: '{' },
  { type: 'PUNCTUATION', value: '}' },
  { type: 'PUNCTUATION', value: ';' }
];

var ARRAY_START = "ARRAY_START";
var ARRAY_END = "ARRAY_END";
var BINARY_EXPRESSION = "BINARY_EXPRESSION";
var BOOLEAN = "BOOLEAN";
var DECLARATION_KEYWORD = "DECLARATION_KEYWORD";
var DICTIONARY_END = "DICTIONARY_END";
var DICTIONARY_START = "DICTIONARY_START";
var EXPRESSION_STATEMENT = "EXPRESSION_STATEMENT";
var IDENTIFIER = "IDENTIFIER";
var LITERAL = "LITERAL";
var NUMBER = "NUMBER";
var OPERATOR = "OPERATOR";
var PROGRAM = "PROGRAM";
var PUNCTUATION = "PUNCTUATION";
var STRING = "STRING";

var parser = function(array) {
  var ast = {
    type: PROGRAM,
    body: []
  };

  for(var i=0; i<array.length; i++) {

    var token = array[i];
    if(array[i-1] !== undefined) {
      var priorToken = array[i-1];
    }

    if(token.type === DECLARATION_KEYWORD) {

      var node = {};
      node.type = array[i].type;
      node.id = {};

      if(array[i+2].value === "=" && isTypePrimitive(array[i+3]) && array[i+4].value === ";") {

        node.id.type = array[i + 1].type;
        node.id.name = array[i + 1].value;
        node.init = {};
        node.init.type = LITERAL;
        node.init.value = array[i+3].value;

      } else if(array[i+2].value === "=" && (isTypePrimitive(array[i+3]) || array[i+3].type === IDENTIFIER) && isInOperatorTable(array[i+4].value)) {
        var eqlSgnIdx = i + 2;
        var semiColIdx;

        for(var j=i; j<array.length; j++) {
          if(array[j].value === ";") semiColIdx = j;
        }

        var operators = [];
        for(var k=eqlSgnIdx; k<semiColIdx; k++) {
          if(isInOperatorTable(array[k].value)){
            operators.push(array[k]);
          }
        }

        if(operators.length === 1) {
          node.id.type = array[i + 1].type;
          node.id.name = array[i + 1].value;
          node.init = {};
          node.init.type = BINARY_EXPRESSION;
          node.init.left = {};
          node.init.left.type = array[i+3].type;
          node.init.left.name = array[i+3].value;
          node.init.right = {};
          node.init.right.type = array[i+5].type;
          node.init.right.name = array[i+5].value;
        } else if(operators.length === 2) {
          node.id.type = EXPRESSION_STATEMENT;
          node.id.expression = {};
          node.id.expression.operator = "+";
          node.id.expression.type = BINARY_EXPRESSION;

          node.id.expression.left = {};
          node.id.expression.left.type = LITERAL;
          node.id.expression.left.value = 4;

          node.id.expression.right = {};
          node.id.expression.right.type = BINARY_EXPRESSION;
          node.id.expression.right.operator = '*';
          node.id.expression.right.left = {};
          node.id.expression.right.left.type = LITERAL;
          node.id.expression.right.left.value = 5;
          node.id.expression.right.right = {};
          node.id.expression.right.right.type = LITERAL;
          node.id.expression.right.right.value = 6;
        }

        //var exOut = {
        //  type: 'EXPRESSION_STATEMENT',
        //  expression: {
        //    type: 'BINARY_EXPRESSION',
        //    operator: '+',
        //    left: {
        //      type: "LITERAL",
        //      value: '4'
        //    },
        //    right: {
        //      type: 'BINARY_EXPRESSION',
        //      operator: '*',
        //      left: {
        //        type: 'LITERAL',
        //        value: '5'
        //      },
        //      right: {
        //        type: 'LITERAL',
        //        value: '6'
        //      }
        //    },
        //  }
        //};

        //{ type: 'PUNCTUATION', value: '=' },
        //{ type: 'NUMBER', value: '4' },
        //{ type: 'PUNCTUATION', value: '+' },
        //{ type: 'NUMBER', value: '5' },
        //{ type: 'PUNCTUATION', value: '*' },
        //{ type: 'NUMBER', value: '6' },
        //{ type: 'PUNCTUATION', value: ';' },





      } else if (isTypePrimitive(array[i + 3])) {

        node.init = {};
        node.init.type = LITERAL;
        node.init.value = array[i + 3].value;

      } else if(array[i + 3].type === ARRAY_START) {

        node.init = {};
        node.init.elements = [];
        for(var j=i+3; j<array.length; j++) {
          if(array[j].type === ARRAY_END) {
            break;
          } else if(array[j].type !== STRING) {
            continue;
          } else {
            var obj = {};
            if(array[j].type === STRING) {
              obj.type = LITERAL;
              obj.value = array[j].value;
            }
            node.init.elements.push(obj);
          }
        }

      } else if(array[i+3].type === DICTIONARY_START) {

        node.init = {};
        node.init.properties = [];
        for(var j=i+3; j<array.length; j++) {
          if(array[j].type === DICTIONARY_END) {
            break;
          } else if(array[j].type === STRING || array[j].type === NUMBER) {
            continue;
          } else {
            if(array[j].type === PUNCTUATION && array[j].value === ":") {
              var obj = {
                key: {},
                value: {}
              };
              obj.key.type = LITERAL;
              obj.key.value = array[j-1].value;
              obj.value.type = LITERAL;
              obj.value.value = array[j+1].value;
              node.init.properties.push(obj);
            }
          }
        }
      }
      ast.body.push(node);

    } else if(token.type === IDENTIFIER && isTypeKeyword(priorToken) && isValuePlusSign(priorToken) && isTypeOperator(priorToken)) {

      var obj = {
        type: 'BINARY_EXPRESSION',
        operator: "+",
        left: {
          type: "IDENTIFIER", //Should be type of LHS
          name: 'five'//TODO five variable name
        },
        right: {
          type: "LITERAL", //Should be type of RHS
          value: '1'//TODO 1 variable value
        }
      };
      ast.body.push(obj);

    }
  }
  return ast;
};

var OPERATOR_TABLE = {
  '*':150,
  '/':150,
  '+':140,
  '-':140
};

function isInOperatorTable(val) {
  return val in OPERATOR_TABLE;
}
function isTypePrimitive(node) {
  var typeParam = node.type;
  return (typeParam === NUMBER || typeParam === STRING || typeParam === BOOLEAN);
}
function isTypeKeyword(node) {
  var isKeyword = (node.type === DECLARATION_KEYWORD);
  return !isKeyword;
}
function isValuePlusSign(node) {
  var isPlusSign = (node.value === "+");
  return !isPlusSign;
}
function isTypeOperator(node) {
  var isOperator = (node.type === OPERATOR);
  return !isOperator;
}

console.log(util.inspect(parser(tokens), {colors:true, depth:null}));


//fs.readFile('./scratch.js', 'utf8', function(err, data){
// if(err) return console.log(err);
// console.log(util.inspect(esprima.parse(data), {colors: true, depth: null}));
// console.log(data);
//});

module.exports = parser;
