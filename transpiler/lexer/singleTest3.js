var lexer     = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff      = require("./helperFunctions").diff;

// should handle functions that take a multiparameter function specified with parentheses as an argument

var swiftCode = String.raw`func ab(a: (p: Int, t: Int)) {
                            }
                            ab((p: 6, t: 8))`;


var swiftCodeAnswers = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'ab' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TUPLE_START', value: '(' },
        { type: 'TUPLE_ELEMENT_NAME', value: 'p' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'TUPLE_ELEMENT_NAME', value: 't' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'TUPLE_END', value: ')' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'ab' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'TUPLE_START', value: '(' },
        { type: 'TUPLE_ELEMENT_NAME', value: 'p' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '6' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'TUPLE_ELEMENT_NAME', value: 't' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '8' },
        { type: 'TUPLE_END', value: ')' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
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
