var makeParser = require('../../transpiler/parser/parser');
var expect = require('chai').expect;
var util = require('util');
var R = require('ramda');
var parser;

describe('Third Milestone Parser', function() {
  beforeEach(function() {
    parser = makeParser();
  });

    describe('Third Milestone', function() {

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
        xit('should handle function declaration and invocation with no spacing and with var in function parameters', function() {
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
          ]
          output = {
            "range": [
              0,
              76
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  59
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      59
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        16
                      ],
                      "type": "Identifier",
                      "name": "someFunction"
                    },
                    "init": {
                      "range": [
                        19,
                        59
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            28,
                            29
                          ],
                          "type": "Identifier",
                          "name": "a"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          31,
                          59
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              35,
                              45
                            ],
                            "type": "ExpressionStatement",
                            "expression": {
                              "range": [
                                35,
                                44
                              ],
                              "type": "AssignmentExpression",
                              "operator": "=",
                              "left": {
                                "range": [
                                  35,
                                  36
                                ],
                                "type": "Identifier",
                                "name": "a"
                              },
                              "right": {
                                "range": [
                                  39,
                                  44
                                ],
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                  "range": [
                                    39,
                                    40
                                  ],
                                  "type": "Identifier",
                                  "name": "a"
                                },
                                "right": {
                                  "range": [
                                    43,
                                    44
                                  ],
                                  "type": "Literal",
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            }
                          },
                          {
                            "range": [
                              48,
                              57
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                55,
                                56
                              ],
                              "type": "Identifier",
                              "name": "a"
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
                "range": [
                  60,
                  76
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    60,
                    75
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      60,
                      72
                    ],
                    "type": "Identifier",
                    "name": "someFunction"
                  },
                  "arguments": [
                    {
                      "range": [
                        73,
                        74
                      ],
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
        xit('should handle function declaration and invocation with no spacing', function() {
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
            "range": [
              0,
              76
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  59
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      59
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        16
                      ],
                      "type": "Identifier",
                      "name": "someFunction"
                    },
                    "init": {
                      "range": [
                        19,
                        59
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            28,
                            29
                          ],
                          "type": "Identifier",
                          "name": "a"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          31,
                          59
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              35,
                              45
                            ],
                            "type": "ExpressionStatement",
                            "expression": {
                              "range": [
                                35,
                                44
                              ],
                              "type": "AssignmentExpression",
                              "operator": "=",
                              "left": {
                                "range": [
                                  35,
                                  36
                                ],
                                "type": "Identifier",
                                "name": "a"
                              },
                              "right": {
                                "range": [
                                  39,
                                  44
                                ],
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                  "range": [
                                    39,
                                    40
                                  ],
                                  "type": "Identifier",
                                  "name": "a"
                                },
                                "right": {
                                  "range": [
                                    43,
                                    44
                                  ],
                                  "type": "Literal",
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            }
                          },
                          {
                            "range": [
                              48,
                              57
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                55,
                                56
                              ],
                              "type": "Identifier",
                              "name": "a"
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
                "range": [
                  60,
                  76
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    60,
                    75
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      60,
                      72
                    ],
                    "type": "Identifier",
                    "name": "someFunction"
                  },
                  "arguments": [
                    {
                      "range": [
                        73,
                        74
                      ],
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
        // AST Explorer input:
        // var someFunction = function(a) {
        //   a = a + 1;
        //   return a;
        // }
        // someFunction(5);
        xit('should handle function declaration and invocation with spaces between each part of the declaration', function() {
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
            "range": [
              0,
              76
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  59
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      59
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        16
                      ],
                      "type": "Identifier",
                      "name": "someFunction"
                    },
                    "init": {
                      "range": [
                        19,
                        59
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            28,
                            29
                          ],
                          "type": "Identifier",
                          "name": "a"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          31,
                          59
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              35,
                              45
                            ],
                            "type": "ExpressionStatement",
                            "expression": {
                              "range": [
                                35,
                                44
                              ],
                              "type": "AssignmentExpression",
                              "operator": "=",
                              "left": {
                                "range": [
                                  35,
                                  36
                                ],
                                "type": "Identifier",
                                "name": "a"
                              },
                              "right": {
                                "range": [
                                  39,
                                  44
                                ],
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                  "range": [
                                    39,
                                    40
                                  ],
                                  "type": "Identifier",
                                  "name": "a"
                                },
                                "right": {
                                  "range": [
                                    43,
                                    44
                                  ],
                                  "type": "Literal",
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            }
                          },
                          {
                            "range": [
                              48,
                              57
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                55,
                                56
                              ],
                              "type": "Identifier",
                              "name": "a"
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
                "range": [
                  60,
                  76
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    60,
                    75
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      60,
                      72
                    ],
                    "type": "Identifier",
                    "name": "someFunction"
                  },
                  "arguments": [
                    {
                      "range": [
                        73,
                        74
                      ],
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
        // AST Explorer input:
        // var someFunction = function(a) {
        //   a = a + 1;
        //   return a;
        // }
        // someFunction(5);
        xit('should handle function declaration and invocation with no space after the function name', function() {
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
            "range": [
              0,
              76
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  59
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      59
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        16
                      ],
                      "type": "Identifier",
                      "name": "someFunction"
                    },
                    "init": {
                      "range": [
                        19,
                        59
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            28,
                            29
                          ],
                          "type": "Identifier",
                          "name": "a"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          31,
                          59
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              35,
                              45
                            ],
                            "type": "ExpressionStatement",
                            "expression": {
                              "range": [
                                35,
                                44
                              ],
                              "type": "AssignmentExpression",
                              "operator": "=",
                              "left": {
                                "range": [
                                  35,
                                  36
                                ],
                                "type": "Identifier",
                                "name": "a"
                              },
                              "right": {
                                "range": [
                                  39,
                                  44
                                ],
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                  "range": [
                                    39,
                                    40
                                  ],
                                  "type": "Identifier",
                                  "name": "a"
                                },
                                "right": {
                                  "range": [
                                    43,
                                    44
                                  ],
                                  "type": "Literal",
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            }
                          },
                          {
                            "range": [
                              48,
                              57
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                55,
                                56
                              ],
                              "type": "Identifier",
                              "name": "a"
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
                "range": [
                  60,
                  76
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    60,
                    75
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      60,
                      72
                    ],
                    "type": "Identifier",
                    "name": "someFunction"
                  },
                  "arguments": [
                    {
                      "range": [
                        73,
                        74
                      ],
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
        // AST Explorer input:
        // var someFunction = function(a) {
        //   a = a + 1;
        //   return a;
        // }
        // someFunction(5);
        xit('should handle function declaration and invocation with no space after the parameter declaration', function() {
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
            "range": [
              0,
              76
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  59
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      59
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        16
                      ],
                      "type": "Identifier",
                      "name": "someFunction"
                    },
                    "init": {
                      "range": [
                        19,
                        59
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            28,
                            29
                          ],
                          "type": "Identifier",
                          "name": "a"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          31,
                          59
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              35,
                              45
                            ],
                            "type": "ExpressionStatement",
                            "expression": {
                              "range": [
                                35,
                                44
                              ],
                              "type": "AssignmentExpression",
                              "operator": "=",
                              "left": {
                                "range": [
                                  35,
                                  36
                                ],
                                "type": "Identifier",
                                "name": "a"
                              },
                              "right": {
                                "range": [
                                  39,
                                  44
                                ],
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                  "range": [
                                    39,
                                    40
                                  ],
                                  "type": "Identifier",
                                  "name": "a"
                                },
                                "right": {
                                  "range": [
                                    43,
                                    44
                                  ],
                                  "type": "Literal",
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            }
                          },
                          {
                            "range": [
                              48,
                              57
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                55,
                                56
                              ],
                              "type": "Identifier",
                              "name": "a"
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
                "range": [
                  60,
                  76
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    60,
                    75
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      60,
                      72
                    ],
                    "type": "Identifier",
                    "name": "someFunction"
                  },
                  "arguments": [
                    {
                      "range": [
                        73,
                        74
                      ],
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
        // AST Explorer input:
        // var someFunction = function(a) {
        //   a = a + 1;
        //   return a;
        // }
        // someFunction(5);
        xit('should handle function declaration and invocation with erratic spacing', function() {
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
            "range": [
              0,
              76
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  59
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      59
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        16
                      ],
                      "type": "Identifier",
                      "name": "someFunction"
                    },
                    "init": {
                      "range": [
                        19,
                        59
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            28,
                            29
                          ],
                          "type": "Identifier",
                          "name": "a"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          31,
                          59
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              35,
                              45
                            ],
                            "type": "ExpressionStatement",
                            "expression": {
                              "range": [
                                35,
                                44
                              ],
                              "type": "AssignmentExpression",
                              "operator": "=",
                              "left": {
                                "range": [
                                  35,
                                  36
                                ],
                                "type": "Identifier",
                                "name": "a"
                              },
                              "right": {
                                "range": [
                                  39,
                                  44
                                ],
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                  "range": [
                                    39,
                                    40
                                  ],
                                  "type": "Identifier",
                                  "name": "a"
                                },
                                "right": {
                                  "range": [
                                    43,
                                    44
                                  ],
                                  "type": "Literal",
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            }
                          },
                          {
                            "range": [
                              48,
                              57
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                55,
                                56
                              ],
                              "type": "Identifier",
                              "name": "a"
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
                "range": [
                  60,
                  76
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    60,
                    75
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      60,
                      72
                    ],
                    "type": "Identifier",
                    "name": "someFunction"
                  },
                  "arguments": [
                    {
                      "range": [
                        73,
                        74
                      ],
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
          ]
          output = {
            "range": [
              0,
              57
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  57
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      57
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        17
                      ],
                      "type": "Identifier",
                      "name": "sayHelloWorld"
                    },
                    "init": {
                      "range": [
                        20,
                        57
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [],
                      "defaults": [],
                      "body": {
                        "range": [
                          31,
                          57
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              34,
                              55
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                41,
                                55
                              ],
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

        // input = String.raw`func sayHello(personName: String) -> String {
        //                       let greeting = "Hello, " + personName + "!"
        //                       return greeting
        //                   }`;
        // AST Explorer input:
        // var sayHello = function(personName) {
        //   var greeting = "Hello, " + personName + "!"
        //   return greeting
        // }
        xit('should handle functions with an input that return strings', function() {
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
          ]
          output = {
            "range": [
              0,
              103
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  103
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      103
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        12
                      ],
                      "type": "Identifier",
                      "name": "sayHello"
                    },
                    "init": {
                      "range": [
                        15,
                        103
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            24,
                            34
                          ],
                          "type": "Identifier",
                          "name": "personName"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          36,
                          103
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              40,
                              83
                            ],
                            "type": "VariableDeclaration",
                            "declarations": [
                              {
                                "range": [
                                  44,
                                  83
                                ],
                                "type": "VariableDeclarator",
                                "id": {
                                  "range": [
                                    44,
                                    52
                                  ],
                                  "type": "Identifier",
                                  "name": "greeting"
                                },
                                "init": {
                                  "range": [
                                    55,
                                    83
                                  ],
                                  "type": "BinaryExpression",
                                  "operator": "+",
                                  "left": {
                                    "range": [
                                      55,
                                      77
                                    ],
                                    "type": "BinaryExpression",
                                    "operator": "+",
                                    "left": {
                                      "range": [
                                        55,
                                        64
                                      ],
                                      "type": "Literal",
                                      "value": "Hello, ",
                                      "raw": "\"Hello, \""
                                    },
                                    "right": {
                                      "range": [
                                        67,
                                        77
                                      ],
                                      "type": "Identifier",
                                      "name": "personName"
                                    }
                                  },
                                  "right": {
                                    "range": [
                                      80,
                                      83
                                    ],
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
                            "range": [
                              86,
                              101
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                93,
                                101
                              ],
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

        // input = String.raw`func sayHello(alreadyGreeted: Bool) -> String {
        //                         if alreadyGreeted {
        //                             return "blah"
        //                         } else {
        //                             return "hello"
        //                         }
        //                     }
        //                     sayHello(true)`;
        // AST Explorer input:
        // var sayHello = function(alreadyGreeted) {
        //   if (alreadyGreeted) {
        //     return "blah"
        //   } else {
        //     return "hello"
        //   }
        // }
        // sayHello(true)
        xit('should handle functions that have if else statements that use curly braces and have a return value', function() {
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
            "range": [
              0,
              134
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  119
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      119
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        12
                      ],
                      "type": "Identifier",
                      "name": "sayHello"
                    },
                    "init": {
                      "range": [
                        15,
                        119
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            24,
                            38
                          ],
                          "type": "Identifier",
                          "name": "alreadyGreeted"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          40,
                          119
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              44,
                              117
                            ],
                            "type": "IfStatement",
                            "test": {
                              "range": [
                                48,
                                62
                              ],
                              "type": "Identifier",
                              "name": "alreadyGreeted"
                            },
                            "consequent": {
                              "range": [
                                64,
                                87
                              ],
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "range": [
                                    70,
                                    83
                                  ],
                                  "type": "ReturnStatement",
                                  "argument": {
                                    "range": [
                                      77,
                                      83
                                    ],
                                    "type": "Literal",
                                    "value": "blah",
                                    "raw": "\"blah\""
                                  }
                                }
                              ]
                            },
                            "alternate": {
                              "range": [
                                93,
                                117
                              ],
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "range": [
                                    99,
                                    113
                                  ],
                                  "type": "ReturnStatement",
                                  "argument": {
                                    "range": [
                                      106,
                                      113
                                    ],
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
                    }
                  }
                ],
                "kind": "var"
              },
              {
                "range": [
                  120,
                  134
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    120,
                    134
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      120,
                      128
                    ],
                    "type": "Identifier",
                    "name": "sayHello"
                  },
                  "arguments": [
                    {
                      "range": [
                        129,
                        133
                      ],
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
        // AST Explorer input:
        // var sayHello = function(firstName, lastName) {
        //   var giveString = function() {
        //     return firstName + " " + lastName
        //   }
        //   return giveString()
        // }
        xit('should handle nested functions with function invocation', function() {
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
            "range": [
              0,
              144
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  144
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      144
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        12
                      ],
                      "type": "Identifier",
                      "name": "sayHello"
                    },
                    "init": {
                      "range": [
                        15,
                        144
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            24,
                            33
                          ],
                          "type": "Identifier",
                          "name": "firstName"
                        },
                        {
                          "range": [
                            35,
                            43
                          ],
                          "type": "Identifier",
                          "name": "lastName"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          45,
                          144
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              49,
                              120
                            ],
                            "type": "VariableDeclaration",
                            "declarations": [
                              {
                                "range": [
                                  53,
                                  120
                                ],
                                "type": "VariableDeclarator",
                                "id": {
                                  "range": [
                                    53,
                                    63
                                  ],
                                  "type": "Identifier",
                                  "name": "giveString"
                                },
                                "init": {
                                  "range": [
                                    66,
                                    120
                                  ],
                                  "type": "FunctionExpression",
                                  "id": null,
                                  "params": [],
                                  "defaults": [],
                                  "body": {
                                    "range": [
                                      77,
                                      120
                                    ],
                                    "type": "BlockStatement",
                                    "body": [
                                      {
                                        "range": [
                                          83,
                                          116
                                        ],
                                        "type": "ReturnStatement",
                                        "argument": {
                                          "range": [
                                            90,
                                            116
                                          ],
                                          "type": "BinaryExpression",
                                          "operator": "+",
                                          "left": {
                                            "range": [
                                              90,
                                              105
                                            ],
                                            "type": "BinaryExpression",
                                            "operator": "+",
                                            "left": {
                                              "range": [
                                                90,
                                                99
                                              ],
                                              "type": "Identifier",
                                              "name": "firstName"
                                            },
                                            "right": {
                                              "range": [
                                                102,
                                                105
                                              ],
                                              "type": "Literal",
                                              "value": " ",
                                              "raw": "\" \""
                                            }
                                          },
                                          "right": {
                                            "range": [
                                              108,
                                              116
                                            ],
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
                            "range": [
                              123,
                              142
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                130,
                                142
                              ],
                              "type": "CallExpression",
                              "callee": {
                                "range": [
                                  130,
                                  140
                                ],
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
            "range": [
              0,
              113
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  89
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      89
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        9
                      ],
                      "type": "Identifier",
                      "name": "greet"
                    },
                    "init": {
                      "range": [
                        12,
                        89
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            21,
                            25
                          ],
                          "type": "Identifier",
                          "name": "name"
                        },
                        {
                          "range": [
                            27,
                            30
                          ],
                          "type": "Identifier",
                          "name": "day"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          32,
                          89
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              36,
                              86
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                43,
                                86
                              ],
                              "type": "BinaryExpression",
                              "operator": "+",
                              "left": {
                                "range": [
                                  43,
                                  80
                                ],
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                  "range": [
                                    43,
                                    74
                                  ],
                                  "type": "BinaryExpression",
                                  "operator": "+",
                                  "left": {
                                    "range": [
                                      43,
                                      58
                                    ],
                                    "type": "BinaryExpression",
                                    "operator": "+",
                                    "left": {
                                      "range": [
                                        43,
                                        51
                                      ],
                                      "type": "Literal",
                                      "value": "Hello ",
                                      "raw": "\"Hello \""
                                    },
                                    "right": {
                                      "range": [
                                        54,
                                        58
                                      ],
                                      "type": "Identifier",
                                      "name": "name"
                                    }
                                  },
                                  "right": {
                                    "range": [
                                      61,
                                      74
                                    ],
                                    "type": "Literal",
                                    "value": ", today is ",
                                    "raw": "\", today is \""
                                  }
                                },
                                "right": {
                                  "range": [
                                    77,
                                    80
                                  ],
                                  "type": "Identifier",
                                  "name": "day"
                                }
                              },
                              "right": {
                                "range": [
                                  83,
                                  86
                                ],
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
                "range": [
                  90,
                  113
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    90,
                    113
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      90,
                      95
                    ],
                    "type": "Identifier",
                    "name": "greet"
                  },
                  "arguments": [
                    {
                      "range": [
                        96,
                        101
                      ],
                      "type": "Literal",
                      "value": "Bob",
                      "raw": "\"Bob\""
                    },
                    {
                      "range": [
                        103,
                        112
                      ],
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
        // AST Explorer input:
        // var addSevenInts = function(first, second, third, fourth, fifth, sixth, seventh) {
        //   sum = first + second + third + fourth + fifth + sixth + seventh
        //   return sum
        // }
        // addSevenInts(143242134, 34543, 4, 6, 0, 56, 5)
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
            "range": [
              0,
              210
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  163
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      163
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        16
                      ],
                      "type": "Identifier",
                      "name": "addSevenInts"
                    },
                    "init": {
                      "range": [
                        19,
                        163
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            28,
                            33
                          ],
                          "type": "Identifier",
                          "name": "first"
                        },
                        {
                          "range": [
                            35,
                            41
                          ],
                          "type": "Identifier",
                          "name": "second"
                        },
                        {
                          "range": [
                            43,
                            48
                          ],
                          "type": "Identifier",
                          "name": "third"
                        },
                        {
                          "range": [
                            50,
                            56
                          ],
                          "type": "Identifier",
                          "name": "fourth"
                        },
                        {
                          "range": [
                            58,
                            63
                          ],
                          "type": "Identifier",
                          "name": "fifth"
                        },
                        {
                          "range": [
                            65,
                            70
                          ],
                          "type": "Identifier",
                          "name": "sixth"
                        },
                        {
                          "range": [
                            72,
                            79
                          ],
                          "type": "Identifier",
                          "name": "seventh"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          81,
                          163
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              85,
                              148
                            ],
                            "type": "ExpressionStatement",
                            "expression": {
                              "range": [
                                85,
                                148
                              ],
                              "type": "AssignmentExpression",
                              "operator": "=",
                              "left": {
                                "range": [
                                  85,
                                  88
                                ],
                                "type": "Identifier",
                                "name": "sum"
                              },
                              "right": {
                                "range": [
                                  91,
                                  148
                                ],
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                  "range": [
                                    91,
                                    138
                                  ],
                                  "type": "BinaryExpression",
                                  "operator": "+",
                                  "left": {
                                    "range": [
                                      91,
                                      130
                                    ],
                                    "type": "BinaryExpression",
                                    "operator": "+",
                                    "left": {
                                      "range": [
                                        91,
                                        122
                                      ],
                                      "type": "BinaryExpression",
                                      "operator": "+",
                                      "left": {
                                        "range": [
                                          91,
                                          113
                                        ],
                                        "type": "BinaryExpression",
                                        "operator": "+",
                                        "left": {
                                          "range": [
                                            91,
                                            105
                                          ],
                                          "type": "BinaryExpression",
                                          "operator": "+",
                                          "left": {
                                            "range": [
                                              91,
                                              96
                                            ],
                                            "type": "Identifier",
                                            "name": "first"
                                          },
                                          "right": {
                                            "range": [
                                              99,
                                              105
                                            ],
                                            "type": "Identifier",
                                            "name": "second"
                                          }
                                        },
                                        "right": {
                                          "range": [
                                            108,
                                            113
                                          ],
                                          "type": "Identifier",
                                          "name": "third"
                                        }
                                      },
                                      "right": {
                                        "range": [
                                          116,
                                          122
                                        ],
                                        "type": "Identifier",
                                        "name": "fourth"
                                      }
                                    },
                                    "right": {
                                      "range": [
                                        125,
                                        130
                                      ],
                                      "type": "Identifier",
                                      "name": "fifth"
                                    }
                                  },
                                  "right": {
                                    "range": [
                                      133,
                                      138
                                    ],
                                    "type": "Identifier",
                                    "name": "sixth"
                                  }
                                },
                                "right": {
                                  "range": [
                                    141,
                                    148
                                  ],
                                  "type": "Identifier",
                                  "name": "seventh"
                                }
                              }
                            }
                          },
                          {
                            "range": [
                              151,
                              161
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                158,
                                161
                              ],
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
                "range": [
                  164,
                  210
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    164,
                    210
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      164,
                      176
                    ],
                    "type": "Identifier",
                    "name": "addSevenInts"
                  },
                  "arguments": [
                    {
                      "range": [
                        177,
                        186
                      ],
                      "type": "Literal",
                      "value": 143242134,
                      "raw": "143242134"
                    },
                    {
                      "range": [
                        188,
                        193
                      ],
                      "type": "Literal",
                      "value": 34543,
                      "raw": "34543"
                    },
                    {
                      "range": [
                        195,
                        196
                      ],
                      "type": "Literal",
                      "value": 4,
                      "raw": "4"
                    },
                    {
                      "range": [
                        198,
                        199
                      ],
                      "type": "Literal",
                      "value": 6,
                      "raw": "6"
                    },
                    {
                      "range": [
                        201,
                        202
                      ],
                      "type": "Literal",
                      "value": 0,
                      "raw": "0"
                    },
                    {
                      "range": [
                        204,
                        206
                      ],
                      "type": "Literal",
                      "value": 56,
                      "raw": "56"
                    },
                    {
                      "range": [
                        208,
                        209
                      ],
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
            "range": [
              0,
              78
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  51
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      51
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        10
                      ],
                      "type": "Identifier",
                      "name": "addOne"
                    },
                    "init": {
                      "range": [
                        13,
                        51
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            22,
                            27
                          ],
                          "type": "Identifier",
                          "name": "input"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          29,
                          51
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              33,
                              49
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                40,
                                49
                              ],
                              "type": "BinaryExpression",
                              "operator": "+",
                              "left": {
                                "range": [
                                  40,
                                  45
                                ],
                                "type": "Identifier",
                                "name": "input"
                              },
                              "right": {
                                "range": [
                                  48,
                                  49
                                ],
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
                "range": [
                  52,
                  78
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    52,
                    78
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      52,
                      58
                    ],
                    "type": "Identifier",
                    "name": "addOne"
                  },
                  "arguments": [
                    {
                      "range": [
                        59,
                        77
                      ],
                      "type": "BinaryExpression",
                      "operator": "*",
                      "left": {
                        "range": [
                          60,
                          72
                        ],
                        "type": "BinaryExpression",
                        "operator": "-",
                        "left": {
                          "range": [
                            61,
                            67
                          ],
                          "type": "BinaryExpression",
                          "operator": "*",
                          "left": {
                            "range": [
                              61,
                              63
                            ],
                            "type": "Literal",
                            "value": 17,
                            "raw": "17"
                          },
                          "right": {
                            "range": [
                              66,
                              67
                            ],
                            "type": "Literal",
                            "value": 4,
                            "raw": "4"
                          }
                        },
                        "right": {
                          "range": [
                            71,
                            72
                          ],
                          "type": "Literal",
                          "value": 3,
                          "raw": "3"
                        }
                      },
                      "right": {
                        "range": [
                          76,
                          77
                        ],
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
            { type: "SUBSTRING_LOOKUP_START",       value: "[" },
            { type: "NUMBER",                       value: "0" },
            { type: "SUBSTRING_LOOKUP_END",         value: "]" },
            { type: "TERMINATOR",                   value: "\\n"},

            { type: "DECLARATION_KEYWORD",          value: "var" },
            { type: "IDENTIFIER",                   value: "currentMax" },
            { type: "OPERATOR",                     value: "=" },
            { type: "IDENTIFIER",                   value: "array" },
            { type: "SUBSTRING_LOOKUP_START",       value: "[" },
            { type: "NUMBER",                       value: "0" },
            { type: "SUBSTRING_LOOKUP_END",         value: "]" },
            { type: "TERMINATOR",                   value: "\\n"},

            { type: "STATEMENT_KEYWORD",            value: "for" },
            { type: "IDENTIFIER",                   value: "value" },
            { type: "STATEMENT_KEYWORD",            value: "in" },
            { type: "IDENTIFIER",                   value: "array" },
            { type: "SUBSTRING_LOOKUP_START",       value: "[" },

            { type: "NUMBER",                       value: "1" },
            { type: "HALF-OPEN_RANGE",              value: "..<" },

            { type: "IDENTIFIER",                   value: "array" },
            { type: "DOT_SYNTAX",                   value: "." },
            { type: "TYPE_PROPERTY",                value: "count" },

            { type: "SUBSTRING_LOOKUP_END",         value: "]" },
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
            { type: "SUBSTRING_LOOKUP_START",         value: "[" },
            { type: "NUMBER",                         value: "0" },
            { type: "SUBSTRING_LOOKUP_END",           value: "]" },
            { type: "TERMINATOR",                     value: "\\n"},

            { type: "DECLARATION_KEYWORD",            value: "var" },
            { type: "IDENTIFIER",                     value: "currentMax" },
            { type: "OPERATOR",                       value: "=" },
            { type: "IDENTIFIER",                     value: "array" },
            { type: "SUBSTRING_LOOKUP_START",         value: "[" },
            { type: "NUMBER",                         value: "0" },
            { type: "SUBSTRING_LOOKUP_END",           value: "]" },
            { type: "TERMINATOR",                     value: "\\n"},

            { type: "STATEMENT_KEYWORD",              value: "for" },
            { type: "IDENTIFIER",                     value: "value" },
            { type: "STATEMENT_KEYWORD",              value: "in" },
            { type: "IDENTIFIER",                     value: "array" },
            { type: "SUBSTRING_LOOKUP_START",         value: "[" },

            { type: "NUMBER",                         value: "1" },
            { type: "HALF-OPEN_RANGE",                value: "..<" },
            //TODO get native methods working
            { type: "NUMBER",                         value: "2" },
            // { type: "NODUCKINGCLUE",               value: "array.count" },

            { type: "SUBSTRING_LOOKUP_END",           value: "]" },
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
            "range": [
              0,
              172
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  159
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      159
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        9
                      ],
                      "type": "Identifier",
                      "name": "sumOf"
                    },
                    "init": {
                      "range": [
                        12,
                        159
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [],
                      "defaults": [],
                      "body": {
                        "range": [
                          23,
                          159
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              27,
                              79
                            ],
                            "type": "VariableDeclaration",
                            "declarations": [
                              {
                                "range": [
                                  31,
                                  78
                                ],
                                "type": "VariableDeclarator",
                                "id": {
                                  "range": [
                                    31,
                                    38
                                  ],
                                  "type": "Identifier",
                                  "name": "numbers"
                                },
                                "init": {
                                  "range": [
                                    41,
                                    78
                                  ],
                                  "type": "CallExpression",
                                  "callee": {
                                    "range": [
                                      41,
                                      67
                                    ],
                                    "type": "MemberExpression",
                                    "computed": false,
                                    "object": {
                                      "range": [
                                        41,
                                        62
                                      ],
                                      "type": "MemberExpression",
                                      "computed": false,
                                      "object": {
                                        "range": [
                                          41,
                                          56
                                        ],
                                        "type": "MemberExpression",
                                        "computed": false,
                                        "object": {
                                          "range": [
                                            41,
                                            46
                                          ],
                                          "type": "Identifier",
                                          "name": "Array"
                                        },
                                        "property": {
                                          "range": [
                                            47,
                                            56
                                          ],
                                          "type": "Identifier",
                                          "name": "prototype"
                                        }
                                      },
                                      "property": {
                                        "range": [
                                          57,
                                          62
                                        ],
                                        "type": "Identifier",
                                        "name": "slice"
                                      }
                                    },
                                    "property": {
                                      "range": [
                                        63,
                                        67
                                      ],
                                      "type": "Identifier",
                                      "name": "call"
                                    }
                                  },
                                  "arguments": [
                                    {
                                      "range": [
                                        68,
                                        77
                                      ],
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
                            "range": [
                              82,
                              94
                            ],
                            "type": "VariableDeclaration",
                            "declarations": [
                              {
                                "range": [
                                  86,
                                  93
                                ],
                                "type": "VariableDeclarator",
                                "id": {
                                  "range": [
                                    86,
                                    89
                                  ],
                                  "type": "Identifier",
                                  "name": "sum"
                                },
                                "init": {
                                  "range": [
                                    92,
                                    93
                                  ],
                                  "type": "Literal",
                                  "value": 0,
                                  "raw": "0"
                                }
                              }
                            ],
                            "kind": "var"
                          },
                          {
                            "range": [
                              97,
                              144
                            ],
                            "type": "ForInStatement",
                            "left": {
                              "range": [
                                102,
                                108
                              ],
                              "type": "Identifier",
                              "name": "number"
                            },
                            "right": {
                              "range": [
                                112,
                                119
                              ],
                              "type": "Identifier",
                              "name": "numbers"
                            },
                            "body": {
                              "range": [
                                121,
                                144
                              ],
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "range": [
                                    127,
                                    140
                                  ],
                                  "type": "ExpressionStatement",
                                  "expression": {
                                    "range": [
                                      127,
                                      140
                                    ],
                                    "type": "AssignmentExpression",
                                    "operator": "+=",
                                    "left": {
                                      "range": [
                                        127,
                                        130
                                      ],
                                      "type": "Identifier",
                                      "name": "sum"
                                    },
                                    "right": {
                                      "range": [
                                        134,
                                        140
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
                              147,
                              157
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                154,
                                157
                              ],
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
                "range": [
                  160,
                  172
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    160,
                    172
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      160,
                      165
                    ],
                    "type": "Identifier",
                    "name": "sumOf"
                  },
                  "arguments": [
                    {
                      "range": [
                        166,
                        167
                      ],
                      "type": "Literal",
                      "value": 1,
                      "raw": "1"
                    },
                    {
                      "range": [
                        168,
                        169
                      ],
                      "type": "Literal",
                      "value": 2,
                      "raw": "2"
                    },
                    {
                      "range": [
                        170,
                        171
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
            "range": [
              0,
              112
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  112
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      112
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        19
                      ],
                      "type": "Identifier",
                      "name": "makeIncrementer"
                    },
                    "init": {
                      "range": [
                        22,
                        112
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [],
                      "defaults": [],
                      "body": {
                        "range": [
                          33,
                          112
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              37,
                              94
                            ],
                            "type": "VariableDeclaration",
                            "declarations": [
                              {
                                "range": [
                                  41,
                                  94
                                ],
                                "type": "VariableDeclarator",
                                "id": {
                                  "range": [
                                    41,
                                    47
                                  ],
                                  "type": "Identifier",
                                  "name": "addOne"
                                },
                                "init": {
                                  "range": [
                                    50,
                                    94
                                  ],
                                  "type": "FunctionExpression",
                                  "id": null,
                                  "params": [
                                    {
                                      "range": [
                                        59,
                                        65
                                      ],
                                      "type": "Identifier",
                                      "name": "number"
                                    }
                                  ],
                                  "defaults": [],
                                  "body": {
                                    "range": [
                                      67,
                                      94
                                    ],
                                    "type": "BlockStatement",
                                    "body": [
                                      {
                                        "range": [
                                          73,
                                          90
                                        ],
                                        "type": "ReturnStatement",
                                        "argument": {
                                          "range": [
                                            80,
                                            90
                                          ],
                                          "type": "BinaryExpression",
                                          "operator": "+",
                                          "left": {
                                            "range": [
                                              80,
                                              81
                                            ],
                                            "type": "Literal",
                                            "value": 1,
                                            "raw": "1"
                                          },
                                          "right": {
                                            "range": [
                                              84,
                                              90
                                            ],
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
                            "range": [
                              97,
                              110
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                104,
                                110
                              ],
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
            "range": [
              0,
              112
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  112
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      112
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        19
                      ],
                      "type": "Identifier",
                      "name": "makeIncrementer"
                    },
                    "init": {
                      "range": [
                        22,
                        112
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [],
                      "defaults": [],
                      "body": {
                        "range": [
                          33,
                          112
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              37,
                              94
                            ],
                            "type": "VariableDeclaration",
                            "declarations": [
                              {
                                "range": [
                                  41,
                                  94
                                ],
                                "type": "VariableDeclarator",
                                "id": {
                                  "range": [
                                    41,
                                    47
                                  ],
                                  "type": "Identifier",
                                  "name": "addOne"
                                },
                                "init": {
                                  "range": [
                                    50,
                                    94
                                  ],
                                  "type": "FunctionExpression",
                                  "id": null,
                                  "params": [
                                    {
                                      "range": [
                                        59,
                                        65
                                      ],
                                      "type": "Identifier",
                                      "name": "number"
                                    }
                                  ],
                                  "defaults": [],
                                  "body": {
                                    "range": [
                                      67,
                                      94
                                    ],
                                    "type": "BlockStatement",
                                    "body": [
                                      {
                                        "range": [
                                          73,
                                          90
                                        ],
                                        "type": "ReturnStatement",
                                        "argument": {
                                          "range": [
                                            80,
                                            90
                                          ],
                                          "type": "BinaryExpression",
                                          "operator": "+",
                                          "left": {
                                            "range": [
                                              80,
                                              81
                                            ],
                                            "type": "Literal",
                                            "value": 1,
                                            "raw": "1"
                                          },
                                          "right": {
                                            "range": [
                                              84,
                                              90
                                            ],
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
                            "range": [
                              97,
                              110
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                104,
                                110
                              ],
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
            "range": [
              0,
              132
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  132
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      132
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        7
                      ],
                      "type": "Identifier",
                      "name": "any"
                    },
                    "init": {
                      "range": [
                        10,
                        132
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            19,
                            23
                          ],
                          "type": "Identifier",
                          "name": "list"
                        },
                        {
                          "range": [
                            25,
                            34
                          ],
                          "type": "Identifier",
                          "name": "condition"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          36,
                          132
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              40,
                              115
                            ],
                            "type": "ForInStatement",
                            "left": {
                              "range": [
                                45,
                                49
                              ],
                              "type": "Identifier",
                              "name": "item"
                            },
                            "right": {
                              "range": [
                                53,
                                57
                              ],
                              "type": "Identifier",
                              "name": "list"
                            },
                            "body": {
                              "range": [
                                59,
                                115
                              ],
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "range": [
                                    65,
                                    111
                                  ],
                                  "type": "IfStatement",
                                  "test": {
                                    "range": [
                                      69,
                                      84
                                    ],
                                    "type": "CallExpression",
                                    "callee": {
                                      "range": [
                                        69,
                                        78
                                      ],
                                      "type": "Identifier",
                                      "name": "condition"
                                    },
                                    "arguments": [
                                      {
                                        "range": [
                                          79,
                                          83
                                        ],
                                        "type": "Identifier",
                                        "name": "item"
                                      }
                                    ]
                                  },
                                  "consequent": {
                                    "range": [
                                      86,
                                      111
                                    ],
                                    "type": "BlockStatement",
                                    "body": [
                                      {
                                        "range": [
                                          94,
                                          105
                                        ],
                                        "type": "ReturnStatement",
                                        "argument": {
                                          "range": [
                                            101,
                                            105
                                          ],
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
                            "range": [
                              118,
                              130
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                125,
                                130
                              ],
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
            "range": [
              0,
              132
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  132
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      132
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        7
                      ],
                      "type": "Identifier",
                      "name": "any"
                    },
                    "init": {
                      "range": [
                        10,
                        132
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            19,
                            23
                          ],
                          "type": "Identifier",
                          "name": "list"
                        },
                        {
                          "range": [
                            25,
                            34
                          ],
                          "type": "Identifier",
                          "name": "condition"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          36,
                          132
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              40,
                              115
                            ],
                            "type": "ForInStatement",
                            "left": {
                              "range": [
                                45,
                                49
                              ],
                              "type": "Identifier",
                              "name": "item"
                            },
                            "right": {
                              "range": [
                                53,
                                57
                              ],
                              "type": "Identifier",
                              "name": "list"
                            },
                            "body": {
                              "range": [
                                59,
                                115
                              ],
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "range": [
                                    65,
                                    111
                                  ],
                                  "type": "IfStatement",
                                  "test": {
                                    "range": [
                                      69,
                                      84
                                    ],
                                    "type": "CallExpression",
                                    "callee": {
                                      "range": [
                                        69,
                                        78
                                      ],
                                      "type": "Identifier",
                                      "name": "condition"
                                    },
                                    "arguments": [
                                      {
                                        "range": [
                                          79,
                                          83
                                        ],
                                        "type": "Identifier",
                                        "name": "item"
                                      }
                                    ]
                                  },
                                  "consequent": {
                                    "range": [
                                      86,
                                      111
                                    ],
                                    "type": "BlockStatement",
                                    "body": [
                                      {
                                        "range": [
                                          94,
                                          105
                                        ],
                                        "type": "ReturnStatement",
                                        "argument": {
                                          "range": [
                                            101,
                                            105
                                          ],
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
                            "range": [
                              118,
                              130
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                125,
                                130
                              ],
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
            "range": [
              0,
              145
            ],
            "type": "Program",
            "body": [
              {
                "range": [
                  0,
                  49
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      4,
                      49
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        4,
                        15
                      ],
                      "type": "Identifier",
                      "name": "returnWorld"
                    },
                    "init": {
                      "range": [
                        18,
                        49
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [],
                      "defaults": [],
                      "body": {
                        "range": [
                          29,
                          49
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              33,
                              47
                            ],
                            "type": "ReturnStatement",
                            "argument": {
                              "range": [
                                40,
                                47
                              ],
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
                "range": [
                  50,
                  101
                ],
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "range": [
                      54,
                      101
                    ],
                    "type": "VariableDeclarator",
                    "id": {
                      "range": [
                        54,
                        64
                      ],
                      "type": "Identifier",
                      "name": "printInput"
                    },
                    "init": {
                      "range": [
                        67,
                        101
                      ],
                      "type": "FunctionExpression",
                      "id": null,
                      "params": [
                        {
                          "range": [
                            76,
                            81
                          ],
                          "type": "Identifier",
                          "name": "input"
                        }
                      ],
                      "defaults": [],
                      "body": {
                        "range": [
                          83,
                          101
                        ],
                        "type": "BlockStatement",
                        "body": [
                          {
                            "range": [
                              87,
                              99
                            ],
                            "type": "ExpressionStatement",
                            "expression": {
                              "range": [
                                87,
                                99
                              ],
                              "type": "CallExpression",
                              "callee": {
                                "range": [
                                  87,
                                  92
                                ],
                                "type": "Identifier",
                                "name": "print"
                              },
                              "arguments": [
                                {
                                  "range": [
                                    93,
                                    98
                                  ],
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
                "range": [
                  102,
                  145
                ],
                "type": "ExpressionStatement",
                "expression": {
                  "range": [
                    102,
                    145
                  ],
                  "type": "CallExpression",
                  "callee": {
                    "range": [
                      102,
                      112
                    ],
                    "type": "Identifier",
                    "name": "printInput"
                  },
                  "arguments": [
                    {
                      "range": [
                        113,
                        144
                      ],
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "range": [
                          113,
                          138
                        ],
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                          "range": [
                            113,
                            122
                          ],
                          "type": "Literal",
                          "value": "Hello, ",
                          "raw": "\"Hello, \""
                        },
                        "right": {
                          "range": [
                            125,
                            138
                          ],
                          "type": "CallExpression",
                          "callee": {
                            "range": [
                              125,
                              136
                            ],
                            "type": "Identifier",
                            "name": "returnWorld"
                          },
                          "arguments": []
                        }
                      },
                      "right": {
                        "range": [
                          141,
                          144
                        ],
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



      describe('Classes and Stuctures', function () {
        // input = String.raw`class VideoMode {
        //                       var interlaced = false
        //                       var frameRate = 0.0
        //                   }
        //                   struct Resolution {
        //                       var width = 0
        //                       var height = 0
        //                   }`;

        xit('should handle basic definitions of classes and structs', function () {
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "VideoMode" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "interlaced" },
            { type: "OPERATOR",                   value: "=" },
            { type: "BOOLEAN",                    value: "false" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "frameRate" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0.0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "struct" },
            { type: "IDENTIFIER",                 value: "Resolution" },
            { type: "STRUCT_DEFINITION_START",    value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "width" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "height" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STRUCT_DEFINITION_END",      value: "}" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "VideoMode" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "interlaced" },
            { type: "OPERATOR",                   value: "=" },
            { type: "BOOLEAN",                    value: "false" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "frameRate" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0.0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "struct" },
            { type: "IDENTIFIER",                 value: "Resolution" },
            { type: "STRUCT_DEFINITION_START",    value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "width" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "height" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STRUCT_DEFINITION_END",      value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "someVideoMode" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "VideoMode" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "someResolution" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "Resolution" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "PUNCTUATION",                value: ";" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "VideoMode" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "interlaced" },
            { type: "OPERATOR",                   value: "=" },
            { type: "BOOLEAN",                    value: "false" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "frameRate" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0.0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "struct" },
            { type: "IDENTIFIER",                 value: "Resolution" },
            { type: "STRUCT_DEFINITION_START",    value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "width" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "height" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STRUCT_DEFINITION_END",      value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "someVideoMode" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "VideoMode" },
            { type: "INITIALIZATION_START",        value: "(" },
            { type: "INITIALIZATION_END",          value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "someResolution" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "Resolution" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "PUNCTUATION",                value: ";" },
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "someFrameRate" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "someVideoMode" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "frameRate" },
            { type: "PUNCTUATION",                value: ";" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "someWidth" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "someResolution" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "width" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
        });

        // input = String.raw`struct Resolution {
        //                       var width = 0
        //                       var height = 0
        //                   }

        //                   let someResolution = Resolution(width: 640, height: 480)`;
        // AST Explorer input:

        xit('should handle basic memberwise initialization', function () {
          input = [
            { type: "DECLARATION_KEYWORD",        value: "struct" },
            { type: "IDENTIFIER",                 value: "Resolution" },
            { type: "STRUCT_DEFINITION_START",    value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "width" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "height" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STRUCT_DEFINITION_END",      value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "someResolution" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "Resolution" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "IDENTIFIER",                 value: "width" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "640" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "height" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "480" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
        });

        // input = String.raw`var resolutionHeight = 480
        //                     struct Resolution {
        //                         var width = 0
        //                         var height = 0
        //                     }

        //                     let someResolution = Resolution(width: ((50 * 2) * 6) + 40, height: resolutionHeight)`;
        // AST Explorer input:

        xit('should handle complex memberwise initialization with internal parentheses', function () {
          input = [
            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "resolutionHeight" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "480" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "struct" },
            { type: "IDENTIFIER",                 value: "Resolution" },
            { type: "STRUCT_DEFINITION_START",    value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "width" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "height" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STRUCT_DEFINITION_END",      value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "someResolution" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "Resolution" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "IDENTIFIER",                 value: "width" },
            { type: "PUNCTUATION",                value: ":" },

            { type: "PUNCTUATION",                value: "(" },
            { type: "PUNCTUATION",                value: "(" },
            { type: "NUMBER",                     value: "50" },
            { type: "OPERATOR",                   value: "*" },
            { type: "NUMBER",                     value: "2" },
            { type: "PUNCTUATION",                value: ")" },
            { type: "OPERATOR",                   value: "*" },
            { type: "NUMBER",                     value: "6" },
            { type: "PUNCTUATION",                value: ")" },
            { type: "OPERATOR",                   value: "+" },
            { type: "NUMBER",                     value: "40" },

            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "height" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "IDENTIFIER",                 value: "resolutionHeight" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [

          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
        });

        // input = String.raw`struct FixedLengthRange {
        //                         var firstValue: Int
        //                         let length: Int
        //                     }
        //                     let rangeOfOneHundred = FixedLengthRange(firstValue: 1, length: 100)`;
        // AST Explorer input:

        xit('should handle variable and constant stored properties', function () {
          input = [
            { type: "DECLARATION_KEYWORD",        value: "struct" },
            { type: "IDENTIFIER",                 value: "FixedLengthRange" },
            { type: "STRUCT_DEFINITION_START",    value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "firstValue" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_NUMBER",                value: "Int"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "length" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_NUMBER",                value: "Int"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STRUCT_DEFINITION_END",      value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "rangeOfOneHundred" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "FixedLengthRange" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "IDENTIFIER",                 value: "firstValue" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "1" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "length" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "100" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "Medley" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "a" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "1" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "b" },
            { type: "OPERATOR",                   value: "=" },
            { type: "STRING",                     value: "hai, world" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "c" },
            { type: "OPERATOR",                   value: "=" },
            { type: "BOOLEAN",                    value: "true" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "MULTI_LINE_COMMENT_START",   value: "/*"},
            { type: "COMMENT",                    value: " Comment 1 "},
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "MULTI_LINE_COMMENT_END",     value: "*/"},
            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "d" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "1" },
            { type: "COMMENT_START",              value: "//"},
            { type: "COMMENT",                    value: " Comment 2"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "e" },
            { type: "OPERATOR",                   value: "=" },
            { type: "ARRAY_START",                value: "[" },
            { type: "STRING",                     value: "Eggs" },
            { type: "PUNCTUATION",                value: "," },
            { type: "STRING",                     value: "Milk" },
            { type: "PUNCTUATION",                value: "," },
            { type: "STRING",                     value: "Bacon" },
            { type: "ARRAY_END",                  value: "]" },
            { type: "PUNCTUATION",                value: ";" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "f" },
            { type: "OPERATOR",                   value: "=" },
            { type: "DICTIONARY_START",           value: "[" },
            { type: "STRING",                     value: "one" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "1" },
            { type: "PUNCTUATION",                value: "," },
            { type: "STRING",                     value: "two" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "2" },
            { type: "PUNCTUATION",                value: "," },
            { type: "STRING",                     value: "three" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "3" },
            { type: "DICTIONARY_END",             value: "]" },
            { type: "TERMINATOR",                 value: "\\n"},

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
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "g" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "5" },
            { type: "OPERATOR",                   value: "+" },
            { type: "NUMBER",                     value: "6" },
            { type: "OPERATOR",                   value: "/" },
            { type: "NUMBER",                     value: "4" },
            { type: "OPERATOR",                   value: "-" },
            { type: "PUNCTUATION",                value: "(" },
            { type: "OPERATOR",                   value: "-" },
            { type: "NUMBER",                     value: "16" },
            { type: "OPERATOR",                   value: "%" },
            { type: "NUMBER",                     value: "4.2" },
            { type: "PUNCTUATION",                value: ")" },
            { type: "OPERATOR",                   value: "*" },
            { type: "NUMBER",                     value: "55" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "let" },
            { type: "IDENTIFIER",                 value: "h" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "6" },
            { type: "OPERATOR",                   value: "!" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "9" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "i" },
            { type: "OPERATOR",                   value: "=" },
            { type: "STRING",                     value: "Stephen" },
            { type: "OPERATOR",                   value: "+" },
            { type: "STRING",                     value: " " },
            { type: "OPERATOR",                   value: "+" },
            { type: "STRING",                     value: "Tabor" },
            { type: "OPERATOR",                   value: "+" },
            { type: "STRING",                     value: "!" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "Counter" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "increment" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "+" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "incrementBy" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "amount" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "amount" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "reset" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            {type: "DECLARATION_KEYWORD",         value: "var" },
            { type: "IDENTIFIER",                 value: "someCounter" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "Counter" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "someCounter" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "incrementBy" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "NUMBER",                     value: "5" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "Counter" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "increment" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "+" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "incrementBy" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "amount" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "numberOfTimes" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "amount" },
            { type: "OPERATOR",                   value: "*" },
            { type: "IDENTIFIER",                 value: "numberOfTimes" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "reset" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            {type: "DECLARATION_KEYWORD",         value: "var" },
            { type: "IDENTIFIER",                 value: "someCounter" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "Counter" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "someCounter" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "incrementBy" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "NUMBER",                     value: "50" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "numberOfTimes" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "10" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "someCounter" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "Counter" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "increment" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "+" },
            { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "self" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "incrementBy" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "amount" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "self" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "amount" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "reset" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "self" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            {type: "DECLARATION_KEYWORD",         value: "var" },
            { type: "IDENTIFIER",                 value: "someCounter" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "Counter" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "someCounter" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "incrementBy" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "NUMBER",                     value: "5" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "struct" },
            { type: "IDENTIFIER",                 value: "Counter" },
            { type: "STRUCT_DEFINITION_START",    value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "mutating"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "increment" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "+" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "mutating"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "incrementBy" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "amount" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "amount" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "mutating"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "reset" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STRUCT_DEFINITION_END",      value: "}" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
        });

        // input = String.raw`struct Counter {
        //                         var total = 0
        //                         mutating func increment() {
        //                             self = Counter(total: ++total)
        //                         }
        //                     }`;
        // AST Explorer input:

        xit('should handle basic struct mutating methods that assign to self', function () {
          input = [
            { type: "DECLARATION_KEYWORD",        value: "struct" },
            { type: "IDENTIFIER",                 value: "Counter" },
            { type: "STRUCT_DEFINITION_START",    value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "mutating"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "increment" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "self" },
            { type: "OPERATOR",                   value: "=" },
            { type: "IDENTIFIER",                 value: "Counter" },
            { type: "INITIALIZATION_START",       value: "(" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "+" },
            { type: "IDENTIFIER",                 value: "total" },
            { type: "INITIALIZATION_END",         value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STRUCT_DEFINITION_END",      value: "}" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "ParentClass" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "static"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "returnTen" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "RETURN_ARROW",               value: "->" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENT_KEYWORD",          value: "return"},
            { type: "NUMBER",                     value: "10" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "class"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "returnString" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "RETURN_ARROW",               value: "->" },
            { type: "TYPE_STRING",                value: "String" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENT_KEYWORD",          value: "return"},
            { type: "STRING",                     value: "my string" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "ParentClass" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "returnTen" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "ParentClass" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "IDENTIFIER",                 value: "returnString" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "SuperClass" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "a" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "b" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "1" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "incrementA" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "+" },
            { type: "IDENTIFIER",                 value: "a" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "static"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "returnTen" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "RETURN_ARROW",               value: "->" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENT_KEYWORD",          value: "return"},
            { type: "NUMBER",                     value: "10" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "class"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "returnString" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "RETURN_ARROW",               value: "->" },
            { type: "TYPE_STRING",                value: "String" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENT_KEYWORD",          value: "return"},
            { type: "STRING",                     value: "my string" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "SubClass" },
            { type: "INHERITANCE_OPERATOR",       value: ":" },
            { type: "IDENTIFIER",                 value: "SuperClass" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "c" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "2" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "SuperClass" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "a" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "0" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "b" },
            { type: "OPERATOR",                   value: "=" },
            { type: "NUMBER",                     value: "1" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "incrementA" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "+" },
            { type: "IDENTIFIER",                 value: "a" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "static"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "returnTen" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "RETURN_ARROW",               value: "->" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENT_KEYWORD",          value: "return"},
            { type: "NUMBER",                     value: "10" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "final"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "returnString" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "RETURN_ARROW",               value: "->" },
            { type: "TYPE_STRING",                value: "String" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENT_KEYWORD",          value: "return"},
            { type: "STRING",                     value: "my string" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "class" },
            { type: "IDENTIFIER",                 value: "SubClass" },
            { type: "INHERITANCE_OPERATOR",       value: ":" },
            { type: "IDENTIFIER",                 value: "SuperClass" },
            { type: "CLASS_DEFINITION_START",     value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "override"},
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "incrementA" },
            { type: "PARAMS_START",               value: "(" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "a" },
            { type: "OPERATOR",                   value: "+" },
            { type: "OPERATOR",                   value: "+" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "STATEMENTS_END",             value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "CLASS_DEFINITION_END",       value: "}" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
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
          input = [
             { type: "DECLARATION_KEYWORD",        value: "class" },
             { type: "IDENTIFIER",                 value: "SuperClass" },
             { type: "CLASS_DEFINITION_START",     value: "{" },
             { type: "DECLARATION_KEYWORD",        value: "var" },
             { type: "IDENTIFIER",                 value: "a" },
             { type: "OPERATOR",                   value: "=" },
             { type: "NUMBER",                     value: "0" },
             { type: "TERMINATOR",                 value: "\\n"},
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "DECLARATION_KEYWORD",        value: "var" },
             { type: "IDENTIFIER",                 value: "b" },
             { type: "OPERATOR",                   value: "=" },
             { type: "NUMBER",                     value: "1" },
             { type: "PUNCTUATION",                value: ";" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "DECLARATION_KEYWORD",        value: "func"},
             { type: "IDENTIFIER",                 value: "incrementA" },
             { type: "PARAMS_START",               value: "(" },
             { type: "PARAMS_END",                 value: ")" },
             { type: "STATEMENTS_START",           value: "{" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "OPERATOR",                   value: "+" },
             { type: "OPERATOR",                   value: "+" },
             { type: "IDENTIFIER",                 value: "a" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "STATEMENTS_END",             value: "}" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "DECLARATION_KEYWORD",        value: "static"},
             { type: "DECLARATION_KEYWORD",        value: "func"},
             { type: "IDENTIFIER",                 value: "returnTen" },
             { type: "PARAMS_START",               value: "(" },
             { type: "PARAMS_END",                 value: ")" },
             { type: "RETURN_ARROW",               value: "->" },
             { type: "TYPE_NUMBER",                value: "Int" },
             { type: "STATEMENTS_START",           value: "{" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "STATEMENT_KEYWORD",          value: "return"},
             { type: "NUMBER",                     value: "10" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "STATEMENTS_END",             value: "}" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "final"},
             { type: "DECLARATION_KEYWORD",        value: "func"},
             { type: "IDENTIFIER",                 value: "returnString" },
             { type: "PARAMS_START",               value: "(" },
             { type: "PARAMS_END",                 value: ")" },
             { type: "RETURN_ARROW",               value: "->" },
             { type: "TYPE_STRING",                value: "String" },
             { type: "STATEMENTS_START",           value: "{" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "STATEMENT_KEYWORD",          value: "return"},
             { type: "STRING",                     value: "my string" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "STATEMENTS_END",             value: "}" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "CLASS_DEFINITION_END",       value: "}" },
             { type: "TERMINATOR",                 value: "\\n"},
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "DECLARATION_KEYWORD",        value: "class" },
             { type: "IDENTIFIER",                 value: "SubClass" },
             { type: "INHERITANCE_OPERATOR",       value: ":" },
             { type: "IDENTIFIER",                 value: "SuperClass" },
             { type: "CLASS_DEFINITION_START",     value: "{" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "override"},
             { type: "DECLARATION_KEYWORD",        value: "func"},
             { type: "IDENTIFIER",                 value: "incrementA" },
             { type: "PARAMS_START",               value: "(" },
             { type: "PARAMS_END",                 value: ")" },
             { type: "STATEMENTS_START",           value: "{" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "IDENTIFIER",                 value: "a" },
             { type: "OPERATOR",                   value: "+" },
             { type: "OPERATOR",                   value: "+" },
             { type: "PUNCTUATION",                value: ";" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "STATEMENTS_END",             value: "}" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "CLASS_DEFINITION_END",       value: "}" },
             { type: "TERMINATOR",                 value: "\\n"},
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "DECLARATION_KEYWORD",        value: "var" },
             { type: "IDENTIFIER",                 value: "someSuper" },
             { type: "OPERATOR",                   value: "=" },
             { type: "IDENTIFIER",                 value: "SuperClass" },
             { type: "INITIALIZATION_START",       value: "(" },
             { type: "INITIALIZATION_END",         value: ")" },
             { type: "TERMINATOR",                 value: "\\n"},
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "IDENTIFIER",                 value: "someSuper" },
             { type: "DOT_SYNTAX",                 value: "." },
             { type: "IDENTIFIER",                 value: "a" },
             { type: "PUNCTUATION",                value: ";" },
             { type: "IDENTIFIER",                 value: "someSuper" },
             { type: "DOT_SYNTAX",                 value: "." },
             { type: "IDENTIFIER",                 value: "returnString" },
             { type: "INVOCATION_START",           value: "(" },
             { type: "INVOCATION_END",             value: ")" },
             { type: "PUNCTUATION",                value: ";" },
             { type: "TERMINATOR",                 value: "\\n"},

             { type: "TERMINATOR",                 value: "EOF"}
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
        });

      });

      describe('Native Methods and Type Properties', function () {

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
          input = [
            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "name" },
            { type: "OPERATOR",                   value: "=" },
            { type: "STRING",                     value: "Joe" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "arr" },
            { type: "OPERATOR",                   value: "=" },
            { type: "ARRAY_START",                value: "[" },
            { type: "NUMBER",                     value: "1" },
            { type: "PUNCTUATION",                value: "," },
            { type: "NUMBER",                     value: "2" },
            { type: "ARRAY_END",                  value: "]" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "DECLARATION_KEYWORD",        value: "var" },
            { type: "IDENTIFIER",                 value: "tup" },
            { type: "OPERATOR",                   value: "=" },
            { type: "TUPLE_START",                value: "(" },
            { type: "NUMBER",                     value: "1" },
            { type: "PUNCTUATION",                value: "," },
            { type: "NUMBER",                     value: "2" },
            { type: "TUPLE_END",                  value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "name" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "Hello, " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "name" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: "" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "NUMBER",                     value: "5" },
            { type: "OPERATOR",                   value: "*" },
            { type: "PUNCTUATION",                value: "(" },
            { type: "NUMBER",                     value: "1" },
            { type: "OPERATOR",                   value: "+" },
            { type: "NUMBER",                     value: "1" },
            { type: "PUNCTUATION",                value: ")" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "arr" },
            { type: "SUBSTRING_LOOKUP_START",     value: "[" },
            { type: "NUMBER",                     value: "1" },
            { type: "SUBSTRING_LOOKUP_END",       value: "]" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "tup" },
            { type: "DOT_SYNTAX",                 value: "." },
            { type: "NUMBER",                     value: "0"},
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "EOF" }
          ];
          output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
        });

        xdescribe('Range Operations', function () {

          // Swift input: 'var a = 1...5'
          // AST Explorer input:
          // AST Explorer input:

        xit('should handle closed ranges', function () {
            input = [
              { type: "DECLARATION_KEYWORD",  value: "var" },
              { type: "IDENTIFIER",           value: "a" },
              { type: "OPERATOR",             value: "=" },
              { type: "NUMBER",               value: "1" },
              { type: "CLOSED_RANGE",         value: "..." },
              { type: "NUMBER",               value: "5" },
              { type: "TERMINATOR",           value: "EOF"}
            ];
            output = "FILL_ME_IN";
            expect(R.equals(parser(input), output)).to.equal(true);
          });

          // Swift input: 'var a = 1.0...5.0'
          // AST Explorer input:
          // AST Explorer input:

        xit('should handle decimal ending in 0 closed ranges', function () {
            input = [
              { type: "DECLARATION_KEYWORD",  value: "var" },
              { type: "IDENTIFIER",           value: "a" },
              { type: "OPERATOR",             value: "=" },
              { type: "NUMBER",               value: "1.0" },
              { type: "CLOSED_RANGE",         value: "..." },
              { type: "NUMBER",               value: "5.0" },
              { type: "TERMINATOR",           value: "EOF"}
            ];
            output = "FILL_ME_IN";
            expect(R.equals(parser(input), output)).to.equal(true);
          });

          // Swift input: 'var a = 1.2...5.3'
          // AST Explorer input:
          // AST Explorer input:

        xit('should handle random decimal closed ranges', function () {
            input = [
              { type: "DECLARATION_KEYWORD",  value: "var" },
              { type: "IDENTIFIER",           value: "a" },
              { type: "OPERATOR",             value: "=" },
              { type: "NUMBER",               value: "1.2" },
              { type: "CLOSED_RANGE",         value: "..." },
              { type: "NUMBER",               value: "5.3" },
              { type: "TERMINATOR",           value: "EOF"}
            ];
            output = "FILL_ME_IN";
            expect(R.equals(parser(input), output)).to.equal(true);
          });

          // Swift input: 'var b = 1..<5'
          // AST Explorer input:
          // AST Explorer input:

        xit('should handle half-open ranges', function () {
            input = [
              { type: "DECLARATION_KEYWORD",  value: "var" },
              { type: "IDENTIFIER",           value: "b" },
              { type: "OPERATOR",             value: "=" },
              { type: "NUMBER",               value: "1" },
              { type: "HALF-OPEN_RANGE",      value: "..<" },
              { type: "NUMBER",               value: "5" },
              { type: "TERMINATOR",           value: "EOF"}
            ];
            output = "FILL_ME_IN";
            expect(R.equals(parser(input), output)).to.equal(true);
          });

          // Swift input: 'var a = 1.0..<5.0'
          // AST Explorer input:
          // AST Explorer input:

        xit('should handle decimal ending in 0 half-open ranges', function () {
            input = [
              { type: "DECLARATION_KEYWORD",  value: "var" },
              { type: "IDENTIFIER",           value: "a" },
              { type: "OPERATOR",             value: "=" },
              { type: "NUMBER",               value: "1.0" },
              { type: "HALF-OPEN_RANGE",      value: "..<" },
              { type: "NUMBER",               value: "5.0" },
              { type: "TERMINATOR",           value: "EOF"}
            ];
            output = "FILL_ME_IN";
            expect(R.equals(parser(input), output)).to.equal(true);
          });

          // Swift input: 'var a = 1.2..<5.3'
          // AST Explorer input:
          // AST Explorer input:

        xit('should handle random decimal half-open ranges', function () {
            input = [
              { type: "DECLARATION_KEYWORD",  value: "var" },
              { type: "IDENTIFIER",           value: "a" },
              { type: "OPERATOR",             value: "=" },
              { type: "NUMBER",               value: "1.2" },
              { type: "HALF-OPEN_RANGE",      value: "..<" },
              { type: "NUMBER",               value: "5.3" },
              { type: "TERMINATOR",           value: "EOF"}
            ];
            output = "FILL_ME_IN";
            expect(R.equals(parser(input), output)).to.equal(true);
          });

          // Swift input: 'var a = 1...5; var b = 2..<6'
          // AST Explorer input:
          // AST Explorer input:

        xit('should handle all ranges', function () {
            input = [
              { type: "DECLARATION_KEYWORD",  value: "var" },
              { type: "IDENTIFIER",           value: "a" },
              { type: "OPERATOR",             value: "=" },
              { type: "NUMBER",               value: "1" },
              { type: "CLOSED_RANGE",         value: "..." },
              { type: "NUMBER",               value: "5" },
              { type: "PUNCTUATION",          value: ";"},
              { type: "DECLARATION_KEYWORD",  value: "var" },
              { type: "IDENTIFIER",           value: "b" },
              { type: "OPERATOR",             value: "=" },
              { type: "NUMBER",               value: "2" },
              { type: "HALF-OPEN_RANGE",      value: "..<" },
              { type: "NUMBER",               value: "6" },
              { type: "TERMINATOR",           value: "EOF"}
            ];
            output = "FILL_ME_IN";
            expect(R.equals(parser(input), output)).to.equal(true);
          });

          // Swift input: 'let start = 0; let end = 10; let range = start..<end; let fullRange = start...end;'
          // AST Explorer input:
          // AST Explorer input:

        xit('should handle ranges delimited by identifiers', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "let" },
              { type: "IDENTIFIER",                 value: "start" },
              { type: "OPERATOR",                   value: "=" },
              { type: "NUMBER",                     value: "0" },
              { type: "PUNCTUATION",                value: ";" },
              { type: "DECLARATION_KEYWORD",        value: "let" },
              { type: "IDENTIFIER",                 value: "end" },
              { type: "OPERATOR",                   value: "=" },
              { type: "NUMBER",                     value: "10" },
              { type: "PUNCTUATION",                value: ";" },
              { type: "DECLARATION_KEYWORD",        value: "let" },
              { type: "IDENTIFIER",                 value: "range" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "start" },
              { type: "HALF-OPEN_RANGE",            value: "..<" },
              { type: "IDENTIFIER",                 value: "end" },
              { type: "PUNCTUATION",                value: ";" },
              { type: "DECLARATION_KEYWORD",        value: "let" },
              { type: "IDENTIFIER",                 value: "fullRange" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "start" },
              { type: "CLOSED_RANGE",               value: "..." },
              { type: "IDENTIFIER",                 value: "end" },
              { type: "PUNCTUATION",                value: ";" },
              { type: "TERMINATOR",                 value: "EOF"}
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

        });

        describe('String Properties and Methods', function () {

          // AST Explorer input:

        xit('should handle the String characters property', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "OPERATOR",                   value: "=" },
              { type: "STRING",                     value: "my string, 123!" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "STATEMENT_KEYWORD",          value: "for" },
              { type: "IDENTIFIER",                 value: "c" },
              { type: "STATEMENT_KEYWORD",          value: "in" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "characters" },
              { type: "PUNCTUATION",                value: "{" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "NATIVE_METHOD",              value: "print"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "IDENTIFIER",                 value: "c" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "PUNCTUATION",                value: "}" },
              { type: "TERMINATOR",                 value: "EOF"},
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

          // AST Explorer input:

        xit('should handle the String count property', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "OPERATOR",                   value: "=" },
              { type: "STRING",                     value: "my string, 123!" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "let" },
              { type: "IDENTIFIER",                 value: "fifteen" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "characters" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "count" },
              { type: "TERMINATOR",                 value: "EOF"},
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

          // AST Explorer input:

        xit('should handle the String append method', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "OPERATOR",                   value: "=" },
              { type: "STRING",                     value: "my string, 123!" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "addChar" },
              { type: "PUNCTUATION",                value: ":" },
              { type: "TYPE_STRING",                value: "Character"},
              { type: "OPERATOR",                   value: "=" },
              { type: "STRING",                     value: "!" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "append"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "IDENTIFIER",                 value: "addChar" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "EOF"},
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

          // AST Explorer input:

        xit('should handle the String indices and their associated methods', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "OPERATOR",                   value: "=" },
              { type: "STRING",                     value: "my string, 123!" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "zero" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "startIndex" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "one" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "startIndex" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "successor"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "two" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "startIndex" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "advancedBy"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "NUMBER",                     value: "2" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "m" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "SUBSTRING_LOOKUP_START",     value: "[" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "startIndex" },
              { type: "SUBSTRING_LOOKUP_END",       value: "]" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "y" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "SUBSTRING_LOOKUP_START",     value: "[" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "startIndex" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "advancedBy"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "NUMBER",                     value: "1" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "SUBSTRING_LOOKUP_END",       value: "]" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "fifteen" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "endIndex" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "fourteen" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "endIndex" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "predecessor"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "bang" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "SUBSTRING_LOOKUP_START",     value: "[" },
              { type: "IDENTIFIER",                 value: "s" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "endIndex" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "predecessor"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "SUBSTRING_LOOKUP_END",       value: "]" },
              // { type: "TERMINATOR",                 value: "\\n"},

              // { type: "NATIVE_METHOD",              value: "print"},
              // { type: "INVOCATION_START",           value: "(" },
              // { type: "STRING",                     value: "the letter s: " },
              // { type: "STRING_INTERPOLATION_START", value: "\\(" },
              // { type: "IDENTIFIER",                 value: "s" },
              // { type: "SUBSTRING_LOOKUP_START",     value: "[" },
              // { type: "IDENTIFIER",                 value: "s" },
              // { type: "DOT_SYNTAX",                 value: "." },
              // { type: "TYPE_PROPERTY",              value: "startIndex" },
              // { type: "DOT_SYNTAX",                 value: "." },
              // { type: "NATIVE_METHOD",              value: "advancedBy"},
              // { type: "INVOCATION_START",           value: "(" },
              // { type: "NUMBER",                     value: "3" },
              // { type: "INVOCATION_END",             value: ")" },
              // { type: "SUBSTRING_LOOKUP_END",       value: "]" },
              // { type: "STRING_INTERPOLATION_END",   value: ")" },
              // { type: "STRING",                     value: "" },
              // { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "EOF"},
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

          // AST Explorer input:

        xit('should handle the String methods for inserting and removing characters', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "OPERATOR",                   value: "=" },
              { type: "STRING",                     value: "World" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "firstPart" },
              { type: "OPERATOR",                   value: "=" },
              { type: "STRING",                     value: "Hello, " },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "insert"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "STRING",                     value: "!" },
              { type: "PUNCTUATION",                value: "," },
              { type: "METHOD_ARGUMENT_NAME",       value: "atIndex" },
              { type: "PUNCTUATION",                value: ":" },
              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "endIndex" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "insertContentsOf"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "IDENTIFIER",                 value: "firstPart" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "characters" },
              { type: "PUNCTUATION",                value: "," },
              { type: "METHOD_ARGUMENT_NAME",       value: "at" },
              { type: "PUNCTUATION",                value: ":" },
              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "startIndex" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "removeAtIndex"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "endIndex" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "predecessor"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "range" },
              { type: "OPERATOR",                   value: "=" },
              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "startIndex" },
              { type: "CLOSED_RANGE",               value: "..." },
              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "startIndex" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "advancedBy"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "NUMBER",                     value: "6" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "IDENTIFIER",                 value: "greeting" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "removeRange"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "IDENTIFIER",                 value: "range" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "EOF"},
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

          // AST Explorer input:

        xit('should handle the has prefix and has suffix string methods', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "famousAuthor" },
              { type: "OPERATOR",                   value: "=" },
              { type: "STRING",                     value: "F. Scott Fitzgerald" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "NATIVE_METHOD",              value: "print"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "IDENTIFIER",                 value: "famousAuthor" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "hasPrefix"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "STRING",                     value: "F. Scott" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "famousDriver" },
              { type: "OPERATOR",                   value: "=" },
              { type: "STRING",                     value: "Dale Earnhardt, Jr." },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "NATIVE_METHOD",              value: "print"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "IDENTIFIER",                 value: "famousDriver" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "hasSuffix"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "STRING",                     value: "Jr." },
              { type: "INVOCATION_END",             value: ")" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "EOF"},
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

        });

        describe('Collection Properties and Methods', function () {

          // AST Explorer input:

        xit('should handle the array append method', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "arr" },
              { type: "OPERATOR",                   value: "=" },
              { type: "ARRAY_START",                value: "[" },
              { type: "NUMBER",                     value: "1" },
              { type: "PUNCTUATION",                value: "," },
              { type: "NUMBER",                     value: "2" },
              { type: "ARRAY_END",                  value: "]" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "IDENTIFIER",                 value: "arr" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "NATIVE_METHOD",              value: "append"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "NUMBER",                     value: "3" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "EOF"},
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

          // AST Explorer input:

        xit('should handle the array count property', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "arr" },
              { type: "OPERATOR",                   value: "=" },
              { type: "ARRAY_START",                value: "[" },
              { type: "NUMBER",                     value: "1" },
              { type: "PUNCTUATION",                value: "," },
              { type: "NUMBER",                     value: "2" },
              { type: "ARRAY_END",                  value: "]" },
              { type: "TERMINATOR",                 value: "\\n"},

              { type: "IDENTIFIER",                 value: "arr" },
              { type: "DOT_SYNTAX",                 value: "." },
              { type: "TYPE_PROPERTY",              value: "count"},
              { type: "TERMINATOR",                 value: "EOF"},
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

          // AST Explorer input:

        xit('should handle array initialization with a default value', function () {
            input = [
              { type: "DECLARATION_KEYWORD",        value: "var" },
              { type: "IDENTIFIER",                 value: "arrOfThreeZeros" },
              { type: "OPERATOR",                   value: "=" },
              { type: "ARRAY_START",                value: "["},
              { type: "TYPE_NUMBER",                value: "Int"},
              { type: "ARRAY_END",                  value: "]"},
              { type: "INVOCATION_START",           value: "(" },
              { type: "TYPE_PROPERTY",              value: "count"},
              { type: "PUNCTUATION",                value: ":" },
              { type: "NUMBER",                     value: "3" },
              { type: "PUNCTUATION",                value: "," },
              { type: "METHOD_ARGUMENT_NAME",       value: "repeatedValue"},
              { type: "PUNCTUATION",                value: ":" },
              { type: "NUMBER",                     value: "0" },
              { type: "INVOCATION_END",             value: ")" },
              { type: "TERMINATOR",                 value: "EOF"},
            ];
            output = "FILL_ME_IN";
          expect(R.equals(parser(input), output)).to.equal(true);
          });

        });

      });

    });
});
