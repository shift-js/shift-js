var lexicalTypes    = require('./../transpiler/lexer/lexicalTypes');
var lexerFunctions  = require('./../transpiler/lexer/lexerFunctions');
var lexer           = require('./../transpiler/lexer/lexer');
var expect          = require('chai').expect;


describe('Lexer', function() {
  describe('First milestone', function() {

    describe('Basic tests', function () {
      it('should handle variable declarations with numbers', function () {
        input = 'var a = 3';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "3" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle variable reassignment', function () {
        input = 'var a = 1; a = 2';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";"},
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "2" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle variable names with underscores', function () {
        input = String.raw`var my_var = 5`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "my_var" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle lines that end with a semicolon', function () {
        input = String.raw`var myVar = 5;`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "myVar" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle variable declarations with erratic spacing', function () {
        input = String.raw`var myVar                   =                       5          ;`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "myVar" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle strings', function () {
        input = 'var b = "hello"';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "hello" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle booleans', function () {
        input = 'var c = true';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "true" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle strings with whitespace', function () {
        input = 'var d = "Test this"';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "d" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "Test this" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle comments', function () {
        input = '/* Comment 1 */ var a = 1 // Comment 2';
        output = [
          { type: "MULTI_LINE_COMMENT_START",  value: "/*"},
          { type: "COMMENT",                   value: " Comment 1 "},
          { type: "MULTI_LINE_COMMENT_END",    value: "*/"},
          { type: "DECLARATION_KEYWORD",       value: "var" },
          { type: "IDENTIFIER",                value: "a" },
          { type: "OPERATOR",                  value: "=" },
          { type: "NUMBER",                    value: "1" },
          { type: "COMMENT_START",             value: "//"},
          { type: "COMMENT",                   value: " Comment 2"},
          { type: "TERMINATOR",                value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
    });

    describe('Basic collections', function () {

      it('should handle empty arrays', function () {
        input = 'var empty = []';
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "empty" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "["},
          { type: "ARRAY_END",                  value: "]"},
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle empty dictionaries', function () {
        input = 'var empty = [:]';
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "empty" },
          { type: "OPERATOR",                   value: "=" },
          { type: "DICTIONARY_START",           value: "["},
          { type: "PUNCTUATION",                value: ":"},
          { type: "DICTIONARY_END",             value: "]"},
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle initializer syntax for arrays', function () {
        input = String.raw`var empty = [String]();`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "empty" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "["},
          { type: "TYPE_STRING",                value: "String"},
          { type: "ARRAY_END",                  value: "]"},
          { type: "INVOCATION_START",           value: "(" }, 
          { type: "INVOCATION_END",             value: ")" },
          { type: "PUNCTUATION",                value: ";"},
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle initializer syntax for dictionaries', function () {
        input = String.raw`var empty = [String:UInt16]();`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "empty" },
          { type: "OPERATOR",                   value: "=" },
          { type: "DICTIONARY_START",           value: "["},
          { type: "TYPE_STRING",                value: "String"},
          { type: "PUNCTUATION",                value: ":"},
          { type: "TYPE_NUMBER",                value: "UInt16"},
          { type: "DICTIONARY_END",             value: "]"},
          { type: "INVOCATION_START",           value: "(" }, 
          { type: "INVOCATION_END",             value: ")" },
          { type: "PUNCTUATION",                value: ";"},
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle arrays', function () {
        input = 'var e = ["Eggs", "Milk", "Bacon"]';
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
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle arrays with erratic spacing', function () {
        input = 'var e = [  "Eggs","Milk",           "Bacon"                ] ;';
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
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle dictionaries', function () {
        input = 'var f = ["one": 1, "two": 2, "three": 3]';
        output = [
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
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle tuples', function () {
        input = 'var error = (404, "not found")';
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "error" },
          { type: "OPERATOR",                   value: "=" },
          { type: "TUPLE_START",                value: "("},
          { type: "NUMBER",                     value: "404"},
          { type: "PUNCTUATION",                value: "," },
          { type: "STRING",                     value: "not found"},
          { type: "TUPLE_END",                  value: ")"},
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle tuples with element names', function () {
        input = 'let http200Status = (statusCode: 200, description: "OK");';
        output = [
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "http200Status" },
          { type: "OPERATOR",                   value: "=" },
          { type: "TUPLE_START",                value: "("},
          { type: "TUPLE_ELEMENT_NAME",         value: "statusCode"},
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "200"},
          { type: "PUNCTUATION",                value: "," },
          { type: "TUPLE_ELEMENT_NAME",         value: "description"},
          { type: "PUNCTUATION",                value: ":" },
          { type: "STRING",                     value: "OK"},
          { type: "TUPLE_END",                  value: ")"},
          { type: "PUNCTUATION",                value: ";" },
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle empty tuples', function () {
        input = 'var empty = ()';
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "empty" },
          { type: "OPERATOR",                   value: "=" },
          { type: "TUPLE_START",                value: "("},
          { type: "TUPLE_END",                  value: ")"},
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle erratic spacing', function () {
        input = 'let g = [1 : "one",2   :"two", 3: "three"]';
        output = [
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
      });
    });

    describe('Numbers and operations', function () {
      it('should handle floating point numbers', function () {
        input = 'let h = 3.14';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "h" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "3.14" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle unspaced operators', function () {
        input = 'let i = 5+6';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "6" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle order of operations', function () {
        input = 'var j = 5 + 6 / 4 - (-16 % 4.2) * 55';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "j" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: "/" },
          { type: "NUMBER",               value: "4" },
          { type: "OPERATOR",             value: "-" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "OPERATOR",             value: "-" },
          { type: "NUMBER",               value: "16" },
          { type: "OPERATOR",             value: "%" },
          { type: "NUMBER",               value: "4.2" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "OPERATOR",             value: "*" },
          { type: "NUMBER",               value: "55" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle comparisons', function () {
        input = 'let l = 6 != 9';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "l" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: "!" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "9" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle complex comparisons', function () {
        input = 'var l = 6 != 7 || 6 == 7 || 6 > 7 || 6 < 7 || 6 >= 7 || 6 <= 7;';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "l" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: "!" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "7" },
          { type: "OPERATOR",             value: "|" },
          { type: "OPERATOR",             value: "|" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: "=" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "7" },
          { type: "OPERATOR",             value: "|" },
          { type: "OPERATOR",             value: "|" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: ">" },
          { type: "NUMBER",               value: "7" },
          { type: "OPERATOR",             value: "|" },
          { type: "OPERATOR",             value: "|" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: "<" },
          { type: "NUMBER",               value: "7" },
          { type: "OPERATOR",             value: "|" },
          { type: "OPERATOR",             value: "|" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: ">" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "7" },
          { type: "OPERATOR",             value: "|" },
          { type: "OPERATOR",             value: "|" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: "<" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "7" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle prefix operators', function () {
        input = 'var a = 1; var m = ++a; var n = --m;';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "m" },
          { type: "OPERATOR",             value: "=" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "n" },
          { type: "OPERATOR",             value: "=" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "IDENTIFIER",           value: "m" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle postfix operators', function () {
        input = 'var a = 1; var m = a++; var n = m--;';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "m" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "n" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "m" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle unary operators', function () {
        input = 'var a = true; var b = !a; var c = -a; var d = +b';
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "a" },
          { type: "OPERATOR",                   value: "=" },
          { type: "BOOLEAN",                    value: "true" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "b" },
          { type: "OPERATOR",                   value: "=" },
          { type: "OPERATOR",                   value: "!" },
          { type: "IDENTIFIER",                 value: "a" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "c" },
          { type: "OPERATOR",                   value: "=" },
          { type: "OPERATOR",                   value: "-" },
          { type: "IDENTIFIER",                 value: "a" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "d" },
          { type: "OPERATOR",                   value: "=" },
          { type: "OPERATOR",                   value: "+" },
          { type: "IDENTIFIER",                 value: "b" },
          { type: "TERMINATOR",                 value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle compound assignment operators', function() {
        input = 'var x = 5; x += 4; x -= 3; x *= 2; x /= 1; x %= 2;';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "4" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "OPERATOR",             value: "*" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "OPERATOR",             value: "/" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "OPERATOR",             value: "%" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle logical operators', function() {
        input = 'var a = !true && true || true';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "OPERATOR",             value: "!" },
          { type: "BOOLEAN",              value: "true" },
          { type: "OPERATOR",             value: "&" },
          { type: "OPERATOR",             value: "&" },
          { type: "BOOLEAN",              value: "true" },
          { type: "OPERATOR",             value: "|" },
          { type: "OPERATOR",             value: "|" },
          { type: "BOOLEAN",              value: "true" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle ternary operators', function () {
        input = 'var a = (6 == 7) ? 1 : -1';
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "a" },
          { type: "OPERATOR",                   value: "=" },
          { type: "PUNCTUATION",                value: "(" },
          { type: "NUMBER",                     value: "6" },
          { type: "OPERATOR",                   value: "=" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "7" },
          { type: "PUNCTUATION",                value: ")" },
          { type: "OPERATOR",                   value: "?" },
          { type: "NUMBER",                     value: "1" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "OPERATOR",                   value: "-" },
          { type: "NUMBER",                     value: "1" },
          { type: "TERMINATOR",                 value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle ternary operators without a parenthetical', function () {
        input = 'var g = 6 == 7 ? true : false;';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "g" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: "=" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "7" },  
          { type: "OPERATOR",             value: "?" },
          { type: "BOOLEAN",              value: "true" }, 
          { type: "PUNCTUATION",          value: ":" }, 
          { type: "BOOLEAN",              value: "false" },   
          { type: "PUNCTUATION",          value: ";" }, 
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle ternary operators that include identifiers', function () {
        input = 'let h = false; let i = h ? 1 : 2;';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "h" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "false" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "h" },
          { type: "OPERATOR",             value: "?" },
          { type: "NUMBER",               value: "1" },  
          { type: "PUNCTUATION",          value: ":" },
          { type: "NUMBER",               value: "2" },  
          { type: "PUNCTUATION",          value: ";" }, 
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle closed ranges', function () {
        input = 'var a = 1...5';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "CLOSED_RANGE",         value: "..." },
          { type: "NUMBER",               value: "5" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle decimal ending in 0 closed ranges', function () {
        input = 'var a = 1.0...5.0';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1.0" },
          { type: "CLOSED_RANGE",         value: "..." },
          { type: "NUMBER",               value: "5.0" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle random decimal closed ranges', function () {
        input = 'var a = 1.2...5.3';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1.2" },
          { type: "CLOSED_RANGE",         value: "..." },
          { type: "NUMBER",               value: "5.3" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle half-open ranges', function () {
        input = 'var b = 1..<5';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "HALF-OPEN_RANGE",      value: "..<" },
          { type: "NUMBER",               value: "5" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle decimal ending in 0 half-open ranges', function () {
        input = 'var a = 1.0..<5.0';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1.0" },
          { type: "HALF-OPEN_RANGE",      value: "..<" },
          { type: "NUMBER",               value: "5.0" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle random decimal half-open ranges', function () {
        input = 'var a = 1.2..<5.3';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1.2" },
          { type: "HALF-OPEN_RANGE",      value: "..<" },
          { type: "NUMBER",               value: "5.3" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle all ranges', function () {
        input = 'var a = 1...5; var b = 2..<6';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "CLOSED_RANGE",         value: "..." },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: ";"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "2" },
          { type: "HALF-OPEN_RANGE",      value: "..<" },
          { type: "NUMBER",               value: "6" },
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
    });

    describe('String concatenation and interpolation', function () {

      it('should handle string concatenation', function () {
        input = String.raw`var k = "Stephen" + " " + "Tabor" + "!"`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "k" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "Stephen" },
          { type: "OPERATOR",             value: "+" },
          { type: "STRING",               value: " " },
          { type: "OPERATOR",             value: "+" },
          { type: "STRING",               value: "Tabor" },
          { type: "OPERATOR",             value: "+" },
          { type: "STRING",               value: "!" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle string interpolation', function () {
        input = String.raw`var planet = "Earth"; let o = "\(planet)"`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "planet" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "Earth" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "o" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "" },
          { type: "STRING_INTERPOLATION_START", value: "\\(" },
          { type: "IDENTIFIER",                 value: "planet" },
          { type: "STRING_INTERPOLATION_END",   value: ")" },
          { type: "STRING",                     value: "" },
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle string interpolation in the middle of a string', function () {
        input = String.raw`var planet = "Earth"; let o = "Hello \(planet)!"`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "planet" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "Earth" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "o" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "Hello " },
          { type: "STRING_INTERPOLATION_START", value: "\\(" },
          { type: "IDENTIFIER",                 value: "planet" },
          { type: "STRING_INTERPOLATION_END",   value: ")" },
          { type: "STRING",                     value: "!" },
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle interpolation containing operations', function () {
        input = String.raw`var p = "\(100 - 99), 2, 3"`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "p" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "" },
          { type: "STRING_INTERPOLATION_START", value: "\\(" },
          { type: "NUMBER",                     value: "100" },
          { type: "OPERATOR",                   value: "-" },
          { type: "NUMBER",                     value: "99" },
          { type: "STRING_INTERPOLATION_END",   value: ")" },
          { type: "STRING",                     value: ", 2, 3" },
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle interpolation containing operations on identifiers', function () {
        input = String.raw`let a = 3; let b = 5; let sum = "the sum of a and b is \(a + b).";`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "a" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "3" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "b" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "5" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "sum" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "the sum of a and b is " },
          { type: "STRING_INTERPOLATION_START", value: "\\(" },
          { type: "IDENTIFIER",                 value: "a" },
          { type: "OPERATOR",                   value: "+" },
          { type: "IDENTIFIER",                 value: "b" },
          { type: "STRING_INTERPOLATION_END",   value: ")" },
          { type: "STRING",                     value: "." },
          { type: "PUNCTUATION",                value: ";" },
          { type: "TERMINATOR",                 value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
    });

    describe('Nested collections', function () {

      it('should handle dictionaries of arrays', function () {
        input = 'let q = ["array1": [1,2,3], "array2": [4,5,6]];';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "q" },
          { type: "OPERATOR",             value: "=" },
          { type: "DICTIONARY_START",     value: "[" },
          { type: "STRING",               value: "array1" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "3" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: "," },
          { type: "STRING",               value: "array2" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "4" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "6" },
          { type: "ARRAY_END",            value: "]" },
          { type: "DICTIONARY_END",       value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle array access', function () {
        input = 'let arr = [1, 2]; var s = arr[0];';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "arr" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "s" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "arr" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "NUMBER",               value: "0" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle array access with numeric operations', function () {
        input = 'let arr = [1, 2]; let t = 100; var u = arr[t - 99];';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "arr" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "t" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "100" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "u" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "arr" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "IDENTIFIER",           value: "t" },
          { type: "OPERATOR",             value: "-" },
          { type: "NUMBER",               value: "99" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle arrays of that contain a substring lookup', function () {
        input = 'let arr = [1,2]; var u = [arr[0]];';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "arr" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "u" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "IDENTIFIER",           value: "arr" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "NUMBER",               value: "0" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle arrays of dictionaries', function () {
        input = 'let arr = [1,2]; var v = [arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]]];';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "arr" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "v" },
          { type: "OPERATOR",             value: "=" },
          { type: "DICTIONARY_START",     value: "[" },
          { type: "IDENTIFIER",           value: "arr" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "NUMBER",               value: "0" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "ARRAY_START",          value: "[" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: "," },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "4" },
          { type: "ARRAY_END",            value: "]" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: "," },
          { type: "IDENTIFIER",           value: "arr" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "ARRAY_START",          value: "[" },
          { type: "ARRAY_START",          value: "[" },
          { type: "STRING",               value: "one" },
          { type: "PUNCTUATION",          value: "," },
          { type: "STRING",               value: "two" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: "," },
          { type: "ARRAY_START",          value: "[" },
          { type: "STRING",               value: "three" },
          { type: "PUNCTUATION",          value: "," },
          { type: "STRING",               value: "four" },
          { type: "ARRAY_END",            value: "]" },
          { type: "ARRAY_END",            value: "]" },
          { type: "DICTIONARY_END",       value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle multi-nested lists', function () {
        input = 'var w = [1: [[1: "two"], [3: "four"]], 2: [["one": 2], ["three": 4]]];';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "w" },
          { type: "OPERATOR",             value: "=" },
          { type: "DICTIONARY_START",     value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "ARRAY_START",          value: "[" },
          { type: "DICTIONARY_START",     value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "STRING",               value: "two" },
          { type: "DICTIONARY_END",       value: "]" },
          { type: "PUNCTUATION",          value: "," },
          { type: "DICTIONARY_START",     value: "[" },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "STRING",               value: "four" },
          { type: "DICTIONARY_END",       value: "]" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "ARRAY_START",          value: "[" },
          { type: "DICTIONARY_START",     value: "[" },
          { type: "STRING",               value: "one" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "NUMBER",               value: "2" },
          { type: "DICTIONARY_END",       value: "]" },
          { type: "PUNCTUATION",          value: "," },
          { type: "DICTIONARY_START",     value: "[" },
          { type: "STRING",               value: "three" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "NUMBER",               value: "4" },
          { type: "DICTIONARY_END",       value: "]" },
          { type: "ARRAY_END",            value: "]" },
          { type: "DICTIONARY_END",       value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      }) ;
    });
  });

  describe('Second milestone', function() {
    
    describe('Single-Line If statements', function() {

      it('should handle single-line if statements', function() {
        input = 'var a = 5; if (true) {--a};';
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
        input = 'var b = 6; if (5 <= 6) {b++};';
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
        input = 'var c = 1; if (c == 1) {c *= 5};';
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
        input = 'var d = 1; if d != 2 {d++};';
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
        input = 'var e = 1; if (e + 1) == 2 {e = 5};';
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
        input = 'var f = true; if !f {f = true} else {f = false};';
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
        input = 'var a = 1; if (1 > 2) {++a} else if (1 < 2) {--a} else {a = 42}';
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
        input = 'var a = 1; if 1 > 2 {++a} else if 1 < 2 {--a} else {a = 42}';
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
        input = 'var i = 10; while (i >= 0) {i--}';
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
        input = 'var i = 10; while i >= 0 {i--}';
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
        input = 'var i = 10; repeat {i--} while (i >= 0)';
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
        input = 'var i = 10; repeat {i--} while i >= 0';
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
        input = 'var a = 0; for (var i = 10; i > 0; i--) {a++};';
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
        input = 'var b = 0; for var j = 0; j < 10; j++ {b++};';
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
        input = 'var c = 0; var numbers = [1,2,3,4,5]; for n in numbers {c += n};';
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
        input = 'var c = 0; var numbers = [1,2,3,4,5]; for (var n) in numbers {c += n};';
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
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "IDENTIFIER",           value: "j" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
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
          { type: 'HALF-OPEN_RANGE',                value: '..<'},
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
    
    describe('Functions', function() {

      it('should handle function declaration and invocation with no spacing and with var in function parameters', function() {
        input = String.raw`func someFunction(var a: Int){
                    a = a + 1;
                }
                someFunction(5);`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "PARAMS_START",         value: "(" },
          { type: "DECLARATION_KEYWORD",  value: "var"},
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: ":" }, 
          { type: "TYPE_NUMBER",          value: "Int" }, 
          { type: "PARAMS_END",           value: ")" },  
          { type: "STATEMENTS_START",     value: "{" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENTS_END",       value: "}"},
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "INVOCATION_START",     value: "(" }, 
          { type: "NUMBER",               value: "5" },   
          { type: "INVOCATION_END",       value: ")" }, 
          { type: "PUNCTUATION",          value: ";" },    
          { type: "TERMINATOR",           value: "EOF"}
        ]
        expect(lexer(input)).to.deep.equal(output);
      });
      
      it('should handle function declaration and invocation with no spacing', function() {
        input = String.raw`func someFunction(a: Int){
                    a = a + 1;
                }
                someFunction(5);`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "PARAMS_START",         value: "(" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: ":" }, 
          { type: "TYPE_NUMBER",          value: "Int" }, 
          { type: "PARAMS_END",           value: ")" },  
          { type: "STATEMENTS_START",     value: "{" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENTS_END",       value: "}"},
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "INVOCATION_START",     value: "(" }, 
          { type: "NUMBER",               value: "5" },   
          { type: "INVOCATION_END",       value: ")" }, 
          { type: "PUNCTUATION",          value: ";" },    
          { type: "TERMINATOR",           value: "EOF"}
        ]
        expect(lexer(input)).to.deep.equal(output);
      });
    

    it('should handle function declaration and invocation with normal spacing', function() {
        input = String.raw`func someFunction (a: Int) {
                    a = a + 1;
                }
                someFunction(5);`
        output = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "PARAMS_START",         value: "(" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: ":" }, 
          { type: "TYPE_NUMBER",          value: "Int" }, 
          { type: "PARAMS_END",           value: ")" },  
          { type: "STATEMENTS_START",     value: "{" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENTS_END",       value: "}"},
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "INVOCATION_START",     value: "(" }, 
          { type: "NUMBER",               value: "5" },   
          { type: "INVOCATION_END",       value: ")" }, 
          { type: "PUNCTUATION",          value: ";" },    
          { type: "TERMINATOR",           value: "EOF"}
        ]
        expect(lexer(input)).to.deep.equal(output);
      });
    
      it('should handle function declaration and invocation with no space after the function name', function() {
        input = String.raw`func someFunction(a: Int) {
                    a = a + 1;
                }
                someFunction(5);`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "PARAMS_START",         value: "(" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: ":" }, 
          { type: "TYPE_NUMBER",          value: "Int" }, 
          { type: "PARAMS_END",           value: ")" },  
          { type: "STATEMENTS_START",     value: "{" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENTS_END",       value: "}"},
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "INVOCATION_START",     value: "(" }, 
          { type: "NUMBER",               value: "5" },   
          { type: "INVOCATION_END",       value: ")" }, 
          { type: "PUNCTUATION",          value: ";" },    
          { type: "TERMINATOR",           value: "EOF"}
        ]
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle function declaration and invocation with no space after the parameter declaration', function() {
        input = String.raw`func someFunction (a: Int){
                    a = a + 1;
                }
                someFunction(5);`
        output = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "PARAMS_START",         value: "(" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: ":" }, 
          { type: "TYPE_NUMBER",          value: "Int" }, 
          { type: "PARAMS_END",           value: ")" },  
          { type: "STATEMENTS_START",     value: "{" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENTS_END",       value: "}"},
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "INVOCATION_START",     value: "(" }, 
          { type: "NUMBER",               value: "5" },   
          { type: "INVOCATION_END",       value: ")" }, 
          { type: "PUNCTUATION",          value: ";" },    
          { type: "TERMINATOR",           value: "EOF"}
        ]
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle function declaration and invocation with erratic spacing', function() {
        input = String.raw`func someFunction        (a: Int)     {
                              a = a + 1;
                          }
                          someFunction      (5);`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "PARAMS_START",         value: "(" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: ":" }, 
          { type: "TYPE_NUMBER",          value: "Int" }, 
          { type: "PARAMS_END",           value: ")" },  
          { type: "STATEMENTS_START",     value: "{" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENTS_END",       value: "}"},
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "someFunction" },
          { type: "INVOCATION_START",     value: "(" }, 
          { type: "NUMBER",               value: "5" },   
          { type: "INVOCATION_END",       value: ")" }, 
          { type: "PUNCTUATION",          value: ";" },    
          { type: "TERMINATOR",           value: "EOF"}
        ]
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle functions that return strings', function() {
        input = String.raw`func sayHelloWorld() -> String {
                               return "hello, world"
                           }`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "sayHelloWorld" },
          { type: "PARAMS_START",         value: "(" },
          { type: "PARAMS_END",           value: ")" }, 
          { type: "RETURN_ARROW",         value: "->" }, 
          { type: "TYPE_STRING",          value: "String" }, 
          { type: "STATEMENTS_START",     value: "{" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "return"}, 
          { type: "STRING",               value: "hello, world" }, 
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENTS_END",       value: "}"},  
          { type: "TERMINATOR",           value: "EOF"}
        ]
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle functions with an input that return strings', function() {
        input = String.raw`func sayHello(personName: String) -> String {
                              let greeting = "Hello, " + personName + "!"
                              return greeting
                          }`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "sayHello" },
          { type: "PARAMS_START",         value: "(" },
          { type: "IDENTIFIER",           value: "personName" },
          { type: "PUNCTUATION",          value: ":" }, 
          { type: "TYPE_STRING",          value: "String" }, 
          { type: "PARAMS_END",           value: ")" }, 
          { type: "RETURN_ARROW",         value: "->" }, 
          { type: "TYPE_STRING",          value: "String" }, 
          { type: "STATEMENTS_START",     value: "{" },  
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "greeting" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "Hello, " }, 
          { type: "OPERATOR",             value: "+" },  
          { type: "IDENTIFIER",           value: "personName" },
          { type: "OPERATOR",             value: "+" },
          { type: "STRING",               value: "!" }, 
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "return"}, 
          { type: "IDENTIFIER",           value: "greeting" }, 
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENTS_END",       value: "}"},  
          { type: "TERMINATOR",           value: "EOF"}
        ]
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle functions that have if statements that use {} and have a return value', function() {
        input = String.raw`func sayHello(alreadyGreeted: Bool) -> String {
                if alreadyGreeted {
                    return "blah"
                } 
            }`;
        output = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "sayHello" },
          { type: "PARAMS_START",         value: "(" },
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
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle functions that have if and else statements that use {} and have a return value', function() {
        input = String.raw`func sayHello(personName: String, alreadyGreeted: Bool) -> String {
                    if alreadyGreeted {
                        return sayHello(personName) + " blah"
                    } else {
                        return sayHello(personName)
                    }
                }`;
        output = [
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
          { type: "IDENTIFIER",           value: "sayHello" },
          { type: "INVOCATION_START",     value: "(" }, 
          { type: "IDENTIFIER",           value: "personName" },
          { type: "INVOCATION_END",       value: ")" }, 
          { type: "OPERATOR",             value: "+" }, 
          { type: "STRING",               value: " blah" }, 
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
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle nested functions with function invocation', function() {
        input = String.raw`func sayHello(firstName: String, lastName: String) -> String {
                    func giveString() -> String {
                      return firstName + " " + lastName
                    }
                    return giveString()
                }`;
        output = [
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

          { type: "STATEMENTS_END",       value: "}" },  
          { type: "TERMINATOR",           value: "\\n"},

          { type: "STATEMENT_KEYWORD",    value: "return"}, 
          { type: "IDENTIFIER",           value: "giveString" },
          { type: "INVOCATION_START",     value: "(" }, 
          { type: "INVOCATION_END",       value: ")" },   
          { type: "TERMINATOR",           value: "\\n"},

          { type: "STATEMENTS_END",       value: "}" },  
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle functions that do no use var when declaring parameters and invocations with named arguments', function () {
        input = String.raw`func greet(name: String, day: String) -> String {
                        return "Hello \(name), today is \(day)."
                    }
                    greet("Bob", day: "Tuesday")`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "func"},
          { type: "IDENTIFIER",                 value: "greet" },
          { type: "PARAMS_START",               value: "(" },
          { type: "IDENTIFIER",                 value: "name" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_STRING",                value: "String" }, 
          { type: "PUNCTUATION",                value: "," },
          { type: "IDENTIFIER",                 value: "day" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_STRING",                value: "String" }, 
          { type: "PARAMS_END",                 value: ")" }, 
          { type: "RETURN_ARROW",               value: "->" }, 
          { type: "TYPE_STRING",                value: "String" }, 
          { type: "STATEMENTS_START",           value: "{" },  
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "STATEMENT_KEYWORD",          value: "return"},
          { type: "STRING",                     value: "Hello " },
          { type: "STRING_INTERPOLATION_START", value: "\\(" },
          { type: "IDENTIFIER",                 value: "name" },
          { type: "STRING_INTERPOLATION_END",   value: ")" },
          { type: "STRING",                     value: ", today is " },
          { type: "STRING_INTERPOLATION_START", value: "\\(" },
          { type: "IDENTIFIER",                 value: "day" },
          { type: "STRING_INTERPOLATION_END",   value: ")" },
          { type: "STRING",                     value: "." },
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "STATEMENTS_END",             value: "}" },
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "IDENTIFIER",                 value: "greet" },
          { type: "INVOCATION_START",           value: "(" }, 
          { type: "STRING",                     value: "Bob" },   
          { type: "PUNCTUATION",                value: "," },
          { type: "IDENTIFIER",                 value: "day" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "STRING",                     value: "Tuesday" },   
          { type: "INVOCATION_END",             value: ")" }, 
          { type: "TERMINATOR",                 value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle functions that return tuples', function () {
        input = String.raw`func returnTuple(num: Int) -> (plusFive: Int, timesFive: Int) {
                          let plusFiveResult = num + 5
                          let timesFiveResult = num * 5
                          return (plusFiveResult, timesFiveResult)
                      }
                      returnTuple(5)`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "func"},
          { type: "IDENTIFIER",                 value: "returnTuple" },
          { type: "PARAMS_START",               value: "(" },
          { type: "IDENTIFIER",                 value: "num" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_NUMBER",                value: "Int" }, 
          { type: "PARAMS_END",                 value: ")" }, 
          
          { type: "RETURN_ARROW",               value: "->" },
          
          { type: "TUPLE_START",                value: "("},
          { type: "TUPLE_ELEMENT_NAME",               value: "plusFive" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_NUMBER",                value: "Int" },
          { type: "PUNCTUATION",                value: "," }, 
          { type: "TUPLE_ELEMENT_NAME",               value: "timesFive" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_NUMBER",                value: "Int" },
          { type: "TUPLE_END",                  value: ")"},
          { type: "STATEMENTS_START",           value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "plusFiveResult" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "num" },
          { type: "OPERATOR",                   value: "+" },
          { type: "NUMBER",                     value: "5" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "timesFiveResult" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "num" },
          { type: "OPERATOR",                   value: "*" },
          { type: "NUMBER",                     value: "5" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENT_KEYWORD",          value: "return"},
          { type: "TUPLE_START",                value: "("},
          { type: "IDENTIFIER",                 value: "plusFiveResult" },
          { type: "PUNCTUATION",                value: "," }, 
          { type: "IDENTIFIER",                 value: "timesFiveResult" },
          { type: "TUPLE_END",                  value: ")"},
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENTS_END",             value: "}" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "IDENTIFIER",                 value: "returnTuple" },
          { type: "INVOCATION_START",           value: "(" }, 
          { type: "NUMBER",                     value: "5" },   
          { type: "INVOCATION_END",             value: ")" }, 
          { type: "TERMINATOR",                 value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle functions that return tuples with mixed values', function () {
        input = String.raw`func nameAndAge(name: String, age: Int) -> (name: String, age: Int) {
                          return (name, age)
                      }
                      let person = nameAndAge("Steve", age: 45)`;
        output = [
                  { type: "DECLARATION_KEYWORD",        value: "func"},
                  { type: "IDENTIFIER",                 value: "nameAndAge" },
                  { type: "PARAMS_START",               value: "(" },
                  { type: "IDENTIFIER",                 value: "name" },
                  { type: "PUNCTUATION",                value: ":" }, 
                  { type: "TYPE_STRING",                value: "String" },
                  { type: "PUNCTUATION",                value: "," }, 
                  { type: "IDENTIFIER",                 value: "age" },
                  { type: "PUNCTUATION",                value: ":" }, 
                  { type: "TYPE_NUMBER",                value: "Int" }, 
                  { type: "PARAMS_END",                 value: ")" }, 
                  
                  { type: "RETURN_ARROW",               value: "->" },
                  
                  { type: "TUPLE_START",                value: "(" },
                  { type: "TUPLE_ELEMENT_NAME",         value: "name" },
                  { type: "PUNCTUATION",                value: ":" }, 
                  { type: "TYPE_STRING",                value: "String" },
                  { type: "PUNCTUATION",                value: "," }, 
                  { type: "TUPLE_ELEMENT_NAME",         value: "age" },
                  { type: "PUNCTUATION",                value: ":" }, 
                  { type: "TYPE_NUMBER",                value: "Int" }, 
                  { type: "TUPLE_END",                  value: ")" }, 
                  { type: "STATEMENTS_START",           value: "{" },
                  { type: "TERMINATOR",                 value: "\\n"},
                  
                  { type: "STATEMENT_KEYWORD",          value: "return"},
                  { type: "TUPLE_START",                value: "("},
                  { type: "IDENTIFIER",                 value: "name" },
                  { type: "PUNCTUATION",                value: "," }, 
                  { type: "IDENTIFIER",                 value: "age" },
                  { type: "TUPLE_END",                  value: ")"},
                  { type: "TERMINATOR",                 value: "\\n"},
                  
                  { type: "STATEMENTS_END",             value: "}" },
                  { type: "TERMINATOR",                 value: "\\n"},
                  
                  { type: "DECLARATION_KEYWORD",        value: "let"},
                  { type: "IDENTIFIER",                 value: "person" },
                  { type: "OPERATOR",                   value: "=" }, 
                  { type: "IDENTIFIER",                 value: "nameAndAge" },
                  { type: "INVOCATION_START",           value: "(" }, 
                  { type: "STRING",                     value: "Steve" },   
                  { type: "PUNCTUATION",                value: "," },
                  { type: "IDENTIFIER",                 value: "age" },
                  { type: "PUNCTUATION",                value: ":" },
                  { type: "NUMBER",                     value: "45" },   
                  { type: "INVOCATION_END",             value: ")" }, 
                  { type: "TERMINATOR",                 value: "EOF"}
                ];
        expect(lexer(input)).to.deep.equal(output);
      });

      xit('should handle functions with for loops, if and else if statments, and native count methods', function () {
        input = String.raw`func minMax(array: [Int]) -> (min: Int, max: Int) {
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
                }`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "func"},
          { type: "IDENTIFIER",                   value: "minMax" },
          { type: "PARAMS_START",                 value: "(" },
          { type: "IDENTIFIER",                   value: "array" },
          { type: "PUNCTUATION",                  value: ":" }, 
          { type: "ARRAY_START",                  value: "["},
          { type: "TYPE_NUMBER",                  value: "Int" }, 
          { type: "ARRAY_END",                    value: "]"},    
          { type: "PARAMS_END",                   value: ")" }, 
          { type: "RETURN_ARROW",                 value: "->" },     
          { type: "TUPLE_START",                  value: "("},
          { type: "TUPLE_ELEMENT_NAME",           value: "min"},
          { type: "PUNCTUATION",                  value: ":" },
          { type: "TYPE_NUMBER",                  value: "Int" }, 
          { type: "PUNCTUATION",                  value: "," },
          { type: "TUPLE_ELEMENT_NAME",           value: "max"},
          { type: "PUNCTUATION",                  value: ":" },
          { type: "TYPE_NUMBER",                  value: "Int" }, 
          { type: "TUPLE_END",                    value: ")"},
          { type: "STATEMENTS_START",             value: "{" },  
          { type: "TERMINATOR",                   value: "\\n"},
        
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "currentMin" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "array" },
          { type: "SUBSTRING_LOOKUP_START",       value: "[" },
          { type: "NUMBER",                       value: "0" },
          { type: "SUBSTRING_LOOKUP_END",         value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "currentMax" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "array" },
          { type: "SUBSTRING_LOOKUP_START",       value: "[" },
          { type: "NUMBER",                       value: "0" },
          { type: "SUBSTRING_LOOKUP_END",         value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "STATEMENT_KEYWORD",            value: "for" },
          { type: "IDENTIFIER",                   value: "value" },
          { type: "STATEMENT_KEYWORD",            value: "in" },
          { type: "IDENTIFIER",                   value: "array" },
          { type: "SUBSTRING_LOOKUP_START",       value: "[" },
         
          { type: "NUMBER",                       value: "1" },
          { type: "HALF-OPEN_RANGE",              value: "..<" },

          { type: "NODUCKINGCLUE",                value: "array.count" },     
 
          { type: "SUBSTRING_LOOKUP_END",         value: "]" },
          { type: "PUNCTUATION",                  value: "{" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "STATEMENT_KEYWORD",            value: "if" },
          { type: "IDENTIFIER",                   value: "value" },
          { type: "OPERATOR",                     value: "<" },
          { type: "IDENTIFIER",                   value: "currentMin" },
          { type: "PUNCTUATION",                  value: "{" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "IDENTIFIER",                   value: "currentMin" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "value" }, 
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "PUNCTUATION",                  value: "}" },
          { type: "STATEMENT_KEYWORD",            value: "else" },
          { type: "STATEMENT_KEYWORD",            value: "if" },
          { type: "IDENTIFIER",                   value: "value" },
          { type: "OPERATOR",                     value: ">" },
          { type: "IDENTIFIER",                   value: "currentMax" },
          { type: "PUNCTUATION",                  value: "{" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "IDENTIFIER",                   value: "currentMax" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "value" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "PUNCTUATION",                  value: "}" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "PUNCTUATION",                  value: "}" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "STATEMENT_KEYWORD",            value: "return"},
          { type: "TUPLE_START",                  value: "("},
          { type: "IDENTIFIER",                   value: "currentMin"},
          { type: "PUNCTUATION",                  value: "," },
          { type: "IDENTIFIER",                   value: "not currentMax"},
          { type: "TUPLE_END",                    value: ")"},
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "STATEMENTS_END",               value: "}" },  
          { type: "TERMINATOR",                   value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle functions with for loops and if and else if statments', function () {
        input = String.raw`func minMax(array: [Int]) -> (min: Int, max: Int) {
                    var currentMin = array[0]
                    var currentMax = array[0]
                    for value in array[1..<2] {
                        if value < currentMin {
                            currentMin = value
                        } else if value > currentMax {
                            currentMax = value
                        }
                    }
                    return (currentMin, currentMax)
                }`;
        output = [
          { type: "DECLARATION_KEYWORD",            value: "func"},
          { type: "IDENTIFIER",                     value: "minMax" },
          { type: "PARAMS_START",                   value: "(" },
          { type: "IDENTIFIER",                     value: "array" },
          { type: "PUNCTUATION",                    value: ":" }, 
          { type: "ARRAY_START",                    value: "["},
          { type: "TYPE_NUMBER",                    value: "Int" }, 
          { type: "ARRAY_END",                      value: "]"},    
          { type: "PARAMS_END",                     value: ")" }, 
          { type: "RETURN_ARROW",                   value: "->" },     
          { type: "TUPLE_START",                    value: "("},
          { type: "TUPLE_ELEMENT_NAME",             value: "min"},
          { type: "PUNCTUATION",                    value: ":" },
          { type: "TYPE_NUMBER",                    value: "Int" }, 
          { type: "PUNCTUATION",                    value: "," },
          { type: "TUPLE_ELEMENT_NAME",             value: "max"},
          { type: "PUNCTUATION",                    value: ":" },
          { type: "TYPE_NUMBER",                    value: "Int" }, 
          { type: "TUPLE_END",                      value: ")"},
          { type: "STATEMENTS_START",               value: "{" },  
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "DECLARATION_KEYWORD",            value: "var" },
          { type: "IDENTIFIER",                     value: "currentMin" },
          { type: "OPERATOR",                       value: "=" },
          { type: "IDENTIFIER",                     value: "array" },
          { type: "SUBSTRING_LOOKUP_START",         value: "[" },
          { type: "NUMBER",                         value: "0" },
          { type: "SUBSTRING_LOOKUP_END",           value: "]" },
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "DECLARATION_KEYWORD",            value: "var" },
          { type: "IDENTIFIER",                     value: "currentMax" },
          { type: "OPERATOR",                       value: "=" },
          { type: "IDENTIFIER",                     value: "array" },
          { type: "SUBSTRING_LOOKUP_START",         value: "[" },
          { type: "NUMBER",                         value: "0" },
          { type: "SUBSTRING_LOOKUP_END",           value: "]" },
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "STATEMENT_KEYWORD",              value: "for" },
          { type: "IDENTIFIER",                     value: "value" },
          { type: "STATEMENT_KEYWORD",              value: "in" },
          { type: "IDENTIFIER",                     value: "array" },
          { type: "SUBSTRING_LOOKUP_START",         value: "[" },
                   
          { type: "NUMBER",                         value: "1" },
          { type: "HALF-OPEN_RANGE",                value: "..<" },
          //TODO get native methods working
          { type: "NUMBER",                         value: "2" },
          // { type: "NODUCKINGCLUE",               value: "array.count" },     

          { type: "SUBSTRING_LOOKUP_END",           value: "]" },
          { type: "PUNCTUATION",                    value: "{" },
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "STATEMENT_KEYWORD",              value: "if" },
          { type: "IDENTIFIER",                     value: "value" },
          { type: "OPERATOR",                       value: "<" },
          { type: "IDENTIFIER",                     value: "currentMin" },
          { type: "PUNCTUATION",                    value: "{" },
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "IDENTIFIER",                     value: "currentMin" },
          { type: "OPERATOR",                       value: "=" },
          { type: "IDENTIFIER",                     value: "value" }, 
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "PUNCTUATION",                    value: "}" },
          { type: "STATEMENT_KEYWORD",              value: "else" },
          { type: "STATEMENT_KEYWORD",              value: "if" },
          { type: "IDENTIFIER",                     value: "value" },
          { type: "OPERATOR",                       value: ">" },
          { type: "IDENTIFIER",                     value: "currentMax" },
          { type: "PUNCTUATION",                    value: "{" },
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "IDENTIFIER",                     value: "currentMax" },
          { type: "OPERATOR",                       value: "=" },
          { type: "IDENTIFIER",                     value: "value" },
          { type: "TERMINATOR",                     value: "\\n"},
               
          { type: "PUNCTUATION",                    value: "}" },
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "PUNCTUATION",                    value: "}" },
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "STATEMENT_KEYWORD",              value: "return"},
          { type: "TUPLE_START",                    value: "("},
          { type: "IDENTIFIER",                     value: "currentMin"},
          { type: "PUNCTUATION",                    value: "," },
          { type: "IDENTIFIER",                     value: "currentMax"},
          { type: "TUPLE_END",                      value: ")"},
          { type: "TERMINATOR",                     value: "\\n"},

          { type: "STATEMENTS_END",       value: "}" },  
          { type: "TERMINATOR",           value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      xit('should handle functions that have variadic parameters', function () {
        input = String.raw`func sumOf(numbers: Int...) -> Int {
                          var sum = 0
                          for number in numbers {
                              sum += number
                          }
                          return sum
                      }
                      sumOf(1,2,3)`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "func"},
          { type: "IDENTIFIER",                 value: "sumOf" },
          { type: "PARAMS_START",               value: "(" },
          { type: "IDENTIFIER",                 value: "numbers" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_NUMBER",                value: "Int" },
          { type: "VARIADIC_PARAM",             value: "..." }, 
          { type: "PARAMS_END",                 value: ")" }, 
          { type: "RETURN_ARROW",               value: "->" },
          { type: "TYPE_NUMBER",                value: "Int" }, 
          { type: "STATEMENTS_START",           value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "sum" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "0" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENT_KEYWORD",          value: "for" },
          { type: "IDENTIFIER",                 value: "number" },
          { type: "STATEMENT_KEYWORD",          value: "in" },
          { type: "IDENTIFIER",                 value: "numbers" },
          { type: "PUNCTUATION",                value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "IDENTIFIER",                 value: "sum" },
          { type: "OPERATOR",                   value: "+" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "number" },
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "PUNCTUATION",                value: "}" },
          
          { type: "STATEMENT_KEYWORD",          value: "return"},
          { type: "IDENTIFIER",                 value: "sum" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENTS_END",             value: "}" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "IDENTIFIER",                 value: "sumOf" },
          { type: "INVOCATION_START",           value: "(" }, 
          { type: "NUMBER",                     value: "1" },   
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "2" },   
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "3" },   
          { type: "INVOCATION_END",             value: ")" }, 
          { type: "TERMINATOR",                 value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      xit('should handle functions that return functions where the return function is specified within parentheses', function () {
        input = String.raw`func makeIncrementer() -> ((Int) -> Int) {
                              func addOne(number: Int) -> Int {
                                  return 1 + number
                              }
                              return addOne
                          }`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "func"},
          { type: "IDENTIFIER",                 value: "makeIncrementer" },
          { type: "PARAMS_START",               value: "(" },
          { type: "PARAMS_END",                 value: ")" }, 
          { type: "RETURN_ARROW",               value: "->" },
          { type: "PUNCTUATION",                value: "(" }, 
          { type: "PARAMS_START",               value: "(" },
          { type: "TYPE_NUMBER",                value: "Int" },
          { type: "PARAMS_END",                 value: ")" },
          { type: "RETURN_ARROW",               value: "->" }, 
          { type: "PUNCTUATION",                value: ")" },
          { type: "STATEMENTS_START",           value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "func"},
          { type: "IDENTIFIER",                 value: "addOne" },
          { type: "PARAMS_START",               value: "(" },
          { type: "IDENTIFIER",                 value: "number" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_NUMBER",                value: "Int" },
          { type: "PARAMS_END",                 value: ")" },
          { type: "RETURN_ARROW",               value: "->" },
          { type: "TYPE_NUMBER",                value: "Int" },
          { type: "STATEMENTS_START",           value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENT_KEYWORD",          value: "return"},
          { type: "NUMBER",                     value: "1" },
          { type: "OPERATOR",                   value: "+" },
          { type: "IDENTIFIER",                 value: "number" },
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "STATEMENTS_END",             value: "}" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENT_KEYWORD",          value: "return"},
          { type: "IDENTIFIER",                 value: "addOne" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENTS_END",             value: "}" },
          { type: "TERMINATOR",                 value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      xit('should handle functions that return functions where the return function is specified without parentheses', function () {
        input = String.raw`func makeIncrementer() -> (Int) -> Int {
                              func addOne(number: Int) -> Int {
                                  return 1 + number
                              }
                              return addOne
                          }`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "func"},
          { type: "IDENTIFIER",                 value: "makeIncrementer" },
          { type: "PARAMS_START",               value: "(" },
          { type: "PARAMS_END",                 value: ")" }, 
          { type: "RETURN_ARROW",               value: "->" },
          { type: "PARAMS_START",               value: "(" },
          { type: "TYPE_NUMBER",                value: "Int" },
          { type: "PARAMS_END",                 value: ")" },
          { type: "RETURN_ARROW",               value: "->" }, 
          { type: "STATEMENTS_START",           value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",        value: "func"},
          { type: "IDENTIFIER",                 value: "addOne" },
          { type: "PARAMS_START",               value: "(" },
          { type: "IDENTIFIER",                 value: "number" },
          { type: "PUNCTUATION",                value: ":" }, 
          { type: "TYPE_NUMBER",                value: "Int" },
          { type: "PARAMS_END",                 value: ")" },
          { type: "RETURN_ARROW",               value: "->" },
          { type: "TYPE_NUMBER",                value: "Int" },
          { type: "STATEMENTS_START",           value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENT_KEYWORD",          value: "return"},
          { type: "NUMBER",                     value: "1" },
          { type: "OPERATOR",                   value: "+" },
          { type: "IDENTIFIER",                 value: "number" },
          { type: "TERMINATOR",                 value: "\\n"},
          { type: "STATEMENTS_END",             value: "}" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENT_KEYWORD",          value: "return"},
          { type: "IDENTIFIER",                 value: "addOne" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "STATEMENTS_END",             value: "}" },
          { type: "TERMINATOR",                 value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

    }); 

  });
});
