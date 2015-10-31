it('should handle functions that get assigned to a variable and are invoked later', function () {
      input = String.raw`func addTwoInts(a: Int, b: Int) -> Int {
                                return a+b
                            }

                            var mathFunction: (Int, Int) -> Int = addTwoInts

                            print(mathFunction(2,3))`;
      output = [ 
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
        { type: 'PUNCTUATION', value: '(' }, //TODO make Params_start
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ')' }, //TODO make Params_end
        { type: 'OPERATOR', value: '-' }, // Not correct
        { type: 'OPERATOR', value: '>' },
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
      expect(lexer(input)).to.deep.equal(output);
    });