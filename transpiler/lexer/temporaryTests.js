// var a = 5; if (true) {--a};

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "a" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "3" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "STATEMENT_KEYWORD",    value: "if" },
//   { type: "PUNCTUATION",          value: "(" },
//   { type: "BOOLEAN",              value: "true" },
//   { type: "PUNCTUATION",          value: ")" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "OPERATOR",             value: "-" },
//   { type: "OPERATOR",             value: "-" },
//   { type: "IDENTIFIER",           value: "a" },
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]

// var b = 6; if (5 <= 6) {b++};

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "b" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "6" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "STATEMENT_KEYWORD",    value: "if" },
//   { type: "PUNCTUATION",          value: "(" },
//   { type: "NUMBER",               value: "5" },
//   { type: "OPERATOR",             value: "<" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "6" },
//   { type: "PUNCTUATION",          value: ")" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "IDENTIFIER",           value: "b" },
//   { type: "OPERATOR",             value: "+" },
//   { type: "OPERATOR",             value: "+" },
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]

// var c = 1; if (c == 1) {c *= 5};

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "c" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "1" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "STATEMENT_KEYWORD",    value: "if" },
//   { type: "PUNCTUATION",          value: "(" },
//   { type: "IDENTIFIER",           value: "c" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "1" },
//   { type: "PUNCTUATION",          value: ")" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "IDENTIFIER",           value: "c" },
//   { type: "OPERATOR",             value: "*" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "5" },
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]

// var d = 1; if d != 2 {d++};

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "d" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "1" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "STATEMENT_KEYWORD",    value: "if" },
//   { type: "IDENTIFIER",           value: "d" },
//   { type: "OPERATOR",             value: "!" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "2" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "IDENTIFIER",           value: "d" },
//   { type: "OPERATOR",             value: "+" },
//   { type: "OPERATOR",             value: "+" },
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]

// var e = 1; if (e + 1) == 2 {e = 5};

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "e" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "1" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "STATEMENT_KEYWORD",    value: "if" },
//   { type: "PUNCTUATION",          value: "(" },
//   { type: "IDENTIFIER",           value: "e" },
//   { type: "OPERATOR",             value: "+" },
//   { type: "NUMBER",               value: "1" },
//   { type: "PUNCTUATION",          value: ")" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "2" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "IDENTIFIER",           value: "e" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "5" },
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]

// var g = (6 == 7) ? true : false;

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "g" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "PUNCTUATION",          value: "(" },
//   { type: "NUMBER",               value: "6" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "7" },
//   { type: "PUNCTUATION",          value: ")" },
//   { type: "OPERATOR",             value: "?" },
//   { type: "BOOLEAN",              value: "true" },
//   { type: "PUNCTUATION",          value: ":" },
//   { type: "BOOLEAN",              value: "false" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]

// let h = false; let i = h ? 1 : 2;

// [
//   { type: "DECLARATION_KEYWORD",  value: "let" },
//   { type: "IDENTIFIER",           value: "h" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "BOOLEAN",              value: "false" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "DECLARATION_KEYWORD",  value: "let" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "IDENTIFIER",           value: "h" },
//   { type: "OPERATOR",             value: "?" },
//   { type: "NUMBER",               value: "1" },
//   { type: "PUNCTUATION",          value: ":" },
//   { type: "NUMBER",               value: "2" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]
// var f = true; if !f {f = true} else {f = false};

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "f" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "BOOLEAN",              value: "true" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "STATEMENT_KEYWORD",    value: "if" },
//   { type: "OPERATOR",             value: "!" },
//   { type: "IDENTIFIER",           value: "f" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "IDENTIFIER",           value: "f" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "BOOLEAN",              value: "true" },
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "STATEMENT_KEYWORD",    value: "else" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "IDENTIFIER",           value: "f" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "BOOLEAN",              value: "false" },
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]


// var i = 10; while i >= 0 {i--}

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "10" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "STATEMENT_KEYWORD",    value: "while" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: ">" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "0" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "-" },
//   { type: "OPERATOR",             value: "-" },
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]

// var i = 10; repeat {i--} while (i >= 0)

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "10" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "STATEMENT_KEYWORD",    value: "repeat" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "-" },
//   { type: "OPERATOR",             value: "-" },
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "STATEMENT_KEYWORD",    value: "while" },
//   { type: "PUNCTUATION",          value: "(" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: ">" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "0" },
//   { type: "PUNCTUATION",          value: ")" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]

// var i = 0; while (i >= 0) {
//   i++
// }

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "0" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "STATEMENT_KEYWORD",    value: "while" },
//   { type: "PUNCTUATION",          value: "(" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: ">" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "0" },
//   { type: "PUNCTUATION",          value: "(" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "TERMINATOR",           value: "\n"},
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "+" },
//   { type: "OPERATOR",             value: "+" },
//   { type: "TERMINATOR",           value: "\n"},
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]

// var i = 0;
// repeat {
//   i++
// } while i < 10


[
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\n"},
  { type: "STATEMENT_KEYWORD",    value: "repeat" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\n"},
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "+" },
  { type: "TERMINATOR",           value: "\n"},
  { type: "PUNCTUATION",          value: "}" }, 
  { type: "STATEMENT_KEYWORD",    value: "while" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "<" },
  { type: "NUMBER",               value: "10" },  
  { type: "TERMINATOR",           value: "EOF"}
]

// `let num = 1;
// var str: String
// switch num {
//   case 0:
//     str = "zero"
//   case 1, 2, 3:
//     str = "positive"
//   case -1, -2, -3:
//     str = "negative"
//   default:
//     str = "unknown"
// }`

