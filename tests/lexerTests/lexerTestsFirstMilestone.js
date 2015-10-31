var lexicalTypes    = require('../../transpiler/lexer/lexicalTypes');
var lexerFunctions  = require('../../transpiler/lexer/lexerFunctions');
var lexer           = require('../../transpiler/lexer/lexer');
var expect          = require('chai').expect;

describe('Lexer: First milestone', function() {

  describe('Basic tests', function () {
    it('should handle variable declarations with numbers', function () {
      input = String.raw`var a = 3`;
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
      input = String.raw`var a = 1; a = 2`;
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
      input = String.raw`var b = "hello"`;
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
      input = String.raw`var c = true`;
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
      input = String.raw`var d = "Test this"`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "d" },
        { type: "OPERATOR",             value: "=" },
        { type: "STRING",               value: "Test this" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should variables declared with type annotations', function () {
      input = String.raw`var name: String = "Joe"; var age: Int = 45;`;

      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "name" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String"},
        { type: "OPERATOR",             value: "=" },
        { type: "STRING",               value: "Joe" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "age" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int"},
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "45" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should variables declared with type annotations but no value', function () {
      input = String.raw`var name: String; var age: Int;`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "name" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String"},
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "age" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int"},
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle multiple related variables of the same type on a single line, separated by commas', function () {
      input = String.raw`var firstBase, secondBase, thirdBase: String`;

      output = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "firstBase" },
        { type: "PUNCTUATION",          value: "," },
        { type: "IDENTIFIER",           value: "secondBase" },
        { type: "PUNCTUATION",          value: "," },
        { type: "IDENTIFIER",           value: "thirdBase" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String"},
        { type: "TERMINATOR",           value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle comments', function () {
      input = String.raw`/* Comment 1 */ var a = 1 // Comment 2`;
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
      input = String.raw`var empty = []`;
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
      input = String.raw`var empty = [:]`;
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
      input = String.raw`var e = ["Eggs", "Milk", "Bacon"]`;
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
      input = String.raw`var e = [  "Eggs","Milk",           "Bacon"                ] ;`;
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

    it('should handle appending items to an array with the addition assignment operator', function () {
      input = String.raw`var arr = [Int](); arr += [1,2,3];`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int"},
        { type: "ARRAY_END",                  value: "]"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "["},
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "3" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF"},
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle dictionaries', function () {
      input = String.raw`var f = ["one": 1, "two": 2, "three": 3]`;
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
      input = String.raw`var error = (404, "not found")`;
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
      input = String.raw`let http200Status = (statusCode: 200, description: "OK");`;
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
      input = String.raw`var empty = ()`;
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

    it('should handle tuples with mixed index numbers and element names, and value lookups using both', function () {
      input = String.raw`var tup = ("one", two: 2); var one = tup.0; var two = tup.1; var twoRedux = tup.two;`;
      output = [
        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "tup" },
        { type: "OPERATOR",                       value: "=" },
        { type: "TUPLE_START",                    value: "("},
        { type: "STRING",                         value: "one"},
        { type: "PUNCTUATION",                    value: "," },
        { type: "TUPLE_ELEMENT_NAME",             value: "two"},
        { type: "PUNCTUATION",                    value: ":" },
        { type: "NUMBER",                         value: "2"},
        { type: "TUPLE_END",                      value: ")"},
        { type: "PUNCTUATION",                    value: ";" },

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "one" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "tup" },
        { type: "DOT_SYNTAX",                     value: "." },
        { type: "NUMBER",                         value: "0"},
        { type: "PUNCTUATION",                    value: ";" },

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "two" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "tup" },
        { type: "DOT_SYNTAX",                     value: "." },
        { type: "NUMBER",                         value: "1"},
        { type: "PUNCTUATION",                    value: ";" },

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "twoRedux" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "tup" },
        { type: "DOT_SYNTAX",                     value: "." },
        { type: "TUPLE_ELEMENT_NAME",             value: "two"},
        { type: "PUNCTUATION",                    value: ";" },
        { type: "TERMINATOR",                     value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle erratic spacing', function () {
      input = String.raw`let g = [1 : "one",2   :"two", 3: "three"]`;
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

    it('should handle subscript lookups on arrays', function () {
      input = String.raw`var d = [1, 2]; var one = d[0];`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "one" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "NUMBER",                     value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",       value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle subscript lookups on dictionaries', function () {
      input = String.raw`var d = ["one": 1, "two": 2]; var one = d["one"];`;

      output = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "OPERATOR",                   value: "=" },
        { type: "DICTIONARY_START",           value: "[" },
        { type: "STRING",                     value: "one" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "two" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "2" },
        { type: "DICTIONARY_END",             value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "one" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "STRING",                     value: "one" },
        { type: "SUBSCRIPT_LOOKUP_END",       value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

  });

  describe('Numbers and operations', function () {
    it('should handle floating point numbers', function () {
      input = String.raw`let h = 3.14`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "h" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "3.14" },
        { type: "TERMINATOR",           value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle numeric literals written with underscores', function () {
      input = String.raw`let justOverOneMillion = 1_000_000.000_000_1`;

      output = [
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "justOverOneMillion" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "1000000.0000001" },
        { type: "TERMINATOR",                 value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle unspaced operators', function () {
      input = String.raw`let i = 5+6`;
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
      input = String.raw`var j = 5 + 6 / 4 - (-16 % 4.2) * 55`;
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
      input = String.raw`let l = 6 != 9`;
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
      input = String.raw`var l = 6 != 7 || 6 == 7 || 6 > 7 || 6 < 7 || 6 >= 7 || 6 <= 7;`;
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
      input = String.raw`var a = 1; var m = ++a; var n = --m;`;
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
      input = String.raw`var a = 1; var m = a++; var n = m--;`;
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
      input = String.raw`var a = true; var b = !a; var c = -a; var d = +b`;
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
      input = String.raw`var x = 5; x += 4; x -= 3; x *= 2; x /= 1; x %= 2;`;
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
      input = String.raw`var a = !true && true || true`;
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
      input = String.raw`var a = (6 == 7) ? 1 : -1`;
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
      input = String.raw`var g = 6 == 7 ? true : false;`;
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
      input = String.raw`let h = false; let i = h ? 1 : 2;`;
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
      input = String.raw`let q = ["array1": [1,2,3], "array2": [4,5,6]];`;
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
      input = String.raw`let arr = [1, 2]; var s = arr[0];`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "s" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "NUMBER",                     value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",       value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle array access with numeric operations', function () {
      input = String.raw`let arr = [1, 2]; let t = 100; var u = arr[t - 99];`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "t" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "100" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "u" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "IDENTIFIER",                 value: "t" },
        { type: "OPERATOR",                   value: "-" },
        { type: "NUMBER",                     value: "99" },
        { type: "SUBSCRIPT_LOOKUP_END",       value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle arrays of that contain a substring lookup', function () {
      input = String.raw`let arr = [1,2]; var u = [arr[0]];`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "u" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "[" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "NUMBER",                     value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",       value: "]" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle arrays of dictionaries', function () {
      input = String.raw`let arr = [1,2]; var v = [arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]]];`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "v" },
        { type: "OPERATOR",                   value: "=" },
        { type: "DICTIONARY_START",           value: "[" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "NUMBER",                     value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",       value: "]" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "[" },
        { type: "ARRAY_START",                value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: "," },
        { type: "ARRAY_START",                value: "[" },
        { type: "NUMBER",                     value: "3" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "4" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "SUBSCRIPT_LOOKUP_END",       value: "]" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "[" },
        { type: "ARRAY_START",                value: "[" },
        { type: "STRING",                     value: "one" },
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "two" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: "," },
        { type: "ARRAY_START",                value: "[" },
        { type: "STRING",                     value: "three" },
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "four" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "DICTIONARY_END",             value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle translation of dictionary keys', function () {
      input = String.raw `var firstNum = 1
                          var secondNum = 2
                          var firstDict = [firstNum: ["one", "two"], secondNum: ["three", "four"]]
                          var secondDict = [-3+4: [1,2], (2*3)-4: [3,4]]`;
      output = [
       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "firstNum" },
       { type: "OPERATOR",                      value: "=" },
       { type: "NUMBER",                        value: "1" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "secondNum" },
       { type: "OPERATOR",                      value: "=" },
       { type: "NUMBER",                        value: "2" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "firstDict" },
       { type: "OPERATOR",                      value: "=" },
       { type: "DICTIONARY_START",              value: "[" },
       { type: "IDENTIFIER",                    value: "firstNum" },
       { type: "PUNCTUATION",                   value: ":" },
       { type: "ARRAY_START",                   value: "[" },
       { type: "STRING",                        value: "one" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "STRING",                        value: "two" },
       { type: "ARRAY_END",                     value: "]" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "IDENTIFIER",                    value: "secondNum" },
       { type: "PUNCTUATION",                   value: ":" },
       { type: "ARRAY_START",                   value: "[" },
       { type: "STRING",                        value: "three" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "STRING",                        value: "four" },
       { type: "ARRAY_END",                     value: "]" },
       { type: "DICTIONARY_END",                value: "]" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "secondDict" },
       { type: "OPERATOR",                      value: "=" },
       { type: "DICTIONARY_START",              value: "[" },
       { type: "OPERATOR",                      value: "-" },
       { type: "NUMBER",                        value: "3" },
       { type: "OPERATOR",                      value: "+" },
       { type: "NUMBER",                        value: "4" },
       { type: "PUNCTUATION",                   value: ":" },
       { type: "ARRAY_START",                   value: "[" },
       { type: "NUMBER",                        value: "1" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "NUMBER",                        value: "2" },
       { type: "ARRAY_END",                     value: "]" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "PUNCTUATION",                   value: "(" },
       { type: "NUMBER",                        value: "2" },
       { type: "OPERATOR",                      value: "*" },
       { type: "NUMBER",                        value: "3" },
       { type: "PUNCTUATION",                   value: ")" },
       { type: "OPERATOR",                      value: "-" },
       { type: "NUMBER",                        value: "4" },
       { type: "PUNCTUATION",                   value: ":" },
       { type: "ARRAY_START",                   value: "[" },
       { type: "NUMBER",                        value: "3" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "NUMBER",                        value: "4" },
       { type: "ARRAY_END",                     value: "]" },
       { type: "DICTIONARY_END",                value: "]" },
       { type: "TERMINATOR",                    value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle multi-nested lists', function () {
      input = String.raw`var w = [1: [[1: "two"], [3: "four"]], 2: [["one": 2], ["three": 4]]];`;
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
