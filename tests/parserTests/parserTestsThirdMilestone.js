var makeParser = require('../../transpiler/parser/parser');
var expect = require('chai').expect;
var util = require('util');
var isEqual = require('lodash.isequal');
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
    it('should handle functions with string interpolation', function () {
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func addSevenInts(first: Int, second: Int, third: Int, fourth: Int, fifth: Int, sixth: Int, seventh: Int) -> Int {
    //                   let sum = first + second + third + fourth + fifth + sixth + seventh
    //                   return sum
    //               }
    //               addSevenInts(143242134, second: 34543, third: 4, fourth: 6, fifth: 0, sixth: 56, seventh: 5)`;
    /** AST Explorer input:
     function addSevenInts(first, second, third, fourth, fifth, sixth, seventh) {
      var sum = first + second + third + fourth + fifth + sixth + seventh;
      return sum;
    }
     addSevenInts(143242134, 34543, 4, 6, 0, 56, 5);
     */
    it('should handle functions with many arguments', function () {
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
                  "type": "VariableDeclaration",
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "id": {
                        "type": "Identifier",
                        "name": "sum"
                      },
                      "init": {
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
                  ],
                  "kind": "var"
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func printAllTypes(first: Character, second: Double, third: Float, fourth: Bool, fifth: Int, sixth: Int8, seventh: Int16, eigth: Int32, nineth: Int64, tenth: String, eleventh: UInt, twelvth: UInt8, thirteenth: UInt16, fourteenth: UInt32, fifteenth: UInt64) {
    //                   print(first)
    //                   print(second)
    //                   print(third)
    //                   print(fourth)
    //                   print(fifth)
    //                   print(sixth)
    //                   print(seventh)
    //                   print(eigth)
    //                   print(nineth)
    //                   print(tenth)
    //                   print(eleventh)
    //                   print(twelvth)
    //                   print(thirteenth)
    //                   print(fourteenth)
    //                   print(fifteenth)
    //               }
    //               printAllTypes("a", second: 15.5, third: -16.66, fourth: true, fifth: -5, sixth: -6, seventh: -7, eigth: -8, nineth: -9, tenth: "blah", eleventh: 11, twelvth: 12, thirteenth: 13, fourteenth: 14, fifteenth: 15)`;

    // AST Explorer input:
    // function printAllTypes(first, second, third, fourth, fifth, sixth, seventh, eigth, nineth, tenth, eleventh, twelvth, thirteenth, fourteenth, fifteenth) {
    //     console.log(first)
    //     console.log(second)
    //     console.log(third)
    //     console.log(fourth)
    //     console.log(fifth)
    //     console.log(sixth)
    //     console.log(seventh)
    //     console.log(eigth)
    //     console.log(nineth)
    //     console.log(tenth)
    //     console.log(eleventh)
    //     console.log(twelvth)
    //     console.log(thirteenth)
    //     console.log(fourteenth)
    //     console.log(fifteenth)
    // }
    // printAllTypes("a", 15.5, -16.66, true, -5, -6, -7, -8, -9, "blah", 11, 12, 13, 14, 15)
    it('should handle functions that use all possible types as parameters and arguments', function () {
      input = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'printAllTypes' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'first' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'Character' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'second' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Double' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'third' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Float' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fourth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_BOOLEAN', value: 'Bool' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fifth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'sixth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int8' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'seventh' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int16' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'eigth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int32' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'nineth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int64' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'tenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'eleventh' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'twelvth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt8' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'thirteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt16' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fourteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt32' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fifteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt64' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'first' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'second' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'third' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'fourth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'fifth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'sixth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'seventh' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'eigth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'nineth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'tenth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'eleventh' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'twelvth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'thirteenth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'fourteenth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'fifteenth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'printAllTypes' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'STRING', value: 'a' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'second' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '15.5' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'third' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '16.66' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fourth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'BOOLEAN', value: 'true' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fifth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '5' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'sixth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '6' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'seventh' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '7' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'eigth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '8' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'nineth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '9' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'tenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'blah' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'eleventh' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '11' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'twelvth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '12' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'thirteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '13' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fourteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '14' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fifteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '15' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      output = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "printAllTypes"
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
              },
              {
                "type": "Identifier",
                "name": "eigth"
              },
              {
                "type": "Identifier",
                "name": "nineth"
              },
              {
                "type": "Identifier",
                "name": "tenth"
              },
              {
                "type": "Identifier",
                "name": "eleventh"
              },
              {
                "type": "Identifier",
                "name": "twelvth"
              },
              {
                "type": "Identifier",
                "name": "thirteenth"
              },
              {
                "type": "Identifier",
                "name": "fourteenth"
              },
              {
                "type": "Identifier",
                "name": "fifteenth"
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
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "first"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "second"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "third"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "fourth"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "fifth"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "sixth"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "seventh"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "eigth"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "nineth"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "tenth"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "eleventh"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "twelvth"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "thirteenth"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "fourteenth"
                      }
                    ]
                  }
                },
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "fifteenth"
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
                "name": "printAllTypes"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": "a",
                  "raw": "\"a\""
                },
                {
                  "type": "Literal",
                  "value": 15.5,
                  "raw": "15.5"
                },
                {
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Literal",
                    "value": 16.66,
                    "raw": "16.66"
                  },
                  "prefix": true
                },
                {
                  "type": "Literal",
                  "value": true,
                  "raw": "true"
                },
                {
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Literal",
                    "value": 5,
                    "raw": "5"
                  },
                  "prefix": true
                },
                {
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Literal",
                    "value": 6,
                    "raw": "6"
                  },
                  "prefix": true
                },
                {
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Literal",
                    "value": 7,
                    "raw": "7"
                  },
                  "prefix": true
                },
                {
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Literal",
                    "value": 8,
                    "raw": "8"
                  },
                  "prefix": true
                },
                {
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Literal",
                    "value": 9,
                    "raw": "9"
                  },
                  "prefix": true
                },
                {
                  "type": "Literal",
                  "value": "blah",
                  "raw": "\"blah\""
                },
                {
                  "type": "Literal",
                  "value": 11,
                  "raw": "11"
                },
                {
                  "type": "Literal",
                  "value": 12,
                  "raw": "12"
                },
                {
                  "type": "Literal",
                  "value": 13,
                  "raw": "13"
                },
                {
                  "type": "Literal",
                  "value": 14,
                  "raw": "14"
                },
                {
                  "type": "Literal",
                  "value": 15,
                  "raw": "15"
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func addOne(input: Int) -> Int {
    //                         return input + 1
    //                     }
    //                     addOne(((17 * 4) - 3) * 5)`;
    /** AST Explorer input:
     function addOne(input) {
      return input + 1;
    }
     addOne(((17 * 4) - 3) * 5);
     */
    it('should handle function invocations with internal parentheses', function () {
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func returnTuple(num: Int) -> (plusFive: Int, timesFive: Int) {
    //                   let plusFiveResult = num + 5
    //                   let timesFiveResult = num * 5
    //                   return (plusFiveResult, timesFiveResult) // return new Tuple(plusFive);
    //               }
    //               returnTuple(5)`;
    /** AST Explorer input:

     */
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
      expect(isEqual(parser(input), output)).to.equal(true);
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
    xit('should handle functions with for loops, if and else if statements, and native count methods', function () {
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
      expect(isEqual(parser(input), output)).to.equal(true);
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

    xit('should handle functions with for loops and if and else if statements', function () {
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func sumOf(numbers: Int...) -> Int {
    //                   var sum = 0
    //                   for number in numbers {
    //                       sum += number
    //                   }
    //                   return sum
    //               }
    //               sumOf(1,2,3)`;
    /** AST Explorer input:
     function sumOf() {
      var numbers = Array.prototype.slice.call(arguments[arguments.length - 1]);
      var sum = 0;
      for (var number in numbers) {
        sum += number;
      }
      return sum;
    }
     sumOf(1,2,3);
     */

    it('should handle functions that have variadic parameters', function () {
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
                            "type": "MemberExpression",
                            "computed": true,
                            "object": {
                              "type": "Identifier",
                              "name": "arguments"
                            },
                            "property": {
                              "type": "BinaryExpression",
                              "operator": "-",
                              "left": {
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                  "type": "Identifier",
                                  "name": "arguments"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "length"
                                }
                              },
                              "right": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                              }
                            }
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func sumOf(start: Int=0, numbers: Int...) -> Int {
    //                       var sum = start
    //                       for number in numbers {
    //                           sum += number
    //                       }
    //                       return sum
    //                   }
    //                   sumOf(start: 1,2,3)`;
    // AST Explorer input:
    // function sumOf(start) {
    //   var numbers = Array.prototype.slice.call(arguments, 1);
    //   var sum = start
    //   for (var number in numbers) {
    //     sum += number
    //   }
    //   return sum
    // }
    // sumOf(1,2,3)
    xit('should handle functions that has an optional parameter and variadic parameters', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "sumOf" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "start" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "PUNCTUATION",                value: "," },
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
        { type: "IDENTIFIER",                 value: "start" },
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
        { type: "IDENTIFIER",                 value: "start" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "3" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      output = {
        "range": [
          0,
          181
        ],
        "type": "Program",
        "body": [
          {
            "range": [
              0,
              168
            ],
            "type": "FunctionDeclaration",
            "id": {
              "range": [
                9,
                14
              ],
              "type": "Identifier",
              "name": "sumOf"
            },
            "params": [
              {
                "range": [
                  15,
                  20
                ],
                "type": "Identifier",
                "name": "start"
              }
            ],
            "defaults": [],
            "body": {
              "range": [
                22,
                168
              ],
              "type": "BlockStatement",
              "body": [
                {
                  "range": [
                    26,
                    81
                  ],
                  "type": "VariableDeclaration",
                  "declarations": [
                    {
                      "range": [
                        30,
                        80
                      ],
                      "type": "VariableDeclarator",
                      "id": {
                        "range": [
                          30,
                          37
                        ],
                        "type": "Identifier",
                        "name": "numbers"
                      },
                      "init": {
                        "range": [
                          40,
                          80
                        ],
                        "type": "CallExpression",
                        "callee": {
                          "range": [
                            40,
                            66
                          ],
                          "type": "MemberExpression",
                          "computed": false,
                          "object": {
                            "range": [
                              40,
                              61
                            ],
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                              "range": [
                                40,
                                55
                              ],
                              "type": "MemberExpression",
                              "computed": false,
                              "object": {
                                "range": [
                                  40,
                                  45
                                ],
                                "type": "Identifier",
                                "name": "Array"
                              },
                              "property": {
                                "range": [
                                  46,
                                  55
                                ],
                                "type": "Identifier",
                                "name": "prototype"
                              }
                            },
                            "property": {
                              "range": [
                                56,
                                61
                              ],
                              "type": "Identifier",
                              "name": "slice"
                            }
                          },
                          "property": {
                            "range": [
                              62,
                              66
                            ],
                            "type": "Identifier",
                            "name": "call"
                          }
                        },
                        "arguments": [
                          {
                            "range": [
                              67,
                              76
                            ],
                            "type": "Identifier",
                            "name": "arguments"
                          },
                          {
                            "range": [
                              78,
                              79
                            ],
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                          }
                        ]
                      }
                    }
                  ],
                  "kind": "var"
                },
                {
                  "range": [
                    84,
                    99
                  ],
                  "type": "VariableDeclaration",
                  "declarations": [
                    {
                      "range": [
                        88,
                        99
                      ],
                      "type": "VariableDeclarator",
                      "id": {
                        "range": [
                          88,
                          91
                        ],
                        "type": "Identifier",
                        "name": "sum"
                      },
                      "init": {
                        "range": [
                          94,
                          99
                        ],
                        "type": "Identifier",
                        "name": "start"
                      }
                    }
                  ],
                  "kind": "var"
                },
                {
                  "range": [
                    102,
                    153
                  ],
                  "type": "ForInStatement",
                  "left": {
                    "range": [
                      107,
                      117
                    ],
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "range": [
                          111,
                          117
                        ],
                        "type": "VariableDeclarator",
                        "id": {
                          "range": [
                            111,
                            117
                          ],
                          "type": "Identifier",
                          "name": "number"
                        },
                        "init": null
                      }
                    ],
                    "kind": "var"
                  },
                  "right": {
                    "range": [
                      121,
                      128
                    ],
                    "type": "Identifier",
                    "name": "numbers"
                  },
                  "body": {
                    "range": [
                      130,
                      153
                    ],
                    "type": "BlockStatement",
                    "body": [
                      {
                        "range": [
                          136,
                          149
                        ],
                        "type": "ExpressionStatement",
                        "expression": {
                          "range": [
                            136,
                            149
                          ],
                          "type": "AssignmentExpression",
                          "operator": "+=",
                          "left": {
                            "range": [
                              136,
                              139
                            ],
                            "type": "Identifier",
                            "name": "sum"
                          },
                          "right": {
                            "range": [
                              143,
                              149
                            ],
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
                  "range": [
                    156,
                    166
                  ],
                  "type": "ReturnStatement",
                  "argument": {
                    "range": [
                      163,
                      166
                    ],
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
            "range": [
              169,
              181
            ],
            "type": "ExpressionStatement",
            "expression": {
              "range": [
                169,
                181
              ],
              "type": "CallExpression",
              "callee": {
                "range": [
                  169,
                  174
                ],
                "type": "Identifier",
                "name": "sumOf"
              },
              "arguments": [
                {
                  "range": [
                    175,
                    176
                  ],
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                },
                {
                  "range": [
                    177,
                    178
                  ],
                  "type": "Literal",
                  "value": 2,
                  "raw": "2"
                },
                {
                  "range": [
                    179,
                    180
                  ],
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func makeIncrementer() -> ((Int) -> Int) {
    //                           func addOne(number: Int) -> Int {
    //                               func anon(n: Int) -> Int {
    //                                   return 1 + n
    //                               }
    //                               return anon(number)
    //                           }
    //                           return addOne
    //                       }`;
    // AST Explorer input:
    // function makeIncrementer() {
    //   function addOne(number) {
    //     function anon(n) {
    //       return 1 + n
    //     }
    //     return anon(number)
    //   }
    //   return addOne
    // }
    it('should handle functions that return functions which are composed of nested functions', function () {
      input = [
          { type: 'DECLARATION_KEYWORD', value: 'func' },
          { type: 'IDENTIFIER', value: 'makeIncrementer' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'PUNCTUATION', value: '(' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PUNCTUATION', value: ')' },
          { type: 'STATEMENTS_START', value: '{' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'DECLARATION_KEYWORD', value: 'func' },
          { type: 'IDENTIFIER', value: 'addOne' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'IDENTIFIER', value: 'number' },
          { type: 'PUNCTUATION', value: ':' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'STATEMENTS_START', value: '{' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'DECLARATION_KEYWORD', value: 'func' },
          { type: 'IDENTIFIER', value: 'anon' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'IDENTIFIER', value: 'n' },
          { type: 'PUNCTUATION', value: ':' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'STATEMENTS_START', value: '{' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENT_KEYWORD', value: 'return' },
          { type: 'NUMBER', value: '1' },
          { type: 'OPERATOR', value: '+' },
          { type: 'IDENTIFIER', value: 'n' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENTS_END', value: '}' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENT_KEYWORD', value: 'return' },
          { type: 'IDENTIFIER', value: 'anon' },
          { type: 'INVOCATION_START', value: '(' },
          { type: 'IDENTIFIER', value: 'number' },
          { type: 'INVOCATION_END', value: ')' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENTS_END', value: '}' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENT_KEYWORD', value: 'return' },
          { type: 'IDENTIFIER', value: 'addOne' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENTS_END', value: '}' },
          { type: 'TERMINATOR', value: 'EOF' }
          ];
      output = {
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
                        "type": "FunctionDeclaration",
                        "id": {
                          "type": "Identifier",
                          "name": "anon"
                        },
                        "params": [
                          {
                            "type": "Identifier",
                            "name": "n"
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
                                  "name": "n"
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
                            "name": "anon"
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "name": "number"
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func makeIncrementer() -> ((Int) -> Int) {
    //                       func addOne(number: Int) -> Int {
    //                           return 1 + number
    //                       }
    //                       return addOne
    //                   }`;
    /** AST Explorer input:
     function makeIncrementer() {
      function addOne(number) {
        return 1 + number;
      }
      return addOne;
    }
     */
    it('should handle functions that return functions where the return function is specified within parentheses', function () {
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func makeIncrementer() -> (Int) -> Int {
    //                       func addOne(number: Int) -> Int {
    //                           return 1 + number
    //                       }
    //                       return addOne
    //                   }`;
    /** AST Explorer input:
     function makeIncrementer() {
      function addOne(number) {
        return 1 + number;
      }
      return addOne;
    }
     */
    it('should handle functions that return functions where the return function is specified without parentheses', function () {
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func any(list: [Int], condition: ((Int) -> Bool)) -> Bool {
    //                         for item in list {
    //                             if condition(item) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    /** AST Explorer input:
     function any(list, condition) {
      for (var item in list) {
        if (condition(item)) {
          return true;
        }
      }
      return false;
    }
     */
    it('should handle functions that take a function specified with parentheses as an argument', function () {
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func a(l: [Int], c: ((Int,String,Bool) -> Bool)) -> (Bool) {
    //                         for item in l {
    //                             if c(item,"abc",true) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    // AST Explorer input:
    // function a(l, c) {
    //   for (var item in l) {
    //     if (c(item,"abc",true)) {
    //       return true
    //     }
    //   }
    //   return false
    // }
    xit('should handle functions that take a multiparameter function specified with parentheses as an argument', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "a" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "l" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "c" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PUNCTUATION",                value: "," },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "l" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "if" },
        { type: "IDENTIFIER",                 value: "c" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "abc" },
        { type: "PUNCTUATION",                value: "," },
        { type: "BOOLEAN",                    value: "true" },
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
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "a"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "l"
              },
              {
                "type": "Identifier",
                "name": "c"
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
                    "name": "l"
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
                            "name": "c"
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "name": "item"
                            },
                            {
                              "type": "Literal",
                              "value": "abc",
                              "raw": "\"abc\""
                            },
                            {
                              "type": "Literal",
                              "value": true,
                              "raw": "true"
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func any(list: [Int], condition: (Int) -> Bool) -> Bool {
    //                         for item in list {
    //                             if condition(item) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    /** AST Explorer input:
     function any(list, condition) {
      for (var item in list) {
        if (condition(item)) {
          return true;
        }
      }
      return false;
    }
     */
    it('should handle functions that take a function specified without parentheses as an argument', function () {
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func any(list: [Int], condition: ((Int) -> Bool)) -> (Bool) {
    //                         for item in list {
    //                             if condition(item) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    // AST Explorer input:
    // function any(list, condition) {
    //   for (var item in list) {
    //     if (condition(item)) {
    //       return true
    //     }
    //   }
    //   return false
    // }
    it('should handle functions that take a function specified with parentheses as an argument and parenthesis around the return type', function () {
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
        { type: "PUNCTUATION",                value: "(" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func sayHelloNoOutput(to person: String, from anotherPerson: String) {
    //                         print("To \(person) from \(anotherPerson)!")
    //                     }

    //                     sayHelloNoOutput(to: "Bill", from: "Ted")`;
    // AST Explorer input:
    // function sayHelloNoOutput(person, anotherPerson) {
    //   console.log("To " + person + " from " + anotherPerson + "")
    // }

    // sayHelloNoOutput("Bill", "Ted")
    xit('should handle functions that have external and internal parameter names and have a void return type', function () {
      input = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'sayHelloNoOutput' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'to' },
        { type: 'IDENTIFIER', value: 'person' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'from' },
        { type: 'IDENTIFIER', value: 'anotherPerson' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'STRING', value: 'To ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'person' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: ' from ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'anotherPerson' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: '!' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'sayHelloNoOutput' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'to' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'Bill' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'from' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'Ted' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      output = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "sayHelloNoOutput"
            },
            "params": [
              {
                "type": "Identifier",
                "name": "person"
              },
              {
                "type": "Identifier",
                "name": "anotherPerson"
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
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
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
                                "value": "To ",
                                "raw": "\"To \""
                              },
                              "right": {
                                "type": "Identifier",
                                "name": "person"
                              }
                            },
                            "right": {
                              "type": "Literal",
                              "value": " from ",
                              "raw": "\" from \""
                            }
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "anotherPerson"
                          }
                        },
                        "right": {
                          "type": "Literal",
                          "value": "",
                          "raw": "\"\""
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
                "name": "sayHelloNoOutput"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": "Bill",
                  "raw": "\"Bill\""
                },
                {
                  "type": "Literal",
                  "value": "Ted",
                  "raw": "\"Ted\""
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func sayHello(to person: String, from anotherPerson: String) -> String {
    //                         return "To \(person) from \(anotherPerson)"
    //                     }
    //                     print(sayHello(to: "Bill", from: "Ted"))`;
    // AST Explorer input:
    // function sayHello(person, anotherPerson) {
    //   return "To " + person + " from " + anotherPerson + ""
    // }
    // console.log(sayHello("Bill", "Ted"))
    xit('should handle functions that have external and internal parameter names and have a string return type', function () {
      input = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'sayHello' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'to' },
        { type: 'IDENTIFIER', value: 'person' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'from' },
        { type: 'IDENTIFIER', value: 'anotherPerson' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'STRING', value: 'To ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'person' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: ' from ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'anotherPerson' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: '' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'sayHello' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'to' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'Bill' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'from' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'Ted' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
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
                "name": "person"
              },
              {
                "type": "Identifier",
                "name": "anotherPerson"
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
                            "value": "To ",
                            "raw": "\"To \""
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "person"
                          }
                        },
                        "right": {
                          "type": "Literal",
                          "value": " from ",
                          "raw": "\" from \""
                        }
                      },
                      "right": {
                        "type": "Identifier",
                        "name": "anotherPerson"
                      }
                    },
                    "right": {
                      "type": "Literal",
                      "value": "",
                      "raw": "\"\""
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
                "type": "MemberExpression",
                "computed": false,
                "object": {
                  "type": "Identifier",
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "name": "log"
                }
              },
              "arguments": [
                {
                  "type": "CallExpression",
                  "callee": {
                    "type": "Identifier",
                    "name": "sayHello"
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "value": "Bill",
                      "raw": "\"Bill\""
                    },
                    {
                      "type": "Literal",
                      "value": "Ted",
                      "raw": "\"Ted\""
                    }
                  ]
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func dictionary() -> [String: Int] {
    //                         return ["one":1,"two":2,"three":3,"four":4,"five":5]
    //                     }`;
    // AST Explorer input:
    // function dictionary() {
    //   return {"one":1,"two":2,"three":3,"four":4,"five":5}
    // }
    xit('should handle functions that return a dictionary type', function () {
      input = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'dictionary' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'DICTIONARY_START', value: '[' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'DICTIONARY_END', value: ']' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'DICTIONARY_START', value: '[' },
        { type: 'STRING', value: 'one' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '1' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'two' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '2' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'three' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '3' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'four' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '4' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'five' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '5' },
        { type: 'DICTIONARY_END', value: ']' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      output = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "dictionary"
            },
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "ObjectExpression",
                    "properties": [
                      {
                        "type": "Property",
                        "key": {
                          "type": "Literal",
                          "value": "one",
                          "raw": "\"one\""
                        },
                        "computed": false,
                        "value": {
                          "type": "Literal",
                          "value": 1,
                          "raw": "1"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                      },
                      {
                        "type": "Property",
                        "key": {
                          "type": "Literal",
                          "value": "two",
                          "raw": "\"two\""
                        },
                        "computed": false,
                        "value": {
                          "type": "Literal",
                          "value": 2,
                          "raw": "2"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                      },
                      {
                        "type": "Property",
                        "key": {
                          "type": "Literal",
                          "value": "three",
                          "raw": "\"three\""
                        },
                        "computed": false,
                        "value": {
                          "type": "Literal",
                          "value": 3,
                          "raw": "3"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                      },
                      {
                        "type": "Property",
                        "key": {
                          "type": "Literal",
                          "value": "four",
                          "raw": "\"four\""
                        },
                        "computed": false,
                        "value": {
                          "type": "Literal",
                          "value": 4,
                          "raw": "4"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                      },
                      {
                        "type": "Property",
                        "key": {
                          "type": "Literal",
                          "value": "five",
                          "raw": "\"five\""
                        },
                        "computed": false,
                        "value": {
                          "type": "Literal",
                          "value": 5,
                          "raw": "5"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                      }
                    ]
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func array() -> [Int] {
    //                         return [1,2,3,4,5]
    //                     }`;
    // AST Explorer input:
    // function array() {
    //   return [1,2,3,4,5]
    // }
    it('should handle functions that return an array type', function () {
      input = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'array' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'ARRAY_START', value: '[' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'ARRAY_END', value: ']' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'ARRAY_START', value: '[' },
        { type: 'NUMBER', value: '1' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '2' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '3' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '4' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '5' },
        { type: 'ARRAY_END', value: ']' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      output = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "array"
            },
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "ArrayExpression",
                    "elements": [
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
                      },
                      {
                        "type": "Literal",
                        "value": 4,
                        "raw": "4"
                      },
                      {
                        "type": "Literal",
                        "value": 5,
                        "raw": "5"
                      }
                    ]
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func abc(a: [String: Int]) {
    //                           print(a)
    //                       }

    //                       abc(["one":1,"two":2])`;
    // AST Explorer input:
    // function abc(a) {
    //   console.log(a)
    // }

    // abc({"one":1,"two":2})
    xit('should handle functions that accept dictionaries as inputs', function () {
      input = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'abc' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'DICTIONARY_START', value: '[' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'DICTIONARY_END', value: ']' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'abc' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'DICTIONARY_START', value: '[' },
        { type: 'STRING', value: 'one' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '1' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'two' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '2' },
        { type: 'DICTIONARY_END', value: ']' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      output = {
        "type": "Program",
        "body": [
          {
            "type": "FunctionDeclaration",
            "id": {
              "type": "Identifier",
              "name": "abc"
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
                    "type": "CallExpression",
                    "callee": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
                    },
                    "arguments": [
                      {
                        "type": "Identifier",
                        "name": "a"
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
                "name": "abc"
              },
              "arguments": [
                {
                  "type": "ObjectExpression",
                  "properties": [
                    {
                      "type": "Property",
                      "key": {
                        "type": "Literal",
                        "value": "one",
                        "raw": "\"one\""
                      },
                      "computed": false,
                      "value": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      },
                      "kind": "init",
                      "method": false,
                      "shorthand": false
                    },
                    {
                      "type": "Property",
                      "key": {
                        "type": "Literal",
                        "value": "two",
                        "raw": "\"two\""
                      },
                      "computed": false,
                      "value": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                      },
                      "kind": "init",
                      "method": false,
                      "shorthand": false
                    }
                  ]
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func any(list: [Int], condition: ((Int,String,Bool) -> Bool)) -> Bool {
    //                         for item in list {
    //                             if condition(item,"abc",true) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    // AST Explorer input:
    // function any(list, condition) {
    //   for (var item in list) {
    //     if (condition(item,"abc",true)) {
    //       return true
    //     }
    //   }
    //   return false
    // }
    xit('should handle functions that take a function specified with parentheses around an argument and parenthesis', function () {
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
        { type: "PUNCTUATION",                value: "," },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PUNCTUATION",                value: "," },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
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
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "abc" },
        { type: "PUNCTUATION",                value: "," },
        { type: "BOOLEAN",                    value: "true" },
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
                            },
                            {
                              "type": "Literal",
                              "value": "abc",
                              "raw": "\"abc\""
                            },
                            {
                              "type": "Literal",
                              "value": true,
                              "raw": "true"
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func any(list: [Int], condition: (Int) -> Bool) -> (Bool) {
    //                         for item in list {
    //                             if condition(item) {
    //                                 return true
    //                             }
    //                         }
    //                         return false
    //                     }`;
    // AST Explorer input:
    // function any(list, condition) {
    //   for (var item in list) {
    //     if (condition(item)) {
    //       return true
    //     }
    //   }
    //   return false
    // }
    it('should handle functions that take a function specified without parentheses as an argument and parenthesis around the return type', function () {
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
        { type: "PUNCTUATION",                value: "(" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw `func addOne(input: Int) -> Int {
    //                         return input + 1
    //                     }
    //                     addOne(((5 + 4) + 1) + 7)`;
    // AST Explorer input:
    // function addOne(input) {
    //     return input + 1
    // }
    // addOne(((5 + 4) + 1) + 7)
    it('should handle functions with mathematical operations and parentheses in their invocation', function () {
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

        { type: "STATEMENTS_END",             value: "}"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "NUMBER",                     value: "5" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "4" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "7" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"},
      ];
      output = {
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
                  "operator": "+",
                  "left": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "Literal",
                        "value": 5,
                        "raw": "5"
                      },
                      "right": {
                        "type": "Literal",
                        "value": 4,
                        "raw": "4"
                      }
                    },
                    "right": {
                      "type": "Literal",
                      "value": 1,
                      "raw": "1"
                    }
                  },
                  "right": {
                    "type": "Literal",
                    "value": 7,
                    "raw": "7"
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func returnWorld() -> Int {
    //                         return 2
    //                     }
    //                     func printInput(input: String) {
    //                         print(input)
    //                     }
    //                     printInput("Hello, \(returnWorld())!")`;
    // AST Explorer input:
    // function returnWorld() {
    //   return 2
    // }
    // function printInput(input) {
    //   console.log(input)
    // }
    // printInput("Hello, " + returnWorld() + "!")
    it('should handle functions whose invocation contains string interpolation that contains a function invocation returning an int', function () {
      input = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'returnWorld' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'NUMBER', value: '2' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'printInput' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'printInput' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'STRING', value: 'Hello, ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'returnWorld' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: '!' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      output = {
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
                    "value": 2,
                    "raw": "2"
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
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });

    // input = String.raw`func returnWorld() -> String {
    //                         return "World"
    //                     }
    //                     func printInput(input: String) {
    //                         print(input)
    //                     }
    //                     printInput("Hello, \(returnWorld())!")`;
    /** AST Explorer input:
     function returnWorld() {
      return "World";
    }
     function printInput(input) {
      console.log(input);
    }
     printInput("Hello, " + returnWorld() + "!");
     */
    it('should handle functions whose invocation contains string interpolation that contains a function invocation returning a string', function () {
      input = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'returnWorld' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'STRING', value: 'World' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'printInput' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'printInput' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'STRING', value: 'Hello, ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'returnWorld' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: '!' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
      ];
      output = {
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
                    "raw": "\"World\""
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
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "Identifier",
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "log"
                      }
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
      expect(isEqual(parser(input), output)).to.equal(true);
    });
  });
});
