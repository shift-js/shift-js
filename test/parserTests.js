var parser = require('../parser');
var expect = require('chai').expect;

describe('Parser', function() {
  describe('Basic tests', function () {

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
      expect(parser(input)).to.equal(output);
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
      expect(parser(input)).to.equal(output);
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
      expect(parser(input)).to.equal(output);
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
      expect(parser(input)).to.equal(output);
    });
  });

  // Swift input: 'var e = ["Eggs", "Milk", "Bacon"]'
  describe('Basic collections', function () {
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
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'var f = ["one": 1, "two": 2, "three": 3]'
    it('should handle dictionaries', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "d" },
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
          }
        ],
        "sourceType": "module"
      };
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'let g = [1 : "one",2   :"two", 3: "three"]'
    it('should handle let', function () {
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
      expect(parser(input)).to.equal(output);
    });
  });

  describe('Numbers and operations', function () {

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
      expect(parser(input)).to.equal(output);
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
      expect(parser(input)).to.equal(output);
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
      expect(parser(input)).to.equal(output);
    });

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
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'let l = 6 !== 9'
    it('should handle comparisons', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "l" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "6" },
        { type: "OPERATOR",             value: "!" },
        { type: "OPERATOR",             value: "=" },
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
                  "left": {
                    "type": "Literal",
                    "value": 6,
                    "raw": "6"
                  },
                  "operator": "!==",
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
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'var a = 1; var m = ++a;'
    it('should handle preincrement', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "m" },
        { type: "OPERATOR",             value: "=" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
        { type: "IDENTIFIER",           value: "a" },
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
                  "prefix": true,
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  }
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'var a = 1; var n = a++;'
    it('should handle postincrement', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "NUMBER",               value: "3" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "n" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "OPERATOR",             value: "+" },
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
                  "name": "n"
                },
                "init": {
                  "type": "UpdateExpression",
                  "operator": "++",
                  "prefix": false,
                  "argument": {
                    "type": "Identifier",
                    "name": "a"
                  }
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(parser(input)).to.equal(output);
    });
  });

  describe('String interpolation', function () {

    // Swift input: 'let o = "Hello \(planet)!"'
    it('should handle string interpolation', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "o" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "Hello " },
        { type: "STRING_INTEEPOLATION_START", value: "\(" },
        { type: "IDENTIFIER",                 value: "planet" },
        { type: "STRING_INTEEPOLATION_END",   value: ")" },
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
                  "name": "o"
                },
                "init": {
                  "type": "Literal",
                  "value": "Hello (planet)!",
                  "raw": "\"Hello \\(planet)!\""
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'var p = "\(100 - 99), 2, 3"'
    it('should handle interpolation of operations', function () {
      input = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "p" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING_INTEEPOLATION_START", value: "\(" },
        { type: "NUMBER",                     value: "100" },
        { type: "OPERATOR",                   value: "-" },
        { type: "NUMBER",                     value: "99" },
        { type: "STRING_INTEEPOLATION_END",   value: ")" },
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
                  "type": "Literal",
                  "value": "(100 - 99), 2, 3",
                  "raw": "\"\\(100 - 99), 2, 3\""
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(parser(input)).to.equal(output);
    });
  });

  describe('Nested collections and semicolons', function () {

    // Swift input: 'let q = ["array1": [1,2,3], "array2": [4,5,6]];'
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
            "start": 4,
            "end": 5,
            "range": [
              4,
              5
            ],
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
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'var s = arr[0];'
    it('should handle array access', function () {
      input = [
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: "s" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "arr" },
        { type: "PUNCTUATION",          value: "[" },
        { type: "NUMBER",               value: "0" },
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
                  "name": "s"
                },
                "init": {
                  "type": "MemberExpression",
                  "object": {
                    "type": "Identifier",
                    "name": "arr"
                  },
                  "property": {
                    "type": "Literal",
                    "value": 0,
                    "raw": "0"
                  },
                  "computed": true
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "module"
      };
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'let arr = [1, 2]; let t = 100; var u = arr[t - 99];'
    it('should handle multiple statements on a single line separated by semicolons', function () {
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
      output = "FILL ME IN";
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'let arr = [1,2]; var v = [arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]]];'
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
      output = "FILL ME IN";
      expect(parser(input)).to.equal(output);
    });

    // Swift input: 'var w = [1: [[1: "two"], [3: "four"]], 2: [["one": 2], ["three": 4]]];'
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
      output = "FILL ME IN";
      expect(parser(input)).to.equal(output);
    });
  });
});