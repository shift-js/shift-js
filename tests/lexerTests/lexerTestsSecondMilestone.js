var lexicalTypes    = require('../../transpiler/lexer/lexicalTypes');
var lexerFunctions  = require('../../transpiler/lexer/lexerFunctions');
var lexer           = require('../../transpiler/lexer/lexer');
var expect          = require('chai').expect;

describe('Lexer: Second milestone', function() {

  describe('Single-Line If statements', function() {

    it('should handle single-line if statements', function() {
      input = String.raw`var a = 5; if (true) {--a};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "BOOLEAN",              value: "true" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single-line if statements with multi-character logical operators', function() {
      input = String.raw`var b = 6; if (5 <= 6) {b++};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "b" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "NUMBER",               value: "5" },
        { type: "OPERATOR",             value: "<" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "b" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single-line if statements with multi-character logical operators and multi-character mathematical operators', function() {
      input = String.raw`var c = 1; if (c == 1) {c *= 5};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "*" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single-line if statements without a parenthetical', function() {
      input = String.raw`var d = 1; if d != 2 {d++};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "d" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "IDENTIFIER",           value: "d" },
        { type: "OPERATOR",             value: "!" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "d" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle complex conditionals without an outer parenthetical', function() {
      input = String.raw`var e = 1; if (e + 1) == 2 {e = 5};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "e" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "IDENTIFIER",           value: "e" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "e" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single line if/else statements', function() {
      input = String.raw`var f = true; if !f {f = true} else {f = false};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "f" },
        { type: "OPERATOR",             value: "=" },
        { type: "BOOLEAN",              value: "true" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "OPERATOR",             value: "!" },
        { type: "IDENTIFIER",           value: "f" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "f" },
        { type: "OPERATOR",             value: "=" },
        { type: "BOOLEAN",              value: "true" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "else" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "f" },
        { type: "OPERATOR",             value: "=" },
        { type: "BOOLEAN",              value: "false" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single-line if/else-if/else statements with parentheticals', function() {
      input = String.raw`var a = 1; if (1 > 2) {++a} else if (1 < 2) {--a} else {a = 42}`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "NUMBER",               value: "1" },
        { type: "OPERATOR",             value: ">" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "else" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "NUMBER",               value: "1" },
        { type: "OPERATOR",             value: "<" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "else" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "42" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single-line if/else-if/else statements with parentheticals', function() {
      input = String.raw`var a = 1; if 1 > 2 {++a} else if 1 < 2 {--a} else {a = 42}`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "NUMBER",               value: "1" },
        { type: "OPERATOR",             value: ">" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "else" },
        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "NUMBER",               value: "1" },
        { type: "OPERATOR",             value: "<" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "else" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "42" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe(' Single-Line While/Repeat-While loops', function() {

    it('should handle single-line while loops with a parenthetical', function() {
      input = String.raw`var i = 10; while (i >= 0) {i--}`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "10" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "while" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: ">" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single-line while loops without a parenthetical', function() {
      input = String.raw`var i = 10; while i >= 0 {i--}`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "10" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "while" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: ">" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single-line repeat-while loops with a parenthetical', function() {
      input = String.raw`var i = 10; repeat {i--} while (i >= 0)`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "10" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "repeat" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "while" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: ">" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single-line repeat-while loops without a parenthetical', function() {
      input = String.raw`var i = 10; repeat {i--} while i >= 0`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "10" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "repeat" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "while" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: ">" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Single-Line For loops', function() {

    it('should handle single-line for loops with a parenthetical', function() {
      input = String.raw`var a = 0; for (var i = 10; i > 0; i--) {a++};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "for" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "10" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: ">" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle single-line for loops without a parenthetical', function() {
      input = String.raw`var b = 0; for var j = 0; j < 10; j++ {b++};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "b" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "for" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "j" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "j" },
        { type: "OPERATOR",             value: "<" },
        { type: "NUMBER",               value: "10" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "j" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "b" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Single-Line For-In loops', function() {

    it('should handle simple, single-line for-in loops without a parenthetical', function() {
      input = String.raw`var c = 0; var numbers = [1,2,3,4,5]; for n in numbers {c += n};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "numbers" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "4" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "5" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "for" },
        { type: "IDENTIFIER",           value: "n" },
        { type: "STATEMENT_KEYWORD",    value: "in" },
        { type: "IDENTIFIER",           value: "numbers" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "n" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle simple, single-line for-in loops with a parenthetical and the item declared as a variable', function() {
      input = String.raw`var c = 0; var numbers = [1,2,3,4,5]; for (var n) in numbers {c += n};`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "numbers" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "4" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "5" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "STATEMENT_KEYWORD",    value: "for" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "n" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "STATEMENT_KEYWORD",    value: "in" },
        { type: "IDENTIFIER",           value: "numbers" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "n" },
        { type: "PUNCTUATION",          value: "}" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Multi-line statements', function() {
    it('should handle simple multi-line variable assignment', function() {
      input = String.raw`var b = true;
               var c = 0;`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "b" },
        { type: "OPERATOR",             value: "=" },
        { type: "BOOLEAN",              value: "true" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"},
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle complex multi-line variable assignment without semi-colons', function() {
      input = String.raw`var e = ["Eggs", "Milk", "Bacon"]
               var f = ["one": 1, "two": 2, "three": 3]
               let g = [1 : "one",2   :"two", 3: "three"]`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "e" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "STRING",               value: "Eggs" },
        { type: "PUNCTUATION",          value: "," },
        { type: "STRING",               value: "Milk" },
        { type: "PUNCTUATION",          value: "," },
        { type: "STRING",               value: "Bacon" },
        { type: "ARRAY_END",            value: "]" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "f" },
        { type: "OPERATOR",             value: "=" },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "STRING",               value: "one" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "STRING",               value: "two" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "," },
        { type: "STRING",               value: "three" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "NUMBER",               value: "3" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "g" },
        { type: "OPERATOR",             value: "=" },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "STRING",               value: "one" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "STRING",               value: "two" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "STRING",               value: "three" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "TERMINATOR",           value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    })

    it('should handle simple multi-line variable assignment with type annotations', function() {
      input = String.raw`var name: String = "Joe"
              let num: Int = 5;
              let anotherNum: UInt16 = 6
              var yetAnotherNum: Float = 4.2;
              let truth: Bool = false
              `;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "name" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String"},
        { type: "OPERATOR",             value: "=" },
        { type: "STRING",               value: "Joe" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "num" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int"},
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "anotherNum" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "UInt16"},
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "yetAnotherNum" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Float"},
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "4.2" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "truth" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_BOOLEAN",         value: "Bool"},
        { type: "OPERATOR",             value: "=" },
        { type: "BOOLEAN",              value: "false" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle successive single-line comments', function() {
      input = String.raw`// function body goes here
      // firstParameterName and secondParameterName refer to
      // the argument values for the first and second parameters
      `;
      output = [
        { type: "COMMENT_START", value: "//"},
        { type: "COMMENT", value: " function body goes here"},
        { type: "TERMINATOR", value: "\\n"},
        { type: "COMMENT_START", value: "//"},
        { type: "COMMENT", value: " firstParameterName and secondParameterName refer to"},
        { type: "TERMINATOR", value: "\\n"},
        { type: "COMMENT_START", value: "//"},
        { type: "COMMENT", value: " the argument values for the first and second parameters"},
        { type: "TERMINATOR", value: "\\n"},
        { type: "TERMINATOR", value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle multi-line comments', function() {
      input = String.raw`/*
      Comment 1
      Comment 2
      */
      `;
      output = [
        { type: "MULTI_LINE_COMMENT_START", value: "/*"},
        { type: "TERMINATOR", value: "\\n"},
        { type: "COMMENT", value: "Comment 1"},
        { type: "TERMINATOR", value: "\\n"},
        { type: "COMMENT", value: "Comment 2"},
        { type: "TERMINATOR", value: "\\n"},
        { type: "MULTI_LINE_COMMENT_END", value: "*/"},
        { type: "TERMINATOR", value: "\\n"},
        { type: "TERMINATOR", value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Multi-line if statements', function() {
    it('should handle simple multi-line if statements', function() {
      input = String.raw`var a = false
              var b = 0;
              if (a) {
                b++;
              }`;
      output = [
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
      expect(lexer(input)).to.deep.equal(output);
    });


    it('should handle simple multi-line if statements with complex conditions', function() {
      input = String.raw`var diceRoll = 6;
              if ++diceRoll == 7 {
                diceRoll = 1
              }`;
      output = [
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
      expect(lexer(input)).to.deep.equal(output);
    });


    it('should handle simple multi-line nested if statements', function() {
      input = String.raw`var x = true
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
              }`;
      output = [
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
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Multi-line for loops', function() {
    it('should handle simple multi-line for loops', function() {
      input = String.raw`var b = 0;
              for var i = 0; i < 10; i++ {
                b++
              }`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "b" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "for" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "<" },
        { type: "NUMBER",               value: "10" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "b" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle multi-line nested for loops', function() {
      input = String.raw`var arrays = [[1,2,3], [4,5,6], [7,8,9]]
               var total = 0
               for (var i = 0; i < 3; i++) {
                 for var j = 0; j < 3; j++ {
                   total += arrays[i][j]
                 }
               }`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "arrays" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "3" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "4" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "5" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "6" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "7" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "8" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "9" },
        { type: "ARRAY_END",            value: "]" },
        { type: "ARRAY_END",            value: "]" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "total" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "for" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "<" },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "for" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "j" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "j" },
        { type: "OPERATOR",             value: "<" },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "j" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "total" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "arrays" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "SUBSCRIPT_LOOKUP_END",     value: "]" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "IDENTIFIER",           value: "j" },
        { type: "SUBSCRIPT_LOOKUP_END",     value: "]" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Multi-line for-in loops', function() {
    it('should handle simple multi-line for-in loops', function() {
      input = String.raw`var c = 0
               var numbers = [1,2,3,4,5]
               for n in numbers {
                 c += n
               }`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "0" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "numbers" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "4" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "5" },
        { type: "ARRAY_END",            value: "]" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "for" },
        { type: "IDENTIFIER",           value: "n" },
        { type: "STATEMENT_KEYWORD",    value: "in" },
        { type: "IDENTIFIER",           value: "numbers" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "n" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('handle for-in loops that iterate over a range', function () {
      input = String.raw`var sum = 0
                    for i in 0..<5 {
                        sum += i
                    }`;;
      output = [
        { type: 'DECLARATION_KEYWORD',            value: 'var' },
        { type: 'IDENTIFIER',                     value: 'sum' },
        { type: 'OPERATOR',                       value: '=' },
        { type: 'NUMBER',                         value: '0' },
        { type: 'TERMINATOR',                     value: '\\n' },
        { type: "STATEMENT_KEYWORD",              value: "for" },
        { type: "IDENTIFIER",                     value: "i" },
        { type: "STATEMENT_KEYWORD",              value: "in" },
        { type: 'NUMBER',                         value: '0' },
        { type: 'HALF_OPEN_RANGE',                value: '..<'},
        { type: 'NUMBER',                         value: '5' },
        { type: "PUNCTUATION",                    value: "{" },
        { type: "TERMINATOR",                     value: "\\n"},
        { type: "IDENTIFIER",                     value: "sum" },
        { type: "OPERATOR",                       value: "+" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "i" },
        { type: "TERMINATOR",                     value: "\\n"},
        { type: "PUNCTUATION",                    value: "}" },
        { type: "TERMINATOR",                     value: "EOF"},
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle for-in loops that iterate over items in a dictionary', function () {
      input = String.raw`let interestingNumbers = [
                        "Prime": [2, 3, 5, 7, 11, 13],
                        "Fibonacci": [1, 1, 2, 3, 5, 8],
                        "Square": [1, 4, 9, 16, 25],
                    ]
                    var largest = 0
                    for (kind, numbers) in interestingNumbers {
                        for number in numbers {
                            if number > largest {
                                largest = number
                            }
                        }
                    }`;;
      output = [
        { type: 'DECLARATION_KEYWORD',         value: 'let' },
        { type: 'IDENTIFIER',                  value: 'interestingNumbers' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'DICTIONARY_START',            value: '[' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STRING',                      value: 'Prime' },
        { type: 'PUNCTUATION',                 value: ':' },
        { type: 'ARRAY_START',                 value: '[' },
        { type: 'NUMBER',                      value: '2' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '3' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '5' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '7' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '11' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '13' },
        { type: 'ARRAY_END',                   value: ']' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STRING',                      value: 'Fibonacci' },
        { type: 'PUNCTUATION',                 value: ':' },
        { type: 'ARRAY_START',                 value: '[' },
        { type: 'NUMBER',                      value: '1' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '1' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '2' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '3' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '5' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '8' },
        { type: 'ARRAY_END',                   value: ']' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STRING',                      value: 'Square' },
        { type: 'PUNCTUATION',                 value: ':' },
        { type: 'ARRAY_START',                 value: '[' },
        { type: 'NUMBER',                      value: '1' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '4' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '9' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '16' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'NUMBER',                      value: '25' },
        { type: 'ARRAY_END',                   value: ']' },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'DICTIONARY_END',              value: ']' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: "DECLARATION_KEYWORD",         value: "var" },
        { type: "IDENTIFIER",                  value: "largest" },
        { type: "OPERATOR",                    value: "=" },
        { type: "NUMBER",                      value: "0" },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: "STATEMENT_KEYWORD",           value: "for" },
        { type: 'PUNCTUATION',                 value: '(' },
        { type: "IDENTIFIER",                  value: "kind" },
        { type: 'PUNCTUATION',                 value: ',' },
        { type: "IDENTIFIER",                  value: "numbers" },
        { type: 'PUNCTUATION',                 value: ')' },
        { type: "STATEMENT_KEYWORD",           value: "in" },
        { type: "IDENTIFIER",                  value: "interestingNumbers" },
        { type: "PUNCTUATION",                 value: "{" },
        { type: "TERMINATOR",                  value: "\\n"},
        { type: "STATEMENT_KEYWORD",           value: "for" },
        { type: "IDENTIFIER",                  value: "number" },
        { type: "STATEMENT_KEYWORD",           value: "in" },
        { type: "IDENTIFIER",                  value: "numbers" },
        { type: "PUNCTUATION",                 value: "{" },
        { type: "TERMINATOR",                  value: "\\n"},
        { type: "STATEMENT_KEYWORD",           value: "if" },
        { type: "IDENTIFIER",                  value: "number" },
        { type: "OPERATOR",                    value: ">" },
        { type: "IDENTIFIER",                  value: "largest" },
        { type: "PUNCTUATION",                 value: "{" },
        { type: "TERMINATOR",                  value: "\\n"},
        { type: "IDENTIFIER",                  value: "largest" },
        { type: "OPERATOR",                    value: "=" },
        { type: "IDENTIFIER",                  value: "number" },
        { type: "TERMINATOR",                  value: "\\n"},
        { type: "PUNCTUATION",                 value: "}" },
        { type: "TERMINATOR",                  value: "\\n"},
        { type: "PUNCTUATION",                 value: "}" },
        { type: "TERMINATOR",                  value: "\\n"},
        { type: "PUNCTUATION",                 value: "}" },
        { type: "TERMINATOR",                  value: "EOF"},
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Multi-Line While/Repeat-While loops', function() {

    it('should handle multi-line while loops without a parenthetical', function() {
      input = String.raw`var i = 10;
              while i >= 0 {
                i--
              }`;
      output = [
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
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle multi-line while loops with a parenthetical', function() {
      input = String.raw`var i = 10;
              while (i >= 0) {
                i--
              }`;
      output = [
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
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle multi-line repeat-while loops with a parenthetical', function() {
      input = String.raw`var i = 10;
               repeat {
                 i--
               } while (i > 0);`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "10" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "repeat" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "while" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: ">" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle multi-line repeat-while loops without a parenthetical', function() {
      input = String.raw`var i = 10
               repeat {
                 i--
               } while i > 0`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "10" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "repeat" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "while" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: ">" },
        { type: "NUMBER",               value: "0" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Switch Statements', function() {

    it('should handle multi-line switch statements', function() {
      input = String.raw`var x = 2
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
              }`;
      output = [
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
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Complex Control Flow', function () {

    it('shold handle nested if-else statements within a loop', function () {
      input = String.raw`var gameInProgress = false;
                    var score = 0;
                    var typeOfScore = "";
                    var PAT = "";
                    while gameInProgress {
                        if typeOfScore != "" {
                            if typeOfScore == "TD" {
                                score += 6
                            } else if typeOfScore == "PAT" {
                                if PAT == "TD" {
                                    score += 2
                                } else {
                                    score += 1
                                }
                            } else if typeOfScore == "FG" {
                                score += 3
                            } else {
                                score += 2
                            }
                            typeOfScore = ""
                        }
                    }
                    `;
      output = [
        { type: 'DECLARATION_KEYWORD',         value: 'var' },
        { type: 'IDENTIFIER',                  value: 'gameInProgress' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'BOOLEAN',                     value: 'false' },
        { type: 'PUNCTUATION',                 value: ';' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'DECLARATION_KEYWORD',         value: 'var' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '0' },
        { type: 'PUNCTUATION',                 value: ';' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'DECLARATION_KEYWORD',         value: 'var' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: '' },
        { type: 'PUNCTUATION',                 value: ';' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'DECLARATION_KEYWORD',         value: 'var' },
        { type: 'IDENTIFIER',                  value: 'PAT' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: '' },
        { type: 'PUNCTUATION',                 value: ';' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STATEMENT_KEYWORD',           value: 'while' },
        { type: 'IDENTIFIER',                  value: 'gameInProgress' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '!' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: '' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: 'TD' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '6' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'STATEMENT_KEYWORD',           value: 'else' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: 'PAT' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'IDENTIFIER',                  value: 'PAT' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: 'TD' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '2' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'STATEMENT_KEYWORD',           value: 'else' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '1' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'STATEMENT_KEYWORD',           value: 'else' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: 'FG' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '3' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'STATEMENT_KEYWORD',           value: 'else' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '2' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: '' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: 'EOF' }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle complex control flow with erratic spacing and inconsistent use of semicolons and parenthesis', function () {
      input = String.raw`



                  var gameInProgress = false;

                  var score = 0

                  var typeOfScore = "";
                                           var PAT = "";


                  while gameInProgress {
                      if               (typeOfScore != "")
                      {
                      if typeOfScore == "TD" {
                              score += 6
                          } else if typeOfScore == "PAT" {
                              if PAT == "TD" {

                                  score += 2;
                              } else {
                                  score += 1;


                                                                     }
                          } else if (typeOfScore == "FG") {
                              score += 3
                          }

                      else {

                              score += 2
                  }
                          typeOfScore = ""
                      }
                   }

                  `;
      output = [
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'DECLARATION_KEYWORD',         value: 'var' },
        { type: 'IDENTIFIER',                  value: 'gameInProgress' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'BOOLEAN',                     value: 'false' },
        { type: 'PUNCTUATION',                 value: ';' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'DECLARATION_KEYWORD',         value: 'var' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '0' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'DECLARATION_KEYWORD',         value: 'var' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: '' },
        { type: 'PUNCTUATION',                 value: ';' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'DECLARATION_KEYWORD',         value: 'var' },
        { type: 'IDENTIFIER',                  value: 'PAT' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: '' },
        { type: 'PUNCTUATION',                 value: ';' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STATEMENT_KEYWORD',           value: 'while' },
        { type: 'IDENTIFIER',                  value: 'gameInProgress' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'PUNCTUATION',                 value: '(' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '!' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: '' },
        { type: 'PUNCTUATION',                 value: ')' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: 'TD' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '6' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'STATEMENT_KEYWORD',           value: 'else' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: 'PAT' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'IDENTIFIER',                  value: 'PAT' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: 'TD' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '2' },
        { type: 'PUNCTUATION',                 value: ';' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'STATEMENT_KEYWORD',           value: 'else' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '1' },
        { type: 'PUNCTUATION',                 value: ';' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'STATEMENT_KEYWORD',           value: 'else' },
        { type: 'STATEMENT_KEYWORD',           value: 'if' },
        { type: 'PUNCTUATION',                 value: '(' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: 'FG' },
        { type: 'PUNCTUATION',                 value: ')' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '3' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'STATEMENT_KEYWORD',           value: 'else' },
        { type: 'PUNCTUATION',                 value: '{' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'score' },
        { type: 'OPERATOR',                    value: '+' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'NUMBER',                      value: '2' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'IDENTIFIER',                  value: 'typeOfScore' },
        { type: 'OPERATOR',                    value: '=' },
        { type: 'STRING',                      value: '' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'PUNCTUATION',                 value: '}' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: '\\n' },
        { type: 'TERMINATOR',                  value: 'EOF' }

      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });
});
