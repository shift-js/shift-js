var expect = require('chai').expect;
var escodegen = require('escodegen');
var generator = escodegen.generate;

var removeIndentation = function(str) {
  return str.replace(/\n\s*/gm, "\n").replace(/\s*/, "");
};

describe('Generator: Fourth Milestone', function() {

    xdescribe('Classes and Stuctures', function () {
      // input = String.raw`class VideoMode {
      //                       var interlaced = false
      //                       var frameRate = 0.0
      //                   }
      //                   struct Resolution {
      //                       var width = 0
      //                       var height = 0
      //                   }`;

      xit('should handle basic definitions of classes and structs', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`class VideoMode {
      //                var interlaced = false
      //                var frameRate = 0.0
      //             }
      //             struct Resolution {
      //                 var width = 0
      //                 var height = 0
      //             }
      //             let someVideoMode = VideoMode()
      //             let someResolution = Resolution();`;
      // AST Explorer input:

      xit('should handle basic initialization of classes and structs', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`class VideoMode {
      //                        var interlaced = false
      //                        var frameRate = 0.0
      //                     }
      //                     struct Resolution {
      //                         var width = 0
      //                         var height = 0
      //                     }
      //                     let someVideoMode = VideoMode()
      //                     let someResolution = Resolution();

      //                     let someFrameRate = someVideoMode.frameRate;
      //                     let someWidth = someResolution.width`;
      // AST Explorer input:

      xit('should handle basic property access via dot notation', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`struct Resolution {
      //                       var width = 0
      //                       var height = 0
      //                   }

      //                   let someResolution = Resolution(width: 640, height: 480)`;
      // AST Explorer input:

      xit('should handle basic memberwise initialization', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`var resolutionHeight = 480
      //                     struct Resolution {
      //                         var width = 0
      //                         var height = 0
      //                     }

      //                     let someResolution = Resolution(width: ((50 * 2) * 6) + 40, height: resolutionHeight)`;
      // AST Explorer input:

      xit('should handle complex memberwise initialization with internal parentheses', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`struct Greeting {
      //                       var greeting = ""
      //                   }
      //                   func returnWorld() -> String {
      //                       return "World"
      //                   }
      //                   var helloWorld = Greeting(greeting: "Hello, \(returnWorld())!")`;
      // AST Explorer input:

      xit('should handle complex memberwise initialization with string interpolation that contains a function invocation', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`struct FixedLengthRange {
      //                         var firstValue: Int
      //                         let length: Int
      //                     }
      //                     let rangeOfOneHundred = FixedLengthRange(firstValue: 1, length: 100)`;
      // AST Explorer input:

      xit('should handle variable and constant stored properties', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`class Medley {
      //                 var a = 1
      //                 var b = "hai, world"
      //                 let c = true
      //                 /* Comment 1

      //                 */ var d = 1 // Comment 2
      //                 var e = ["Eggs", "Milk", "Bacon"];
      //                 var f = ["one": 1, "two": 2, "three": 3]
      //                 let http200Status = (statusCode: 200, description: "OK")
      //                 var g = 5 + 6 / 4 - (-16 % 4.2) * 55
      //                 let h = 6 != 9
      //                 var i = "Stephen" + " " + "Tabor" + "!"
      //             }`;
      // AST Explorer input:

      xit('should handle properties of all kinds', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`class Counter {
      //                         var total = 0
      //                         func increment() {
      //                             ++total
      //                         }
      //                         func incrementBy(amount: Int) {
      //                             total += amount
      //                         }
      //                         func reset() {
      //                             total = 0
      //                         }
      //                     }
      //                     var someCounter = Counter()
      //                     someCounter.incrementBy(5)`;
      // AST Explorer input:

      xit('should handle basic class instance method definitions, and their invocation', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`class Counter {
      //                         var total = 0
      //                         func increment() {
      //                             ++total
      //                         }
      //                         func incrementBy(amount: Int, numberOfTimes: Int) {
      //                                 total += amount * numberOfTimes
      //                         }
      //                         func reset() {
      //                             total = 0
      //                         }
      //                     }
      //                     var someCounter = Counter()
      //                     someCounter.incrementBy(50, numberOfTimes: 10)
      //                     someCounter.total`;
      // AST Explorer input:

      xit('should handle basic class instance method definitions with multiple parameter names, and their invocation', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`class Counter {
      //                         var total = 0
      //                         func increment() {
      //                             ++self.total
      //                         }
      //                         func incrementBy(amount: Int) {
      //                             self.total += amount
      //                         }
      //                         func reset() {
      //                             self.total = 0
      //                         }
      //                     }
      //                     var someCounter = Counter()
      //                     someCounter.incrementBy(5)`;
      // AST Explorer input:

      xit('should handle basic instance method definitions that use self, and their invocation', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`struct Counter {
      //                         var total = 0
      //                         mutating func increment() {
      //                             ++total
      //                         }
      //                         mutating func incrementBy(amount: Int) {
      //                             total += amount
      //                         }
      //                         mutating func reset() {
      //                             total = 0
      //                         }
      //                     }`;
      // AST Explorer input:

      xit('should handle basic struct mutating method definitions', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`struct Counter {
      //                         var total = 0
      //                         mutating func increment() {
      //                             self = Counter(total: ++total)
      //                         }
      //                     }`;
      // AST Explorer input:

      xit('should handle basic struct mutating methods that assign to self', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`class ParentClass {
      //                         static func returnTen() -> Int {
      //                             return 10
      //                         }
      //                         class func returnString() -> String {
      //                             return "my string"
      //                         }
      //                     }
      //                     ParentClass.returnTen()
      //                     ParentClass.returnString()`;
      // AST Explorer input:

      xit('should handle type methods declared with the static or class keyword', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`class SuperClass {
      //                         var a = 0
      //                         var b = 1
      //                         func incrementA() {
      //                             ++a
      //                         }
      //                         static func returnTen() -> Int {
      //                             return 10
      //                         }
      //                         class func returnString() -> String {
      //                             return "my string"
      //                         }
      //                     }
      //                     class SubClass: SuperClass {
      //                         var c = 2
      //                     }`
      // AST Explorer input:

      xit('should handle basic class inheritance', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`class SuperClass {
      //                       var a = 0
      //                       var b = 1
      //                       func incrementA() {
      //                           ++a
      //                       }
      //                       static func returnTen() -> Int {
      //                           return 10
      //                       }
      //                       final func returnString() -> String {
      //                           return "my string"
      //                       }
      //                   }
      //                   class SubClass: SuperClass {
      //                       override func incrementA() {
      //                           a++
      //                       }
      //                   }`;
      // AST Explorer input:

      xit('should handle methods declared as final methods and methods that override inherited methods', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      // input = String.raw`       class    SuperClass            {    var a = 0

      //                    var     b = 1   ;
      //                        func incrementA(){
      //                            ++a
      //                                                         }
      //                        static       func returnTen() -> Int {
      //                            return 10
      //                    }
      //                                              final func returnString()-> String     {
      //                            return "my string"
      //                         }
      //                    }
      //                    class  SubClass :  SuperClass {
      //                        override func  incrementA() {
      //                            a++ ;
      //                        }
      //                    }
      //                     var  someSuper            = SuperClass  ()

      //                            someSuper.a         ;someSuper.returnString() ;
      //                           `;
      // AST Explorer input:

      xit('should handle class declaration, initialization, property value lookups, and method calls with erratic spacing and inconsistent use of semi-colons', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });
    });

    xdescribe('Native Methods and Type Properties', function () {

      // input = String.raw`var name = "Joe"
      //                    var arr = [1,2]
      //                    var tup = (1,2)
      //                    print(name)
      //                    print("Hello, \(name)")
      //                    print(5 * (1 + 1))
      //                    print(arr[1])
      //                    print(tup.0)`;
      // AST Explorer input:

      xit('should handle calls to print', function () {
        input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
      });

      xdescribe('Range Operations', function () {

        // Swift input: 'var a = 1...5'
        // AST Explorer input:
        // AST Explorer input:

      xit('should handle closed ranges', function () {
          input = "FILL_ME_IN";
          output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // Swift input: 'var a = 1.0...5.0'
        // AST Explorer input:
        // AST Explorer input:

      xit('should handle decimal ending in 0 closed ranges', function () {
          input = "FILL_ME_IN";
          output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // Swift input: 'var a = 1.2...5.3'
        // AST Explorer input:
        // AST Explorer input:

      xit('should handle random decimal closed ranges', function () {
          input = "FILL_ME_IN";
          output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // Swift input: 'var b = 1..<5'
        // AST Explorer input:
        // AST Explorer input:

      xit('should handle half-open ranges', function () {
          input = "FILL_ME_IN";
          output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // Swift input: 'var a = 1.0..<5.0'
        // AST Explorer input:
        // AST Explorer input:

      xit('should handle decimal ending in 0 half-open ranges', function () {
          input = "FILL_ME_IN";
          output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // Swift input: 'var a = 1.2..<5.3'
        // AST Explorer input:
        // AST Explorer input:

      xit('should handle random decimal half-open ranges', function () {
          input = "FILL_ME_IN";
          output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // Swift input: 'var a = 1...5; var b = 2..<6'
        // AST Explorer input:
        // AST Explorer input:

      xit('should handle all ranges', function () {
          input = "FILL_ME_IN";
          output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // Swift input: 'let start = 0; let end = 10; let range = start..<end; let fullRange = start...end;'
        // AST Explorer input:
        // AST Explorer input:

      xit('should handle ranges delimited by identifiers', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

      });

      describe('String Properties and Methods', function () {

        // AST Explorer input:

      xit('should handle the String characters property', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // AST Explorer input:

      xit('should handle the String count property', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // AST Explorer input:

      xit('should handle the String append method', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // AST Explorer input:

      xit('should handle the String indices and their associated methods', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // AST Explorer input:

      xit('should handle the String methods for inserting and removing characters', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // AST Explorer input:

      xit('should handle the has prefix and has suffix string methods', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

      });

      describe('Collection Properties and Methods', function () {

        // AST Explorer input:

      xit('should handle the array append method', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // AST Explorer input:

      xit('should handle the array count property', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

        // AST Explorer input:

      xit('should handle array initialization with a default value', function () {
          input = "FILL_ME_IN";
        output = ``;
        expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
        });

      });
    });
});