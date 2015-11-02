var makeParser = require('../../transpiler/parser/parser');
var expect = require('chai').expect;
var util = require('util');
var R = require('ramda');
var parser;

describe('Parser: Third Milestone', function() {

  beforeEach(function() {
    parser = makeParser();
  });

  describe('Functions', function() {

    // input = String.raw`func someFunction(var a: Int) -> Int {
    //                         a = a + 1;
    //                         return a;
    //                     }
    //                     someFunction(5);`;
    //
    /** AST Explorer input:
     function someFunction(a) {
      a = a + 1;
      return a;
    }
     someFunction(5);
     */
    it('should handle function declaration and invocation with no spacing and with var in function parameters', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "DECLARATION_KEYWORD",  value: "var"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
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
      ];
      output = {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func someFunction(a: Int)->Int{
    //                           a = a + 1;
    //                           return a
    //                       }
    //                       someFunction(5);`;
    /** AST Explorer input:
     function someFunction(a) {
      a = a + 1;
      return a;
    }
     someFunction(5);
     */
    it('should handle function declaration and invocation with no spacing', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
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
      output = {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func someFunction (a: Int) -> Int {
    //                         let a = a + 1;
    //                         return a
    //                     }
    //                     someFunction(5);`
    /** AST Explorer input:
     var someFunction = function(a) {
      a = a + 1;
      return a;
    }
     someFunction(5);
     */
    it('should handle function declaration and invocation with spaces between each part of the declaration', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
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
      output = {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func someFunction(a: Int) -> Int {
    //                                   let a = a + 1;
    //                                   return a
    //                               }
    //                               someFunction(5);`;
    /** AST Explorer input:
     var someFunction = function(a) {
      a = a + 1;
      return a;
    }
     someFunction(5);
     */
    it('should handle function declaration and invocation with no space after the function name', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
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
      output = {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func someFunction(a: Int)-> Int {
    //                         let a = a + 1;
    //                         return a
    //                     }
    //                     someFunction(5);`
    /** AST Explorer input:
     var someFunction = function(a) {
      a = a + 1;
      return a;
    }
     someFunction(5);
     */
    it('should handle function declaration and invocation with no space after the parameter declaration', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
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
      output = {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func  someFunction(a: Int)           ->  Int{
    //                         let a = a +               1;
    //                         return                                  a
    //                     }
    //                     someFunction           (5)       ;`;
    /** AST Explorer input:
     var someFunction = function(a) {
      a = a + 1;
      return a;
    }
     someFunction(5);
     */
    it('should handle function declaration and invocation with erratic spacing', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
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
      output = {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func sayHelloWorld() -> String {
    //                        return "hello, world"
    //                    }`;
    /** AST Explorer input:
     function sayHelloWorld() {
      return "hello, world";
    }
     */
    it('should handle functions that return strings', function() {
      input = [
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
      ];
      output = {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func sayHello(personName: String) -> String {
    //                       let greeting = "Hello, " + personName + "!"
    //                       return greeting
    //                   }`;
    /** AST Explorer input:
     function sayHello(personName) {
      var greeting = "Hello, " + personName + "!";
      return greeting;
    }
     */
    it('should handle functions with an input that return strings', function() {
      input = [
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
      ];
      output = {

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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func sayHello(alreadyGreeted: Bool) -> String {
    //                         if alreadyGreeted {
    //                             return "blah"
    //                         } else {
    //                             return "hello"
    //                         }
    //                     }
    //                     sayHello(true)`;
    /** AST Explorer input:
     function sayHello(alreadyGreeted) {
      if (alreadyGreeted) {
        return "blah";
      } else {
        return "hello";
      }
    }
     sayHello(true);
     */
    it('should handle functions that have if else statements that use curly braces and have a return value', function() {
      input = [
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
        { type: "STATEMENT_KEYWORD",    value: "else" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "STRING",               value: "hello" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENTS_END",       value: "}" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "TERMINATOR",           value: "\\n"},

        { type: "IDENTIFIER",           value: "sayHello" },
        { type: "INVOCATION_START",     value: "(" },
        { type: "BOOLEAN",              value: "true" },
        { type: "INVOCATION_END",       value: ")" },
        { type: "TERMINATOR",           value: "EOF"}
      ]
      output = {

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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func sayHello(firstName: String, lastName: String) -> String {
    //             func giveString() -> String {
    //               return firstName + " " + lastName
    //             }
    //             return giveString()
    //         }`;
    /** AST Explorer input:
     function sayHello(firstName, lastName) {
      function giveString() {
        return firstName + " " + lastName;
      }
      return giveString();
    }
     */
    it('should handle nested functions with function invocation', function() {
      input = [
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
      output = {

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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func greet(name: String, day: String) -> String {
    //                 return "Hello \(name), today is \(day)."
    //             }
    //             greet("Bob", day: "Tuesday")`;
    /** AST Explorer input:
     function greet(name, day) {
      return "Hello " + name + ", today is " + day + ".";
    }
     greet("Bob", "Tuesday");
     */
    xit('should handle functions with string interpolation', function () {
      input = [
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
      output = {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func addSevenInts(first: Int, second: Int, third: Int, fourth: Int, fifth: Int, sixth: Int, seventh: Int) -> Int {
    //                   let sum = first + second + third + fourth + fifth + sixth + seventh
    //                   return sum
    //               }
    //               addSevenInts(143242134, second: 34543, third: 4, fourth: 6, fifth: 0, sixth: 56, seventh: 5)`;
    /** AST Explorer input:
     function addSevenInts(first, second, third, fourth, fifth, sixth, seventh) {
      sum = first + second + third + fourth + fifth + sixth + seventh;
      return sum;
    }
     addSevenInts(143242134, 34543, 4, 6, 0, 56, 5);
     */
    xit('should handle functions with many arguments', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "addSevenInts" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "first" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "second" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "third" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "fourth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "fifth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "sixth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "seventh" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },

        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "sum" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "first" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "second" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "third" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "fourth" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "fifth" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "sixth" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "seventh" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "IDENTIFIER",                 value: "sum" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "addSevenInts" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "NUMBER",                     value: "143242134" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "second" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "34543" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "third" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "4" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "fourth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "6" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "fifth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "0" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "sixth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "56" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "seventh" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "5" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}

      ];
      output = {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func addOne(input: Int) -> Int {
    //                         return input + 1
    //                     }
    //                     addOne(((17 * 4) - 3) * 5)`;
    // AST Explorer input:
    // var addOne = function(input) {
    //   return input + 1
    // }
    // addOne(((17 * 4) - 3) * 5)
    xit('should handle function invocations with internal parentheses', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "input" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "IDENTIFIER",                 value: "input" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "1" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "NUMBER",                     value: "17" },
        { type: "OPERATOR",                   value: "*" },
        { type: "NUMBER",                     value: "4" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "-" },
        { type: "NUMBER",                     value: "3" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "*" },
        { type: "NUMBER",                     value: "5" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      output = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "addOne"
                },
                "init": {
                  "type": "FunctionExpression",
                  "id": null,
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
                }
              }
            ],
            "kind": "var"
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func returnTuple(num: Int) -> (plusFive: Int, timesFive: Int) {
    //                   let plusFiveResult = num + 5
    //                   let timesFiveResult = num * 5
    //                   return (plusFiveResult, timesFiveResult)
    //               }
    //               returnTuple(5)`;
    // AST Explorer input:
    xit('should handle functions that return tuples', function () {
      input = [
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
      output = "FILL_ME_IN";
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func nameAndAge(name: String, age: Int) -> (name: String, age: Int) {
    //                   return (name, age)
    //               }
    //               let person = nameAndAge("Steve", age: 45)`;
    // AST Explorer input:
    xit('should handle functions that return tuples with mixed values', function () {
      input = [
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
      output = "FILL_ME_IN";
      expect(R.equals(parser(input), output)).to.equal(true);
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
    // AST Explorer input:

    xit('should handle functions with for loops, if and else if statments, and native count methods', function () {
      input = [
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
        { type: "SUBSCRIPT_LOOKUP_START",       value: "[" },
        { type: "NUMBER",                       value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",         value: "]" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "DECLARATION_KEYWORD",          value: "var" },
        { type: "IDENTIFIER",                   value: "currentMax" },
        { type: "OPERATOR",                     value: "=" },
        { type: "IDENTIFIER",                   value: "array" },
        { type: "SUBSCRIPT_LOOKUP_START",       value: "[" },
        { type: "NUMBER",                       value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",         value: "]" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "STATEMENT_KEYWORD",            value: "for" },
        { type: "IDENTIFIER",                   value: "value" },
        { type: "STATEMENT_KEYWORD",            value: "in" },
        { type: "IDENTIFIER",                   value: "array" },
        { type: "SUBSCRIPT_LOOKUP_START",       value: "[" },

        { type: "NUMBER",                       value: "1" },
        { type: "HALF_OPEN_RANGE",              value: "..<" },

        { type: "IDENTIFIER",                   value: "array" },
        { type: "DOT_SYNTAX",                   value: "." },
        { type: "TYPE_PROPERTY",                value: "count" },

        { type: "SUBSCRIPT_LOOKUP_END",         value: "]" },
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
        { type: "IDENTIFIER",                   value: "currentMax"},
        { type: "TUPLE_END",                    value: ")"},
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "STATEMENTS_END",               value: "}" },
        { type: "TERMINATOR",                   value: "EOF"}
      ];
      output = "FILL_ME_IN";
      expect(R.equals(parser(input), output)).to.equal(true);
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
    // AST Explorer input:

    xit('should handle functions with for loops and if and else if statments', function () {
      input = [
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
        { type: "SUBSCRIPT_LOOKUP_START",         value: "[" },
        { type: "NUMBER",                         value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",           value: "]" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "currentMax" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "array" },
        { type: "SUBSCRIPT_LOOKUP_START",         value: "[" },
        { type: "NUMBER",                         value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",           value: "]" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "STATEMENT_KEYWORD",              value: "for" },
        { type: "IDENTIFIER",                     value: "value" },
        { type: "STATEMENT_KEYWORD",              value: "in" },
        { type: "IDENTIFIER",                     value: "array" },
        { type: "SUBSCRIPT_LOOKUP_START",         value: "[" },

        { type: "NUMBER",                         value: "1" },
        { type: "HALF_OPEN_RANGE",                value: "..<" },
        //TODO get native methods working
        { type: "NUMBER",                         value: "2" },
        // { type: "NODUCKINGCLUE",               value: "array.count" },

        { type: "SUBSCRIPT_LOOKUP_END",           value: "]" },
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
      output = "FILL_ME_IN";
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func sumOf(numbers: Int...) -> Int {
    //                   var sum = 0
    //                   for number in numbers {
    //                       sum += number
    //                   }
    //                   return sum
    //               }
    //               sumOf(1,2,3)`;
    // AST Explorer input:
    // var sumOf = function() {
    //   var numbers = Array.prototype.slice.call(arguments);
    //   var sum = 0;
    //   for (number in numbers) {
    //     sum += number
    //   }
    //   return sum
    // }
    // sumOf(1,2,3)

    xit('should handle functions that have variadic parameters', function () {
      input = [
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
        { type: "TERMINATOR",                 value: "\\n"},

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
      output = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "sumOf"
                },
                "init": {
                  "type": "FunctionExpression",
                  "id": null,
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
                          "type": "Identifier",
                          "name": "number"
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
                }
              }
            ],
            "kind": "var"
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func makeIncrementer() -> ((Int) -> Int) {
    //                       func addOne(number: Int) -> Int {
    //                           return 1 + number
    //                       }
    //                       return addOne
    //                   }`;
    // AST Explorer input:
    // var makeIncrementer = function() {
    //   var addOne = function(number) {
    //     return 1 + number
    //   }
    //   return addOne
    // }
    xit('should handle functions that return functions where the return function is specified within parentheses', function () {
      input = [
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
        { type: "TYPE_NUMBER",                value: "Int" },
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
      output = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "makeIncrementer"
                },
                "init": {
                  "type": "FunctionExpression",
                  "id": null,
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
                              "name": "addOne"
                            },
                            "init": {
                              "type": "FunctionExpression",
                              "id": null,
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
                            }
                          }
                        ],
                        "kind": "var"
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
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func makeIncrementer() -> (Int) -> Int {
    //                       func addOne(number: Int) -> Int {
    //                           return 1 + number
    //                       }
    //                       return addOne
    //                   }`;
    // AST Explorer input:
    // var makeIncrementer = function() {
    //   var addOne = function(number) {
    //     return 1 + number
    //   }
    //   return addOne
    // }
    xit('should handle functions that return functions where the return function is specified without parentheses', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "makeIncrementer" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
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
      output = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "makeIncrementer"
                },
                "init": {
                  "type": "FunctionExpression",
                  "id": null,
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
                              "name": "addOne"
                            },
                            "init": {
                              "type": "FunctionExpression",
                              "id": null,
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
                            }
                          }
                        ],
                        "kind": "var"
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
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func any(list: [Int], condition: ((Int) -> Bool)) -> Bool {
    //                         for item in list {
    //                             if condition(item) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    // AST Explorer input:
    // var any = function(list, condition) {
    //   for (item in list) {
    //     if (condition(item)) {
    //       return true
    //     }
    //   }
    //   return false
    // }
    xit('should handle functions that take a function specified with parentheses as an argument', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "any" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "if" },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "true" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      output = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "any"
                },
                "init": {
                  "type": "FunctionExpression",
                  "id": null,
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
                          "type": "Identifier",
                          "name": "item"
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
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func any(list: [Int], condition: (Int) -> Bool) -> Bool {
    //                         for item in list {
    //                             if condition(item) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    // AST Explorer input:
    // var any = function(list, condition) {
    //   for (item in list) {
    //     if (condition(item)) {
    //       return true
    //     }
    //   }
    //   return false
    // }
    xit('should handle functions that take a function specified without parentheses as an argument', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "any" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "if" },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "true" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      output = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "any"
                },
                "init": {
                  "type": "FunctionExpression",
                  "id": null,
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
                          "type": "Identifier",
                          "name": "item"
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
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func returnWorld() -> String {
    //                         return "World"
    //                     }
    //                     func printInput(input: String) {
    //                         print(input)
    //                     }
    //                     printInput("Hello, \(returnWorld())!")`;
    // AST Explorer input:
    // var returnWorld = function() {
    //   return "World"
    // }
    // var printInput = function(input) {
    //   print(input)
    // }
    // printInput("Hello, " + returnWorld() + "!")
    xit('should handle functions whose invocation contains string interpolation that contains a function invocation', function () {
      input = [

      ];
      output = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "returnWorld"
                },
                "init": {
                  "type": "FunctionExpression",
                  "id": null,
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
                          "raw": "\"World\""
                        }
                      }
                    ]
                  },
                  "generator": false,
                  "expression": false
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
                  "name": "printInput"
                },
                "init": {
                  "type": "FunctionExpression",
                  "id": null,
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
                }
              }
            ],
            "kind": "var"
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
                      "raw": "\"Hello, \""
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
                    "raw": "\"!\""
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });
  });
});
