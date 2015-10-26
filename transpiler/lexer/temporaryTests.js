String.raw`func sayHello(var alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return "blah"
    } 
}`

[
  { type: "DECLARATION_KEYWORD",  value: "func"},
  { type: "IDENTIFIER",           value: "sayHello" },
  { type: "PARAMS_START",         value: "(" },
  { type: "DECLARATION_KEYWORD",  value: "var"},
  { type: "IDENTIFIER",           value: "alreadyGreeted" },
  { type: "PUNCTUATION",          value: ":" }, 
  { type: "TYPE_BOOLEAN",         value: "Bool" }, 
  { type: "PARAMS_END",           value: ")" }, 
  { type: "RETURN_ARROW",         value: "->" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "STATEMENTS_START",     value: "{" },  
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "IDENTIFIER",           value: "alreadyGreeted" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "return"}, 
  { type: "STRING",               value: "blah" }, 
  { type: "TERMINATOR",           value: "\\n"},

  { type: "PUNCTUATION",          value: "}" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENTS_END",       value: "}" },  
  { type: "TERMINATOR",           value: "EOF"}
]

String.raw`func sayHello(personName: String, alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return sayHelloAgain(personName)
    } else {
        return sayHello(personName)
    }
}`

[
  { type: "DECLARATION_KEYWORD",  value: "func"},
  { type: "IDENTIFIER",           value: "sayHello" },
  { type: "PARAMS_START",         value: "(" },
  { type: "IDENTIFIER",           value: "personName" },
  { type: "PUNCTUATION",          value: ":" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "PUNCTUATION",          value: "," },
  { type: "IDENTIFIER",           value: "alreadyGreeted" },
  { type: "PUNCTUATION",          value: ":" }, 
  { type: "TYPE_BOOLEAN",         value: "Bool" }, 
  { type: "PARAMS_END",           value: ")" }, 
  { type: "RETURN_ARROW",         value: "->" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "STATEMENTS_START",     value: "{" },  
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "IDENTIFIER",           value: "alreadyGreeted" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "return"}, 
  { type: "IDENTIFIER",           value: "sayHelloAgain" },
  { type: "INVOCATION_START",     value: "(" }, 
  { type: "IDENTIFIER",           value: "personName" },
  { type: "INVOCATION_END",       value: ")" },   
  { type: "TERMINATOR",           value: "\\n"},

  { type: "PUNCTUATION",          value: "}" },
  { type: "STATEMENT_KEYWORD",    value: "else" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"}, 

  { type: "STATEMENT_KEYWORD",    value: "return"}, 
  { type: "IDENTIFIER",           value: "sayHello" },
  { type: "INVOCATION_START",     value: "(" }, 
  { type: "IDENTIFIER",           value: "personName" },
  { type: "INVOCATION_END",       value: ")" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "PUNCTUATION",          value: "}" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENTS_END",       value: "}" },  
  { type: "TERMINATOR",           value: "EOF"}
]

String.raw`func sayHello(firstName: String, lastName: String) -> String {
    func giveString() -> String {
      return firstName + " " + lastName
    }
    return giveString()
}`

[
  { type: "DECLARATION_KEYWORD",  value: "func"},
  { type: "IDENTIFIER",           value: "sayHello" },
  { type: "PARAMS_START",         value: "(" },
  { type: "IDENTIFIER",           value: "firstName" },
  { type: "PUNCTUATION",          value: ":" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "PUNCTUATION",          value: "," },
  { type: "IDENTIFIER",           value: "lastName" },
  { type: "PUNCTUATION",          value: ":" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "PARAMS_END",           value: ")" }, 
  { type: "RETURN_ARROW",         value: "->" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "STATEMENTS_START",     value: "{" },  
  { type: "TERMINATOR",           value: "\\n"},

  { type: "DECLARATION_KEYWORD",  value: "func"},
  { type: "IDENTIFIER",           value: "giveString" },
  { type: "PARAMS_START",         value: "(" },
  { type: "PARAMS_END",           value: ")" }, 
  { type: "RETURN_ARROW",         value: "->" }, 
  { type: "TYPE_STRING",          value: "String" }, 
  { type: "STATEMENTS_START",     value: "{" },  
  { type: "TERMINATOR",           value: "\\n"},  

  { type: "STATEMENT_KEYWORD",    value: "return"}, 
  { type: "IDENTIFIER",           value: "firstName" },
  { type: "OPERATOR",             value: "+" },
  { type: "STRING",               value: " " },
  { type: "OPERATOR",             value: "+" },
  { type: "IDENTIFIER",           value: "lastName" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "INVOCATION_START",     value: "(" }, 
  { type: "IDENTIFIER",           value: "personName" },
  { type: "INVOCATION_END",       value: ")" },   
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENTS_END",       value: "}" }, 
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "return"}, 
  { type: "IDENTIFIER",           value: "giveString" },
  { type: "INVOCATION_START",     value: "(" }, 
  { type: "INVOCATION_END",       value: ")" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENTS_END",       value: "}" },  
  { type: "TERMINATOR",           value: "EOF"}
]

String.raw`func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}`

String.raw``

String.raw``

String.raw``


























