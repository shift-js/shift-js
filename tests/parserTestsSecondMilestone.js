var makeParser = require('../transpiler/parser/parser');
var expect = require('chai').expect;
var util = require('util');
var R = require('ramda');
var parser;

describe('Second Milestone Parser', function() {
  beforeEach(function() {
    parser = makeParser();
  });

  describe('Second milestone', function() {
    describe('If statements', function() {

      // Swift input: 'var a = 5; if (true) {--a};'
      it('should handle single-line if statements', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "BOOLEAN",              value: "true" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",           value: ";" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var b = 6; if (5 <= 6) {b++};'
      it('should handle single-line if statements with multi-character logical operators', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "6" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "NUMBER",               value: "5" },
          { type: "OPERATOR",             value: "<" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "6" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var c = 1; if (c == 1) {c *= 5};'
      it('should handle single-line if statements with multi-character logical operators and multi-character mathematical operators', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "=" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "*" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var d = 1; if d != 2 {d++};'
      // AST Explorer input: 'var d = 1; if (d != 2) {d++};'
      it('should handle single-line if statements without a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var"},
          { type: "IDENTIFIER",           value: "d" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "if"},
          { type: "IDENTIFIER",           value: "d" },
          { type: "OPERATOR",             value: "!" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "d" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var e = 1; if (e + 1) == 2 {e = 5};'
      // AST Explorer input: 'var e = 1; if ((e + 1) == 2) {e = 5};'
      it('should handle complex conditionals without an outer parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "e" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "IDENTIFIER",           value: "e" },
          { type: "OPERATOR",             value: "+" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "OPERATOR",             value: "=" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "e" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var f = true; if !f {f = true} else {f = false};'
      // AST Explorer input: 'var f = true; if (!f) {f = true} else {f = false};'
      it('should handle single line if/else statements', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "f" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "true" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "OPERATOR",             value: "!" },
          { type: "IDENTIFIER",           value: "f" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "f" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "true" },
          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "else" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "f" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "false" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var a = 1; if (1 > 2) {++a} else if (1 < 2) {--a} else {a = 42}'
      it('should handle single-line if/else-if/else statements with parentheticals', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "NUMBER",               value: "1" },
          { type: "OPERATOR",             value: ">" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "else" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "NUMBER",               value: "1" },
          { type: "OPERATOR",             value: "<" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "else" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "42" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var a = 1; if 1 > 2 {++a} else if 1 < 2 {--a} else {a = 42}'
      // AST Explorer input: 'var a = 1; if (1 > 2) {++a} else if (1 < 2) {--a} else {a = 42}'
      it('should handle single-line if/else-if/else statements with parentheticals', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "NUMBER",               value: "1" },
          { type: "OPERATOR",             value: ">" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "else" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "NUMBER",               value: "1" },
          { type: "OPERATOR",             value: "<" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "else" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "42" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });

    describe('While/Repeat-While loops', function() {

      // Swift input: 'var i = 10; while (i >= 0) {i--}'
      it('should handle single-line while loops with a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "while" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: ">" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var i = 10; while i >= 0 {i--}'
      // AST Explorer input: 'var i = 10; while (i >= 0) {i--}'
      it('should handle single-line while loops without a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "while" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: ">" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var i = 10; repeat {i--} while (i >= 0)'
      // AST Explorer input: 'var i = 10; do {i--} while (i >= 0)'
      it('should handle single-line repeat-while loops with a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "repeat" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "while" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: ">" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ")" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var i = 10; repeat {i--} while i >= 0'
      // AST Explorer input: 'var i = 10; do {i--} while (i >= 0)'
      it('should handle single-line repeat-while loops without a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "repeat" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "while" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: ">" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });

    describe('For loops', function() {

      // Swift input: 'var a = 0; for (var i = 10; i > 0; i--) {a++};'
      it('should handle single-line for loops with a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "for" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: ">" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var b = 0; for var j = 0; j < 10; j++ {b++};'
      // AST Explorer input: 'var b = 0; for (var j = 0; j < 10; j++) {b++};'
      it('should handle single-line for loops without a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "for" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "j" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "j" },
          { type: "OPERATOR",             value: "<" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "j" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });


      // Swift input: 'var c = 0; var numbers = [1,2,3,4,5]; for (var n) in numbers {c += n};'
      // AST Explorer input: 'var c = 0; var numbers = [1,2,3,4,5]; for (var n in numbers) {c += n};'
      xit('should handle simple, single-line for-in loops with a parenthetical and the item declared as a variable', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "numbers" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "4" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "5" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "for" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "n" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "STATEMENT_KEYWORD",    value: "in" },
          { type: "IDENTIFIER",           value: "numbers" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "n" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // Swift input: 'var c = 0; var numbers = [1,2,3,4,5]; for n in numbers {c += n};'
      // AST Explorer input: 'var c = 0; var numbers = [1,2,3,4,5]; for (var n in numbers) {c += n};'
      xit('should handle simple, single-line for-in loops without a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "numbers" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "4" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "5" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "STATEMENT_KEYWORD",    value: "for" },
          { type: "IDENTIFIER",           value: "n" },
          { type: "STATEMENT_KEYWORD",    value: "in" },
          { type: "IDENTIFIER",           value: "numbers" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "n" },
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });

    describe('Multi-line statements', function() {

      // input = String.raw`var b = true;
      //          var c = 0;`;
      it('should handle simple multi-line variable assignment', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "true" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "EOF"},
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`var e = ["Eggs", "Milk", "Bacon"]
      //          var f = ["one": 1, "two": 2, "three": 3]
      //          let g = [1 : "one",2   :"two", 3: "three"]`;
      it('should handle complex multi-line variable assignment without semi-colons', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "e" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "STRING",               value: "Eggs" },
          { type: "PUNCTUATION",          value: "," },
          { type: "STRING",               value: "Milk" },
          { type: "PUNCTUATION",          value: "," },
          { type: "STRING",               value: "Bacon" },
          { type: "ARRAY_END",            value: "]" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "f" },
          { type: "OPERATOR",             value: "=" },
          { type: "DICTIONARY_START",     value: "[" },
          { type: "STRING",               value: "one" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "STRING",               value: "two" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "," },
          { type: "STRING",               value: "three" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "NUMBER",               value: "3" },
          { type: "DICTIONARY_END",       value: "]" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "g" },
          { type: "OPERATOR",             value: "=" },
          { type: "DICTIONARY_START",     value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "STRING",               value: "one" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "STRING",               value: "two" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "STRING",               value: "three" },
          { type: "DICTIONARY_END",       value: "]" },
          { type: "TERMINATOR",           value: "EOF" }
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
                        "key": {
                          "type": "Literal",
                          "value": 1,
                          "raw": "1"
                        },
                        "computed": false,
                        "value": {
                          "type": "Literal",
                          "value": "one",
                          "raw": "\"one\""
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                      },
                      {
                        "type": "Property",
                        "key": {
                          "type": "Literal",
                          "value": 2,
                          "raw": "2"
                        },
                        "computed": false,
                        "value": {
                          "type": "Literal",
                          "value": "two",
                          "raw": "\"two\""
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                      },
                      {
                        "type": "Property",
                        "key": {
                          "type": "Literal",
                          "value": 3,
                          "raw": "3"
                        },
                        "computed": false,
                        "value": {
                          "type": "Literal",
                          "value": "three",
                          "raw": "\"three\""
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`var name: String = "Joe"
      //         let num: Int = 5;
      //         let anotherNum: UInt16 = 6
      //         var yetAnotherNum: Float = 4.2;
      //         let truth: Bool = false
      //         `;
      // AST explorer input:
      // var name = "Joe"
      // var num = 5;
      // var anotherNum = 6
      // var yetAnotherNum = 4.2;
      // var truth = false
      it('should handle simple multi-line variable assignment with type annotations', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "name" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TYPE_STRING",          value: "String"},
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "Joe" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "num" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TYPE_NUMBER",          value: "Int"},
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "anotherNum" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TYPE_NUMBER",          value: "UInt16"},
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "6" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "yetAnotherNum" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TYPE_NUMBER",          value: "Float"},
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "4.2" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "let" },
          { type: "IDENTIFIER",           value: "truth" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TYPE_BOOLEAN",         value: "Bool"},
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "false" },
          { type: "TERMINATOR",           value: "\\n"},
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`// function body goes here
      // // firstParameterName and secondParameterName refer to
      // // the argument values for the first and second parameters
      // `;
      it('should handle successive single-line comments', function() {
        input = [
          { type: "COMMENT_START", value: "//"},
          { type: "COMMENT", value: " function body goes here"},
          { type: "TERMINATOR", value: "\\n"},
          { type: "COMMENT_START", value: "//"},
          { type: "COMMENT", value: " firstParameterName and secondParameterName refer to"},
          { type: "TERMINATOR", value: "\\n"},
          { type: "COMMENT_START", value: "//"},
          { type: "COMMENT", value: " the argument values for the first and second parameters"},
          { type: "TERMINATOR", value: "\\n"},
          { type: "TERMINATOR", value: "EOF"}
        ];
        output = {
          "type": "Program",
          "body": [],
          "sourceType": "module"
        };
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`/*
      // Comment 1
      // Comment 2
      // */
      // `;
      it('should handle multi-line comments', function() {
        input = [
          { type: "MULTI_LINE_COMMENT_START", value: "/*"},
          { type: "TERMINATOR", value: "\\n"},
          { type: "COMMENT", value: "Comment 1"},
          { type: "TERMINATOR", value: "\\n"},
          { type: "COMMENT", value: "Comment 2"},
          { type: "TERMINATOR", value: "\\n"},
          { type: "MULTI_LINE_COMMENT_END", value: "*/"},
          { type: "TERMINATOR", value: "\\n"},
          { type: "TERMINATOR", value: "EOF"}
        ];
        output = {
          "type": "Program",
          "sourceType": "module",
          "body": []
        };
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });

    describe('Multi-line if statements', function() {

      // input = String.raw`var a = false
      //         var b = 0;
      //         if (a) {
      //           b++;
      //         }`;
      it('should handle simple multi-line if statements', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "false" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
          { type: "TERMINATOR",           value: "EOF"},
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`var diceRoll = 6;
      //         if ++diceRoll == 7 {
      //           diceRoll = 1
      //         }`;
      // AST Explorer input:
      // var diceRoll = 6;
      // if (++diceRoll === 7) {
      //   diceRoll = 1
      // }
      xit('should handle simple multi-line if statements with complex conditions', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "diceRoll" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "6" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "IDENTIFIER",           value: "diceRoll" },
          { type: "OPERATOR",             value: "=" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "7" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "diceRoll" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "1" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
          { type: "TERMINATOR",           value: "EOF"},
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
                "operator": "===",
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
        expect(R.equals(parser(input), output)).to.equal(true);
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
      // AST Explorer input:
      // var x = true
      // var y = false;
      // var a = ""
      // var z;
      // if (x) {
      //   if (y) {
      //     z = true;
      //   } else if (true) {
      //       a = "<3 JS";
      //   } else {
      //       a = "never get here";
      //   }
      // } else {
      //   a = "x is false";
      // }
      xit('should handle simple multi-line nested if statements', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "true" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "y" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "false" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "z" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "IDENTIFIER",           value: "y" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "IDENTIFIER",           value: "z" },
          { type: "OPERATOR",             value: "=" },
          { type: "BOOLEAN",              value: "true" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "else" },
          { type: "STATEMENT_KEYWORD",    value: "if" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "BOOLEAN",              value: "true" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "<3 JS" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "else" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "never get here" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "PUNCTUATION",          value: "}" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "else" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "IDENTIFIER",           value: "a" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "x is false" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},

          { type: "PUNCTUATION",          value: "}" },
          { type: "TERMINATOR",           value: "EOF"},
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });

    xdescribe('Multi-line for loops', function() {

      // input = String.raw`var b = 0;
      //         for var i = 0; i < 10; i++ {
      //           b++
      //         }`;
      // AST Explorer input:
      // var b = 0;
      // for (var i = 0; i < 10; i++) {
      //   b++
      // }
      xit('should handle simple multi-line for loops', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "for" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "<" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "b" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`var arrays = [[1,2,3], [4,5,6], [7,8,9]]
      //          var total = 0
      //          for (var i = 0; i < 3; i++) {
      //            for var j = 0; j < 3; j++ {
      //              total += arrays[i][j]
      //            }
      //          }`;
      xit('should handle multi-line nested for loops', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "arrays" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "3" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: "," },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "4" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "5" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "6" },
          { type: "ARRAY_END",            value: "]" },
          { type: "PUNCTUATION",          value: "," },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "7" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "8" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "9" },
          { type: "ARRAY_END",            value: "]" },
          { type: "ARRAY_END",            value: "]" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "total" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "for" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "<" },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "for" },
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "j" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "j" },
          { type: "OPERATOR",             value: "<" },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "IDENTIFIER",           value: "j" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "+" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "total" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "arrays" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "IDENTIFIER",           value: "j" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });

    xdescribe('Multi-line for-in loops', function() {

      // input = String.raw`var c = 0
      //          var numbers = [1,2,3,4,5]
      //          for n in numbers {
      //            c += n
      //          }`;
      // AST Explorer input:
      // var c = 0
      // var numbers = [1,2,3,4,5]
      // for (n in numbers) {
      //  c += n
      // }
      xit('should handle simple multi-line for-in loops', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "numbers" },
          { type: "OPERATOR",             value: "=" },
          { type: "ARRAY_START",          value: "[" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "4" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "5" },
          { type: "ARRAY_END",            value: "]" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "for" },
          { type: "IDENTIFIER",           value: "n" },
          { type: "STATEMENT_KEYWORD",    value: "in" },
          { type: "IDENTIFIER",           value: "numbers" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "c" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "=" },
          { type: "IDENTIFIER",           value: "n" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
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
                "type": "Identifier",
                "name": "n"
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`var sum = 0
      //               for i in 0..<5 {
      //                   sum += i
      //               }`;
      xit('handle for-in loops that iterate over a range', function () {
        input = [
          { type: 'DECLARATION_KEYWORD',            value: 'var' },
          { type: 'IDENTIFIER',                     value: 'sum' },
          { type: 'OPERATOR',                       value: '=' },
          { type: 'NUMBER',                         value: '0' },
          { type: 'TERMINATOR',                     value: '\\n' },
          { type: "STATEMENT_KEYWORD",              value: "for" },
          { type: "IDENTIFIER",                     value: "i" },
          { type: "STATEMENT_KEYWORD",              value: "in" },
          { type: 'NUMBER',                         value: '0' },
          { type: 'HALF-OPEN_RANGE',                value: '..<'},
          { type: 'NUMBER',                         value: '5' },
          { type: "PUNCTUATION",                    value: "{" },
          { type: "TERMINATOR",                     value: "\\n"},
          { type: "IDENTIFIER",                     value: "sum" },
          { type: "OPERATOR",                       value: "+" },
          { type: "OPERATOR",                       value: "=" },
          { type: "IDENTIFIER",                     value: "i" },
          { type: "TERMINATOR",                     value: "\\n"},
          { type: "PUNCTUATION",                    value: "}" },
          { type: "TERMINATOR",                     value: "EOF"},
        ];
        output = "FILL_ME_IN";
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
        input = [
          { type: 'DECLARATION_KEYWORD',         value: 'let' },
          { type: 'IDENTIFIER',                  value: 'interestingNumbers' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'DICTIONARY_START',            value: '[' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STRING',                      value: 'Prime' },
          { type: 'PUNCTUATION',                 value: ':' },
          { type: 'ARRAY_START',                 value: '[' },
          { type: 'NUMBER',                      value: '2' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '3' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '5' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '7' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '11' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '13' },
          { type: 'ARRAY_END',                   value: ']' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STRING',                      value: 'Fibonacci' },
          { type: 'PUNCTUATION',                 value: ':' },
          { type: 'ARRAY_START',                 value: '[' },
          { type: 'NUMBER',                      value: '1' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '1' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '2' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '3' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '5' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '8' },
          { type: 'ARRAY_END',                   value: ']' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STRING',                      value: 'Square' },
          { type: 'PUNCTUATION',                 value: ':' },
          { type: 'ARRAY_START',                 value: '[' },
          { type: 'NUMBER',                      value: '1' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '4' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '9' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '16' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'NUMBER',                      value: '25' },
          { type: 'ARRAY_END',                   value: ']' },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'DICTIONARY_END',              value: ']' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: "DECLARATION_KEYWORD",         value: "var" },
          { type: "IDENTIFIER",                  value: "largest" },
          { type: "OPERATOR",                    value: "=" },
          { type: "NUMBER",                      value: "0" },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: "STATEMENT_KEYWORD",           value: "for" },
          { type: 'PUNCTUATION',                 value: '(' },
          { type: "IDENTIFIER",                  value: "kind" },
          { type: 'PUNCTUATION',                 value: ',' },
          { type: "IDENTIFIER",                  value: "numbers" },
          { type: 'PUNCTUATION',                 value: ')' },
          { type: "STATEMENT_KEYWORD",           value: "in" },
          { type: "IDENTIFIER",                  value: "interestingNumbers" },
          { type: "PUNCTUATION",                 value: "{" },
          { type: "TERMINATOR",                  value: "\\n"},
          { type: "STATEMENT_KEYWORD",           value: "for" },
          { type: "IDENTIFIER",                  value: "number" },
          { type: "STATEMENT_KEYWORD",           value: "in" },
          { type: "IDENTIFIER",                  value: "numbers" },
          { type: "PUNCTUATION",                 value: "{" },
          { type: "TERMINATOR",                  value: "\\n"},
          { type: "STATEMENT_KEYWORD",           value: "if" },
          { type: "IDENTIFIER",                  value: "number" },
          { type: "OPERATOR",                    value: ">" },
          { type: "IDENTIFIER",                  value: "largest" },
          { type: "PUNCTUATION",                 value: "{" },
          { type: "TERMINATOR",                  value: "\\n"},
          { type: "IDENTIFIER",                  value: "largest" },
          { type: "OPERATOR",                    value: "=" },
          { type: "IDENTIFIER",                  value: "number" },
          { type: "TERMINATOR",                  value: "\\n"},
          { type: "PUNCTUATION",                 value: "}" },
          { type: "TERMINATOR",                  value: "\\n"},
          { type: "PUNCTUATION",                 value: "}" },
          { type: "TERMINATOR",                  value: "\\n"},
          { type: "PUNCTUATION",                 value: "}" },
          { type: "TERMINATOR",                  value: "EOF"},
        ];
        output = "FILL_ME_IN";
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });

    xdescribe('Multi-Line While/Repeat-While loops', function() {

      // input = String.raw`var i = 10;
      //         while i >= 0 {
      //           i--
      //         }`
      // AST Explorer input:
      // var i = 10;
      // while (i >= 0) {
      //   i--
      // }
      xit('should handle multi-line while loops without a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "while" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: ">" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`var i = 10;
      //         while (i >= 0) {
      //           i--
      //         }`;
      xit('should handle multi-line while loops with a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "while" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: ">" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ")" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`var i = 10;
      //          repeat {
      //            i--
      //          } while (i > 0);`;
      // AST Explorer input:
      // var i = 10;
      // do {
      //  i--
      // } while (i > 0);
      xit('should handle multi-line repeat-while loops with a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "10" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "repeat" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "while" },
          { type: "PUNCTUATION",          value: "(" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: ">" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ")" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });

      // input = String.raw`var i = 10
      //          repeat {
      //            i--
      //          } while i > 0`;
      // AST Explorer input:
      // var i = 10;
      // do {
      //  i--
      // } while (i > 0);
      xit('should handle multi-line repeat-while loops without a parenthetical', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "10" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "repeat" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: "-" },
          { type: "OPERATOR",             value: "-" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
          { type: "STATEMENT_KEYWORD",    value: "while" },
          { type: "IDENTIFIER",           value: "i" },
          { type: "OPERATOR",             value: ">" },
          { type: "NUMBER",               value: "0" },
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
        expect(R.equals(parser(input), output)).to.equal(true);
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
      // AST Explorer input:
      // var x = 2
      // var y = "";
      // switch (x) {
      //   case 1:
      //     y += "positive";
      //     break;
      //   case 2:
      //     y += "positive";
      //     break;
      //   case 3:
      //     y += "positive";
      //     break;
      //   case -1:
      //     y += "negative";
      //     break;
      //   case -2:
      //     y += "negative";
      //     break;
      //   case -3:
      //     y += "negative";
      //     break;
      //   case 0:
      //     y += "zero";
      //     break;
      //   default:
      //     y += "dunno";
      // }
      xit('should handle multi-line switch statements', function() {
        input = [
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "OPERATOR",             value: "=" },
          { type: "NUMBER",               value: "2" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "DECLARATION_KEYWORD",  value: "var" },
          { type: "IDENTIFIER",           value: "y" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "switch" },
          { type: "IDENTIFIER",           value: "x" },
          { type: "PUNCTUATION",          value: "{" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "case" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "," },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "y" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "positive" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "case" },
          { type: "OPERATOR",             value: "-" },
          { type: "NUMBER",               value: "1" },
          { type: "PUNCTUATION",          value: "," },
          { type: "OPERATOR",             value: "-" },
          { type: "NUMBER",               value: "2" },
          { type: "PUNCTUATION",          value: "," },
          { type: "OPERATOR",             value: "-" },
          { type: "NUMBER",               value: "3" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "y" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "negative" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "case" },
          { type: "NUMBER",               value: "0" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "y" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "zero" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "STATEMENT_KEYWORD",    value: "default" },
          { type: "PUNCTUATION",          value: ":" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "IDENTIFIER",           value: "y" },
          { type: "OPERATOR",             value: "+" },
          { type: "OPERATOR",             value: "=" },
          { type: "STRING",               value: "dunno" },
          { type: "PUNCTUATION",          value: ";" },
          { type: "TERMINATOR",           value: "\\n"},
          { type: "PUNCTUATION",          value: "}" },
          { type: "TERMINATOR",           value: "EOF"},
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
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });

    xdescribe('Complex Control Flow', function () {

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
      // AST Explorer input:
      // var gameInProgress = false;
      // var score = 0;
      // var typeOfScore = "";
      // var PAT = "";
      // while (gameInProgress) {
      //     if (typeOfScore != "") {
      //         if (typeOfScore == "TD") {
      //             score += 6
      //         } else if (typeOfScore == "PAT") {
      //             if (PAT == "TD") {
      //                 score += 2
      //             } else {
      //                 score += 1
      //             }
      //         } else if (typeOfScore == "FG") {
      //             score += 3
      //         } else {
      //             score += 2
      //         }
      //         typeOfScore = ""
      //     }
      // }
      xit('should handle nested if-else statements within a loop', function () {
        input = [
          { type: 'DECLARATION_KEYWORD',         value: 'var' },
          { type: 'IDENTIFIER',                  value: 'gameInProgress' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'BOOLEAN',                     value: 'false' },
          { type: 'PUNCTUATION',                 value: ';' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'DECLARATION_KEYWORD',         value: 'var' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '0' },
          { type: 'PUNCTUATION',                 value: ';' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'DECLARATION_KEYWORD',         value: 'var' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: '' },
          { type: 'PUNCTUATION',                 value: ';' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'DECLARATION_KEYWORD',         value: 'var' },
          { type: 'IDENTIFIER',                  value: 'PAT' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: '' },
          { type: 'PUNCTUATION',                 value: ';' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STATEMENT_KEYWORD',           value: 'while' },
          { type: 'IDENTIFIER',                  value: 'gameInProgress' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '!' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: '' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: 'TD' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '6' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'STATEMENT_KEYWORD',           value: 'else' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: 'PAT' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'IDENTIFIER',                  value: 'PAT' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: 'TD' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '2' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'STATEMENT_KEYWORD',           value: 'else' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '1' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'STATEMENT_KEYWORD',           value: 'else' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: 'FG' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '3' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'STATEMENT_KEYWORD',           value: 'else' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '2' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: '' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: 'EOF' }
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
        expect(R.equals(parser(input), output)).to.equal(true);
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
        input = [
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'DECLARATION_KEYWORD',         value: 'var' },
          { type: 'IDENTIFIER',                  value: 'gameInProgress' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'BOOLEAN',                     value: 'false' },
          { type: 'PUNCTUATION',                 value: ';' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'DECLARATION_KEYWORD',         value: 'var' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '0' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'DECLARATION_KEYWORD',         value: 'var' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: '' },
          { type: 'PUNCTUATION',                 value: ';' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'DECLARATION_KEYWORD',         value: 'var' },
          { type: 'IDENTIFIER',                  value: 'PAT' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: '' },
          { type: 'PUNCTUATION',                 value: ';' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STATEMENT_KEYWORD',           value: 'while' },
          { type: 'IDENTIFIER',                  value: 'gameInProgress' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'PUNCTUATION',                 value: '(' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '!' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: '' },
          { type: 'PUNCTUATION',                 value: ')' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: 'TD' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '6' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'STATEMENT_KEYWORD',           value: 'else' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: 'PAT' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'IDENTIFIER',                  value: 'PAT' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: 'TD' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '2' },
          { type: 'PUNCTUATION',                 value: ';' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'STATEMENT_KEYWORD',           value: 'else' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '1' },
          { type: 'PUNCTUATION',                 value: ';' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'STATEMENT_KEYWORD',           value: 'else' },
          { type: 'STATEMENT_KEYWORD',           value: 'if' },
          { type: 'PUNCTUATION',                 value: '(' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: 'FG' },
          { type: 'PUNCTUATION',                 value: ')' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '3' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'STATEMENT_KEYWORD',           value: 'else' },
          { type: 'PUNCTUATION',                 value: '{' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'score' },
          { type: 'OPERATOR',                    value: '+' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'NUMBER',                      value: '2' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'IDENTIFIER',                  value: 'typeOfScore' },
          { type: 'OPERATOR',                    value: '=' },
          { type: 'STRING',                      value: '' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'PUNCTUATION',                 value: '}' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: '\\n' },
          { type: 'TERMINATOR',                  value: 'EOF' }

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
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });
  });
});
