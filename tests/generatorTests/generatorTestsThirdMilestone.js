var expect = require('chai').expect;
var escodegen = require('escodegen');
var generator = escodegen.generate;

var removeIndentation = function(str) {
  return str.replace(/\n\s*/gm, "\n").replace(/\s*/, "");
};

describe('Generator: Third Milestone', function() {

  describe('Functions', function() {

    // input = String.raw`func someFunction(var a: Int) -> Int {
    //                         a = a + 1;
    //                         return a;
    //                     }
    //                     someFunction(5);`;
    // AST Explorer input:
    // var someFunction = function(a) {
    //   a = a + 1;
    //   return a;
    // }
    // someFunction(5);
    it('should handle function declaration and invocation with no spacing and with var in function parameters', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "someFunction"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "right": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "right": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "someFunction"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func someFunction(a: Int)->Int{
    //                           let a = a + 1;
    //                           return a
    //                       }
    //                       someFunction(5);`;
    // AST Explorer input:
    // var someFunction = function(a) {
    //   a = a + 1;
    //   return a;
    // }
    // someFunction(5);
    it('should handle function declaration and invocation with no spacing', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "someFunction"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "right": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "right": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "someFunction"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func someFunction (a: Int) -> Int {
    //                         let a = a + 1;
    //                         return a
    //                     }
    //                     someFunction(5);`
    // AST Explorer input:
    // var someFunction = function(a) {
    //   a = a + 1;
    //   return a;
    // }
    // someFunction(5);
    it('should handle function declaration and invocation with spaces between each part of the declaration', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "someFunction"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "right": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "right": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "someFunction"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func someFunction(a: Int) -> Int {
    //                                   let a = a + 1;
    //                                   return a
    //                               }
    //                               someFunction(5);`;
    // AST Explorer input:
    // var someFunction = function(a) {
    //   a = a + 1;
    //   return a;
    // }
    // someFunction(5);
    it('should handle function declaration and invocation with no space after the function name', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "someFunction"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "right": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "right": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "someFunction"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func someFunction(a: Int)-> Int {
    //                         let a = a + 1;
    //                         return a
    //                     }
    //                     someFunction(5);`
    // AST Explorer input:
    // var someFunction = function(a) {
    //   a = a + 1;
    //   return a;
    // }
    // someFunction(5);
    it('should handle function declaration and invocation with no space after the parameter declaration', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "someFunction"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "right": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "right": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "someFunction"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func  someFunction(a: Int)           ->  Int{
    //                         let a = a +               1;
    //                         return                                  a
    //                     }
    //                     someFunction           (5)       ;`;
    // AST Explorer input:
    // var someFunction = function(a) {
    //   a = a + 1;
    //   return a;
    // }
    // someFunction(5);
    it('should handle function declaration and invocation with erratic spacing', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "someFunction"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "right": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "right": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  }
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "someFunction"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function someFunction(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func sayHelloWorld() -> String {
    //                        return "hello, world"
    //                    }`;
    it('should handle functions that return strings', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "sayHelloWorld"
            },
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Literal",
                    "value": "hello, world",
                    "raw": "\"hello, world\""
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          }
        ],
        "sourceType": "module"
      };
      output = `function sayHelloWorld() {
                  return 'hello, world';
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func sayHello(personName: String) -> String {
    //                       let greeting = "Hello, " + personName + "!"
    //                       return greeting
    //                   }`;
    it('should handle functions with an input that return strings', function() {
      input = {

        "type": "Program",
        "body": [
          {

            "type": "FunctionDeclaration",
            "id": {

              "type": "Identifier",
              "name": "sayHello"
            },
            "params": [
              {

                "type": "Identifier",
                "name": "personName"
              }
            ],
            "defaults": [],
            "body": {

              "type": "BlockStatement",
              "body": [
                {

                  "type": "VariableDeclaration",
                  "declarations": [
                    {

                      "type": "VariableDeclarator",
                      "id": {

                        "type": "Identifier",
                        "name": "greeting"
                      },
                      "init": {

                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {

                          "type": "BinaryExpression",
                          "operator": "+",
                          "left": {

                            "type": "Literal",
                            "value": "Hello, ",
                            "raw": "\"Hello, \""
                          },
                          "right": {

                            "type": "Identifier",
                            "name": "personName"
                          }
                        },
                        "right": {

                          "type": "Literal",
                          "value": "!",
                          "raw": "\"!\""
                        }
                      }
                    }
                  ],
                  "kind": "var"
                },
                {

                  "type": "ReturnStatement",
                  "argument": {

                    "type": "Identifier",
                    "name": "greeting"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          }
        ],
        "sourceType": "module"
      };
      output = `function sayHello(personName) {
                  var greeting = 'Hello, ' + personName + '!';
                  return greeting;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func sayHello(alreadyGreeted: Bool) -> String {
    //                         if alreadyGreeted {
    //                             return "blah"
    //                         } else {
    //                             return "hello"
    //                         }
    //                     }
    //                     sayHello(true)`;
    it('should handle functions that have if else statements that use curly braces and have a return value', function() {
      input = {

        "type": "Program",
        "body": [
          {

            "type": "FunctionDeclaration",
            "id": {

              "type": "Identifier",
              "name": "sayHello"
            },
            "params": [
              {

                "type": "Identifier",
                "name": "alreadyGreeted"
              }
            ],
            "defaults": [],
            "body": {

              "type": "BlockStatement",
              "body": [
                {

                  "type": "IfStatement",
                  "test": {

                    "type": "Identifier",
                    "name": "alreadyGreeted"
                  },
                  "consequent": {

                    "type": "BlockStatement",
                    "body": [
                      {

                        "type": "ReturnStatement",
                        "argument": {

                          "type": "Literal",
                          "value": "blah",
                          "raw": "\"blah\""
                        }
                      }
                    ]
                  },
                  "alternate": {

                    "type": "BlockStatement",
                    "body": [
                      {

                        "type": "ReturnStatement",
                        "argument": {

                          "type": "Literal",
                          "value": "hello",
                          "raw": "\"hello\""
                        }
                      }
                    ]
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {

            "type": "ExpressionStatement",
            "expression": {

              "type": "CallExpression",
              "callee": {

                "type": "Identifier",
                "name": "sayHello"
              },
              "arguments": [
                {

                  "type": "Literal",
                  "value": true,
                  "raw": "true"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function sayHello(alreadyGreeted) {
                  if (alreadyGreeted) {
                    return 'blah';
                  } else {
                    return 'hello';
                  }
                }
                sayHello(true);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func sayHello(firstName: String, lastName: String) -> String {
    //             func giveString() -> String {
    //               return firstName + " " + lastName
    //             }
    //             return giveString()
    //         }`;
    it('should handle nested functions with function invocation', function() {
      input = {

        "type": "Program",
        "body": [
          {

            "type": "FunctionDeclaration",
            "id": {

              "type": "Identifier",
              "name": "sayHello"
            },
            "params": [
              {

                "type": "Identifier",
                "name": "firstName"
              },
              {

                "type": "Identifier",
                "name": "lastName"
              }
            ],
            "defaults": [],
            "body": {

              "type": "BlockStatement",
              "body": [
                {

                  "type": "FunctionDeclaration",
                  "id": {

                    "type": "Identifier",
                    "name": "giveString"
                  },
                  "params": [],
                  "defaults": [],
                  "body": {

                    "type": "BlockStatement",
                    "body": [
                      {

                        "type": "ReturnStatement",
                        "argument": {

                          "type": "BinaryExpression",
                          "operator": "+",
                          "left": {

                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {

                              "type": "Identifier",
                              "name": "firstName"
                            },
                            "right": {

                              "type": "Literal",
                              "value": " ",
                              "raw": "\" \""
                            }
                          },
                          "right": {

                            "type": "Identifier",
                            "name": "lastName"
                          }
                        }
                      }
                    ]
                  },
                  "generator": false,
                  "expression": false
                },
                {

                  "type": "ReturnStatement",
                  "argument": {

                    "type": "CallExpression",
                    "callee": {

                      "type": "Identifier",
                      "name": "giveString"
                    },
                    "arguments": []
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          }
        ],
        "sourceType": "module"
      };
      output = `function sayHello(firstName, lastName) {
                  function giveString() {
                    return firstName + ' ' + lastName;
                  }
                  return giveString();
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func greet(name: String, day: String) -> String {
    //                 return "Hello \(name), today is \(day)."
    //             }
    //             greet("Bob", day: "Tuesday")`;
    it('should handle functions with string interpolation', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "greet"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "name"
              },
              {
                "type": "Identifier",
                "name": "day"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                          "type": "BinaryExpression",
                          "operator": "+",
                          "left": {
                            "type": "Literal",
                            "value": "Hello ",
                            "raw": "\"Hello \""
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "name"
                          }
                        },
                        "right": {
                          "type": "Literal",
                          "value": ", today is ",
                          "raw": "\", today is \""
                        }
                      },
                      "right": {
                        "type": "Identifier",
                        "name": "day"
                      }
                    },
                    "right": {
                      "type": "Literal",
                      "value": ".",
                      "raw": "\".\""
                    }
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {

              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "greet"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": "Bob",
                  "raw": "\"Bob\""
                },
                {
                  "type": "Literal",
                  "value": "Tuesday",
                  "raw": "\"Tuesday\""
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function greet(name, day) {
                  return 'Hello ' + name + ', today is ' + day + '.';
                }
                greet('Bob', 'Tuesday');`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func addSevenInts(first: Int, second: Int, third: Int, fourth: Int, fifth: Int, sixth: Int, seventh: Int) -> Int {
    //                   let sum = first + second + third + fourth + fifth + sixth + seventh
    //                   return sum
    //               }
    //               addSevenInts(143242134, second: 34543, third: 4, fourth: 6, fifth: 0, sixth: 56, seventh: 5)`;
    it('should handle functions with many arguments', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "addSevenInts"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "first"
              },
              {
                "type": "Identifier",
                "name": "second"
              },
              {
                "type": "Identifier",
                "name": "third"
              },
              {
                "type": "Identifier",
                "name": "fourth"
              },
              {
                "type": "Identifier",
                "name": "fifth"
              },
              {
                "type": "Identifier",
                "name": "sixth"
              },
              {
                "type": "Identifier",
                "name": "seventh"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "sum"
                    },
                    "right": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                          "type": "BinaryExpression",
                          "operator": "+",
                          "left": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                              "type": "BinaryExpression",
                              "operator": "+",
                              "left": {
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                  "type": "Identifier",
                                  "name": "first"
                                },
                                "right": {
                                  "type": "Identifier",
                                  "name": "second"
                                }
                              },
                              "right": {
                                "type": "Identifier",
                                "name": "third"
                              }
                            },
                            "right": {
                              "type": "Identifier",
                              "name": "fourth"
                            }
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "fifth"
                          }
                        },
                        "right": {
                          "type": "Identifier",
                          "name": "sixth"
                        }
                      },
                      "right": {
                        "type": "Identifier",
                        "name": "seventh"
                      }
                    }
                  }
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "sum"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "addSevenInts"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": 143242134,
                  "raw": "143242134"
                },
                {
                  "type": "Literal",
                  "value": 34543,
                  "raw": "34543"
                },
                {
                  "type": "Literal",
                  "value": 4,
                  "raw": "4"
                },
                {
                  "type": "Literal",
                  "value": 6,
                  "raw": "6"
                },
                {
                  "type": "Literal",
                  "value": 0,
                  "raw": "0"
                },
                {
                  "type": "Literal",
                  "value": 56,
                  "raw": "56"
                },
                {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function addSevenInts(first, second, third, fourth, fifth, sixth, seventh) {
                  sum = first + second + third + fourth + fifth + sixth + seventh;
                  return sum;
                }
                addSevenInts(143242134, 34543, 4, 6, 0, 56, 5);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func addOne(input: Int) -> Int {
    //                         return input + 1
    //                     }
    //                     addOne(((17 * 4) - 3) * 5)`;
    it('should handle function invocations with internal parentheses', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "addOne"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "input"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "Identifier",
                      "name": "input"
                    },
                    "right": {
                      "type": "Literal",
                      "value": 1,
                      "raw": "1"
                    }
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "addOne"
              },
              "arguments": [
                {
                  "type": "BinaryExpression",
                  "operator": "*",
                  "left": {
                    "type": "BinaryExpression",
                    "operator": "-",
                    "left": {
                      "type": "BinaryExpression",
                      "operator": "*",
                      "left": {
                        "type": "Literal",
                        "value": 17,
                        "raw": "17"
                      },
                      "right": {
                        "type": "Literal",
                        "value": 4,
                        "raw": "4"
                      }
                    },
                    "right": {
                      "type": "Literal",
                      "value": 3,
                      "raw": "3"
                    }
                  },
                  "right": {
                    "type": "Literal",
                    "value": 5,
                    "raw": "5"
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function addOne(input) {
                  return input + 1;
                }
                addOne((17 * 4 - 3) * 5);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func returnTuple(num: Int) -> (plusFive: Int, timesFive: Int) {
    //                   let plusFiveResult = num + 5
    //                   let timesFiveResult = num * 5
    //                   return (plusFiveResult, timesFiveResult)
    //               }
    //               returnTuple(5)`;
    xit('should handle functions that return tuples', function () {
      input = "FILL_ME_IN";
      output = ``;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func nameAndAge(name: String, age: Int) -> (name: String, age: Int) {
    //                   return (name, age)
    //               }
    //               let person = nameAndAge("Steve", age: 45)`;
    xit('should handle functions that return tuples with mixed values', function () {
      input = "FILL_ME_IN";
      output = ``;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func minMax(array: [Int]) -> (min: Int, max: Int) {
    //             var currentMin = array[0]
    //             var currentMax = array[0]
    //             for value in array[1..<array.count] {
    //                 if value < currentMin {
    //                     currentMin = value
    //                 } else if value > currentMax {
    //                     currentMax = value
    //                 }
    //             }
    //             return (currentMin, currentMax)
    //         }`;
    xit('should handle functions with for loops, if and else if statements, and native count methods', function () {
      input = "FILL_ME_IN";
      output = ``;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func minMax(array: [Int]) -> (min: Int, max: Int) {
    //             var currentMin = array[0]
    //             var currentMax = array[0]
    //             for value in array[1..<2] {
    //                 if value < currentMin {
    //                     currentMin = value
    //                 } else if value > currentMax {
    //                     currentMax = value
    //                 }
    //             }
    //             return (currentMin, currentMax)
    //         }`;
    xit('should handle functions with for loops and if and else if statements', function () {
      input = "FILL_ME_IN";
      output = ``;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func sumOf(numbers: Int...) -> Int {
    //                   var sum = 0
    //                   for number in numbers {
    //                       sum += number
    //                   }
    //                   return sum
    //               }
    //               sumOf(1,2,3)`;
    it('should handle functions that have variadic parameters', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "sumOf"
            },
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "VariableDeclaration",
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "id": {
                        "type": "Identifier",
                        "name": "numbers"
                      },
                      "init": {
                        "type": "CallExpression",
                        "callee": {
                          "type": "MemberExpression",
                          "computed": false,
                          "object": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                              "type": "MemberExpression",
                              "computed": false,
                              "object": {
                                "type": "Identifier",
                                "name": "Array"
                              },
                              "property": {
                                "type": "Identifier",
                                "name": "prototype"
                              }
                            },
                            "property": {
                              "type": "Identifier",
                              "name": "slice"
                            }
                          },
                          "property": {
                            "type": "Identifier",
                            "name": "call"
                          }
                        },
                        "arguments": [
                          {
                            "type": "Identifier",
                            "name": "arguments"
                          }
                        ]
                      }
                    }
                  ],
                  "kind": "var"
                },
                {
                  "type": "VariableDeclaration",
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "id": {
                        "type": "Identifier",
                        "name": "sum"
                      },
                      "init": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "var"
                },
                {
                  "type": "ForInStatement",
                  "left": {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "number"
                        },
                        "init": null
                      }
                    ],
                    "kind": "var"
                  },
                  "right": {
                    "type": "Identifier",
                    "name": "numbers"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "expression": {
                          "type": "AssignmentExpression",
                          "operator": "+=",
                          "left": {
                            "type": "Identifier",
                            "name": "sum"
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "number"
                          }
                        }
                      }
                    ]
                  },
                  "each": false
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "sum"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "sumOf"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                },
                {
                  "type": "Literal",
                  "value": 2,
                  "raw": "2"
                },
                {
                  "type": "Literal",
                  "value": 3,
                  "raw": "3"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function sumOf() {
                  var numbers = Array.prototype.slice.call(arguments);
                  var sum = 0;
                  for (var number in numbers) {
                    sum += number;
                  }
                  return sum;
                }
                sumOf(1, 2, 3);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func makeIncrementer() -> ((Int) -> Int) {
    //                       func addOne(number: Int) -> Int {
    //                           return 1 + number
    //                       }
    //                       return addOne
    //                   }`;
    it('should handle functions that return functions where the return function is specified within parentheses', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "makeIncrementer"
            },
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "FunctionDeclaration",
                  "id": {
                    "type": "Identifier",
                    "name": "addOne"
                  },
                  "params": [
                    {
                      "type": "Identifier",
                      "name": "number"
                    }
                  ],
                  "defaults": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "ReturnStatement",
                        "argument": {
                          "type": "BinaryExpression",
                          "operator": "+",
                          "left": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "number"
                          }
                        }
                      }
                    ]
                  },
                  "generator": false,
                  "expression": false
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "addOne"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          }
        ],
        "sourceType": "module"
      };
      output = `function makeIncrementer() {
                  function addOne(number) {
                    return 1 + number;
                  }
                  return addOne;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func makeIncrementer() -> (Int) -> Int {
    //                       func addOne(number: Int) -> Int {
    //                           return 1 + number
    //                       }
    //                       return addOne
    //                   }`;
    it('should handle functions that return functions where the return function is specified without parentheses', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "makeIncrementer"
            },
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "FunctionDeclaration",
                  "id": {
                    "type": "Identifier",
                    "name": "addOne"
                  },
                  "params": [
                    {
                      "type": "Identifier",
                      "name": "number"
                    }
                  ],
                  "defaults": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "ReturnStatement",
                        "argument": {
                          "type": "BinaryExpression",
                          "operator": "+",
                          "left": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "number"
                          }
                        }
                      }
                    ]
                  },
                  "generator": false,
                  "expression": false
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Identifier",
                    "name": "addOne"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          }
        ],
        "sourceType": "module"
      };
      output = `function makeIncrementer() {
                  function addOne(number) {
                    return 1 + number;
                  }
                  return addOne;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func any(list: [Int], condition: ((Int) -> Bool)) -> Bool {
    //                         for item in list {
    //                             if condition(item) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    it('should handle functions that take a function specified with parentheses as an argument', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "any"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "list"
              },
              {
                "type": "Identifier",
                "name": "condition"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ForInStatement",
                  "left": {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "item"
                        },
                        "init": null
                      }
                    ],
                    "kind": "var"
                  },
                  "right": {
                    "type": "Identifier",
                    "name": "list"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "IfStatement",
                        "test": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "Identifier",
                            "name": "condition"
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "name": "item"
                            }
                          ]
                        },
                        "consequent": {
                          "type": "BlockStatement",
                          "body": [
                            {
                              "type": "ReturnStatement",
                              "argument": {
                                "type": "Literal",
                                "value": true,
                                "raw": "true"
                              }
                            }
                          ]
                        },
                        "alternate": null
                      }
                    ]
                  },
                  "each": false
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Literal",
                    "value": false,
                    "raw": "false"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          }
        ],
        "sourceType": "module"
      };
      output = `function any(list, condition) {
                  for (var item in list) {
                    if (condition(item)) {
                      return true;
                    }
                  }
                  return false;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func any(list: [Int], condition: (Int) -> Bool) -> Bool {
    //                         for item in list {
    //                             if condition(item) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    it('should handle functions that take a function specified without parentheses as an argument', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "any"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "list"
              },
              {
                "type": "Identifier",
                "name": "condition"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ForInStatement",
                  "left": {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "item"
                        },
                        "init": null
                      }
                    ],
                    "kind": "var"
                  },
                  "right": {
                    "type": "Identifier",
                    "name": "list"
                  },
                  "body": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "IfStatement",
                        "test": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "Identifier",
                            "name": "condition"
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "name": "item"
                            }
                          ]
                        },
                        "consequent": {
                          "type": "BlockStatement",
                          "body": [
                            {
                              "type": "ReturnStatement",
                              "argument": {
                                "type": "Literal",
                                "value": true,
                                "raw": "true"
                              }
                            }
                          ]
                        },
                        "alternate": null
                      }
                    ]
                  },
                  "each": false
                },
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Literal",
                    "value": false,
                    "raw": "false"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          }
        ],
        "sourceType": "module"
      };
      output = `function any(list, condition) {
                  for (var item in list) {
                    if (condition(item)) {
                      return true;
                    }
                  }
                  return false;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`func returnWorld() -> String {
    //                         return "World"
    //                     }
    //                     func printInput(input: String) {
    //                         print(input)
    //                     }
    //                     printInput("Hello, \(returnWorld())!")`;
    it('should handle functions whose invocation contains string interpolation that contains a function invocation', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "returnWorld"
            },
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "Literal",
                    "value": "World",
                    "raw": "'World'"
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "printInput"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "input"
              }
            ],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "Identifier",
                      "name": "print"
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "input"
                      }
                    ]
                  }
                }
              ]
            },
            "generator": false,
            "expression": false
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "printInput"
              },
              "arguments": [
                {
                  "type": "BinaryExpression",
                  "operator": "+",
                  "left": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "Literal",
                      "value": "Hello, ",
                      "raw": "'Hello, '"
                    },
                    "right": {
                      "type": "CallExpression",
                      "callee": {
                        "type": "Identifier",
                        "name": "returnWorld"
                      },
                      "arguments": []
                    }
                  },
                  "right": {
                    "type": "Literal",
                    "value": "!",
                    "raw": "'!'"
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `function returnWorld() {
                  return 'World';
                }
                function printInput(input) {
                  print(input);
                }
                printInput('Hello, ' + returnWorld() + '!');`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });
});
