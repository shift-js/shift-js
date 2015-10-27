var make_parser = require('../parser');
var expect = require('chai').expect;
var util = require('util');
var R = require('ramda');
var parser;

describe('Parser', function() {
  beforeEach(function() {
    parser = make_parser();
  });
  describe('First milestone', function() {
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
      xit('should handle variable reassignment', function () {
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

      // Swift input: 'var my_var = 5'
      xit('should handle variable names with underscores', function () {
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

      // Test 3 - Swift input: 'var c = true'
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

      // Test 4 - Swift input: 'var d = "Test this"'
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
    });

    describe('Basic collections and constants', function () {

      // Swift input: 'var empty = []'
      xit('should handle empty arrays', function () {
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
      xit('should handle empty dictionaries', function () {
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
      xit('should handle arrays with erratic spacing', function () {
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

      // 'var l = 6 != 7 || (6 == 7 || (6 > 7 || (6 < 7 || (6 >= 7 || 6 <= 7))));'
      // 'var l = 6 != 7 ||  6 == 7 ||  6 > 7 ||  6 < 7 ||  6 >= 7 || 6 <= 7;';
      it('should handle comparisons', function () {
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

      // Swift input: 'var a = 1...5'
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

      // Test 15 - Swift input: 'var planet = "Earth"; let o = "Hello \(planet)!"'
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

      // Test 16 - Swift input: 'var p = "\(100 - 99), 2, 3"'
      // Lexer input: 'var p = "\\(100 - 99), 2, 3"'
      // AST Explorer input: 'var p = ""+100 - 99+", 2, 3"'
      it('should handle interpolation of operations', function () {
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
    });

    describe('Nested collections', function () {

      // Test 17 - Swift input: 'let q = ["array1": [1,2,3], "array2": [4,5,6]];'
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

      // Test 18 - Swift input: 'var arr = [1, 2]; var s = arr[0];'
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
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "NUMBER",               value: "0" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
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

      // Test 19 - Swift input: 'let arr = [1, 2]; let t = 100; var u = arr[t - 99];'
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
      it('should handle arrays of that contain a substring lookup', function () {
        //TODO Works when token.type of SUBSTRING_LOOKUP is replaced with token.type PUNCTUATION
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
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "NUMBER",               value: "0" },
          { type: "SUBSTRING_LOOKUP_END",     value: "]" },
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



      // Test 20 - Swift input: 'let arr = [1,2]; var v = [arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]]];'
      // AST Explorer input: 'let arr = [1,2]; var v = {}; v[arr[0]] = [[1,2], [3,4]]; v[arr[1]] = [["one", "two"], ["three", "four"]];'
      xit('should handle arrays of dictionaries', function () {
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
              "kind": "let"
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

    xdescribe('Multi-line statements', function() {

      // input = String.raw`var b = true;
      //          var c = 0;`;
      xit('should handle simple multi-line variable assignment', function() {
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
          "start": 0,
          "end": 24,
          "body": [
            {
              "type": "VariableDeclaration",
              "start": 0,
              "end": 13,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 4,
                  "end": 12,
                  "id": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "b"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 8,
                    "end": 12,
                    "value": true,
                    "raw": "true"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 14,
              "end": 24,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 18,
                  "end": 23,
                  "id": {
                    "type": "Identifier",
                    "start": 18,
                    "end": 19,
                    "name": "c"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 22,
                    "end": 23,
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
      xit('should handle complex multi-line variable assignment without semi-colons', function() {
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
          "start": 0,
          "end": 117,
          "body": [
            {
              "type": "VariableDeclaration",
              "start": 0,
              "end": 33,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 4,
                  "end": 33,
                  "id": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "name": "e"
                  },
                  "init": {
                    "type": "ArrayExpression",
                    "start": 8,
                    "end": 33,
                    "elements": [
                      {
                        "type": "Literal",
                        "start": 9,
                        "end": 15,
                        "value": "Eggs",
                        "raw": "\"Eggs\""
                      },
                      {
                        "type": "Literal",
                        "start": 17,
                        "end": 23,
                        "value": "Milk",
                        "raw": "\"Milk\""
                      },
                      {
                        "type": "Literal",
                        "start": 25,
                        "end": 32,
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
              "start": 34,
              "end": 74,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 38,
                  "end": 74,
                  "id": {
                    "type": "Identifier",
                    "start": 38,
                    "end": 39,
                    "name": "f"
                  },
                  "init": {
                    "type": "ObjectExpression",
                    "start": 42,
                    "end": 74,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 43,
                        "end": 51,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 43,
                          "end": 48,
                          "value": "one",
                          "raw": "\"one\""
                        },
                        "value": {
                          "type": "Literal",
                          "start": 50,
                          "end": 51,
                          "value": 1,
                          "raw": "1"
                        },
                        "kind": "init"
                      },
                      {
                        "type": "Property",
                        "start": 53,
                        "end": 61,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 53,
                          "end": 58,
                          "value": "two",
                          "raw": "\"two\""
                        },
                        "value": {
                          "type": "Literal",
                          "start": 60,
                          "end": 61,
                          "value": 2,
                          "raw": "2"
                        },
                        "kind": "init"
                      },
                      {
                        "type": "Property",
                        "start": 63,
                        "end": 73,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 63,
                          "end": 70,
                          "value": "three",
                          "raw": "\"three\""
                        },
                        "value": {
                          "type": "Literal",
                          "start": 72,
                          "end": 73,
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
              "start": 75,
              "end": 117,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 79,
                  "end": 117,
                  "id": {
                    "type": "Identifier",
                    "start": 79,
                    "end": 80,
                    "name": "g"
                  },
                  "init": {
                    "type": "ObjectExpression",
                    "start": 83,
                    "end": 117,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 84,
                        "end": 93,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 84,
                          "end": 85,
                          "value": 1,
                          "raw": "1"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 88,
                          "end": 93,
                          "value": "one",
                          "raw": "\"one\""
                        },
                        "kind": "init"
                      },
                      {
                        "type": "Property",
                        "start": 94,
                        "end": 104,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 94,
                          "end": 95,
                          "value": 2,
                          "raw": "2"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 99,
                          "end": 104,
                          "value": "two",
                          "raw": "\"two\""
                        },
                        "kind": "init"
                      },
                      {
                        "type": "Property",
                        "start": 106,
                        "end": 116,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 106,
                          "end": 107,
                          "value": 3,
                          "raw": "3"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 109,
                          "end": 116,
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
      })

      // input = String.raw`var name: String = "Joe"
      //         let num: Int = 5;
      //         let anotherNum: UInt16 = 6
      //         var yetAnotherNum: Float = 4.2;
      //         let truth: Bool = false
      //         `;
      // AST explorer input:
      // var nam = "Joe"
      // var num = 5;
      // var anotherNum = 6
      // var yetAnotherNum = 4.2;
      // var truth = false
      xit('should handle simple multi-line variable assignment with type annotations', function() {
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
          "start": 0,
          "end": 90,
          "body": [
            {
              "type": "VariableDeclaration",
              "start": 0,
              "end": 15,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 4,
                  "end": 15,
                  "id": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 7,
                    "name": "nam"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 10,
                    "end": 15,
                    "value": "Joe",
                    "raw": "\"Joe\""
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 16,
              "end": 28,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 20,
                  "end": 27,
                  "id": {
                    "type": "Identifier",
                    "start": 20,
                    "end": 23,
                    "name": "num"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 26,
                    "end": 27,
                    "value": 5,
                    "raw": "5"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 29,
              "end": 47,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 33,
                  "end": 47,
                  "id": {
                    "type": "Identifier",
                    "start": 33,
                    "end": 43,
                    "name": "anotherNum"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 46,
                    "end": 47,
                    "value": 6,
                    "raw": "6"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 48,
              "end": 72,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 52,
                  "end": 71,
                  "id": {
                    "type": "Identifier",
                    "start": 52,
                    "end": 65,
                    "name": "yetAnotherNum"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 68,
                    "end": 71,
                    "value": 4.2,
                    "raw": "4.2"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 73,
              "end": 90,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 77,
                  "end": 90,
                  "id": {
                    "type": "Identifier",
                    "start": 77,
                    "end": 82,
                    "name": "truth"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 85,
                    "end": 90,
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
      xit('should handle successive single-line comments', function() {
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
          "start": 0,
          "end": 140,
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
      xit('should handle multi-line comments', function() {
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
          "start": 0,
          "end": 25,
          "body": [],
          "sourceType": "module"
        };
        expect(R.equals(parser(input), output)).to.equal(true);
      });
    });

    xdescribe('Multi-line if statements', function() {

      // input = String.raw`var a = false
      //         var b = 0;
      //         if (a) {
      //           b++;
      //         }`;
      xit('should handle simple multi-line if statements', function() {
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
