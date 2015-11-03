var lexer     = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff      = require("./helperFunctions").diff;

var swiftCode = String.raw`func addTwoInts(a: Int, b: Int) -> Int {
                                return a+b
                            }

                            var mathFunction: (Int, Int) -> Int = addTwoInts

                            print(mathFunction(2,3))`;


var swiftCodeAnswers = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'addTwoInts' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'b' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'OPERATOR', value: '+' },
        { type: 'IDENTIFIER', value: 'b' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'DECLARATION_KEYWORD', value: 'var' },
        { type: 'IDENTIFIER', value: 'mathFunction' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'PARAMS_START', value: '(' }, 
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PARAMS_END', value: ')' }, 
        { type: 'RETURN_ARROW', value: '->' }, 
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'OPERATOR', value: '=' },
        { type: 'IDENTIFIER', value: 'addTwoInts' }, //Need to go backward frmo here to var keyword and modify accordingly
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'mathFunction' },
        { type: 'PUNCTUATION', value: '(' },
        { type: 'NUMBER', value: '2' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '3' },
        { type: 'PUNCTUATION', value: ')' },
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
