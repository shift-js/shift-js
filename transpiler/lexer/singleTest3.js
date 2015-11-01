var lexer     = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff      = require("./helperFunctions").diff;

// var swiftCode = String.raw`func s(){}
//                             s();`;

// var swiftCodeAnswers = [
//             { type: "DECLARATION_KEYWORD",  value: "func"},
//             { type: "IDENTIFIER",           value: "s" },
//             { type: "PARAMS_START",         value: "(" },
//             { type: "PARAMS_END",           value: ")" },
//             { type: "STATEMENTS_START",     value: "{" },
//             { type: "STATEMENTS_END",       value: "}"},
//             { type: "TERMINATOR",           value: "\\n"},
//             { type: "IDENTIFIER",           value: "s" },
//             { type: "INVOCATION_START",     value: "(" },
//             { type: "INVOCATION_END",       value: ")" },
//             { type: "PUNCTUATION",          value: ";" },
//             { type: "TERMINATOR",           value: "EOF"}
//           ];

 // var swiftCode = String.raw`var b = "hello"`;
 //
 //var swiftCodeAnswers = [
 //        { type: "DECLARATION_KEYWORD",  value: "var" },
 //        { type: "IDENTIFIER",           value: "b" },
 //        { type: "OPERATOR",             value: "=" },
 //        { type: "STRING",               value: "hello" },
 //        { type: "TERMINATOR",           value: "EOF"}
 //      ];

var swiftCode = String.raw`func ab(a: (plusFive: Int, timesFive: Int)) {
                                print(a.plusFive)
                                print(a.timesFive)
                            }

                            ab((plusFive: 6, timesFive: 8))`;

var swiftCodeAnswers = [
  { type: 'DECLARATION_KEYWORD', value: 'func' },
  { type: 'IDENTIFIER', value         : 'ab' },
  { type: 'PARAMS_START', value       : '(' },
  { type: 'IDENTIFIER', value         : 'a' },
  { type: 'PUNCTUATION', value        : ':' },
  { type: 'TUPLE_START', value        : '(' },
  { type: 'TUPLE_ELEMENT_NAME', value : 'plusFive' },
  { type: 'PUNCTUATION', value        : ':' },
  { type: 'TYPE_NUMBER', value        : 'Int' },
  { type: 'PUNCTUATION', value        : ',' },
  { type: 'TUPLE_ELEMENT_NAME', value : 'timesFive' },
  { type: 'PUNCTUATION', value        : ':' },
  { type: 'TYPE_NUMBER', value        : 'Int' },
  { type: 'TUPLE_END', value          : ')' },
  { type: 'PARAMS_START', value       : ')' },
  { type: 'STATEMENTS_START', value   : '{' },
  { type: 'TERMINATOR', value         : '\\n' },

  { type: 'NATIVE_METHOD', value      : 'print' },
  { type: 'INVOCATION_START', value   : '(' },
  { type: 'IDENTIFIER', value         : 'a' },
  { type: 'DOT_SYNTAX', value         : '.' },
  { type: 'IDENTIFIER', value         : 'plusFive' },
  { type: 'INVOCATION_END', value     : ')' },
  { type: 'TERMINATOR', value         : '\\n' },

  { type: 'NATIVE_METHOD', value      : 'print' },
  { type: 'INVOCATION_START', value   : '(' },
  { type: 'IDENTIFIER', value         : 'a' },
  { type: 'DOT_SYNTAX', value         : '.' },
  { type: 'IDENTIFIER', value         : 'timesFive' },
  { type: 'INVOCATION_END', value     : ')' },
  { type: 'TERMINATOR', value         : '\\n' },

  { type: 'STATEMENTS_END', value     : '}' },
  { type: 'TERMINATOR', value         : '\\n' },
  { type: 'TERMINATOR', value         : '\\n' },

  { type: 'IDENTIFIER', value         : 'ab' },
  { type: 'INVOCATION_START', value   : '(' },
  { type: 'TUPLE_START', value        : '(' },
  { type: 'TUPLE_ELEMENT_NAME', value : 'plusFive' },
  { type: 'PUNCTUATION', value        : ':' },
  { type: 'NUMBER', value             : '6' },
  { type: 'PUNCTUATION', value        : ',' },
  { type: 'TUPLE_ELEMENT_NAME', value : 'timesFive' },
  { type: 'PUNCTUATION', value        : ':' },
  { type: 'NUMBER', value             : '8' },
  { type: 'TUPLE_END', value          : ')' },
  { type: 'INVOCATION_END', value     : ')' },
  { type: 'TERMINATOR', value         : 'EOF' }
  ];

var ans          = lexer(swiftCode);
var i            = 0;
var mapped       = ans.map(function(obj){
    obj['index'] = i;
    i++;
    return obj;
});
console.log(ans);
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));
