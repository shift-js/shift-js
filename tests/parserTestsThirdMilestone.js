var make_parser = require('../transpiler/parser/parser');
var expect = require('chai').expect;
var util = require('util');
var R = require('ramda');
var parser;

describe('Third Milestone Parser', function() {
  beforeEach(function() {
    parser = make_parser();
  });

  xdescribe('Third milestone', function() {
    xdescribe('Functions', function() {

      // input = String.raw`func someFunction (var a: Int) {
      //             a = a + 1;
      //         }
      //         someFunction(5);`
      // AST Explorer input:
      // var someFunction = function(a) {
      //   a = a + 1;
      // }
      // someFunction(5);
      xit('should handle function declaration and invocation with normal spacing', function() {
        input = [
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
                    "name": "someFunction"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "id": null,
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

      // input = String.raw`func someFunction(var a: Int) {
      //             a = a + 1;
      //         }
      //         someFunction(5);`;
      // AST Explorer input:
      // var someFunction = function(a) {
      //   a = a + 1;
      // }
      // someFunction(5);
      xit('should handle function declaration and invocation with no space after the function name', function() {
        input = [
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
                    "name": "someFunction"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "id": null,
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

      // input = String.raw`func someFunction (var a: Int){
      //             a = a + 1;
      //         }
      //         someFunction(5);`
      // AST Explorer input:
      // var someFunction = function(a) {
      //   a = a + 1;
      // }
      // someFunction(5);
      xit('should handle function declaration and invocation with no space after the parameter declaration', function() {
        input = [
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
        ];
        output = "FILL_ME_IN";
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`func someFunction(var a: Int){
      //             a = a + 1;
      //         }
      //         someFunction(5);`;
      // AST Explorer input:
      // var someFunction = function(a) {
      //   a = a + 1;
      // }
      // someFunction(5);
      xit('should handle function declaration and invocation with no spacing', function() {
        input = [
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
                    "name": "someFunction"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "id": null,
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

      // input = String.raw`func someFunction        (var a: Int)     {
      //                       a = a + 1;
      //                   }
      //                   someFunction      (5);`;
      // AST Explorer input:
      // var someFunction = function(a) {
      //   a = a + 1;
      // }
      // someFunction(5);
      xit('should handle function declaration and invocation with erratic spacing', function() {
        input =[
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
                    "name": "someFunction"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "id": null,
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
      // AST Explorer input:
      // var sayHelloWorld = function() {
      //   return "hello, world"
      // }
      xit('should handle functions that return strings', function() {
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
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "sayHelloWorld"
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
                            "value": "hello, world",
                            "raw": "\"hello, world\""
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

      // input = String.raw`func sayHello(var personName: String) -> String {
      //                       let greeting = "Hello, " + personName + "!"
      //                       return greeting
      //                   }`;
      // AST Explorer input:
      // var sayHello = function(personName) {
      //   var greeting = "Hello, " + personName + "!"
      //   return greeting
      // }
      xit('should handle functions that return strings', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "sayHello" },
          { type: "PARAMS_START",         value: "(" },
          { type: "DECLARATION_KEYWORD",  value: "var"},
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
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "sayHello"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "id": null,
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
                }
              ],
              "kind": "var"
            }
          ],
          "sourceType": "module"
        };
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`func sayHello(var alreadyGreeted: Bool) -> String {
      //         if alreadyGreeted {
      //             return "blah"
      //         }
      //     }`;
      // AST Explorer input:
      // var sayHello = function(alreadyGreeted) {
      //   if (alreadyGreeted) {
      //     return "blah"
      //   }
      // }
      xit('should handle functions that have if statements that use {} and have a return value', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "sayHello" },
          { type: "PARAMS_START",         value: "(" },
          { type: "DECLARATION_KEYWORD",  value: "var"},
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
                    "name": "sayHello"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "id": null,
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
                          "alternate": null
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

      // input = String.raw`func sayHello(var personName: String, var alreadyGreeted: Bool) -> String {
      //             if alreadyGreeted {
      //                 return sayHello(personName) + " blah"
      //             } else {
      //                 return sayHello(personName)
      //             }
      //         }`;
      // AST Explorer input:
      // var sayHello = function(personName, alreadyGreeted) {
      //   if (alreadyGreeted) {
      //     return sayHello(personName) + " blah"
      //   } else {
      //     return sayHello(personName)
      //   }
      // }
      xit('should handle functions that have if and else statements that use {} and have a return value', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "sayHello" },
          { type: "PARAMS_START",         value: "(" },
          { type: "DECLARATION_KEYWORD",  value: "var"},
          { type: "IDENTIFIER",           value: "personName" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TYPE_STRING",          value: "String" },
          { type: "PUNCTUATION",          value: "," },
          { type: "DECLARATION_KEYWORD",  value: "var"},
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
                    "name": "sayHello"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [
                      {
                        "type": "Identifier",
                        "name": "personName"
                      },
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
                                  "type": "BinaryExpression",
                                  "operator": "+",
                                  "left": {
                                    "type": "CallExpression",
                                    "callee": {
                                      "type": "Identifier",
                                      "name": "sayHello"
                                    },
                                    "arguments": [
                                      {
                                        "type": "Identifier",
                                        "name": "personName"
                                      }
                                    ]
                                  },
                                  "right": {
                                    "type": "Literal",
                                    "value": " blah",
                                    "raw": "\" blah\""
                                  }
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
                                  "type": "CallExpression",
                                  "callee": {
                                    "type": "Identifier",
                                    "name": "sayHello"
                                  },
                                  "arguments": [
                                    {
                                      "type": "Identifier",
                                      "name": "personName"
                                    }
                                  ]
                                }
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
            }
          ],
          "sourceType": "module"
        };
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`func sayHello(var firstName: String, var lastName: String) -> String {
      //             func giveString() -> String {
      //               return firstName + " " + lastName
      //             }
      //             return giveString()
      //         }`;
      // AST Explorer input:
      // var sayHello = function(firstName, lastName) {
      //   var giveString = function() {
      //   return firstName + " " + lastName
      //   }
      //   return giveString()
      // }
      xit('should handle nested functions with function invocation', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "func"},
          { type: "IDENTIFIER",           value: "sayHello" },
          { type: "PARAMS_START",         value: "(" },
          { type: "DECLARATION_KEYWORD",  value: "var"},
          { type: "IDENTIFIER",           value: "firstName" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TYPE_STRING",          value: "String" },
          { type: "PUNCTUATION",          value: "," },
          { type: "DECLARATION_KEYWORD",  value: "var"},
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
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "sayHello"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "id": null,
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
                          "type": "VariableDeclaration",
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "id": {
                                "type": "Identifier",
                                "name": "giveString"
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
                              }
                            }
                          ],
                          "kind": "var"
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
                }
              ],
              "kind": "var"
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
      // AST Explorer input:
      // var greet = function(name, day) {
      //   return "Hello " + name + ", today is " + day + "."
      // }
      // greet("Bob", "Tuesday")
      xit('should handle functions that do no use var when declaring parameters and invocations with named arguments', function () {
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
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "greet"
                  },
                  "init": {
                    "type": "FunctionExpression",
                    "id": null,
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
    });
  });
});