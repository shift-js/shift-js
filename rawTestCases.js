***** TEST 1 *****
Swift input: 'var a = 3'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "a"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "NUMBER",
    value: "3"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 2 *****
Swift input: 'var b = "hello"'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "b"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "STRING",
    value: "hello"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 3 *****
Swift input: 'var c = true'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "c"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "BOOLEAN",
    value: "true"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 4 *****
Swift input: 'var d = "Test this"'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "d"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "STRING",
    value: "Test this"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 5 *****
Swift input: 'var e = ["Eggs", "Milk", "Bacon"]'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "e"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "STRING",
    value: "Eggs"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "STRING",
    value: "Milk"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "STRING",
    value: "Bacon"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 6 *****
Swift input: 'var f = ["one": 1, "two": 2, "three": 3]'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "d"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "DICTIONARY_START",
    value: "["
  },{ 
    type: "STRING",
    value: "one"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "NUMBER",
    value: "1"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "STRING",
    value: "two"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "NUMBER",
    value: "2"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "STRING",
    value: "three"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "NUMBER",
    value: "3"
  },{
    type: "DICTIONARY_END",
    value: "]"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 7 *****
Swift input: 'let g = [1 : "one",2   :"two", 3: "three"]'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "let"
  },{ 
    type: "IDENTIFIER",
    value: "g"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "DICTIONARY_START",
    value: "["
  },{ 
    type: "NUMBER",
    value: "1"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "STRING",
    value: "one"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "NUMBER",
    value: "2"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "STRING",
    value: "two"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "NUMBER",
    value: "3"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "STRING",
    value: "three"
  },{
    type: "DICTIONARY_END",
    value: "]"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 8 *****
Swift input: 'let h = 3.14'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "let"
  },{ 
    type: "IDENTIFIER",
    value: "h"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "NUMBER",
    value: "3.14"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 9 *****
Swift input: 'let i = 5+6'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "let"
  },{ 
    type: "IDENTIFIER",
    value: "i"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "NUMBER",
    value: "5"
  },{ 
    type: "OPERATOR",
    value: "+"
  },{ 
    type: "NUMBER",
    value: "6"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 10 *****
Swift input: 'var j = 5 + 6 / 4 - (-16 % 4.2) * 55'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "j"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "NUMBER",
    value: "5"
  },{ 
    type: "OPERATOR",
    value: "+"
  },{ 
    type: "NUMBER",
    value: "6"
  },{ 
    type: "OPERATOR",
    value: "/"
  },{ 
    type: "NUMBER",
    value: "4"
  },{ 
    type: "OPERATOR",
    value: "-"
  },{
    type: "PUNCTUATION",
    value: "("
  },{ 
    type: "OPERATOR",
    value: "-"
  }{ 
    type: "NUMBER",
    value: "16"
  },{ 
    type: "OPERATOR",
    value: "%"
  },{ 
    type: "NUMBER",
    value: "4.2"
  },{
    type: "PUNCTUATION",
    value: ")"
  },{ 
    type: "OPERATOR",
    value: "*"
  },{ 
    type: "NUMBER",
    value: "55"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 11 *****
Swift input: 'var k = "Stephen" + " " + "Tabor" + "!"'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "k"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "STRING",
    value: "Stephen"
  },{ 
    type: "OPERATOR",
    value: "+"
  },{ 
    type: "STRING",
    value: " "
  },{ 
    type: "OPERATOR",
    value: "+"
  },{ 
    type: "STRING",
    value: "Tabor"
  },{ 
    type: "OPERATOR",
    value: "+"
  },{ 
    type: "STRING",
    value: "!"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 12 *****
Swift input: 'let l = 6 !== 9'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "let"
  },{ 
    type: "IDENTIFIER",
    value: "l"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "NUMBER",
    value: "6"
  },{ 
    type: "OPERATOR",
    value: "!"
  }{ 
    type: "OPERATOR",
    value: "="
  }{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "NUMBER",
    value: "9"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 13 *****
Swift input: 'var m = ++a;'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "m"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "OPERATOR",
    value: "+"
  },{ 
    type: "OPERATOR",
    value: "+"
  },{ 
    type: "IDENTIFIER",
    value: "a"
  },{
    type: "PUNCTUATION",
    value: ";"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 14 *****
Swift input: 'var n = a++;'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "n"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "IDENTIFIER",
    value: "a"
  },{ 
    type: "OPERATOR",
    value: "+"
  },{ 
    type: "OPERATOR",
    value: "+"
  },{
    type: "PUNCTUATION",
    value: ";"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 15 *****
Swift input: 'let o = "Hello \(planet)!"'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "let"
  },{ 
    type: "IDENTIFIER",
    value: "o"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "STRING",
    value: "Hello "
  },{ 
    type: "STRING_INTEEPOLATION_START",
    value: "\("
  },{
    type: "IDENTIFIER",
    value: "planet"
  },{ 
    type: "STRING_INTEEPOLATION_END",
    value: ")"
  },{
    type: "STRING",
    value: "!"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 16 *****
Swift input: 'var p = "\(100 - 99), 2, 3"'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "p"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "STRING",
    value: ""
  },{ 
    type: "STRING_INTEEPOLATION_START",
    value: "\("
  },{ 
    type: "NUMBER",
    value: "100"
  },{ 
    type: "OPERATOR",
    value: "-"
  },{ 
    type: "NUMBER",
    value: "99"
  },{ 
    type: "STRING_INTEEPOLATION_END",
    value: ")"
  },{
    type: "STRING",
    value: ", 2, 3"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 17 *****
Swift input: 'let q = ["array1": [1,2,3], "array2": [4,5,6]];'
Lexer output: [
  {
    type: "DECLARATION_KEYWORD",
    value: "let"
  },{ 
    type: "IDENTIFIER",
    value: "q"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "DICTIONARY_START",
    value: "["
  },{ 
    type: "STRING",
    value: "array1"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "NUMBER",
    value: "1"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "NUMBER",
    value: "2"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "NUMBER",
    value: "3"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ","
  },{ 
    type: "STRING",
    value: "array2"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "NUMBER",
    value: "4"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "NUMBER",
    value: "5"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "NUMBER",
    value: "6"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "DICTIONARY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ";"
  },{
    type: "TERMINATOR",
    value: "EOF"
  } 
]

***** TEST 18 *****
Swift input: 'var s = arr[0];'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "s"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "IDENTIFIER",
    value: "arr"
  },{
    type: "PUNCTUATION",
    value: "["
  },{ 
    type: "NUMBER",
    value: "0"
  },{
    type: "PUNCTUATION",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ";"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 19 *****
Swift input: 'let t = 100; var u = arr[t - 99];'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "let"
  },{ 
    type: "IDENTIFIER",
    value: "t"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "NUMBER",
    value: "100"
  },{
    type: "PUNCTUATION",
    value: ";"
  },{ 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "u"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "IDENTIFIER",
    value: "arr"
  },{
    type: "PUNCTUATION",
    value: "["
  },{ 
    type: "IDENTIFIER",
    value: "t"
  },{ 
    type: "OPERATOR",
    value: "-"
  },{ 
    type: "NUMBER",
    value: "99"
  },{
    type: "PUNCTUATION",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ";"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 20 *****
Swift input: 'let arr = [1,2]; var v = [arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]]];'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "let"
  },{ 
    type: "IDENTIFIER",
    value: "arr"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "NUMBER",
    value: "1"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "NUMBER",
    value: "2"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ";"
  },{ 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "v"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "DICTIONARY_START",
    value: "["
  },{ 
    type: "IDENTIFIER",
    value: "arr"
  },{
    type: "PUNCTUATION",
    value: "["
  },{ 
    type: "NUMBER",
    value: "0"
  },{
    type: "PUNCTUATION",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "NUMBER",
    value: "1"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "NUMBER",
    value: "2"
  },{ 
    type: "ARRAY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ","
  },{ 
    type: "ARRAY_START",
    value: "["
  },{
    type: "NUMBER",
    value: "3"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "NUMBER",
    value: "4"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ","
  },{ 
    type: "IDENTIFIER",
    value: "arr"
  },{
    type: "PUNCTUATION",
    value: "["
  },{ 
    type: "NUMBER",
    value: "1"
  },{
    type: "PUNCTUATION",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "STRING",
    value: "one"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "STRING",
    value: "two"
  },{ 
    type: "ARRAY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ","
  },{ 
    type: "ARRAY_START",
    value: "["
  },{
    type: "STRING",
    value: "three"
  },{
    type: "PUNCTUATION",
    value: ","
  },{
    type: "STRING",
    value: "four"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "DICTIONARY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ";"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]

***** TEST 21 *****
Swift input: 'var w = [1: [[1: "two"], [3: "four"]], 2: [["one": 2], ["three": 4]]];'
Lexer output: [
  { 
    type: "DECLARATION_KEYWORD",
    value: "var"
  },{ 
    type: "IDENTIFIER",
    value: "w"
  },{ 
    type: "OPERATOR",
    value: "="
  },{ 
    type: "DICTIONARY_START",
    value: "["
  },{ 
    type: "NUMBER",
    value: "1"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "DICTIONARY_START",
    value: "["
  },{ 
    type: "NUMBER",
    value: "1"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "STRING",
    value: "two"
  },{ 
    type: "DICTIONARY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ","
  },{ 
    type: "DICTIONARY_START",
    value: "["
  },{
    type: "NUMBER",
    value: "3"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "STRING",
    value: "four"
  },{
    type: "DICTIONARY_END",
    value: "]"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ","
  },{ 
    type: "NUMBER",
    value: "2"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{ 
    type: "ARRAY_START",
    value: "["
  },{ 
    type: "DICTIONARY_START",
    value: "["
  },{ 
    type: "STRING",
    value: "one"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "NUMBER",
    value: "2"
  },{ 
    type: "DICTIONARY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ","
  },{ 
    type: "DICTIONARY_START",
    value: "["
  },{
    type: "STRING",
    value: "three"
  },{
    type: "PUNCTUATION",
    value: ":"
  },{
    type: "NUMBER",
    value: "4"
  },{
    type: "DICTIONARY_END",
    value: "]"
  },{
    type: "ARRAY_END",
    value: "]"
  },{
    type: "DICTIONARY_END",
    value: "]"
  },{
    type: "PUNCTUATION",
    value: ";"
  },{
    type: "TERMINATOR",
    value: "EOF"
  }
]
