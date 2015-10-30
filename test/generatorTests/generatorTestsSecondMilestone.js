var expect = require('chai').expect;
var escodegen = require('escodegen');
var generator = escodegen.generate;

var removeIndentation = function(str) {
  return str.replace(/\n\s*/gm, "\n").replace(/\s*/, "");
};

describe('Generator: Second Milestone', function() {

  xdescribe('If statements', function() {

    // Swift input: 'var a = 5; if (true) {--a};'
    xit('should handle single-line if statements', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "a"
                },
                "init": {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "Literal",
              "value": true,
              "raw": "true"
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "prefix": true
                  }
                }
              ]
            },
            "alternate": null
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
      output = `var a = 5;
                if (true) {
                  --a;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var b = 6; if (5 <= 6) {b++};'
    xit('should handle single-line if statements with multi-character logical operators', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "b"
                },
                "init": {
                  "type": "Literal",
                  "value": 6,
                  "raw": "6"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": "<=",
              "left": {
                "type": "Literal",
                "value": 5,
                "raw": "5"
              },
              "right": {
                "type": "Literal",
                "value": 6,
                "raw": "6"
              }
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                      "type": "Identifier",
                      "name": "b"
                    },
                    "prefix": false
                  }
                }
              ]
            },
            "alternate": null
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
      output = `var b = 6;
                if (5 <= 6) {
                  b++;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var c = 1; if (c == 1) {c *= 5};'
    xit('should handle single-line if statements with multi-character logical operators and multi-character mathematical operators', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "c"
                },
                "init": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": "==",
              "left": {
                "type": "Identifier",
                "name": "c"
              },
              "right": {
                "type": "Literal",
                "value": 1,
                "raw": "1"
              }
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "*=",
                    "left": {
                      "type": "Identifier",
                      "name": "c"
                    },
                    "right": {
                      "type": "Literal",
                      "value": 5,
                      "raw": "5"
                    }
                  }
                }
              ]
            },
            "alternate": null
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
      output = `var c = 1;
                if (c == 1) {
                  c *= 5;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var d = 1; if d != 2 {d++};'
    // AST Explorer input: 'var d = 1; if (d != 2) {d++};'
    xit('should handle single-line if statements without a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "d"
                },
                "init": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": "!=",
              "left": {
                "type": "Identifier",
                "name": "d"
              },
              "right": {
                "type": "Literal",
                "value": 2,
                "raw": "2"
              }
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                      "type": "Identifier",
                      "name": "d"
                    },
                    "prefix": false
                  }
                }
              ]
            },
            "alternate": null
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
      output = `var d = 1;
                if (d != 2) {
                  d++;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var e = 1; if (e + 1) == 2 {e = 5};'
    // AST Explorer input: 'var e = 1; if ((e + 1) == 2) {e = 5};'
    xit('should handle complex conditionals without an outer parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "e"
                },
                "init": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": "==",
              "left": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                  "type": "Identifier",
                  "name": "e"
                },
                "right": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                }
              },
              "right": {
                "type": "Literal",
                "value": 2,
                "raw": "2"
              }
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "e"
                    },
                    "right": {
                      "type": "Literal",
                      "value": 5,
                      "raw": "5"
                    }
                  }
                }
              ]
            },
            "alternate": null
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
      output = `var e = 1;
                if (e + 1 == 2) {
                  e = 5;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var f = true; if !f {f = true} else {f = false};'
    // AST Explorer input: 'var f = true; if (!f) {f = true} else {f = false};'
    xit('should handle single line if/else statements', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "f"
                },
                "init": {
                  "type": "Literal",
                  "value": true,
                  "raw": "true"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "UnaryExpression",
              "operator": "!",
              "argument": {
                "type": "Identifier",
                "name": "f"
              },
              "prefix": true
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "f"
                    },
                    "right": {
                      "type": "Literal",
                      "value": true,
                      "raw": "true"
                    }
                  }
                }
              ]
            },
            "alternate": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "f"
                    },
                    "right": {
                      "type": "Literal",
                      "value": false,
                      "raw": "false"
                    }
                  }
                }
              ]
            }
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
      output = `var f = true;
                if (!f) {
                  f = true;
                } else {
                  f = false;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var a = 1; if (1 > 2) {++a} else if (1 < 2) {--a} else {a = 42}'
    it('should handle single-line if/else-if/else statements with parentheticals', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "a"
                },
                "init": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": ">",
              "left": {
                "type": "Literal",
                "value": 1,
                "raw": "1"
              },
              "right": {
                "type": "Literal",
                "value": 2,
                "raw": "2"
              }
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "prefix": true
                  }
                }
              ]
            },
            "alternate": {
              "type": "IfStatement",
              "test": {
                "type": "BinaryExpression",
                "operator": "<",
                "left": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                },
                "right": {
                  "type": "Literal",
                  "value": 2,
                  "raw": "2"
                }
              },
              "consequent": {
                "type": "BlockStatement",
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "UpdateExpression",
                      "operator": "--",
                      "argument": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "prefix": true
                    }
                  }
                ]
              },
              "alternate": {
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
                        "type": "Literal",
                        "value": 42,
                        "raw": "42"
                      }
                    }
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var a = 1;
                if (1 > 2) {
                  ++a;
                } else if (1 < 2) {
                  --a;
                } else {
                  a = 42;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var a = 1; if 1 > 2 {++a} else if 1 < 2 {--a} else {a = 42}'
    // AST Explorer input: 'var a = 1; if (1 > 2) {++a} else if (1 < 2) {--a} else {a = 42}'
    it('should handle single-line if/else-if/else statements with parentheticals', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "a"
                },
                "init": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": ">",
              "left": {
                "type": "Literal",
                "value": 1,
                "raw": "1"
              },
              "right": {
                "type": "Literal",
                "value": 2,
                "raw": "2"
              }
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "prefix": true
                  }
                }
              ]
            },
            "alternate": {
              "type": "IfStatement",
              "test": {
                "type": "BinaryExpression",
                "operator": "<",
                "left": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                },
                "right": {
                  "type": "Literal",
                  "value": 2,
                  "raw": "2"
                }
              },
              "consequent": {
                "type": "BlockStatement",
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "UpdateExpression",
                      "operator": "--",
                      "argument": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "prefix": true
                    }
                  }
                ]
              },
              "alternate": {
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
                        "type": "Literal",
                        "value": 42,
                        "raw": "42"
                      }
                    }
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var a = 1;
                if (1 > 2) {
                  ++a;
                } else if (1 < 2) {
                  --a;
                } else {
                  a = 42;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });

  describe('While/Repeat-While loops', function() {

    // Swift input: 'var i = 10; while (i >= 0) {i--}'
    it('should handle single-line while loops with a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "i"
                },
                "init": {
                  "type": "Literal",
                  "value": 10,
                  "raw": "10"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "WhileStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": ">=",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 0,
                "raw": "0"
              }
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "prefix": false
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var i = 10;
                while (i >= 0) {
                  i--;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var i = 10; while i >= 0 {i--}'
    // AST Explorer input: 'var i = 10; while (i >= 0) {i--}'
    it('should handle single-line while loops without a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "i"
                },
                "init": {
                  "type": "Literal",
                  "value": 10,
                  "raw": "10"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "WhileStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": ">=",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 0,
                "raw": "0"
              }
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "prefix": false
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var i = 10;
                while (i >= 0) {
                  i--;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var i = 10; repeat {i--} while (i >= 0)'
    // AST Explorer input: 'var i = 10; do {i--} while (i >= 0)'
    it('should handle single-line repeat-while loops with a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "i"
                },
                "init": {
                  "type": "Literal",
                  "value": 10,
                  "raw": "10"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "DoWhileStatement",
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "prefix": false
                  }
                }
              ]
            },
            "test": {
              "type": "BinaryExpression",
              "operator": ">=",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 0,
                "raw": "0"
              }
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var i = 10;
                do {
                  i--;
                } while (i >= 0);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var i = 10; repeat {i--} while i >= 0'
    // AST Explorer input: 'var i = 10; do {i--} while (i >= 0)'
    it('should handle single-line repeat-while loops without a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "i"
                },
                "init": {
                  "type": "Literal",
                  "value": 10,
                  "raw": "10"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "DoWhileStatement",
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "prefix": false
                  }
                }
              ]
            },
            "test": {
              "type": "BinaryExpression",
              "operator": ">=",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 0,
                "raw": "0"
              }
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var i = 10;
                do {
                  i--;
                } while (i >= 0);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });

  describe('For loops', function() {

    // Swift input: 'var a = 0; for (var i = 10; i > 0; i--) {a++};'
    xit('should handle single-line for loops with a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "a"
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
            "type": "ForStatement",
            "init": {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "i"
                  },
                  "init": {
                    "type": "Literal",
                    "value": 10,
                    "raw": "10"
                  }
                }
              ],
              "kind": "var"
            },
            "test": {
              "type": "BinaryExpression",
              "operator": ">",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 0,
                "raw": "0"
              }
            },
            "update": {
              "type": "UpdateExpression",
              "operator": "--",
              "argument": {
                "type": "Identifier",
                "name": "i"
              },
              "prefix": false
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "prefix": false
                  }
                }
              ]
            }
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
      output = `var a = 0;
                for (var i = 10; i > 0; i--) {
                  a++;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var b = 0; for var j = 0; j < 10; j++ {b++};'
    // AST Explorer input: 'var b = 0; for (var j = 0; j < 10; j++) {b++};'
    xit('should handle single-line for loops without a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "b"
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
            "type": "ForStatement",
            "init": {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "j"
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
            "test": {
              "type": "BinaryExpression",
              "operator": "<",
              "left": {
                "type": "Identifier",
                "name": "j"
              },
              "right": {
                "type": "Literal",
                "value": 10,
                "raw": "10"
              }
            },
            "update": {
              "type": "UpdateExpression",
              "operator": "++",
              "argument": {
                "type": "Identifier",
                "name": "j"
              },
              "prefix": false
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                      "type": "Identifier",
                      "name": "b"
                    },
                    "prefix": false
                  }
                }
              ]
            }
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
      output = `var b = 0;
                for (var j = 0; j < 10; j++) {
                  b++;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });


    // Swift input: 'var c = 0; var numbers = [1,2,3,4,5]; for (var n) in numbers {c += n};'
    // AST Explorer input: 'var c = 0; var numbers = [1,2,3,4,5]; for (var n in numbers) {c += n};'
    xit('should handle simple, single-line for-in loops with a parenthetical and the item declared as a variable', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "c"
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
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "numbers"
                },
                "init": {
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
                    "name": "n"
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
                      "name": "c"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "n"
                    }
                  }
                }
              ]
            },
            "each": false
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
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
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // Swift input: 'var c = 0; var numbers = [1,2,3,4,5]; for n in numbers {c += n};'
    // AST Explorer input: 'var c = 0; var numbers = [1,2,3,4,5]; for (var n in numbers) {c += n};'
    xit('should handle simple, single-line for-in loops without a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "c"
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
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "numbers"
                },
                "init": {
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
                    "name": "n"
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
                      "name": "c"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "n"
                    }
                  }
                }
              ]
            },
            "each": false
          },
          {
            "type": "EmptyStatement"
          }
        ],
        "sourceType": "module"
      };
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
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Multi-line statements', function() {

    // input = String.raw`var b = true;
    //          var c = 0;`;
    it('should handle simple multi-line variable assignment', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "b"
                },
                "init": {
                  "type": "Literal",
                  "value": true,
                  "raw": "true"
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
                  "name": "c"
                },
                "init": {
                  "type": "Literal",
                  "value": 0,
                  "raw": "0"
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      output = `var b = true;
                var c = 0;`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`var e = ["Eggs", "Milk", "Bacon"]
    //          var f = ["one": 1, "two": 2, "three": 3]
    //          let g = [1 : "one",2   :"two", 3: "three"]`;
    it('should handle complex multi-line variable assignment without semi-colons', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "e"
                },
                "init": {
                  "type": "ArrayExpression",
                  "elements": [
                    {
                      "type": "Literal",
                      "value": "Eggs",
                      "raw": "\"Eggs\""
                    },
                    {
                      "type": "Literal",
                      "value": "Milk",
                      "raw": "\"Milk\""
                    },
                    {
                      "type": "Literal",
                      "value": "Bacon",
                      "raw": "\"Bacon\""
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
                  "name": "f"
                },
                "init": {
                  "type": "ObjectExpression",
                  "properties": [
                    {
                      "type": "Property",
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "value": "one",
                        "raw": "\"one\""
                      },
                      "value": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "value": "two",
                        "raw": "\"two\""
                      },
                      "value": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "value": "three",
                        "raw": "\"three\""
                      },
                      "value": {
                        "type": "Literal",
                        "value": 3,
                        "raw": "3"
                      },
                      "kind": "init"
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
                  "name": "g"
                },
                "init": {
                  "type": "ObjectExpression",
                  "properties": [
                    {
                      "type": "Property",
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                      },
                      "value": {
                        "type": "Literal",
                        "value": "one",
                        "raw": "\"one\""
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                      },
                      "value": {
                        "type": "Literal",
                        "value": "two",
                        "raw": "\"two\""
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "value": 3,
                        "raw": "3"
                      },
                      "value": {
                        "type": "Literal",
                        "value": "three",
                        "raw": "\"three\""
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
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
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    })

    // input = String.raw`var name: String = "Joe"
    //         let num: Int = 5;
    //         let anotherNum: UInt16 = 6
    //         var yetAnotherNum: Float = 4.2;
    //         let truth: Bool = false
    //         `;
    it('should handle simple multi-line variable assignment with type annotations', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "name"
                },
                "init": {
                  "type": "Literal",
                  "value": "Joe",
                  "raw": "\"Joe\""
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
                  "name": "num"
                },
                "init": {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
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
                  "name": "anotherNum"
                },
                "init": {
                  "type": "Literal",
                  "value": 6,
                  "raw": "6"
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
                  "name": "yetAnotherNum"
                },
                "init": {
                  "type": "Literal",
                  "value": 4.2,
                  "raw": "4.2"
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
                  "name": "truth"
                },
                "init": {
                  "type": "Literal",
                  "value": false,
                  "raw": "false"
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      output = `var name = 'Joe';
                var num = 5;
                var anotherNum = 6;
                var yetAnotherNum = 4.2;
                var truth = false;`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`// function body goes here
    // // firstParameterName and secondParameterName refer to
    // // the argument values for the first and second parameters
    // `;
    xit('should handle successive single-line comments', function() {
      input = {
        "type": "Program",
        "body": [],
        "sourceType": "module"
      };
      output = ``;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`/*
    // Comment 1
    // Comment 2
    // */
    // `;
    xit('should handle multi-line comments', function() {
      input = {
        "type": "Program",
        "body": [],
        "sourceType": "module"
      };
      output = ``;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Multi-line if statements', function() {

    // input = String.raw`var a = false
    //         var b = 0;
    //         if (a) {
    //           b++;
    //         }`;
    it('should handle simple multi-line if statements', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "a"
                },
                "init": {
                  "type": "Literal",
                  "value": false,
                  "raw": "false"
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
                  "name": "b"
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
            "type": "IfStatement",
            "test": {
              "type": "Identifier",
              "name": "a"
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                      "type": "Identifier",
                      "name": "b"
                    },
                    "prefix": false
                  }
                }
              ]
            },
            "alternate": null
          }
        ],
        "sourceType": "module"
      };
      output = `var a = false;
                var b = 0;
                if (a) {
                  b++;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`var diceRoll = 6;
    //         if ++diceRoll == 7 {
    //           diceRoll = 1
    //         }`;
    it('should handle simple multi-line if statements with complex conditions', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "diceRoll"
                },
                "init": {
                  "type": "Literal",
                  "value": 6,
                  "raw": "6"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": "==",//TODO Type coersion -- Should we always convert swift(==) to js(===)
              "left": {
                "type": "UpdateExpression",
                "operator": "++",
                "argument": {
                  "type": "Identifier",
                  "name": "diceRoll"
                },
                "prefix": true
              },
              "right": {
                "type": "Literal",
                "value": 7,
                "raw": "7"
              }
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                      "type": "Identifier",
                      "name": "diceRoll"
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
            "alternate": null
          }
        ],
        "sourceType": "module"
      };
      output = `var diceRoll = 6;
                if (++diceRoll == 7) {
                  diceRoll = 1;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`var x = true
    //         var y = false;
    //         var a = ""
    //         var z;
    //         if (x) {
    //           if y {
    //             z = true;
    //           } else if (true) {
    //               a = "<3 JS";
    //           } else {
    //               a = "never get here";
    //           }
    //         } else {
    //           a = "x is false";
    //         }`;
    it('should handle simple multi-line nested if statements', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "x"
                },
                "init": {
                  "type": "Literal",
                  "value": true,
                  "raw": "true"
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
                  "name": "y"
                },
                "init": {
                  "type": "Literal",
                  "value": false,
                  "raw": "false"
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
                  "name": "a"
                },
                "init": {
                  "type": "Literal",
                  "value": "",
                  "raw": "\"\""
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
                  "name": "z"
                },
                "init": null
              }
            ],
            "kind": "var"
          },
          {
            "type": "IfStatement",
            "test": {
              "type": "Identifier",
              "name": "x"
            },
            "consequent": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "IfStatement",
                  "test": {
                    "type": "Identifier",
                    "name": "y"
                  },
                  "consequent": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "expression": {
                          "type": "AssignmentExpression",
                          "operator": "=",
                          "left": {
                            "type": "Identifier",
                            "name": "z"
                          },
                          "right": {
                            "type": "Literal",
                            "value": true,
                            "raw": "true"
                          }
                        }
                      }
                    ]
                  },
                  "alternate": {
                    "type": "IfStatement",
                    "test": {
                      "type": "Literal",
                      "value": true,
                      "raw": "true"
                    },
                    "consequent": {
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
                              "type": "Literal",
                              "value": "<3 JS",
                              "raw": "\"<3 JS\""
                            }
                          }
                        }
                      ]
                    },
                    "alternate": {
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
                              "type": "Literal",
                              "value": "never get here",
                              "raw": "\"never get here\""
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
            "alternate": {
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
                      "type": "Literal",
                      "value": "x is false",
                      "raw": "\"x is false\""
                    }
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
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
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Multi-line for loops', function() {

    // input = String.raw`var b = 0;
    //         for var i = 0; i < 10; i++ {
    //           b++
    //         }`;
    it('should handle simple multi-line for loops', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "b"
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
            "type": "ForStatement",
            "init": {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "i"
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
            "test": {
              "type": "BinaryExpression",
              "operator": "<",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 10,
                "raw": "10"
              }
            },
            "update": {
              "type": "UpdateExpression",
              "operator": "++",
              "argument": {
                "type": "Identifier",
                "name": "i"
              },
              "prefix": false
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                      "type": "Identifier",
                      "name": "b"
                    },
                    "prefix": false
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var b = 0;
                for (var i = 0; i < 10; i++) {
                  b++;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`var arrays = [[1,2,3], [4,5,6], [7,8,9]]
    //          var total = 0
    //          for (var i = 0; i < 3; i++) {
    //            for var j = 0; j < 3; j++ {
    //              total += arrays[i][j]
    //            }
    //          }`;
    it('should handle multi-line nested for loops', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "arrays"
                },
                "init": {
                  "type": "ArrayExpression",
                  "elements": [
                    {
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
                        }
                      ]
                    },
                    {
                      "type": "ArrayExpression",
                      "elements": [
                        {
                          "type": "Literal",
                          "value": 4,
                          "raw": "4"
                        },
                        {
                          "type": "Literal",
                          "value": 5,
                          "raw": "5"
                        },
                        {
                          "type": "Literal",
                          "value": 6,
                          "raw": "6"
                        }
                      ]
                    },
                    {
                      "type": "ArrayExpression",
                      "elements": [
                        {
                          "type": "Literal",
                          "value": 7,
                          "raw": "7"
                        },
                        {
                          "type": "Literal",
                          "value": 8,
                          "raw": "8"
                        },
                        {
                          "type": "Literal",
                          "value": 9,
                          "raw": "9"
                        }
                      ]
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
                  "name": "total"
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
            "type": "ForStatement",
            "init": {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "i"
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
            "test": {
              "type": "BinaryExpression",
              "operator": "<",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 3,
                "raw": "3"
              }
            },
            "update": {
              "type": "UpdateExpression",
              "operator": "++",
              "argument": {
                "type": "Identifier",
                "name": "i"
              },
              "prefix": false
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ForStatement",
                  "init": {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "j"
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
                  "test": {
                    "type": "BinaryExpression",
                    "operator": "<",
                    "left": {
                      "type": "Identifier",
                      "name": "j"
                    },
                    "right": {
                      "type": "Literal",
                      "value": 3,
                      "raw": "3"
                    }
                  },
                  "update": {
                    "type": "UpdateExpression",
                    "operator": "++",
                    "argument": {
                      "type": "Identifier",
                      "name": "j"
                    },
                    "prefix": false
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
                            "name": "total"
                          },
                          "right": {
                            "type": "MemberExpression",
                            "computed": true,
                            "object": {
                              "type": "MemberExpression",
                              "computed": true,
                              "object": {
                                "type": "Identifier",
                                "name": "arrays"
                              },
                              "property": {
                                "type": "Identifier",
                                "name": "i"
                              }
                            },
                            "property": {
                              "type": "Identifier",
                              "name": "j"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
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
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Multi-line for-in loops', function() {

    // input = String.raw`var c = 0
    //          var numbers = [1,2,3,4,5]
    //          for n in numbers {
    //            c += n
    //          }`;
    it('should handle simple multi-line for-in loops', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "c"
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
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "numbers"
                },
                "init": {
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
                    "name": "n"
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
                      "name": "c"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "n"
                    }
                  }
                }
              ]
            },
            "each": false
          }
        ],
        "sourceType": "module"
      };
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
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`var sum = 0
    //               for i in 0..<5 {
    //                   sum += i
    //               }`;
    xit('handle for-in loops that iterate over a range', function () {
      input = "FILL_ME_IN";
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`let interestingNumbers = [
    //                   "Prime": [2, 3, 5, 7, 11, 13],
    //                   "Fibonacci": [1, 1, 2, 3, 5, 8],
    //                   "Square": [1, 4, 9, 16, 25],
    //               ]
    //               var largest = 0
    //               for (kind, numbers) in interestingNumbers {
    //                   for number in numbers {
    //                       if number > largest {
    //                           largest = number
    //                       }
    //                   }
    //               }`;
    xit('should handle for-in loops that iterate over items in a dictionary', function () {
      input = "FILL_ME_IN";
      expect(R.equals(parser(input), output)).to.equal(true);
    });
  });

  describe('Multi-Line While/Repeat-While loops', function() {

    // input = String.raw`var i = 10;
    //         while i >= 0 {
    //           i--
    //         }`
    it('should handle multi-line while loops without a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "i"
                },
                "init": {
                  "type": "Literal",
                  "value": 10,
                  "raw": "10"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "WhileStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": ">=",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 0,
                "raw": "0"
              }
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "prefix": false
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var i = 10;
                while (i >= 0) {
                  i--;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`var i = 10;
    //         while (i >= 0) {
    //           i--
    //         }`;
    it('should handle multi-line while loops with a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "i"
                },
                "init": {
                  "type": "Literal",
                  "value": 10,
                  "raw": "10"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "WhileStatement",
            "test": {
              "type": "BinaryExpression",
              "operator": ">=",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 0,
                "raw": "0"
              }
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "prefix": false
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var i = 10;
                while (i >= 0) {
                  i--;
                }`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`var i = 10;
    //          repeat {
    //            i--
    //          } while (i > 0);`;
    it('should handle multi-line repeat-while loops with a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "i"
                },
                "init": {
                  "type": "Literal",
                  "value": 10,
                  "raw": "10"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "DoWhileStatement",
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "prefix": false
                  }
                }
              ]
            },
            "test": {
              "type": "BinaryExpression",
              "operator": ">",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 0,
                "raw": "0"
              }
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var i = 10;
                do {
                  i--;
                } while (i > 0);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`var i = 10
    //          repeat {
    //            i--
    //          } while i > 0`;
    it('should handle multi-line repeat-while loops without a parenthetical', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "i"
                },
                "init": {
                  "type": "Literal",
                  "value": 10,
                  "raw": "10"
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "DoWhileStatement",
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                      "type": "Identifier",
                      "name": "i"
                    },
                    "prefix": false
                  }
                }
              ]
            },
            "test": {
              "type": "BinaryExpression",
              "operator": ">",
              "left": {
                "type": "Identifier",
                "name": "i"
              },
              "right": {
                "type": "Literal",
                "value": 0,
                "raw": "0"
              }
            }
          }
        ],
        "sourceType": "module"
      };
      output = `var i = 10;
                do {
                  i--;
                } while (i > 0);`;
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });

  xdescribe('Switch Statements', function() {

    // input = String.raw`var x = 2
    //         var y = "";
    //         switch x {
    //           case 1,2,3:
    //             y += "positive";
    //           case -1,-2,-3:
    //             y += "negative";
    //           case 0:
    //             y += "zero";
    //           default:
    //             y += "dunno";
    //         }`;
    xit('should handle multi-line switch statements', function() {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "x"
                },
                "init": {
                  "type": "Literal",
                  "value": 2,
                  "raw": "2"
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
                  "name": "y"
                },
                "init": {
                  "type": "Literal",
                  "value": "",
                  "raw": "\"\""
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "SwitchStatement",
            "discriminant": {
              "type": "Identifier",
              "name": "x"
            },
            "cases": [
              {
                "type": "SwitchCase",
                "test": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1"
                },
                "consequent": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "+=",
                      "left": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "right": {
                        "type": "Literal",
                        "value": "positive",
                        "raw": "\"positive\""
                      }
                    }
                  },
                  {
                    "type": "BreakStatement",
                    "label": null
                  }
                ]
              },
              {
                "type": "SwitchCase",
                "test": {
                  "type": "Literal",
                  "value": 2,
                  "raw": "2"
                },
                "consequent": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "+=",
                      "left": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "right": {
                        "type": "Literal",
                        "value": "positive",
                        "raw": "\"positive\""
                      }
                    }
                  },
                  {
                    "type": "BreakStatement",
                    "label": null
                  }
                ]
              },
              {
                "type": "SwitchCase",
                "test": {
                  "type": "Literal",
                  "value": 3,
                  "raw": "3"
                },
                "consequent": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "+=",
                      "left": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "right": {
                        "type": "Literal",
                        "value": "positive",
                        "raw": "\"positive\""
                      }
                    }
                  },
                  {
                    "type": "BreakStatement",
                    "label": null
                  }
                ]
              },
              {
                "type": "SwitchCase",
                "test": {
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  },
                  "prefix": true
                },
                "consequent": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "+=",
                      "left": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "right": {
                        "type": "Literal",
                        "value": "negative",
                        "raw": "\"negative\""
                      }
                    }
                  },
                  {
                    "type": "BreakStatement",
                    "label": null
                  }
                ]
              },
              {
                "type": "SwitchCase",
                "test": {
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Literal",
                    "value": 2,
                    "raw": "2"
                  },
                  "prefix": true
                },
                "consequent": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "+=",
                      "left": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "right": {
                        "type": "Literal",
                        "value": "negative",
                        "raw": "\"negative\""
                      }
                    }
                  },
                  {
                    "type": "BreakStatement",
                    "label": null
                  }
                ]
              },
              {
                "type": "SwitchCase",
                "test": {
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Literal",
                    "value": 3,
                    "raw": "3"
                  },
                  "prefix": true
                },
                "consequent": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "+=",
                      "left": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "right": {
                        "type": "Literal",
                        "value": "negative",
                        "raw": "\"negative\""
                      }
                    }
                  },
                  {
                    "type": "BreakStatement",
                    "label": null
                  }
                ]
              },
              {
                "type": "SwitchCase",
                "test": {
                  "type": "Literal",
                  "value": 0,
                  "raw": "0"
                },
                "consequent": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "+=",
                      "left": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "right": {
                        "type": "Literal",
                        "value": "zero",
                        "raw": "\"zero\""
                      }
                    }
                  },
                  {
                    "type": "BreakStatement",
                    "label": null
                  }
                ]
              },
              {
                "type": "SwitchCase",
                "test": null,
                "consequent": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "+=",
                      "left": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "right": {
                        "type": "Literal",
                        "value": "dunno",
                        "raw": "\"dunno\""
                      }
                    }
                  }
                ]
              }
            ]
          }
        ],
        "sourceType": "module"
      };
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
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });

  describe('Complex Control Flow', function () {

    // input = String.raw`var gameInProgress = false;
    //               var score = 0;
    //               var typeOfScore = "";
    //               var PAT = "";
    //               while gameInProgress {
    //                   if typeOfScore != "" {
    //                       if typeOfScore == "TD" {
    //                           score += 6
    //                       } else if typeOfScore == "PAT" {
    //                           if PAT == "TD" {
    //                               score += 2
    //                           } else {
    //                               score += 1
    //                           }
    //                       } else if typeOfScore == "FG" {
    //                           score += 3
    //                       } else {
    //                           score += 2
    //                       }
    //                       typeOfScore = ""
    //                   }
    //               }
    //               `;
    it('should handle nested if-else statements within a loop', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "gameInProgress"
                },
                "init": {
                  "type": "Literal",
                  "value": false,
                  "raw": "false"
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
                  "name": "score"
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
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "typeOfScore"
                },
                "init": {
                  "type": "Literal",
                  "value": "",
                  "raw": "\"\""
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
                  "name": "PAT"
                },
                "init": {
                  "type": "Literal",
                  "value": "",
                  "raw": "\"\""
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "WhileStatement",
            "test": {
              "type": "Identifier",
              "name": "gameInProgress"
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "IfStatement",
                  "test": {
                    "type": "BinaryExpression",
                    "operator": "!=",
                    "left": {
                      "type": "Identifier",
                      "name": "typeOfScore"
                    },
                    "right": {
                      "type": "Literal",
                      "value": "",
                      "raw": "\"\""
                    }
                  },
                  "consequent": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "IfStatement",
                        "test": {
                          "type": "BinaryExpression",
                          "operator": "==",
                          "left": {
                            "type": "Identifier",
                            "name": "typeOfScore"
                          },
                          "right": {
                            "type": "Literal",
                            "value": "TD",
                            "raw": "\"TD\""
                          }
                        },
                        "consequent": {
                          "type": "BlockStatement",
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "expression": {
                                "type": "AssignmentExpression",
                                "operator": "+=",
                                "left": {
                                  "type": "Identifier",
                                  "name": "score"
                                },
                                "right": {
                                  "type": "Literal",
                                  "value": 6,
                                  "raw": "6"
                                }
                              }
                            }
                          ]
                        },
                        "alternate": {
                          "type": "IfStatement",
                          "test": {
                            "type": "BinaryExpression",
                            "operator": "==",
                            "left": {
                              "type": "Identifier",
                              "name": "typeOfScore"
                            },
                            "right": {
                              "type": "Literal",
                              "value": "PAT",
                              "raw": "\"PAT\""
                            }
                          },
                          "consequent": {
                            "type": "BlockStatement",
                            "body": [
                              {
                                "type": "IfStatement",
                                "test": {
                                  "type": "BinaryExpression",
                                  "operator": "==",
                                  "left": {
                                    "type": "Identifier",
                                    "name": "PAT"
                                  },
                                  "right": {
                                    "type": "Literal",
                                    "value": "TD",
                                    "raw": "\"TD\""
                                  }
                                },
                                "consequent": {
                                  "type": "BlockStatement",
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "+=",
                                        "left": {
                                          "type": "Identifier",
                                          "name": "score"
                                        },
                                        "right": {
                                          "type": "Literal",
                                          "value": 2,
                                          "raw": "2"
                                        }
                                      }
                                    }
                                  ]
                                },
                                "alternate": {
                                  "type": "BlockStatement",
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "+=",
                                        "left": {
                                          "type": "Identifier",
                                          "name": "score"
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
                            ]
                          },
                          "alternate": {
                            "type": "IfStatement",
                            "test": {
                              "type": "BinaryExpression",
                              "operator": "==",
                              "left": {
                                "type": "Identifier",
                                "name": "typeOfScore"
                              },
                              "right": {
                                "type": "Literal",
                                "value": "FG",
                                "raw": "\"FG\""
                              }
                            },
                            "consequent": {
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "+=",
                                    "left": {
                                      "type": "Identifier",
                                      "name": "score"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "value": 3,
                                      "raw": "3"
                                    }
                                  }
                                }
                              ]
                            },
                            "alternate": {
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "+=",
                                    "left": {
                                      "type": "Identifier",
                                      "name": "score"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "value": 2,
                                      "raw": "2"
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      },
                      {
                        "type": "ExpressionStatement",
                        "expression": {
                          "type": "AssignmentExpression",
                          "operator": "=",
                          "left": {
                            "type": "Identifier",
                            "name": "typeOfScore"
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
                  "alternate": null
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
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
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });

    // input = String.raw`
    //
    //
    //
    //             var gameInProgress = false;
    //             var score = 0
    //             var typeOfScore = "";
    //                                      var PAT = "";
    //             while gameInProgress {
    //                 if               (typeOfScore != "")
    //                 {
    //                 if typeOfScore == "TD" {
    //                         score += 6
    //                     } else if typeOfScore == "PAT" {
    //                         if PAT == "TD" {
    //
    //                             score += 2;
    //                         } else {
    //                             score += 1;
    //
    //
    //                                                                }
    //                     } else if (typeOfScore == "FG") {
    //                         score += 3
    //                     }
    //
    //                 else {
    //
    //                         score += 2
    //             }
    //                     typeOfScore = ""
    //                 }
    //              }
    //             `;
    // AST Explorer input:
    //
    //
    //
    //
    // var gameInProgress = false;
    // var score = 0
    // var typeOfScore = "";
    //                          var PAT = "";
    // while (gameInProgress) {
    //     if               (typeOfScore != "")
    //     {
    //     if (typeOfScore == "TD") {
    //             score += 6
    //         } else if (typeOfScore == "PAT") {
    //             if (PAT == "TD") {

    //                 score += 2;
    //             } else {
    //                 score += 1;


    //                                                    }
    //         } else if (typeOfScore == "FG") {
    //             score += 3
    //         }

    //     else {

    //             score += 2
    // }
    //         typeOfScore = ""
    //     }
    //  }
    xit('should handle complex control flow with erratic spacing and inconsistent use of semicolons and parenthesis', function () {
      input = {
        "type": "Program",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "gameInProgress"
                },
                "init": {
                  "type": "Literal",
                  "value": false,
                  "raw": "false"
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
                  "name": "score"
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
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "typeOfScore"
                },
                "init": {
                  "type": "Literal",
                  "value": "",
                  "raw": "\"\""
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
                  "name": "PAT"
                },
                "init": {
                  "type": "Literal",
                  "value": "",
                  "raw": "\"\""
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "WhileStatement",
            "test": {
              "type": "Identifier",
              "name": "gameInProgress"
            },
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "IfStatement",
                  "test": {
                    "type": "BinaryExpression",
                    "operator": "!=",
                    "left": {
                      "type": "Identifier",
                      "name": "typeOfScore"
                    },
                    "right": {
                      "type": "Literal",
                      "value": "",
                      "raw": "\"\""
                    }
                  },
                  "consequent": {
                    "type": "BlockStatement",
                    "body": [
                      {
                        "type": "IfStatement",
                        "test": {
                          "type": "BinaryExpression",
                          "operator": "==",
                          "left": {
                            "type": "Identifier",
                            "name": "typeOfScore"
                          },
                          "right": {
                            "type": "Literal",
                            "value": "TD",
                            "raw": "\"TD\""
                          }
                        },
                        "consequent": {
                          "type": "BlockStatement",
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "expression": {
                                "type": "AssignmentExpression",
                                "operator": "+=",
                                "left": {
                                  "type": "Identifier",
                                  "name": "score"
                                },
                                "right": {
                                  "type": "Literal",
                                  "value": 6,
                                  "raw": "6"
                                }
                              }
                            }
                          ]
                        },
                        "alternate": {
                          "type": "IfStatement",
                          "test": {
                            "type": "BinaryExpression",
                            "operator": "==",
                            "left": {
                              "type": "Identifier",
                              "name": "typeOfScore"
                            },
                            "right": {
                              "type": "Literal",
                              "value": "PAT",
                              "raw": "\"PAT\""
                            }
                          },
                          "consequent": {
                            "type": "BlockStatement",
                            "body": [
                              {
                                "type": "IfStatement",
                                "test": {
                                  "type": "BinaryExpression",
                                  "operator": "==",
                                  "left": {
                                    "type": "Identifier",
                                    "name": "PAT"
                                  },
                                  "right": {
                                    "type": "Literal",
                                    "value": "TD",
                                    "raw": "\"TD\""
                                  }
                                },
                                "consequent": {
                                  "type": "BlockStatement",
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "+=",
                                        "left": {
                                          "type": "Identifier",
                                          "name": "score"
                                        },
                                        "right": {
                                          "type": "Literal",
                                          "value": 2,
                                          "raw": "2"
                                        }
                                      }
                                    }
                                  ]
                                },
                                "alternate": {
                                  "type": "BlockStatement",
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "+=",
                                        "left": {
                                          "type": "Identifier",
                                          "name": "score"
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
                            ]
                          },
                          "alternate": {
                            "type": "IfStatement",
                            "test": {
                              "type": "BinaryExpression",
                              "operator": "==",
                              "left": {
                                "type": "Identifier",
                                "name": "typeOfScore"
                              },
                              "right": {
                                "type": "Literal",
                                "value": "FG",
                                "raw": "\"FG\""
                              }
                            },
                            "consequent": {
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "+=",
                                    "left": {
                                      "type": "Identifier",
                                      "name": "score"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "value": 3,
                                      "raw": "3"
                                    }
                                  }
                                }
                              ]
                            },
                            "alternate": {
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "+=",
                                    "left": {
                                      "type": "Identifier",
                                      "name": "score"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "value": 2,
                                      "raw": "2"
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      },
                      {
                        "type": "ExpressionStatement",
                        "expression": {
                          "type": "AssignmentExpression",
                          "operator": "=",
                          "left": {
                            "type": "Identifier",
                            "name": "typeOfScore"
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
                  "alternate": null
                }
              ]
            }
          }
        ],
        "sourceType": "module"
      };
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
      expect(removeIndentation(generator(input))).to.equal(removeIndentation(output));
    });
  });
});
