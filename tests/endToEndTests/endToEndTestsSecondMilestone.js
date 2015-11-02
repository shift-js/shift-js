var expect = require('chai').expect;
var api = require('../../transpiler/api.js');
var compile = api.compile;

var removeIndentation = function(str) {
  return str.replace(/\n\s*/gm, "\n").replace(/\s*/, "");
};

describe('End to End: Second Milestone', function() {

  xdescribe('If statements', function() {

    xit('should handle single-line if statements', function() {
      input = String.raw`var a = 5; if (true) {--a};`;
      output = `var a = 5;
                if (true) {
                  --a;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle single-line if statements with multi-character logical operators', function() {
      input = String.raw`var b = 6; if (5 <= 6) {b++};`;
      output = `var b = 6;
                if (5 <= 6) {
                  b++;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle single-line if statements with multi-character logical operators and multi-character mathematical operators', function() {
      input = String.raw`var c = 1; if (c == 1) {c *= 5};`;
      output = `var c = 1;
                if (c == 1) {
                  c *= 5;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle single-line if statements without a parenthetical', function() {
      input = String.raw`var d = 1; if d != 2 {d++};`;
      output = `var d = 1;
                if (d != 2) {
                  d++;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle complex conditionals without an outer parenthetical', function() {
      input = String.raw`var e = 1; if (e + 1) == 2 {e = 5};`;
      output = `var e = 1;
                if (e + 1 == 2) {
                  e = 5;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle single line if/else statements', function() {
      input = String.raw`var f = true; if !f {f = true} else {f = false};`;
      output = `var f = true;
                if (!f) {
                  f = true;
                } else {
                  f = false;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle single-line if/else-if/else statements with parentheticals', function() {
      input = String.raw`var a = 1; if (1 > 2) {++a} else if (1 < 2) {--a} else {a = 42}`;
      output = `var a = 1;
                if (1 > 2) {
                  ++a;
                } else if (1 < 2) {
                  --a;
                } else {
                  a = 42;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle single-line if/else-if/else statements with parentheticals', function() {
      input = String.raw`var a = 1; if 1 > 2 {++a} else if 1 < 2 {--a} else {a = 42}`;
      output = `var a = 1;
                if (1 > 2) {
                  ++a;
                } else if (1 < 2) {
                  --a;
                } else {
                  a = 42;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('While/Repeat-While loops', function() {

    it('should handle single-line while loops with a parenthetical', function() {
      input = String.raw`var i = 10; while (i >= 0) {i--}`;
      output = `var i = 10;
                while (i >= 0) {
                  i--;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle single-line while loops without a parenthetical', function() {
      input = String.raw`var i = 10; while i >= 0 {i--}`;
      output = `var i = 10;
                while (i >= 0) {
                  i--;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle single-line repeat-while loops with a parenthetical', function() {
      input = String.raw`var i = 10; repeat {i--} while (i >= 0)`;
      output = `var i = 10;
                do {
                  i--;
                } while (i >= 0);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle single-line repeat-while loops without a parenthetical', function() {
      input = String.raw`var i = 10; repeat {i--} while i >= 0`;
      output = `var i = 10;
                do {
                  i--;
                } while (i >= 0);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('For loops', function() {

    xit('should handle single-line for loops with a parenthetical', function() {
      input = String.raw`var a = 0; for (var i = 10; i > 0; i--) {a++};`;
      output = `var a = 0;
                for (var i = 10; i > 0; i--) {
                  a++;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle single-line for loops without a parenthetical', function() {
      input = String.raw`var b = 0; for var j = 0; j < 10; j++ {b++};`;
      output = `var b = 0;
                for (var j = 0; j < 10; j++) {
                  b++;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle simple, single-line for-in loops with a parenthetical and the item declared as a variable', function() {
      input = String.raw`var c = 0; var numbers = [1,2,3,4,5]; for (var n) in numbers {c += n};`;
      output = `var c = 0;
                var numbers = [
                  1,
                  2,
                  3,
                  4,
                  5
                ];
                for (var n in numbers) {
                  c += n;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle simple, single-line for-in loops without a parenthetical', function() {
      input = String.raw`var c = 0; var numbers = [1,2,3,4,5]; for n in numbers {c += n};`;
      output = `var c = 0;
                var numbers = [
                  1,
                  2,
                  3,
                  4,
                  5
                ];
                for (var n in numbers) {
                  c += n;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Multi-line statements', function() {

    it('should handle simple multi-line variable assignment', function() {
      input = String.raw`var b = true;
                         var c = 0;`;
      output = `var b = true;
                var c = 0;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle complex multi-line variable assignment without semi-colons', function() {
      input = String.raw`var e = ["Eggs", "Milk", "Bacon"]
                         var f = ["one": 1, "two": 2, "three": 3]
                         let g = [1 : "one",2   :"two", 3: "three"]`;
      output = `var e = [
                  'Eggs',
                  'Milk',
                  'Bacon'
                ];
                var f = {
                  'one': 1,
                  'two': 2,
                  'three': 3
                };
                var g = {
                  1: 'one',
                  2: 'two',
                  3: 'three'
                };`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    })

    it('should handle simple multi-line variable assignment with type annotations', function() {
      input = String.raw`var name: String = "Joe"
                         let num: Int = 5;
                         let anotherNum: UInt16 = 6
                         var yetAnotherNum: Float = 4.2;
                         let truth: Bool = false`;
      output = `var name = 'Joe';
                var num = 5;
                var anotherNum = 6;
                var yetAnotherNum = 4.2;
                var truth = false;`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle successive single-line comments', function() {
      input = String.raw`// function body goes here
                         // firstParameterName and secondParameterName refer to
                         // the argument values for the first and second parameters
      `;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle multi-line comments', function() {
      input = String.raw`/*
                         Comment 1
                         Comment 2
                         */`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Multi-line if statements', function() {

    it('should handle simple multi-line if statements', function() {
      input = String.raw`var a = false
                         var b = 0;
                         if (a) {
                           b++;
                         }`;
      output = `var a = false;
                var b = 0;
                if (a) {
                  b++;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle simple multi-line if statements with complex conditions', function() {
      input = String.raw`var diceRoll = 6;
              if ++diceRoll == 7 {
                diceRoll = 1
              }`;
      output = `var diceRoll = 6;
                if (++diceRoll == 7) {
                  diceRoll = 1;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
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
      output = `var x = true;
                var y = false;
                var a = '';
                var z;
                if (x) {
                  if (y) {
                    z = true;
                  } else if (true) {
                    a = '<3 JS';
                  } else {
                    a = 'never get here';
                  }
                } else {
                  a = 'x is false';
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Multi-line for loops', function() {

    it('should handle simple multi-line for loops', function() {
      input = String.raw`var b = 0;
              for var i = 0; i < 10; i++ {
                b++
              }`;
      output = `var b = 0;
                for (var i = 0; i < 10; i++) {
                  b++;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle multi-line nested for loops', function() {
      input = String.raw`var arrays = [[1,2,3], [4,5,6], [7,8,9]]
               var total = 0
               for (var i = 0; i < 3; i++) {
                 for var j = 0; j < 3; j++ {
                   total += arrays[i][j]
                 }
               }`;
      output = `var arrays = [
                [
                  1,
                  2,
                  3
                ],
                [
                  4,
                  5,
                  6
                ],
                [
                  7,
                  8,
                  9
                ]
              ];
              var total = 0;
              for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                  total += arrays[i][j];
                }
              }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Multi-line for-in loops', function() {

    it('should handle simple multi-line for-in loops', function() {
      input = String.raw`var c = 0
               var numbers = [1,2,3,4,5]
               for n in numbers {
                 c += n
               }`;
      output = `var c = 0;
                var numbers = [
                  1,
                  2,
                  3,
                  4,
                  5
                ];
                for (var n in numbers) {
                  c += n;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('handle for-in loops that iterate over a range', function () {
      input = String.raw`var sum = 0
                    for i in 0..<5 {
                        sum += i
                    }`;
      output = ``;
      expect(R.equals(parser(input), output)).to.equal(true);
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
                    }`;
      output = `var interestingNumbers = {
                'Prime': [
                  2,
                  3,
                  5,
                  7,
                  11,
                  13
                ],
                'Fibonacci': [
                  1,
                  1,
                  2,
                  3,
                  5,
                  8
                ],
                'Square': [
                  1,
                  4,
                  9,
                  16,
                  25
                ]
              };
              var largest = 0;
              for (var kind in interestingNumbers) {
                var numbers = interestingNumbers[kind];
                for (var number in numbers) {
                  if (number > largest) {
                    largest = number;
                  }
                }
              }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Multi-Line While/Repeat-While loops', function() {

    it('should handle multi-line while loops without a parenthetical', function() {
      input = String.raw`var i = 10;
              while i >= 0 {
                i--
              }`;
      output = `var i = 10;
                while (i >= 0) {
                  i--;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle multi-line while loops with a parenthetical', function() {
      input = String.raw`var i = 10;
              while (i >= 0) {
                i--
              }`;
      output = `var i = 10;
                while (i >= 0) {
                  i--;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle multi-line repeat-while loops with a parenthetical', function() {
      input = String.raw`var i = 10;
               repeat {
                 i--
               } while (i > 0);`;
      output = `var i = 10;
                do {
                  i--;
                } while (i > 0);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle multi-line repeat-while loops without a parenthetical', function() {
      input = String.raw`var i = 10
               repeat {
                 i--
               } while i > 0`;
      output = `var i = 10;
                do {
                  i--;
                } while (i > 0);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  xdescribe('Switch Statements', function() {

    xit('should handle multi-line switch statements', function() {
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
      output = `var x = 2;
                var y = '';
                switch (x) {
                case 1:
                    y += 'positive';
                    break;
                case 2:
                    y += 'positive';
                    break;
                case 3:
                    y += 'positive';
                    break;
                case -1:
                    y += 'negative';
                    break;
                case -2:
                    y += 'negative';
                    break;
                case -3:
                    y += 'negative';
                    break;
                case 0:
                    y += 'zero';
                    break;
                default:
                    y += 'dunno';
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Complex Control Flow', function () {

    it('should handle nested if-else statements within a loop', function () {
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
      output = `var gameInProgress = false;
                var score = 0;
                var typeOfScore = '';
                var PAT = '';
                while (gameInProgress) {
                  if (typeOfScore != '') {
                    if (typeOfScore == 'TD') {
                      score += 6;
                    } else if (typeOfScore == 'PAT') {
                      if (PAT == 'TD') {
                        score += 2;
                      } else {
                        score += 1;
                      }
                    } else if (typeOfScore == 'FG') {
                      score += 3;
                    } else {
                      score += 2;
                    }
                    typeOfScore = '';
                  }
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle complex control flow with erratic spacing and inconsistent use of semicolons and parenthesis', function () {
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
                 }`;
      output = `var gameInProgress = false;
                var score = 0;
                var typeOfScore = '';
                var PAT = '';
                while (gameInProgress) {
                    if (typeOfScore != '') {
                        if (typeOfScore == 'TD') {
                            score += 6;
                        } else if (typeOfScore == 'PAT') {
                            if (PAT == 'TD') {
                                score += 2;
                            } else {
                                score += 1;
                            }
                        } else if (typeOfScore == 'FG') {
                            score += 3;
                        } else {
                            score += 2;
                        }
                        typeOfScore = '';
                    }
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });
});
