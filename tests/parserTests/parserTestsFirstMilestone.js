var makeParser = require('../../transpiler/parser/parser');
var expect = require('chai').expect;
var util = require('util');
var R = require('ramda');
var parser;

describe('Parser: First Milestone', function() {

  beforeEach(function() {
    parser = makeParser();
  });

  describe('Basic data types and variable assignment', function () {

    // Swift input: 'var a = 3'
    it('should handle variable declarations with numbers', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "3" },
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
                  "value": 3,
                  "raw": "3"
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

    // Swift input: 'var a = 1; a = 2'
    it('should handle variable reassignment', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "2" },
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
                "init": { "type": "Literal", "value": 1, "raw": "1" }
              }
            ],
            "kind": "var"
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {"type": "Identifier", "name": "a"},
              "right": {"type": "Literal", "value": 2, "raw": "2"}
            }
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // Swift input: 'var my_var = 5'
    it('should handle variable names with underscores', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "my_var" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
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
                  "name": "my_var"
                },
                "init": {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
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

    // input = String.raw`var myVar = 5;`;
    it('should handle lines that end with a semicolon', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "myVar" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
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
                  "name": "myVar"
                },
                "init": {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
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

    // input = String.raw`var myVar                   =                       5          ;`;
    it('should handle variable declarations with erratic spacing', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "myVar" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
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
                  "name": "myVar"
                },
                "init": {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
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

    // Swift input: 'var b = "hello"'
    it('should handle strings', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "b" },
        { type: "OPERATOR",             value: "=" },
        { type: "STRING",               value: "hello" },
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
                  "value": "hello",
                  "raw": "\"hello\""
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

    // Swift input: 'var c = true'
    it('should handle booleans', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "c" },
        { type: "OPERATOR",             value: "=" },
        { type: "BOOLEAN",              value: "true" },
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
                  "value": true,
                  "raw": "true"
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

    // Swift input: 'var d = "Test this"'
    it('should handle strings with whitespace', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "d" },
        { type: "OPERATOR",             value: "=" },
        { type: "STRING",               value: "Test this" },
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
                  "value": "Test this",
                  "raw": "\"Test this\""
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

    // input = String.raw`var name: String = "Joe"; var age: Int = 45;`;
    // AST Explorer input: 'var name = "Joe"; var age = 45;'
    it('should variables declared with type annotations', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "name" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String"},
        { type: "OPERATOR",             value: "=" },
        { type: "STRING",               value: "Joe" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "age" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int"},
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "45" },
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "age"
                },
                "init": {
                  "type": "Literal",
                  "value": 45,
                  "raw": "45"
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

    // input = String.raw`var name: String; var age: Int;`;
    it('should variables declared with type annotations but no value', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "name" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String"},
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "age" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int"},
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "name"
                },
                "init": null
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
                  "name": "age"
                },
                "init": null
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`var firstBase, secondBase, thirdBase: String`;
    // AST Explorer input = 'var firstBase, secondBase, thirdBase'
    xit('should handle multiple related variables of the same type on a single line, separated by commas', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "firstBase" },
        { type: "PUNCTUATION",          value: "," },
        { type: "IDENTIFIER",           value: "secondBase" },
        { type: "PUNCTUATION",          value: "," },
        { type: "IDENTIFIER",           value: "thirdBase" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String"},
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
                  "name": "firstBase"
                },
                "init": null
              },
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "secondBase"
                },
                "init": null
              },
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "thirdBase"
                },
                "init": null
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`/* Comment 1 */ var a = 1 // Comment 2`;
    xit('should handle comments', function () {
      input = [
        { type: "MULTI_LINE_COMMENT_START",  value: "/*"},
        { type: "COMMENT",                   value: " Comment 1 "},
        { type: "MULTI_LINE_COMMENT_END",    value: "*/"},
        { type: "DECLARATION_KEYWORD",       value: "var" },
        { type: "IDENTIFIER",                value: "a" },
        { type: "OPERATOR",                  value: "=" },
        { type: "NUMBER",                    value: "1" },
        { type: "COMMENT_START",             value: "//"},
        { type: "COMMENT",                   value: " Comment 2"},
        { type: "TERMINATOR",                value: "EOF"}
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
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });
  });

  describe('Basic collections and constants', function () {

    // Swift input: 'var empty = []'
    it('should handle empty arrays', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "empty" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "["},
        { type: "ARRAY_END",                  value: "]"},
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "empty"
                },
                "init": {
                  "type": "ArrayExpression",
                  "elements": []
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

    // Swift input: 'var empty = [:]'
    // AST Explorer input: 'var empty = {}'
    it('should handle empty dictionaries', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "empty" },
        { type: "OPERATOR",                   value: "=" },
        { type: "DICTIONARY_START",           value: "["},
        { type: "PUNCTUATION",                value: ":"},
        { type: "DICTIONARY_END",             value: "]"},
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "empty"
                },
                "init": {
                  "type": "ObjectExpression",
                  "properties": []
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

    // Swift input: 'var empty = [String]();'
    // AST Explorer input: 'var empty = [];'
    xit('should handle initializer syntax for arrays', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "empty" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_STRING",                value: "String"},
        { type: "ARRAY_END",                  value: "]"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: ";"},
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "empty"
                },
                "init": {
                  "type": "ArrayExpression",
                  "elements": []
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

    // Swift input: 'var empty = [String:UInt16]();'
    // AST Explorer input: 'var empty = {};'
    xit('should handle initializer syntax for dictionaries', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "empty" },
        { type: "OPERATOR",                   value: "=" },
        { type: "DICTIONARY_START",           value: "["},
        { type: "TYPE_STRING",                value: "String"},
        { type: "PUNCTUATION",                value: ":"},
        { type: "TYPE_NUMBER",                value: "UInt16"},
        { type: "DICTIONARY_END",             value: "]"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: ";"},
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "empty"
                },
                "init": {
                  "type": "ObjectExpression",
                  "properties": []
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

    // Swift input: 'var e = ["Eggs", "Milk", "Bacon"]'
    it('should handle arrays', function () {
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
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // Swift input: 'var e = [  "Eggs","Milk",           "Bacon"                ] ;'
    it('should handle arrays with erratic spacing', function () {
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
        { type: "PUNCTUATION",          value: ";" },
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
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // Swift input: 'var f = ["one": 1, "two": 2, "three": 3]'
    it('should handle dictionaries', function () {
      input = [
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
        { type: "TERMINATOR",           value: "EOF" }
      ];
      output = {
        "type": "Program",
        "sourceType": "module",
        "body": [
          {
            "type": "VariableDeclaration",
            "kind": "var",
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
            ]
            // "kind": "var"
          }
        ]
        // "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw `var arr = [2,2,3,4,5]; arr[0] = 1`;
    it('should handle addition/reassignment of array items via subscript', function () {
      input = [
        { type: "DECLARATION_KEYWORD",          value: "var" },
        { type: "IDENTIFIER",                   value: "arr" },
        { type: "OPERATOR",                     value: "=" },
        { type: "ARRAY_START",                  value: "[" },
        { type: "NUMBER",                       value: "2" },
        { type: "PUNCTUATION",                  value: "," },
        { type: "NUMBER",                       value: "2" },
        { type: "PUNCTUATION",                  value: "," },
        { type: "NUMBER",                       value: "3" },
        { type: "PUNCTUATION",                  value: "," },
        { type: "NUMBER",                       value: "4" },
        { type: "PUNCTUATION",                  value: "," },
        { type: "NUMBER",                       value: "5" },
        { type: "ARRAY_END",                    value: "]" },
        { type: "PUNCTUATION",                  value: ";" },
        { type: "IDENTIFIER",                   value: "arr" },
        { type: "SUBSCRIPT_LOOKUP_START",       value: "[" },
        { type: "NUMBER",                       value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",         value: "]" },
        { type: "OPERATOR",                     value: "=" },
        { type: "NUMBER",                       value: "1" },
        { type: "TERMINATOR",                   value: "EOF" }
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
                  "name": "arr"
                },
                "init": {
                  "type": "ArrayExpression",
                  "elements": [
                    {
                      "type": "Literal",
                      "value": 2,
                      "raw": "2"
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
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "MemberExpression",
                "computed": true,
                "object": {
                  "type": "Identifier",
                  "name": "arr"
                },
                "property": {
                  "type": "Literal",
                  "value": 0,
                  "raw": "0"
                }
              },
              "right": {
                "type": "Literal",
                "value": 1,
                "raw": "1"
              }
            }
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`var arr = [Int](); arr += [1,2,3];`;
    // AST Explorer input: 'var arr = []; arr.push(1,2,3);'
    xit('should handle appending items to an array with the addition assignment operator', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int"},
        { type: "ARRAY_END",                  value: "]"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "["},
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "3" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF"},
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
                  "name": "arr"
                },
                "init": {
                  "type": "ArrayExpression",
                  "elements": []
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
                "type": "MemberExpression",
                "computed": false,
                "object": {
                  "type": "Identifier",
                  "name": "arr"
                },
                "property": {
                  "type": "Identifier",
                  "name": "push"
                }
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

    // Swift input: 'var error = (404, "not found")'
    // AST Explorer input: 'var error = { 0: 404, 1: 'not found' };'
    it('should handle tuples', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "error" },
        { type: "OPERATOR",                   value: "=" },
        { type: "TUPLE_START",                value: "("},
        { type: "NUMBER",                     value: "404"},
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "not found"},
        { type: "TUPLE_END",                  value: ")"},
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "error"
                },
                "init": {
                  "type": "ObjectExpression",
                  "properties": [
                    {
                      "type": "Property",
                      "key": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                      },
                      "computed": false,
                      "value": {
                        "type": "Literal",
                        "value": 404,
                        "raw": "404"
                      },
                      "kind": "init",
                      "method": false,
                      "shorthand": false
                    },
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
                        "value": "not found",
                        "raw": '"not found"'
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

    // input = String.raw `var randNumString = (4, "hello"); randNumString.0 = 5`;
    xit('should handle the reassignment of tuple items via dot notation', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "randNumString" },
        { type: "OPERATOR",                   value: "=" },
        { type: "TUPLE_START",                value: "("},
        { type: "NUMBER",                     value: "4"},
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "hello"},
        { type: "TUPLE_END",                  value: ")"},
        { type: "PUNCTUATION",                value: ";" },
        { type: "IDENTIFIER",                 value: "randNumString" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "NUMBER",                     value: "0"},
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "5"},
        { type: "TERMINATOR",                 value: "EOF" }
      ];
      output = "FILL_ME_IN";
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // Swift input: 'let http200Status = (statusCode: 200, description: "OK");'
    // AST Explorer input: 'var http200Status = { statusCode: 200, description: "OK"};'
    it('should handle tuples with element names', function () {
      input = [
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
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "http200Status"
                },
                "init": {
                  "type": "ObjectExpression",
                  "properties": [
                    {
                      "type": "Property",
                      "key": {
                        "type": "Identifier",
                        "name": "statusCode"
                      },
                      "computed": false,
                      "value": {
                        "type": "Literal",
                        "value": 200,
                        "raw": "200"
                      },
                      "kind": "init",
                      "method": false,
                      "shorthand": false
                    },
                    {
                      "type": "Property",
                      "key": {
                        "type": "Identifier",
                        "name": "description"
                      },
                      "computed": false,
                      "value": {
                        "type": "Literal",
                        "value": "OK",
                        "raw": "\"OK\""
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

    // Swift input: 'var empty = ()';
    // AST Explorer input: 'var empty = {};'
    it('should handle empty tuples', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "empty" },
        { type: "OPERATOR",                   value: "=" },
        { type: "TUPLE_START",                value: "("},
        { type: "TUPLE_END",                  value: ")"},
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "empty"
                },
                "init": {
                  "type": "ObjectExpression",
                  "properties": []
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

    // input = String.raw`var tup = ("one", two: 2); var one = tup.0; var two = tup.1; var twoRedux = tup.two;`;
    xit('should handle tuples with mixed index numbers and element names, and value lookups using both', function () {
      input = [
        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "tup" },
        { type: "OPERATOR",                       value: "=" },
        { type: "TUPLE_START",                    value: "("},
        { type: "STRING",                         value: "one"},
        { type: "PUNCTUATION",                    value: "," },
        { type: "TUPLE_ELEMENT_NAME",             value: "two"},
        { type: "PUNCTUATION",                    value: ":" },
        { type: "NUMBER",                         value: "2"},
        { type: "TUPLE_END",                      value: ")"},
        { type: "PUNCTUATION",                    value: ";" },

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "one" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "tup" },
        { type: "DOT_SYNTAX",                     value: "." },
        { type: "NUMBER",                         value: "0"},
        { type: "PUNCTUATION",                    value: ";" },

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "two" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "tup" },
        { type: "DOT_SYNTAX",                     value: "." },
        { type: "NUMBER",                         value: "1"},
        { type: "PUNCTUATION",                    value: ";" },

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "twoRedux" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "tup" },
        { type: "DOT_SYNTAX",                     value: "." },
        { type: "TUPLE_ELEMENT_NAME",             value: "two"},
        { type: "PUNCTUATION",                    value: ";" },
        { type: "TERMINATOR",                     value: "EOF" }
      ];
      output = "FILL_ME_IN";
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // Swift input: 'let g = [1 : "one",2   :"two", 3: "three"]'
    it('should handle erratic spacing', function () {
      input = [
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`var d = [1, 2]; var one = d[0];`;
    it('should handle subscript lookups on arrays', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "one" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "NUMBER",                     value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",       value: "]" },
        { type: "PUNCTUATION",                value: ";" },
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
                  "name": "d"
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
                  "name": "one"
                },
                "init": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                    "type": "Identifier",
                    "name": "d"
                  },
                  "property": {
                    "type": "Literal",
                    "value": 0,
                    "raw": "0"
                  }
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

    // input = String.raw`var d = ["one": 1, "two": 2]; var one = d["one"];`;
    // AST Explorer input: 'var d = {"one": 1, "two": 2}; var one = d["one"];'
    it('should handle subscript lookups on dictionaries', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "OPERATOR",                   value: "=" },
        { type: "DICTIONARY_START",           value: "[" },
        { type: "STRING",                     value: "one" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "two" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "2" },
        { type: "DICTIONARY_END",             value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "one" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "STRING",                     value: "one" },
        { type: "SUBSCRIPT_LOOKUP_END",       value: "]" },
        { type: "PUNCTUATION",                value: ";" },
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
                  "name": "d"
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
                  "name": "one"
                },
                "init": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                    "type": "Identifier",
                    "name": "d"
                  },
                  "property": {
                    "type": "Literal",
                    "value": "one",
                    "raw": "\"one\""
                  }
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
  });

  describe('Numeric and boolean operations', function () {

    // Swift input: 'let h = 3.14'
    it('should handle floating point numbers', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "h" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "3.14" },
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
                  "name": "h"
                },
                "init": {
                  "type": "Literal",
                  "value": 3.14,
                  "raw": "3.14"
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

    // input = String.raw`let justOverOneMillion = 1_000_000.000_000_1`;
    // AST Explorer input: 'var justOverOneMillion = 1000000.0000001'
    it('should handle numeric literals written with underscores', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "justOverOneMillion" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "1000000.0000001" },
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "justOverOneMillion"
                },
                "init": {
                  "type": "Literal",
                  "value": 1000000.0000001,
                  "raw": "1000000.0000001"
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

    // Swift input: 'let i = 5+6'
    it('should handle unspaced operators', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "6" },
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
                  "name": "i"
                },
                "init": {
                  "type": "BinaryExpression",
                  "left": {
                    "type": "Literal",
                    "value": 5,
                    "raw": "5"
                  },
                  "operator": "+",
                  "right": {
                    "type": "Literal",
                    "value": 6,
                    "raw": "6"
                  }
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

    // Swift input: 'var j = 5 + 6 / 4 - (-16 % 4.2) * 55'
    it('should handle order of operations', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "j" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: "/" },
        { type: "NUMBER",               value: "4" },
        { type: "OPERATOR",             value: "-" },
        { type: "PUNCTUATION",          value: "(" },
        { type: "OPERATOR",             value: "-" },
        { type: "NUMBER",               value: "16" },
        { type: "OPERATOR",             value: "%" },
        { type: "NUMBER",               value: "4.2" },
        { type: "PUNCTUATION",          value: ")" },
        { type: "OPERATOR",             value: "*" },
        { type: "NUMBER",               value: "55" },
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
                  "name": "j"
                },
                "init": {
                  "type": "BinaryExpression",
                  "left": {
                    "type": "BinaryExpression",
                    "left": {
                      "type": "Literal",
                      "value": 5,
                      "raw": "5"
                    },
                    "operator": "+",
                    "right": {
                      "type": "BinaryExpression",
                      "left": {
                        "type": "Literal",
                        "value": 6,
                        "raw": "6"
                      },
                      "operator": "/",
                      "right": {
                        "type": "Literal",
                        "value": 4,
                        "raw": "4"
                      }
                    }
                  },
                  "operator": "-",
                  "right": {
                    "type": "BinaryExpression",
                    "left": {
                      "type": "BinaryExpression",
                      "left": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "prefix": true,
                        "argument": {
                          "type": "Literal",
                          "value": 16,
                          "raw": "16"
                        }
                      },
                      "operator": "%",
                      "right": {
                        "type": "Literal",
                        "value": 4.2,
                        "raw": "4.2"
                      }
                    },
                    "operator": "*",
                    "right": {
                      "type": "Literal",
                      "value": 55,
                      "raw": "55"
                    }
                  }
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

    // input = String.raw`let l = 6 != 9`;
    // AST Explorer input: 'var l = 6 != 9'
    it('should handle comparisons', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "l" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: "!" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "9" },
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
                  "name": "l"
                },
                "init": {
                  "type": "BinaryExpression",
                  "operator": "!=",
                  "left": {
                    "type": "Literal",
                    "value": 6,
                    "raw": "6"
                  },
                  "right": {
                    "type": "Literal",
                    "value": 9,
                    "raw": "9"
                  }
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

    // 'var l = 6 != 7 || (6 == 7 || (6 > 7 || (6 < 7 || (6 >= 7 || 6 <= 7))));'
    // 'var l = 6 != 7 ||  6 == 7 ||  6 > 7 ||  6 < 7 ||  6 >= 7 || 6 <= 7;';
    it('should handle complex comparisons', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "l" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: "!" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "7" },
        { type: "OPERATOR",             value: "|" },
        { type: "OPERATOR",             value: "|" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "7" },
        { type: "OPERATOR",             value: "|" },
        { type: "OPERATOR",             value: "|" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: ">" },
        { type: "NUMBER",               value: "7" },
        { type: "OPERATOR",             value: "|" },
        { type: "OPERATOR",             value: "|" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: "<" },
        { type: "NUMBER",               value: "7" },
        { type: "OPERATOR",             value: "|" },
        { type: "OPERATOR",             value: "|" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: ">" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "7" },
        { type: "OPERATOR",             value: "|" },
        { type: "OPERATOR",             value: "|" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: "<" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "7" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF" }
      ];
      output = {
        type: 'Program',
        sourceType: 'module',
        body:
          [
            {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations:
                [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'l' },
                    init: {
                      type: 'LogicalExpression',
                      operator: '||',
                      left: {
                        type: 'BinaryExpression',
                        operator: '!=',
                        left: {
                          value: 6,
                          type: 'Literal',
                          raw: '6' },
                        right: { value: 7, type: 'Literal', raw: '7' } },
                      right:
                      { type: 'LogicalExpression',
                        operator: '||',
                        left:
                        { type: 'BinaryExpression',
                          operator: '==',
                          left: { value: 6, type: 'Literal', raw: '6' },
                          right: { value: 7, type: 'Literal', raw: '7' } },
                        right:
                        { type: 'LogicalExpression',
                          operator: '||',
                          left:
                          { type: 'BinaryExpression',
                            operator: '>',
                            left: { value: 6, type: 'Literal', raw: '6' },
                            right: { value: 7, type: 'Literal', raw: '7' } },
                          right:
                          { type: 'LogicalExpression',
                            operator: '||',
                            left:
                            { type: 'BinaryExpression',
                              operator: '<',
                              left: { value: 6, type: 'Literal', raw: '6' },
                              right: { value: 7, type: 'Literal', raw: '7' } },
                            right:
                            { type: 'LogicalExpression',
                              operator: '||',
                              left:
                              { type: 'BinaryExpression',
                                operator: '>=',
                                left: { value: 6, type: 'Literal', raw: '6' },
                                right: { value: 7, type: 'Literal', raw: '7' } },
                              right:
                              { type: 'BinaryExpression',
                                operator: '<=',
                                left: { value: 6, type: 'Literal', raw: '6' },
                                right: { value: 7, type: 'Literal', raw: '7' } } } } } } } } ] } ] };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // AST Explorer input: 'var diceRoll = 6; diceRoll == 7;'
    it('should handle compound comparisons part 1 of 3', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "diceRoll" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "diceRoll" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "7" },
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
            "type": "ExpressionStatement",
            "expression": {
              "type": "BinaryExpression",
              "operator": "==",
              "left": {
                "type": "Identifier",
                "name": "diceRoll"
              },
              "right": {
                "type": "Literal",
                "value": 7,
                "raw": "7"
              }
            }
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // AST Explorer input: 'var diceRoll = 6; ++diceRoll == 7;'
    it('should handle compound comparisons part 2 of 3', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "diceRoll" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "IDENTIFIER",           value: "diceRoll" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "7" },
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
            "type": "ExpressionStatement",
            "expression": {
              "type": "BinaryExpression",
              "operator": "==",
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
            }
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // AST Explorer input: 'var diceRoll = 6; diceRoll++ == 7;'
    it('should handle compound comparisons part 3 of 3', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "diceRoll" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "diceRoll" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "7" },
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
            "type": "ExpressionStatement",
            "expression": {
              "type": "BinaryExpression",
              "operator": "==",
              "left": {
                "type": "UpdateExpression",
                "operator": "++",
                "argument": {
                  "type": "Identifier",
                  "name": "diceRoll"
                },
                "prefix": false
              },
              "right": {
                "type": "Literal",
                "value": 7,
                "raw": "7"
              }
            }
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // Swift input: 'var a = 1; var m = ++a; var n = --m;'
    it('should handle prefix operators', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "m" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "n" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "IDENTIFIER",           value: "m" },
        { type: "PUNCTUATION",          value: ";" },
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
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "m"
                },
                "init": {
                  "type": "UpdateExpression",
                  "operator": "++",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "prefix": true
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
                  "name": "n"
                },
                "init": {
                  "type": "UpdateExpression",
                  "operator": "--",
                  "argument": {
                    "type": "Identifier",
                    "name": "m"
                  },
                  "prefix": true
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

    // Swift input: 'var a = 1; var m = a++; var n = m--;'
    it('should handle postfix operators', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "m" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "n" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "m" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "-" },
        { type: "PUNCTUATION",          value: ";" },
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
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "m"
                },
                "init": {
                  "type": "UpdateExpression",
                  "operator": "++",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "prefix": false
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
                  "name": "n"
                },
                "init": {
                  "type": "UpdateExpression",
                  "operator": "--",
                  "argument": {
                    "type": "Identifier",
                    "name": "m"
                  },
                  "prefix": false
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

    // Swift input: 'var a = true; var b = !a; var c = -a; var d = +b'
    it('should handle unary operators', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "OPERATOR",                   value: "=" },
        { type: "BOOLEAN",                    value: "true" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "b" },
        { type: "OPERATOR",                   value: "=" },
        { type: "OPERATOR",                   value: "!" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "c" },
        { type: "OPERATOR",                   value: "=" },
        { type: "OPERATOR",                   value: "-" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "OPERATOR",                   value: "=" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "b" },
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
                  "name": "a"
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
                  "name": "b"
                },
                "init": {
                  "type": "UnaryExpression",
                  "operator": "!",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "prefix": true
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
                  "type": "UnaryExpression",
                  "operator": "-",
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "prefix": true
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
                  "name": "d"
                },
                "init": {
                  "type": "UnaryExpression",
                  "operator": "+",
                  "argument": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "prefix": true
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

    // input = String.raw`var x = 5; x += 4; x -= 3; x *= 2; x /= 1; x %= 2;`;
    xit('should handle compound assignment operators', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "x" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "5" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "x" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "4" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "x" },
        { type: "OPERATOR",             value: "-" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "x" },
        { type: "OPERATOR",             value: "*" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "x" },
        { type: "OPERATOR",             value: "/" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "IDENTIFIER",           value: "x" },
        { type: "OPERATOR",             value: "%" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "x"
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
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "+=",
              "left": {
                "type": "Identifier",
                "name": "x"
              },
              "right": {
                "type": "Literal",
                "value": 4,
                "raw": "4"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "-=",
              "left": {
                "type": "Identifier",
                "name": "x"
              },
              "right": {
                "type": "Literal",
                "value": 3,
                "raw": "3"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "*=",
              "left": {
                "type": "Identifier",
                "name": "x"
              },
              "right": {
                "type": "Literal",
                "value": 2,
                "raw": "2"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "/=",
              "left": {
                "type": "Identifier",
                "name": "x"
              },
              "right": {
                "type": "Literal",
                "value": 1,
                "raw": "1"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "%=",
              "left": {
                "type": "Identifier",
                "name": "x"
              },
              "right": {
                "type": "Literal",
                "value": 2,
                "raw": "2"
              }
            }
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // input = String.raw`var a = !true && true || true`;
    xit('should handle logical operators', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "!" },
        { type: "BOOLEAN",              value: "true" },
        { type: "OPERATOR",             value: "&" },
        { type: "OPERATOR",             value: "&" },
        { type: "BOOLEAN",              value: "true" },
        { type: "OPERATOR",             value: "|" },
        { type: "OPERATOR",             value: "|" },
        { type: "BOOLEAN",              value: "true" },
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
                  "name": "a"
                },
                "init": {
                  "type": "LogicalExpression",
                  "operator": "||",
                  "left": {
                    "type": "LogicalExpression",
                    "operator": "&&",
                    "left": {
                      "type": "UnaryExpression",
                      "operator": "!",
                      "argument": {
                        "type": "Literal",
                        "value": true,
                        "raw": "true"
                      },
                      "prefix": true
                    },
                    "right": {
                      "type": "Literal",
                      "value": true,
                      "raw": "true"
                    }
                  },
                  "right": {
                    "type": "Literal",
                    "value": true,
                    "raw": "true"
                  }
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

    // Swift input: 'var a = (6 == 7) ? 1 : -1'
    it('should handle ternary operators', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "OPERATOR",                   value: "=" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "NUMBER",                     value: "6" },
        { type: "OPERATOR",                   value: "=" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "7" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "?" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "OPERATOR",                   value: "-" },
        { type: "NUMBER",                     value: "1" },
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
                  "name": "a"
                },
                "init": {
                  "type": "ConditionalExpression",
                  "test": {
                    "type": "BinaryExpression",
                    "operator": "==",
                    "left": {
                      "type": "Literal",
                      "value": 6,
                      "raw": "6"
                    },
                    "right": {
                      "type": "Literal",
                      "value": 7,
                      "raw": "7"
                    }
                  },
                  "consequent": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  },
                  "alternate": {
                    "type": "UnaryExpression",
                    "operator": "-",
                    "argument": {
                      "type": "Literal",
                      "value": 1,
                      "raw": "1"
                    },
                    "prefix": true
                  }
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

    // Swift input: 'var g = 6 == 7 ? true : false;'
    it('should handle ternary operators without a parenthetical', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "g" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "7" },
        { type: "OPERATOR",             value: "?" },
        { type: "BOOLEAN",              value: "true" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "BOOLEAN",              value: "false" },
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
                  "name": "g"
                },
                "init": {
                  "type": "ConditionalExpression",
                  "test": {
                    "type": "BinaryExpression",
                    "operator": "==",
                    "left": {
                      "type": "Literal",
                      "value": 6,
                      "raw": "6"
                    },
                    "right": {
                      "type": "Literal",
                      "value": 7,
                      "raw": "7"
                    }
                  },
                  "consequent": {
                    "type": "Literal",
                    "value": true,
                    "raw": "true"
                  },
                  "alternate": {
                    "type": "Literal",
                    "value": false,
                    "raw": "false"
                  }
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

    // Swift input: 'let h = false; let i = h ? 1 : 2;'
    it('should handle ternary operators that include identifiers', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "h" },
        { type: "OPERATOR",             value: "=" },
        { type: "BOOLEAN",              value: "false" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "i" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "h" },
        { type: "OPERATOR",             value: "?" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "NUMBER",               value: "2" },
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
                  "name": "h"
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
                  "name": "i"
                },
                "init": {
                  "type": "ConditionalExpression",
                  "test": {
                    "type": "Identifier",
                    "name": "h"
                  },
                  "consequent": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  },
                  "alternate": {
                    "type": "Literal",
                    "value": 2,
                    "raw": "2"
                  }
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
  });

  describe('String concatenation and interpolation', function () {

    // Swift input: 'var k = "Stephen" + " " + "Tabor" + "!"'
    it('should handle string concatenation', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "k" },
        { type: "OPERATOR",             value: "=" },
        { type: "STRING",               value: "Stephen" },
        { type: "OPERATOR",             value: "+" },
        { type: "STRING",               value: " " },
        { type: "OPERATOR",             value: "+" },
        { type: "STRING",               value: "Tabor" },
        { type: "OPERATOR",             value: "+" },
        { type: "STRING",               value: "!" },
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
                  "name": "k"
                },
                "init": {
                  "type": "BinaryExpression",
                  "left": {
                    "type": "BinaryExpression",
                    "left": {
                      "type": "BinaryExpression",
                      "left": {
                        "type": "Literal",
                        "value": "Stephen",
                        "raw": "\"Stephen\""
                      },
                      "operator": "+",
                      "right": {
                        "type": "Literal",
                        "value": " ",
                        "raw": "\" \""
                      }
                    },
                    "operator": "+",
                    "right": {
                      "type": "Literal",
                      "value": "Tabor",
                      "raw": "\"Tabor\""
                    }
                  },
                  "operator": "+",
                  "right": {
                    "type": "Literal",
                    "value": "!",
                    "raw": "\"!\""
                  }
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

    // Swift input: 'var planet = "Earth"; let o = "\(planet)"'
    // Lexer input: 'var planet = "Earth"; let o = "\\(planet)"'
    // AST Explorer input: 'var planet = "Earth"; var o = "" + planet + ""'
    it('should handle string interpolation', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "planet" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "Earth" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "o" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "" },
        { type: "STRING_INTERPOLATION_START", value: "\\(" },
        { type: "IDENTIFIER",                 value: "planet" },
        { type: "STRING_INTERPOLATION_END",   value: ")" },
        { type: "STRING",                     value: "" },
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "planet"
                },
                "init": {
                  "type": "Literal",
                  "value": "Earth",
                  "raw": "\"Earth\""
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
                  "name": "o"
                },
                "init": {
                  "type": "BinaryExpression",
                  "operator": "+",
                  "left": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "Literal",
                      "value": "",
                      "raw": "\"\""
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "planet"
                    }
                  },
                  "right": {
                    "type": "Literal",
                    "value": "",
                    "raw": "\"\""
                  }
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

    // Swift input: 'var planet = "Earth"; let o = "Hello \(planet)!"'
    // Lexer input: 'var planet = "Earth"; let o = "Hello \\(planet)!"'
    // AST Explorer input: 'var planet = "Earth"; var o = "Hello " + planet + "!"'
    it('should handle string interpolation in the middle of a string', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "planet" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "Earth" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "o" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "Hello " },
        { type: "STRING_INTERPOLATION_START", value: "\\(" },
        { type: "IDENTIFIER",                 value: "planet" },
        { type: "STRING_INTERPOLATION_END",   value: ")" },
        { type: "STRING",                     value: "!" },
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "planet"
                },
                "init": {
                  "type": "Literal",
                  "value": "Earth",
                  "raw": "\"Earth\""
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
                  "name": "o"
                },
                "init": {
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
                      "name": "planet"
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
          }
        ],
        "sourceType": "module"
      };
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // Swift input: 'var p = "\(100 - 99), 2, 3"'
    // Lexer input: 'var p = "\\(100 - 99), 2, 3"'
    // AST Explorer input: 'var p = ""+100 - 99+", 2, 3"'
    it('should handle interpolation containing operations', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "p" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "" },
        { type: "STRING_INTERPOLATION_START", value: "\\(" },
        { type: "NUMBER",                     value: "100" },
        { type: "OPERATOR",                   value: "-" },
        { type: "NUMBER",                     value: "99" },
        { type: "STRING_INTERPOLATION_END",   value: ")" },
        { type: "STRING",                     value: ", 2, 3" },
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "name": "p"
                },
                "init": {
                  "type": "BinaryExpression",
                  "operator": "+",
                  "left": {
                    "type": "BinaryExpression",
                    "operator": "-",
                    "left": {
                      "type": "BinaryExpression",
                      "operator": "+",
                      "left": {
                        "type": "Literal",
                        "value": "",
                        "raw": "\"\""
                      },
                      "right": {
                        "type": "Literal",
                        "value": 100,
                        "raw": "100"
                      }
                    },
                    "right": {
                      "type": "Literal",
                      "value": 99,
                      "raw": "99"
                    }
                  },
                  "right": {
                    "type": "Literal",
                    "value": ", 2, 3",
                    "raw": "\", 2, 3\""
                  }
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

    // input = String.raw`let a = 3; let b = 5; let sum = "the sum of a and b is \(a + b).";`;
    // AST Explorer input: 'var a = 3; var b = 5; var sum = "the sum of a and b is " + a + b + ".";'
    xit('should handle interpolation containing operations on identifiers', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "3" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "b" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "5" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "sum" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "the sum of a and b is " },
        { type: "STRING_INTERPOLATION_START", value: "\\(" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "b" },
        { type: "STRING_INTERPOLATION_END",   value: ")" },
        { type: "STRING",                     value: "." },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF" }
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
                  "value": 3,
                  "raw": "3"
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
                        "type": "Literal",
                        "value": "the sum of a and b is ",
                        "raw": "\"the sum of a and b is \""
                      },
                      "right": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "b"
                    }
                  },
                  "right": {
                    "type": "Literal",
                    "value": ".",
                    "raw": "\".\""
                  }
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
  });

  describe('Nested collections', function () {

    // Swift input: 'let q = ["array1": [1,2,3], "array2": [4,5,6]];'
    // AST Explorer input: 'var q = ["array1": [1,2,3], "array2": [4,5,6]];'
    it('should handle dictionaries of arrays', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "q" },
        { type: "OPERATOR",             value: "=" },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "STRING",               value: "array1" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "3" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "STRING",               value: "array2" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "4" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "5" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "6" },
        { type: "ARRAY_END",            value: "]" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "q"
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
                        "value": "array1",
                        "raw": "\"array1\""
                      },
                      "value": {
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
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "value": "array2",
                        "raw": "\"array2\""
                      },
                      "value": {
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
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // Swift input: 'var arr = [1, 2]; var s = arr[0];'
    it('should handle array access', function () {
      //TODO Commented out tokens were added by Verlon and Rex
      //TODO arr access w/out initialization throws exception
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "s" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "NUMBER",               value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",     value: "]" },
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "arr"
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
                  "name": "s"
                },
                "init": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                    "type": "Identifier",
                    "name": "arr"
                  },
                  "property": {
                    "type": "Literal",
                    "value": 0,
                    "raw": "0"
                  }
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

    // Swift input: 'let arr = [1, 2]; let t = 100; var u = arr[t - 99];'
    // AST Explorer input: 'var arr = [1, 2]; var t = 100; var u = arr[t - 99];'
    it('should handle array access with numeric operations', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "t" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "100" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "u" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "PUNCTUATION",          value: "[" },
        { type: "IDENTIFIER",           value: "t" },
        { type: "OPERATOR",             value: "-" },
        { type: "NUMBER",               value: "99" },
        { type: "PUNCTUATION",          value: "]" },
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "arr"
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
                  "name": "t"
                },
                "init": {
                  "type": "Literal",
                  "value": 100,
                  "raw": "100"
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
                  "name": "u"
                },
                "init": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                    "type": "Identifier",
                    "name": "arr"
                  },
                  "property": {
                    "type": "BinaryExpression",
                    "operator": "-",
                    "left": {
                      "type": "Identifier",
                      "name": "t"
                    },
                    "right": {
                      "type": "Literal",
                      "value": 99,
                      "raw": "99"
                    }
                  }
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

    // Swift input: 'let arr = [1,2]; var u = [arr[0]];'
    it('should handle arrays that contain a substring lookup', function () {
      //TODO Works when token.type of SUBSCRIPT_LOOKUP is replaced with token.type PUNCTUATION
      //TODO Why no longer just
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "u" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "SUBSCRIPT_LOOKUP_START",     value: "[" },
        { type: "NUMBER",               value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",     value: "]" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "arr"
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
                  "name": "u"
                },
                "init": {
                  "type": "ArrayExpression",
                  "elements": [
                    {
                      "type": "MemberExpression",
                      "computed": true,
                      "object": {
                        "type": "Identifier",
                        "name": "arr"
                      },
                      "property": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                      }
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

    // Swift input: 'let firstNum = 1; let secNum = 2; var dict = [firstNum: [[1,2], [3,4]], secNum: [["one", "two"], ["three", "four"]]];'
    // AST Explorer input:
    /*
     var firstNum = 1;
     var secNum = 2;
     var dict = {};
     dict[firstNum] = [[1,2], [3,4]];
     dict[secNum] = [["one", "two"], ["three", "four"]];
     */
    it('should handle basic dynamic key assignment in dictionary creation', function() {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "firstNum" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "secNum" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "dict" },
        { type: "OPERATOR",             value: "=" },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "IDENTIFIER",           value: "firstNum" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "ARRAY_START",          value: "[" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "4" },
        { type: "ARRAY_END",            value: "]" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "IDENTIFIER",           value: "secNum" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "ARRAY_START",          value: "[" },
        { type: "ARRAY_START",          value: "[" },
        { type: "STRING",               value: "one" },
        { type: "PUNCTUATION",          value: "," },
        { type: "STRING",               value: "two" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "ARRAY_START",          value: "[" },
        { type: "STRING",               value: "three" },
        { type: "PUNCTUATION",          value: "," },
        { type: "STRING",               value: "four" },
        { type: "ARRAY_END",            value: "]" },
        { type: "ARRAY_END",            value: "]" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "firstNum"
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
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "secNum"
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
                  "name": "dict"
                },
                "init": {
                  "type": "ObjectExpression",
                  "properties": []
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "MemberExpression",
                "computed": true,
                "object": {
                  "type": "Identifier",
                  "name": "dict"
                },
                "property": {
                  "type": "Identifier",
                  "name": "firstNum"
                }
              },
              "right": {
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
                      }
                    ]
                  },
                  {
                    "type": "ArrayExpression",
                    "elements": [
                      {
                        "type": "Literal",
                        "value": 3,
                        "raw": "3"
                      },
                      {
                        "type": "Literal",
                        "value": 4,
                        "raw": "4"
                      }
                    ]
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "MemberExpression",
                "computed": true,
                "object": {
                  "type": "Identifier",
                  "name": "dict"
                },
                "property": {
                  "type": "Identifier",
                  "name": "secNum"
                }
              },
              "right": {
                "type": "ArrayExpression",
                "elements": [
                  {
                    "type": "ArrayExpression",
                    "elements": [
                      {
                        "type": "Literal",
                        "value": "one",
                        "raw": "\"one\""
                      },
                      {
                        "type": "Literal",
                        "value": "two",
                        "raw": "\"two\""
                      }
                    ]
                  },
                  {
                    "type": "ArrayExpression",
                    "elements": [
                      {
                        "type": "Literal",
                        "value": "three",
                        "raw": "\"three\""
                      },
                      {
                        "type": "Literal",
                        "value": "four",
                        "raw": "\"four\""
                      }
                    ]
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

    // Swift input: 'let arr = [1,2]; var v = [arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]]];'
    // AST Explorer input: 'var arr = [1,2]; var v = {}; v[arr[0]] = [[1,2], [3,4]]; v[arr[1]] = [["one", "two"], ["three", "four"]];'
    it('should handle arrays of dictionaries', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "OPERATOR",             value: "=" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "v" },
        { type: "OPERATOR",             value: "=" },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "PUNCTUATION",          value: "[" },
        { type: "NUMBER",               value: "0" },
        { type: "PUNCTUATION",          value: "]" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "ARRAY_START",          value: "[" },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "ARRAY_START",          value: "[" },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "4" },
        { type: "ARRAY_END",            value: "]" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "PUNCTUATION",          value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: "]" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "ARRAY_START",          value: "[" },
        { type: "ARRAY_START",          value: "[" },
        { type: "STRING",               value: "one" },
        { type: "PUNCTUATION",          value: "," },
        { type: "STRING",               value: "two" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "ARRAY_START",          value: "[" },
        { type: "STRING",               value: "three" },
        { type: "PUNCTUATION",          value: "," },
        { type: "STRING",               value: "four" },
        { type: "ARRAY_END",            value: "]" },
        { type: "ARRAY_END",            value: "]" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "arr"
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
                  "name": "v"
                },
                "init": {
                  "type": "ObjectExpression",
                  "properties": []
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "MemberExpression",
                "computed": true,
                "object": {
                  "type": "Identifier",
                  "name": "v"
                },
                "property": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                    "type": "Identifier",
                    "name": "arr"
                  },
                  "property": {
                    "type": "Literal",
                    "value": 0,
                    "raw": "0"
                  }
                }
              },
              "right": {
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
                      }
                    ]
                  },
                  {
                    "type": "ArrayExpression",
                    "elements": [
                      {
                        "type": "Literal",
                        "value": 3,
                        "raw": "3"
                      },
                      {
                        "type": "Literal",
                        "value": 4,
                        "raw": "4"
                      }
                    ]
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "MemberExpression",
                "computed": true,
                "object": {
                  "type": "Identifier",
                  "name": "v"
                },
                "property": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                    "type": "Identifier",
                    "name": "arr"
                  },
                  "property": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  }
                }
              },
              "right": {
                "type": "ArrayExpression",
                "elements": [
                  {
                    "type": "ArrayExpression",
                    "elements": [
                      {
                        "type": "Literal",
                        "value": "one",
                        "raw": "\"one\""
                      },
                      {
                        "type": "Literal",
                        "value": "two",
                        "raw": "\"two\""
                      }
                    ]
                  },
                  {
                    "type": "ArrayExpression",
                    "elements": [
                      {
                        "type": "Literal",
                        "value": "three",
                        "raw": "\"three\""
                      },
                      {
                        "type": "Literal",
                        "value": "four",
                        "raw": "\"four\""
                      }
                    ]
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

    // input = String.raw `var firstNum = 1
    //                     var secondNum = 2
    //                     var firstDict = [firstNum: ["one", "two"], secondNum: ["three", "four"]]
    //                     var secondDict = [-3+4: [1,2], (2*3)-4: [3,4]]`;
    xit('should handle translation of dictionary keys', function () {
      input = [
       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "firstNum" },
       { type: "OPERATOR",                      value: "=" },
       { type: "NUMBER",                        value: "1" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "secondNum" },
       { type: "OPERATOR",                      value: "=" },
       { type: "NUMBER",                        value: "2" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "firstDict" },
       { type: "OPERATOR",                      value: "=" },
       { type: "DICTIONARY_START",              value: "[" },
       { type: "IDENTIFIER",                    value: "firstNum" },
       { type: "PUNCTUATION",                   value: ":" },
       { type: "ARRAY_START",                   value: "[" },
       { type: "STRING",                        value: "one" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "STRING",                        value: "two" },
       { type: "ARRAY_END",                     value: "]" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "IDENTIFIER",                    value: "secondNum" },
       { type: "PUNCTUATION",                   value: ":" },
       { type: "ARRAY_START",                   value: "[" },
       { type: "STRING",                        value: "three" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "STRING",                        value: "four" },
       { type: "ARRAY_END",                     value: "]" },
       { type: "DICTIONARY_END",                value: "]" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "secondDict" },
       { type: "OPERATOR",                      value: "=" },
       { type: "DICTIONARY_START",              value: "[" },
       { type: "OPERATOR",                      value: "-" },
       { type: "NUMBER",                        value: "3" },
       { type: "OPERATOR",                      value: "+" },
       { type: "NUMBER",                        value: "4" },
       { type: "PUNCTUATION",                   value: ":" },
       { type: "ARRAY_START",                   value: "[" },
       { type: "NUMBER",                        value: "1" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "NUMBER",                        value: "2" },
       { type: "ARRAY_END",                     value: "]" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "PUNCTUATION",                   value: "(" },
       { type: "NUMBER",                        value: "2" },
       { type: "OPERATOR",                      value: "*" },
       { type: "NUMBER",                        value: "3" },
       { type: "PUNCTUATION",                   value: ")" },
       { type: "OPERATOR",                      value: "-" },
       { type: "NUMBER",                        value: "4" },
       { type: "PUNCTUATION",                   value: ":" },
       { type: "ARRAY_START",                   value: "[" },
       { type: "NUMBER",                        value: "3" },
       { type: "PUNCTUATION",                   value: "," },
       { type: "NUMBER",                        value: "4" },
       { type: "ARRAY_END",                     value: "]" },
       { type: "DICTIONARY_END",                value: "]" },
       { type: "TERMINATOR",                    value: "EOF" }
      ];
      output = "FILL_ME_IN";
      expect(R.equals(parser(input), output)).to.equal(true);
    });

    // Test 21 - Swift input: 'var w = [1: [[1: "two"], [3: "four"]], 2: [["one": 2], ["three": 4]]];'
    // AST Explorer input: 'var w = {1:[{1: "two"}, {3: "four"}],2:[{"one": 2},{"three": 4}]};'
    it('should handle multi-nested lists', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "w" },
        { type: "OPERATOR",             value: "=" },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "ARRAY_START",          value: "[" },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "STRING",               value: "two" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "STRING",               value: "four" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "ARRAY_END",            value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "NUMBER",               value: "2" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "ARRAY_START",          value: "[" },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "STRING",               value: "one" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "NUMBER",               value: "2" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "PUNCTUATION",          value: "," },
        { type: "DICTIONARY_START",     value: "[" },
        { type: "STRING",               value: "three" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "NUMBER",               value: "4" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "ARRAY_END",            value: "]" },
        { type: "DICTIONARY_END",       value: "]" },
        { type: "PUNCTUATION",          value: ";" },
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
                  "name": "w"
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
                        "type": "ArrayExpression",
                        "elements": [
                          {
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
                                  "value": "two",
                                  "raw": "\"two\""
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                              }
                            ]
                          },
                          {
                            "type": "ObjectExpression",
                            "properties": [
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
                                  "value": "four",
                                  "raw": "\"four\""
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                              }
                            ]
                          }
                        ]
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
                        "type": "ArrayExpression",
                        "elements": [
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
                                  "value": 2,
                                  "raw": "2"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                              }
                            ]
                          },
                          {
                            "type": "ObjectExpression",
                            "properties": [
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
                                  "value": 4,
                                  "raw": "4"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                              }
                            ]
                          }
                        ]
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
  });
});