it('should handle functions that use inputs, native methods, and string interpolation ', function () {
          input = String.raw`func printFirstName(firstName:String,surname:String?) {
                                    if let unwrappedSurname = surname {
                                        print("\(firstName) \(unwrappedSurname)")
                                    } else {
                                        print(firstName)
                                    }
                                    
                                }
                                printFirstName("Joe",nil)
                                printFirstName("Joe", "Blow")`;
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

            { type: "NATIVE_METHOD",              value: "println"},
            { type: "INVOCATION_START",           value: "(" }, 
            { type: "STRING",                     value: "" },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " }, 
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "STRING_INTERPOLATION_END",   value: ")" }, 
            { type: "STRING",                     value: "" },
            { type: "INVOCATION_END",             value: ")" }, 
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "INVOCATION_START",           value: "(" }, 
            { type: "STRING",                     value: "Joe" },
            { type: "INVOCATION_END",             value: ")" }, 
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "INVOCATION_START",           value: "(" }, 
            { type: "STRING",                     value: "Joe" },
            { type: "PUNCTUATION",                value: "," },
            { type: "STRING",                     value: "Blow" },
            { type: "INVOCATION_END",             value: ")" }, 
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          expect(lexer(input)).to.deep.equal(output);
        });