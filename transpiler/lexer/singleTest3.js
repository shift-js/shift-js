var lexer     = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff      = require("./helperFunctions").diff;

var swiftCode = String.raw`func makeIncrementer() -> ((Int) -> Int) {
                                func addOne(number: Int) -> Int {
                                    func anon(n: Int) -> Int {
                                        return 1 + n
                                    }
                                    return anon(number)
                                }
                                return addOne
                            }`;


var swiftCodeAnswers = [
          { type: 'DECLARATION_KEYWORD', value: 'func' },
          { type: 'IDENTIFIER', value: 'makeIncrementer' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'PUNCTUATION', value: '(' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PUNCTUATION', value: ')' },
          { type: 'STATEMENTS_START', value: '{' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'DECLARATION_KEYWORD', value: 'func' },
          { type: 'IDENTIFIER', value: 'addOne' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'IDENTIFIER', value: 'number' },
          { type: 'PUNCTUATION', value: ':' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'STATEMENTS_START', value: '{' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'DECLARATION_KEYWORD', value: 'func' },
          { type: 'IDENTIFIER', value: 'anon' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'IDENTIFIER', value: 'n' },
          { type: 'PUNCTUATION', value: ':' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'STATEMENTS_START', value: '{' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENT_KEYWORD', value: 'return' },
          { type: 'NUMBER', value: '1' },
          { type: 'OPERATOR', value: '+' },
          { type: 'IDENTIFIER', value: 'n' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENTS_END', value: '}' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENT_KEYWORD', value: 'return' },
          { type: 'IDENTIFIER', value: 'anon' },
          { type: 'INVOCATION_START', value: '(' },
          { type: 'IDENTIFIER', value: 'number' },
          { type: 'INVOCATION_END', value: ')' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENTS_END', value: '}' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENT_KEYWORD', value: 'return' },
          { type: 'IDENTIFIER', value: 'addOne' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENTS_END', value: '}' },
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
