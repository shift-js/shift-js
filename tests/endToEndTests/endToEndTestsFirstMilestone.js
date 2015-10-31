var expect = require('chai').expect;
var api = require('../../transpiler/api.js');
var compile = api.compile;

var removeIndentation = function(str) {
  return str.replace(/\n\s*/gm, "\n").replace(/\s*/, "");
};

describe('End to End: First Milestone', function() {

  describe('Basic data types and variable assignment', function () {

    it('should handle variable declarations with numbers', function () {
      input = String.raw`var a = 3`;
      output = `var a = 3;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var a = 1; a = 2'
    it('should handle variable reassignment', function () {
      input = String.raw`var a = 1; a = 2`;
      output = `var a = 1;
                a = 2;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var my_var = 5'
    it('should handle variable names with underscores', function () {
      input = String.raw`var my_var = 5`;
      output = `var my_var = 5;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var b = "hello"'
    it('should handle strings', function () {
      input = String.raw`var b = "hello"`;
      output = `var b = 'hello';`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Test 3 - Swift input: 'var c = true'
    it('should handle booleans', function () {
      input = String.raw`var c = true`;
      output = `var c = true;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Test 4 - Swift input: 'var d = "Test this"'
    it('should handle strings with whitespace', function () {
      input = String.raw`var d = "Test this"`;
      output = `var d = 'Test this';`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Basic collections and constants', function () {

    // Swift input: 'var empty = []'
    it('should handle empty arrays', function () {
      input = String.raw`var empty = []`;
      output = `var empty = [];`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var empty = [:]'
    // AST Explorer input: 'var empty = {}'
    xit('should handle empty dictionaries', function () {
      input = String.raw`var empty = [:]`;
      output = `var empty = {};`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var empty = [String]();'
    // AST Explorer input: 'var empty = [];'
    xit('should handle initializer syntax for arrays', function () {
      input = String.raw`var empty = [String]();`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var empty = [String:UInt16]();'
    // AST Explorer input: 'var empty = {};'
    xit('should handle initializer syntax for dictionaries', function () {
      input = String.raw`var empty = [String:UInt16]();`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var e = ["Eggs", "Milk", "Bacon"]'
    it('should handle arrays', function () {
      input = String.raw`var e = ["Eggs", "Milk", "Bacon"]`;
      output = `var e = [
                  'Eggs',
                  'Milk',
                  'Bacon'
                ];`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var e = [  "Eggs","Milk",           "Bacon"                ] ;'
    it('should handle arrays with erratic spacing', function () {
      input = String.raw`var e = [  "Eggs","Milk",           "Bacon"                ] ;`;
      output = `var e = [
                  'Eggs',
                  'Milk',
                  'Bacon'
                ];`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var f = ["one": 1, "two": 2, "three": 3]'
    it('should handle dictionaries', function () {
      input = String.raw`var f = ["one": 1, "two": 2, "three": 3]`;
      output = `var f = {
                  'one': 1,
                  'two': 2,
                  'three': 3
                };`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var error = (404, "not found")'
    // AST Explorer input: 'var error = { 0: 404, 1: 'not found' };'
    it('should handle tuples', function () {
      input = String.raw`var error = (404, "not found")`;
      output = `var error = {
        0: 404,
        1: 'not found'
      };`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });



    // Swift input: 'let http200Status = (statusCode: 200, description: "OK");'
    // AST Explorer input: 'var http200Status = { statusCode: 200, description: "OK"};'
    it('should handle tuples with element names', function () {
      input = String.raw`let http200Status = (statusCode: 200, description: "OK");`;
      output = `var http200Status = {
        statusCode: 200,
        description: 'OK'
      };`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var empty = ()';
    // AST Explorer input: 'var empty = {};'
    it('should handle empty tuples', function () {
      input = String.raw`var empty = ()`;
      output = `var empty = {};`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'let g = [1 : "one",2   :"two", 3: "three"]'
    it('should handle erratic spacing', function () {
      input = String.raw`let g = [1 : "one",2   :"two", 3: "three"]`;
      output = `var g = {
        1: 'one',
        2: 'two',
        3: 'three'
      };`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Numeric and boolean operations', function () {

    // Swift input: 'let h = 3.14'
    it('should handle floating point numbers', function () {
      input = String.raw`let h = 3.14`;
      output = `var h = 3.14;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'let i = 5+6'
    it('should handle unspaced operators', function () {
      input = String.raw`let i = 5+6`;
      output = `var i = 5 + 6;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var j = 5 + 6 / 4 - (-16 % 4.2) * 55'
    it('should handle order of operations', function () {
      input = String.raw`var j = 5 + 6 / 4 - (-16 % 4.2) * 55`;
      output = `var j = 5 + 6 / 4 - -16 % 4.2 * 55;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle comparisons', function () {
      input = String.raw`var l = 6 != 7 ||  6 == 7 ||  6 > 7 ||  6 < 7 ||  6 >= 7 || 6 <= 7;`;
      output = `var l = 6 != 7 ||  6 == 7 ||  6 > 7 ||  6 < 7 ||  6 >= 7 || 6 <= 7;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var a = 1; var m = ++a; var n = --m;'
    it('should handle prefix operators', function () {
      input = String.raw`var a = 1; var m = ++a; var n = --m;`;
      output = `var a = 1;
                var m = ++a;
                var n = --m;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var a = 1; var m = a++; var n = m--;'
    it('should handle postfix operators', function () {
      input = String.raw`var a = 1; var m = a++; var n = m--;`;
      output = `var a = 1;
                var m = a++;
                var n = m--;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var a = true; var b = !a; var c = -a; var d = +b'
    it('should handle unary operators', function () {
      input = String.raw`var a = true; var b = !a; var c = -a; var d = +b`;
      output = `var a = true;
                var b = !a;
                var c = -a;
                var d = +b;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var a = (6 == 7) ? 1 : -1'
    it('should handle ternary operators', function () {
      input = String.raw`var a = (6 == 7) ? 1 : -1`;
      output = `var a = 6 == 7 ? 1 : -1;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var g = 6 == 7 ? true : false;'
    it('should handle ternary operators without a parenthetical', function () {
      input = String.raw`var g = 6 == 7 ? true : false;`;
      output = `var g = 6 == 7 ? true : false;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'let h = false; let i = h ? 1 : 2;'
    it('should handle ternary operators that include identifiers', function () {
      input = String.raw`let h = false; let i = h ? 1 : 2;`;
      output = `var h = false;
                var i = h ? 1 : 2;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var a = 1...5'
    // AST Explorer input:
    xit('should handle closed ranges', function () {
      input = String.raw`var a = 1...5`;
      output = `var k = 'Stephen' + ' ' + 'Tabor' + '!';`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var planet = "Earth"; let o = "\(planet)"'
    // Lexer input: 'var planet = "Earth"; let o = "\\(planet)"'
    // AST Explorer input: 'var planet = "Earth"; var o = "" + planet + ""'
    it('should handle string interpolation', function () {
      input = String.raw`var planet = "Earth"; let o = "\(planet)"`;
      output = `var planet = 'Earth';
                var o = '' + planet + '';`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Test 15 - Swift input: 'var planet = "Earth"; let o = "Hello \(planet)!"'
    // Lexer input: 'var planet = "Earth"; let o = "Hello \\(planet)!"'
    // AST Explorer input: 'var planet = "Earth"; var o = "Hello " + planet + "!"'
    it('should handle string interpolation in the middle of a string', function () {
      input = String.raw`var planet = "Earth"; let o = "Hello \(planet)!"`;
      output = `var planet = 'Earth';
                var o = 'Hello ' + planet + '!';`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Test 16 - Swift input: 'var p = "\(100 - 99), 2, 3"'
    // Lexer input: 'var p = "\\(100 - 99), 2, 3"'
    // AST Explorer input: 'var p = ""+100 - 99+", 2, 3"'
    it('should handle interpolation of operations', function () {
      input = String.raw`var p = "\(100 - 99), 2, 3"`;
      output = `var p = '' + 100 - 99 + ', 2, 3';`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Nested collections', function () {

    // Test 17 - Swift input: 'let q = ["array1": [1,2,3], "array2": [4,5,6]];'
    it('should handle dictionaries of arrays', function () {
      input = String.raw`let q = ["array1": [1,2,3], "array2": [4,5,6]];`;
      output = `var q = {
        'array1': [
          1,
          2,
          3
        ],
        'array2': [
          4,
          5,
          6
        ]
      };`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Test 18 - Swift input: 'var arr = [1, 2]; var s = arr[0];'
    it('should handle array access', function () {
      //TODO Commented out tokens were added by Verlon and Rex
      //TODO arr access w/out initialization throws exception
      input = String.raw`var arr = [1, 2]; var s = arr[0];`;
      output = `var arr = [
        1,
        2
      ];
      var s = arr[0];`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Test 19 - Swift input: 'let arr = [1, 2]; let t = 100; var u = arr[t - 99];'
    it('should handle array access with numeric operations', function () {
      input = String.raw`let arr = [1, 2]; let t = 100; var u = arr[t - 99];`;
      output = `var arr = [
        1,
        2
      ];
      var t = 100;
      var u = arr[t - 99];`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'let arr = [1,2]; var u = [arr[0]];'
    it('should handle arrays of that contain a substring lookup', function () {
      //TODO Works when token.type of SUBSCRIPT_LOOKUP is replaced with token.type PUNCTUATION
      //TODO Why no longer just
      input = String.raw`let arr = [1,2]; var u = [arr[0]];`;
      output = `var arr = [
        1,
        2
      ];
      var u = [arr[0]];`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });



    // Test 20 - Swift input: 'let arr = [1,2]; var v = [arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]]];'
    // AST Explorer input: 'let arr = [1,2]; var v = {}; v[arr[0]] = [[1,2], [3,4]]; v[arr[1]] = [["one", "two"], ["three", "four"]];'
    xit('should handle arrays of dictionaries', function () {
      input = String.raw`let arr = [1,2]; var v = [arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]]];`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    // Test 21 - Swift input: 'var w = [1: [[1: "two"], [3: "four"]], 2: [["one": 2], ["three": 4]]];'
    // AST Explorer input: 'var w = {1:[{1: "two"}, {3: "four"}],2:[{"one": 2},{"three": 4}]};'
    it('should handle multi-nested lists', function () {
      input = String.raw`var w = [1: [[1: "two"], [3: "four"]], 2: [["one": 2], ["three": 4]]];`;
      output = `var w = {
        1: [
          { 1: 'two' },
          { 3: 'four' }
        ],
        2: [
          { 'one': 2 },
          { 'three': 4 }
        ]
      };`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });
});