String.raw`var i = 10; 
while i >= 0 {
  i--
}`,

[
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "10" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "while" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: ">" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "-" },
  { type: "OPERATOR",             value: "-" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "PUNCTUATION",          value: "}" }, 
  { type: "TERMINATOR",           value: "EOF"}
],

String.raw`var i = 10; 
while (i >= 0) {
  i--
}`,

[
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "10" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "while" },
  { type: "PUNCTUATION",          value: "(" },
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: ">" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ")" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "i" },
  { type: "OPERATOR",             value: "-" },
  { type: "OPERATOR",             value: "-" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "PUNCTUATION",          value: "}" }, 
  { type: "TERMINATOR",           value: "EOF"}
],

String.raw`var a = false
var b = 0;
if (a) {
  b++;
}`

[
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "BOOLEAN",              value: "false" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "b" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "PUNCTUATION",          value: "(" },
  { type: "IDENTIFIER",           value: "a" },
  { type: "PUNCTUATION",          value: ")" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "b" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "+" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "PUNCTUATION",          value: "}" }, 
  { type: "TERMINATOR",           value: "EOF"},
]

String.raw`var diceRoll = 6;
if ++diceRoll == 7 {
  diceRoll = 1
}`

[
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "diceRoll" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "6" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "+" },  
  { type: "IDENTIFIER",           value: "diceRoll" },
  { type: "OPERATOR",             value: "=" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "7" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "diceRoll" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "1" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "PUNCTUATION",          value: "}" }, 
  { type: "TERMINATOR",           value: "EOF"},
]

String.raw`var x = 2
var y = "";
switch x {
  case 1,2,3:
    y += "positive";
  case -1,-2,-3:
    y += "negative";
  case 0: 
    y += "zero";
  default: 
    y += "dunno";
}`

[
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "x" },
  { type: "OPERATOR",             value: "=" },
  { type: "NUMBER",               value: "2" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "switch" },
  { type: "IDENTIFIER",           value: "x" }, 
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "case" },
  { type: "NUMBER",               value: "1" },
  { type: "PUNCTUATION",          value: "," },  
  { type: "NUMBER",               value: "2" },
  { type: "PUNCTUATION",          value: "," }, 
  { type: "NUMBER",               value: "3" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "positive" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "case" },
  { type: "OPERATOR",             value: "-" },
  { type: "NUMBER",               value: "1" },
  { type: "PUNCTUATION",          value: "," }, 
  { type: "OPERATOR",             value: "-" }, 
  { type: "NUMBER",               value: "2" },
  { type: "PUNCTUATION",          value: "," }, 
  { type: "OPERATOR",             value: "-" },
  { type: "NUMBER",               value: "3" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "negative" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "case" },
  { type: "NUMBER",               value: "0" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "zero" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "STATEMENT_KEYWORD",    value: "default" },
  { type: "PUNCTUATION",          value: ":" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "+" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "dunno" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "PUNCTUATION",          value: "}" }, 
  { type: "TERMINATOR",           value: "EOF"},
],

String.raw`var x = true
var y = false;
var a = ""
var z;
if (x) {
  if y {
    z = true;
  } else if (true) {
      a = "<3 JS";
  } else {
      a = "never get here";
  }
} else {
  a = "x is false";
}`

[
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "x" },
  { type: "OPERATOR",             value: "=" },
  { type: "BOOLEAN",              value: "true" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "OPERATOR",             value: "=" },
  { type: "BOOLEAN",              value: "false" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "" },
  { type: "TERMINATOR",           value: "\\n"},
  { type: "DECLARATION_KEYWORD",  value: "var" },
  { type: "IDENTIFIER",           value: "z" },
  { type: "PUNCTUATION",          value: ";" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "PUNCTUATION",          value: "(" },
  { type: "IDENTIFIER",           value: "x" },
  { type: "PUNCTUATION",          value: ")" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "IDENTIFIER",           value: "y" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "IDENTIFIER",           value: "z" },
  { type: "OPERATOR",             value: "=" },
  { type: "BOOLEAN",              value: "true" },
  { type: "PUNCTUATION",          value: ";" }, 
  { type: "TERMINATOR",           value: "\\n"},

  { type: "PUNCTUATION",          value: "}" },
  { type: "STATEMENT_KEYWORD",    value: "else" },
  { type: "STATEMENT_KEYWORD",    value: "if" },
  { type: "PUNCTUATION",          value: "(" },
  { type: "BOOLEAN",              value: "true" },
  { type: "PUNCTUATION",          value: ")" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "<3 JS" },
  { type: "PUNCTUATION",          value: ";" }, 
  { type: "TERMINATOR",           value: "\\n"},

  { type: "PUNCTUATION",          value: "}" },
  { type: "STATEMENT_KEYWORD",    value: "else" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "never get here" },
  { type: "PUNCTUATION",          value: ";" }, 
  { type: "TERMINATOR",           value: "\\n"},

  { type: "PUNCTUATION",          value: "}" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "PUNCTUATION",          value: "}" },
  { type: "STATEMENT_KEYWORD",    value: "else" },
  { type: "PUNCTUATION",          value: "{" },
  { type: "TERMINATOR",           value: "\\n"},

  { type: "IDENTIFIER",           value: "a" },
  { type: "OPERATOR",             value: "=" },
  { type: "STRING",               value: "x is false" },
  { type: "PUNCTUATION",          value: ";" }, 
  { type: "TERMINATOR",           value: "\\n"},

  { type: "PUNCTUATION",          value: "}" }, 
  { type: "TERMINATOR",           value: "EOF"},
]
