String.raw`func minMax(var array: [Int]) -> (min: Int, max: Int) {
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

[
     { type: "DECLARATION_KEYWORD",  value: "func"},
     { type: "IDENTIFIER",           value: "minMax" },
     { type: "PARAMS_START",         value: "(" },
     { type: "IDENTIFIER",           value: "array" },
     { type: "PUNCTUATION",          value: ":" },
     { type: "ARRAY_START",          value: "["},
     { type: "TYPE_NUMBER",          value: "Int" },
     { type: "ARRAY_END",            value: "]"},
     { type: "PARAMS_END",           value: ")" },
     { type: "RETURN_ARROW",         value: "->" },
     { type: "TUPLE_START",          value: "("},
     { type: "TUPLE_ELEMENT_NAME",   value: "min"},
     { type: "PUNCTUATION",          value: ":" },
     { type: "TYPE_NUMBER",          value: "Int" },
     { type: "PUNCTUATION",          value: "," },
     { type: "TUPLE_ELEMENT_NAME",   value: "max"},
     { type: "PUNCTUATION",          value: ":" },
     { type: "TYPE_NUMBER",          value: "Int" },
     { type: "TUPLE_END",            value: ")"},
     { type: "STATEMENTS_START",     value: "{" },
     { type: "TERMINATOR",           value: "\\n"},

     { type: "DECLARATION_KEYWORD",  value: "var" },
     { type: "IDENTIFIER",           value: "currentMin" },
     { type: "OPERATOR",             value: "=" },
     { type: "IDENTIFIER",           value: "array" },
     { type: "SUBSTRING_LOOKUP_START",     value: "[" },
     { type: "NUMBER",               value: "0" },
     { type: "SUBSTRING_LOOKUP_END",     value: "]" },
     { type: "TERMINATOR",           value: "\\n"},

     { type: "DECLARATION_KEYWORD",  value: "var" },
     { type: "IDENTIFIER",           value: "currentMax" },
     { type: "OPERATOR",             value: "=" },
     { type: "IDENTIFIER",           value: "array" },
     { type: "SUBSTRING_LOOKUP_START",     value: "[" },
     { type: "NUMBER",               value: "0" },
     { type: "SUBSTRING_LOOKUP_END",     value: "]" },
     { type: "TERMINATOR",           value: "\\n"},

     { type: "STATEMENT_KEYWORD",    value: "for" },
     { type: "IDENTIFIER",           value: "value" },
     { type: "STATEMENT_KEYWORD",    value: "in" },
     { type: "IDENTIFIER",           value: "array" },
     { type: "SUBSTRING_LOOKUP_START",     value: "[" },

          { type: "NUMBER",               value: "1" },
          { type: "HALF-OPEN_RANGE",      value: "..<" },
          //TODO get native methods working
          { type: "NODUCKINGCLUE",               value: "array.count" },

     { type: "SUBSTRING_LOOKUP_END",     value: "]" },
     { type: "PUNCTUATION",          value: "{" },
     { type: "TERMINATOR",           value: "\\n"},



          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "IDENTIFIER",           value: "value" },
          { type: "OPERATOR",             value: "<" },
          { type: "IDENTIFIER",           value: "currentMin" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "IDENTIFIER",           value: "currentMin" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "value" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "else" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "IDENTIFIER",           value: "value" },
          { type: "OPERATOR",             value: ">" },
          { type: "IDENTIFIER",           value: "currentMax" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "IDENTIFIER",           value: "currentMax" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "value" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "PUNCTUATION",          value: "}" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "PUNCTUATION",          value: "}" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "STATEMENT_KEYWORD",    value: "return"},
          { type: "TUPLE_START",                value: "("},
          { type: "IDENTIFIER",                     value: "currentMin"},
          { type: "PUNCTUATION",                value: "," },
          { type: "IDENTIFIER",                     value: "not currentMax"},
          { type: "TUPLE_END",                  value: ")"},
          { type: "TERMINATOR",           value: "\\n"},

     { type: "STATEMENTS_END",       value: "}" },
     { type: "TERMINATOR",           value: "EOF"}
     ]

String.raw``

String.raw``

String.raw``


























