var expect = require('chai').expect;
var api = require('../../transpiler/api.js');
var compile = api.compile;

var removeIndentation = function(str) {
  return str.replace(/\n\s*/gm, "\n").replace(/\s*/, "");
};

describe('End to End: Third Milestone', function() {

  describe('Functions', function() {

    it('should handle function declaration and invocation with no spacing and with var in function parameters', function() {
      input = String.raw`func someFunction(var a: Int) -> Int {
                              a = a + 1;
                              return a;
                          }
                          someFunction(5);`;
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle function declaration and invocation with no spacing', function() {
      input = String.raw`func someFunction(a: Int)->Int{
                                let a = a + 1;
                                return a
                            }
                            someFunction(5);`;
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle function declaration and invocation with spaces between each part of the declaration', function() {
      input = String.raw`func someFunction (a: Int) -> Int {
                              let a = a + 1;
                              return a
                          }
                          someFunction(5);`
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle function declaration and invocation with no space after the function name', function() {
      input = String.raw`func someFunction(a: Int) -> Int {
                                        let a = a + 1;
                                        return a
                                    }
                                    someFunction(5);`;
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle function declaration and invocation with no space after the parameter declaration', function() {
      input = String.raw`func someFunction(a: Int)-> Int {
                              let a = a + 1;
                              return a
                          }
                          someFunction(5);`
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle function declaration and invocation with erratic spacing', function() {
      input = String.raw`func  someFunction(a: Int)           ->  Int{
                              let a = a +               1;
                              return                                  a
                          }
                          someFunction           (5)       ;`;
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle functions that return strings', function() {
      input = String.raw`func sayHelloWorld() -> String {
                             return "hello, world"
                         }`;
      output = `function sayHelloWorld() {
                  return 'hello, world';
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle functions with an input that return strings', function() {
      input = String.raw`func sayHello(personName: String) -> String {
                            let greeting = "Hello, " + personName + "!"
                            return greeting
                        }`;
      output = `function sayHello(personName) {
                  var greeting = 'Hello, ' + personName + '!';
                  return greeting;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle functions that have if else statements that use curly braces and have a return value', function() {
      input = String.raw`func sayHello(alreadyGreeted: Bool) -> String {
                              if alreadyGreeted {
                                  return "blah"
                              } else {
                                  return "hello"
                              }
                          }
                          sayHello(true)`;
      output = `function sayHello(alreadyGreeted) {
                  if (alreadyGreeted) {
                    return 'blah';
                  } else {
                    return 'hello';
                  }
                }
                sayHello(true);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    it('should handle nested functions with function invocation', function() {
      input = String.raw`func sayHello(firstName: String, lastName: String) -> String {
                  func giveString() -> String {
                    return firstName + " " + lastName
                  }
                  return giveString()
              }`;
      output = `function sayHello(firstName, lastName) {
                  function giveString() {
                    return firstName + ' ' + lastName;
                  }
                  return giveString();
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions with string interpolation', function () {
      input = String.raw`func greet(name: String, day: String) -> String {
                      return "Hello \(name), today is \(day)."
                  }
                  greet("Bob", day: "Tuesday")`;
      output = `function greet(name, day) {
                  return 'Hello ' + name + ', today is ' + day + '.';
                }
                greet('Bob', 'Tuesday');`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions with many arguments', function () {
      input = String.raw`func addSevenInts(first: Int, second: Int, third: Int, fourth: Int, fifth: Int, sixth: Int, seventh: Int) -> Int {
                        let sum = first + second + third + fourth + fifth + sixth + seventh
                        return sum
                    }
                    addSevenInts(143242134, second: 34543, third: 4, fourth: 6, fifth: 0, sixth: 56, seventh: 5)`;
      output = `function addSevenInts(first, second, third, fourth, fifth, sixth, seventh) {
                  sum = first + second + third + fourth + fifth + sixth + seventh;
                  return sum;
                }
                addSevenInts(143242134, 34543, 4, 6, 0, 56, 5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle function invocations with internal parentheses', function () {
      input = String.raw`func addOne(input: Int) -> Int {
                              return input + 1
                          }
                          addOne(((17 * 4) - 3) * 5)`;
      output = `function addOne(input) {
                  return input + 1;
                }
                addOne((17 * 4 - 3) * 5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that return tuples', function () {
      input = String.raw`func returnTuple(num: Int) -> (plusFive: Int, timesFive: Int) {
                      let plusFiveResult = num + 5
                      let timesFiveResult = num * 5
                      return (plusFiveResult, timesFiveResult)
                  }
                  returnTuple(5)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that return tuples with mixed values', function () {
      input = String.raw`func nameAndAge(name: String, age: Int) -> (name: String, age: Int) {
                        return (name, age)
                    }
                    let person = nameAndAge("Steve", age: 45)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions with for loops, if and else if statements, and native count methods', function () {
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
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions with for loops and if and else if statements', function () {
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
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
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
      output = `function sumOf() {
                  var numbers = Array.prototype.slice.call(arguments);
                  var sum = 0;
                  for (var number in numbers) {
                    sum += number;
                  }
                  return sum;
                }
                sumOf(1, 2, 3);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that return functions where the return function is specified within parentheses', function () {
      input = String.raw`func makeIncrementer() -> ((Int) -> Int) {
                          func addOne(number: Int) -> Int {
                              return 1 + number
                          }
                          return addOne
                      }`;
      output = `function makeIncrementer() {
                  function addOne(number) {
                    return 1 + number;
                  }
                  return addOne;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that return functions where the return function is specified without parentheses', function () {
      input = String.raw`func makeIncrementer() -> (Int) -> Int {
                          func addOne(number: Int) -> Int {
                              return 1 + number
                          }
                          return addOne
                      }`;
      output = `function makeIncrementer() {
                  function addOne(number) {
                    return 1 + number;
                  }
                  return addOne;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that take a function specified with parentheses as an argument', function () {
      input = String.raw`func any(list: [Int], condition: ((Int) -> Bool)) -> Bool {
                            for item in list {
                                if condition(item) {
                                    return true
                                }
                            }
                            return false
                        }`;
      output = `function any(list, condition) {
                  for (var item in list) {
                    if (condition(item)) {
                      return true;
                    }
                  }
                  return false;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that take a function specified without parentheses as an argument', function () {
      input = String.raw`func any(list: [Int], condition: (Int) -> Bool) -> Bool {
                            for item in list {
                                if condition(item) {
                                    return true
                                }
                            }
                            return false
                        }`;
      output = `function any(list, condition) {
                  for (var item in list) {
                    if (condition(item)) {
                      return true;
                    }
                  }
                  return false;
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions whose invocation contains string interpolation that contains a function invocation', function () {
      input = String.raw`func returnWorld() -> String {
                            return "World"
                        }
                        func printInput(input: String) {
                            print(input)
                        }
                        printInput("Hello, \(returnWorld())!")`;
      output = `function returnWorld() {
                  return 'World';
                }
                function printInput(input) {
                  print(input);
                }
                printInput('Hello, ' + returnWorld() + '!');`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });
});
