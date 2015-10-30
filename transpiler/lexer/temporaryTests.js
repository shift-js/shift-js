it('should handle functions that use inputs, native methods, and string interpolation ', function () {
          input = String.raw`func printName(firstName firstName:String="Joe",middleName:String="Andrew",surname:String="Blow") {
                                print("\(firstName) \(middleName) \(surname)")
                            }
                            printName(firstName: "John", middleName: "Juan", surname: "Smith")    
                            printName(firstName: "John")   
                            printName()        
                            printName(surname: "Smith", middleName: "Julius", firstName: "John")`;
          output = [
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" }, 
            { type: "TYPE_STRING",                value: "String" },            
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" }, 
            { type: "TYPE_STRING",                value: "String" }, 
            { type: "OPERATOR",                   value: "?"}, 
            { type: "PARAMS_END",                 value: ")" }, 
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'STATEMENT_KEYWORD',       value: 'if' },
            { type: 'DECLARATION_KEYWORD',     value: 'let' },
            { type: 'IDENTIFIER',              value: 'unwrappedSurname' },
            { type: 'OPERATOR',                value: '=' },
            { type: 'IDENTIFIER',              value: 'surname' },
            { type: 'PUNCTUATION',             value: '{' },
            { type: 'TERMINATOR',              value: '\\n' },

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "" },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "unwrappedSurname" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: "" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'PUNCTUATION',             value: '}' },
            { type: 'STATEMENT_KEYWORD',       value: 'else' },
            { type: 'PUNCTUATION',             value: '{' },
            { type: 'TERMINATOR',              value: '\\n' },

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'PUNCTUATION',             value: '}' },
            { type: 'TERMINATOR',              value: '\\n' },

            { type: "STATEMENTS_END",           value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "Joe" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "nil" },
            { type: "INVOCATION_END",             value: ")" },

            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "Joe" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Blow" },
            { type: "INVOCATION_END",             value: ")" },

            { type: "TERMINATOR",                 value: "EOF"}
          ];
          expect(lexer(input)).to.deep.equal(output);
        });