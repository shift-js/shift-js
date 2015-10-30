it('should handle functions that use default inputs and string interpolation ', function () {
          input = String.raw`func printName(firstName firstName:String="Joe",middleName:String="Andrew",surname:String="Blow") {
                                print("\(firstName) \(middleName) \(surname)")
                            }
                            printName(firstName: "John", middleName: "Juan", surname: "Smith")
                            printName(firstName: "John")
                            printName()
                            printName(surname: "Smith", middleName: "Julius", firstName: "John")`;
          output = [
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "printName" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_STRING",                value: "String" },
            { type: 'OPERATOR',                   value: '=' },
            { type: "STRING",                     value: "Joe" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "middleName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_STRING",                value: "String" },
            { type: 'OPERATOR',                   value: '=' },
            { type: "STRING",                     value: "Andrew" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_STRING",                value: "String" },
            { type: 'OPERATOR',                   value: '=' },
            { type: "STRING",                     value: "Blow" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "" },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "middleName" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: "" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'STATEMENTS_END',             value: '}' },
            { type: 'TERMINATOR',                 value: '\\n' },

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "John" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "middleName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Juan" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Smith" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "John" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Smith" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "middleName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Julius" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "John" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];

          expect(lexer(input)).to.deep.equal(output);
        });