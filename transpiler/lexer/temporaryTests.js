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

// [
//   { type: "DECLARATION_KEYWORD",  value: "var" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "=" },
//   { type: "NUMBER",               value: "0" },
//   { type: "PUNCTUATION",          value: ";" },
//   { type: "TERMINATOR",           value: "\n"},
//   { type: "STATEMENT_KEYWORD",    value: "repeat" },
//   { type: "PUNCTUATION",          value: "{" },
//   { type: "TERMINATOR",           value: "\n"},
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "+" },
//   { type: "OPERATOR",             value: "+" },
//   { type: "TERMINATOR",           value: "\n"},
//   { type: "PUNCTUATION",          value: "}" },
//   { type: "STATEMENT_KEYWORD",    value: "while" },
//   { type: "IDENTIFIER",           value: "i" },
//   { type: "OPERATOR",             value: "<" },
//   { type: "NUMBER",               value: "10" },
//   { type: "TERMINATOR",           value: "EOF"}
// ]