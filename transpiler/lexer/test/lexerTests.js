var lexicalTypes    = require('./../lexicalTypes');
var lexerFunctions  = require('./../lexerFunctions');
var lexer           = require('./../lexer');
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


    // describe('Basic tests', function () {
    //   it('should handle variable declarations with numbers', function () {
    //     input = 'var a = 3';
    //     output = [
    //       { type: "DECLARATION_KEYWORD",  value: "var" },
    //       { type: "IDENTIFIER",           value: "a" },
    //       { type: "OPERATOR",             value: "=" },
    //       { type: "NUMBER",               value: "3" },
    //       { type: "TERMINATOR",           value: "EOF"}
    //     ];
    //     expect(lexer(input)).to.deep.equal(output);
    //   });

    //   it('should handle strings', function () {
    //     input = 'var b = "hello"';
    //     output = [
    //       { type: "DECLARATION_KEYWORD",  value: "var" },
    //       { type: "IDENTIFIER",           value: "b" },
    //       { type: "OPERATOR",             value: "=" },
    //       { type: "STRING",               value: "hello" },
    //       { type: "TERMINATOR",           value: "EOF"}
    //     ];
    //     expect(lexer(input)).to.deep.equal(output);
    //   });

    //   it('should handle booleans', function () {
    //     input = 'var c = true';
    //     output = [
    //       { type: "DECLARATION_KEYWORD",  value: "var" },
    //       { type: "IDENTIFIER",           value: "c" },
    //       { type: "OPERATOR",             value: "=" },
    //       { type: "BOOLEAN",              value: "true" },
    //       { type: "TERMINATOR",           value: "EOF"}
    //     ];
    //     expect(lexer(input)).to.deep.equal(output);
    //   });

    //   it('should handle strings with whitespace', function () {
    //     input = 'var d = "Test this"';
    //     output = [
    //       { type: "DECLARATION_KEYWORD",  value: "var" },
    //       { type: "IDENTIFIER",           value: "d" },
    //       { type: "OPERATOR",             value: "=" },
    //       { type: "STRING",               value: "Test this" },
    //       { type: "TERMINATOR",           value: "EOF"}
    //     ];
    //     expect(lexer(input)).to.deep.equal(output);
    //   });

    //   it('should handle comments', function () {
    //     input = '/* Comment 1 */ var a = 1 // Comment 2';
    //     output = "FILL_ME_IN";
    //     expect(lexer(input)).to.deep.equal(output);
    //   });
    // });

    describe('Basic collections', function () {
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

      it('should handle let and erratic spacing', function () {
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
        input = 'let l = 6 !== 9';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "l" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "6" },
          { type: "OPERATOR",             value: "!" },
          { type: "OPERATOR",             value: "=" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "9" },
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle preincrement', function () {
        input = 'var a = 1; var m = ++a;';
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
          { type: "TERMINATOR",           value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle postincrement', function () {
        input = 'var a = 1; var n = a++;';
        output = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "n" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
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

      xit('should handle ranges', function () {
        input = 'var a = 1...5; var b = 1..<5';
        output = "FILL_ME_IN";
        expect(lexer(input)).to.deep.equal(output);
      });
    });

    describe('String interpolation', function () {

      it('should handle string concatenation', function () {
        input = 'var k = "Stephen" + " " + "Tabor" + "!"';
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
        input = 'var planet = "Earth"; let o = "\\(planet)"';
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
        input = 'var planet = "Earth"; let o = "Hello \\(planet)!"';
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
        input = 'var p = "\\(100 - 99), 2, 3"';
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
          { type: "SUBSTRING_LOOKUP",     value: "[" },
          { type: "NUMBER",               value: "0" },
          { type: "SUBSTRING_LOOKUP",     value: "]" },
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
          { type: "SUBSTRING_LOOKUP",     value: "[" },
          { type: "IDENTIFIER",           value: "t" },
          { type: "OPERATOR",             value: "-" },
          { type: "NUMBER",               value: "99" },
          { type: "SUBSTRING_LOOKUP",     value: "]" },
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
          { type: "SUBSTRING_LOOKUP",     value: "[" },
          { type: "NUMBER",               value: "0" },
          { type: "SUBSTRING_LOOKUP",     value: "]" },
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
          { type: "SUBSTRING_LOOKUP",     value: "[" },
          { type: "NUMBER",               value: "0" },
          { type: "SUBSTRING_LOOKUP",     value: "]" },
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
          { type: "SUBSTRING_LOOKUP",     value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "SUBSTRING_LOOKUP",     value: "]" },
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
      });
    });
  });

  xdescribe('Second milestone', function() {
    describe('If statements', function() {

      it('should handle single-line if statements', function() {
        input = 'var a = 5; if (true) {--a}; if a != 3 {a++}';
        output = 'FILL_ME_IN';
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle single-line if/else statements', function() {
        input = 'var f = true; if !f {f = true} else {f = false};';
        output = 'FILL_ME_IN';
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle single-line if/else-if/else statements', function() {
        input = 'var a = 1; if 1 > 2 {a++} else if 1 < 2 {a--} else {a = 42}';
        output = 'FILL_ME_IN';
        expect(lexer(input)).to.deep.equal(output);
      });

    });

    describe('While/Repeat-While loops', function() {

      it('should handle single-line while loops', function() {
        input = 'FILL_ME_IN';
        output = 'FILL_ME_IN';
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle single-line repeat-while loops', function() {
        input = 'FILL_ME_IN';
        output = 'FILL_ME_IN';
        expect(lexer(input)).to.deep.equal(output);
      });

    });
  });
});
