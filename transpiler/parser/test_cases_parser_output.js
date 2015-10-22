var escodegen = require('escodegen');

var test_cases = [

  // ***** TEST 1 *****
  // Swift input: 'var a = 3'
  {
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
              "name": "a"
            },
            "init": {
              "type": "Literal",
              "value": 3,
              "raw": "3"
            }
          }
        ]
      }
    ]
  },

  // ***** TEST 2 *****
  // Swift input: 'var b = "hello"'
  {
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
              "name": "b"
            },
            "init": {
              "type": "Literal",
              "value": "hello",
              "raw": "\"hello\""
            }
          }
        ]
      }
    ]
  },

  // ***** TEST 3 *****
  // Swift input: 'var c = true'
  {
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
              "name": "c"
            },
            "init": {
              "type": "Literal",
              "value": true,
              "raw": "true"
            }
          }
        ]
      }
    ]
  },

  // ***** TEST 4 *****
  // Swift input: 'var d = "Test this"'
  {
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
              "name": "d"
            },
            "init": {
              "type": "Literal",
              "value": "Test this",
              "raw": "\"Test this\""
            }
          }
        ]
      }
    ]
  },

  // ***** TEST 5 *****
  // Swift input: 'var e = ["Eggs", "Milk", "Bacon"]'
  {
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
        ]
      }
    ]
  },

  // ***** TEST 6 *****
  // Swift input: 'var f = ["one": 1, "two": 2, "three": 3]'
  {
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
      }
    ]
  },

  // ***** TEST 7 *****
  // Swift input: 'let g = [1 : "one",2   :"two", 3: "three"]'
  {
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
        ]
      }
    ]
  },

  // ***** TEST 8 *****
  // Swift input: 'let h = 3.14'
  {
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
              "name": "h"
            },
            "init": {
              "type": "Literal",
              "value": 3.14,
              "raw": "3.14"
            }
          }
        ]
      }
    ]
  },

  // ***** TEST 9 *****
  // Swift input: 'let i = 5+6'
  {
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
              "name": "i"
            },
            "init": {
              "type": "BinaryExpression",
              "operator": "+",
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
            }
          }
        ]
      }
    ]
  },

  // ***** TEST 10 *****
  // Swift input: 'var j = 5 + 6 / 4 - (-16 % 4.2) * 55'
  {
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
              "name": "j"
            },
            "init": {
              "type": "BinaryExpression",
              "operator": "-",
              "left": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                  "type": "Literal",
                  "value": 5,
                  "raw": "5"
                },
                "right": {
                  "type": "BinaryExpression",
                  "operator": "/",
                  "left": {
                    "type": "Literal",
                    "value": 6,
                    "raw": "6"
                  },
                  "right": {
                    "type": "Literal",
                    "value": 4,
                    "raw": "4"
                  }
                }
              },
              "right": {
                "type": "BinaryExpression",
                "operator": "*",
                "left": {
                  "type": "BinaryExpression",
                  "operator": "%",
                  "left": {
                    "type": "UnaryExpression",
                    "operator": "-",
                    "argument": {
                      "type": "Literal",
                      "value": 16,
                      "raw": "16"
                    },
                    "prefix": true
                  },
                  "right": {
                    "type": "Literal",
                    "value": 4.2,
                    "raw": "4.2"
                  }
                },
                "right": {
                  "type": "Literal",
                  "value": 55,
                  "raw": "55"
                }
              }
            }
          }
        ]
      }
    ]
  },

  // ***** TEST 11 *****
  // Swift input: 'var k = "Stephen" + " " + "Tabor" + "!"'
  {
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
              "name": "k"
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
                    "value": "Stephen",
                    "raw": "\"Stephen\""
                  },
                  "right": {
                    "type": "Literal",
                    "value": " ",
                    "raw": "\" \""
                  }
                },
                "right": {
                  "type": "Literal",
                  "value": "Tabor",
                  "raw": "\"Tabor\""
                }
              },
              "right": {
                "type": "Literal",
                "value": "!",
                "raw": "\"!\""
              }
            }
          }
        ]
      }
    ]
  },

  // ***** TEST 12 *****
  // Swift input: 'let l = 6 !== 9'
  {
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
              "name": "l"
            },
            "init": {
              "type": "BinaryExpression",
              "operator": "!==",
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
        ]
      }
    ]
  },

  // ***** TEST 13 *****
  // Swift input: 'var a = 1; var m = ++a;'
  {
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
              "name": "a"
            },
            "init": {
              "type": "Literal",
              "value": 1,
              "raw": "1"
            }
          }
        ]
      },
      {
        "type": "VariableDeclaration",
        "kind": "var",
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
        ]
      }
    ]
  },

  // ***** TEST 14 *****
  // Swift input: 'var a = 1; var n = a++;'
  {
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
              "name": "a"
            },
            "init": {
              "type": "Literal",
              "value": 1,
              "raw": "1"
            }
          }
        ]
      },
      {
        "type": "VariableDeclaration",
        "kind": "var",
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
        ]
      }
    ]
  },

  // ***** TEST 15 *****
  // Swift input: 'var planet = "Earth"; let o = "Hello \\(planet)!"'
  {
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
              "name": "planet"
            },
            "init": {
              "type": "Literal",
              "value": "Earth",
              "raw": "\"Earth\""
            }
          }
        ]
      },
      {
        "type": "VariableDeclaration",
        "kind": "var",
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
        ]
      }
    ]
  },

  // ***** TEST 16 *****
  // Swift input: 'var planet = "Earth"; let o = "\\(planet)"'
  {
    "type": "Program",
    "sourceType": "module",
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
        "kind": "var",
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
        ]
      }
    ]
  },


  // ***** TEST 17 *****
  // Swift input: 'var p = "\\(100 - 99), 2, 3"'
  {
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
        ]
      }
    ]
  },

  // ***** TEST 18 *****
  // Swift input: 'let q = ["array1": [1,2,3], "array2": [4,5,6]];'
  {
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
              "name": "q"
            },
            "init": {
              "type": "ObjectExpression",
              "properties": [
                {
                  "type": "Property",
                  "key": {
                    "type": "Literal",
                    "value": "array1",
                    "raw": "\"array1\""
                  },
                  "computed": false,
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
                  "kind": "init",
                  "method": false,
                  "shorthand": false
                },
                {
                  "type": "Property",
                  "key": {
                    "type": "Literal",
                    "value": "array2",
                    "raw": "\"array2\""
                  },
                  "computed": false,
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
                  "kind": "init",
                  "method": false,
                  "shorthand": false
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // ***** TEST 19 *****
  // Swift input: 'var s = arr[0];'
  {
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
        ]
      }
    ]
  },

  // ***** TEST 20 *****
  // Swift input: 'let arr = [1, 2]; let t = 100; var u = arr[t - 99];'
  {
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
        ]
      },
      {
        "type": "VariableDeclaration",
        "kind": "var",
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
        ]
      },
      {
        "type": "VariableDeclaration",
        "kind": "var",
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
        ]
      }
    ]
  },

  // ***** TEST 21 ***** TODO Did not pass
  // Swift input: 'let arr = [1,2]; var v = [ arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]] ];'
  // Swift input: let arr = [1,2]; var v = [  ];
  // Swift input: v[arr[0]] = [[1,2], [3,4]];
  // Swift input: v[arr[1]] = [["one", "two"], ["three", "four"]];
  {
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
        ]
      },
      {
        "type": "VariableDeclaration",
        "kind": "var",
        "declarations": [
          {
            "type": "VariableDeclarator",
            "id": {
              "type": "Identifier",
              "name": "v"
            },
            "init": {
              "type": "ArrayExpression",
              "elements": []
            }
          }
        ]
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
    ]
  },

  // ***** TEST 22 *****
  // Swift input: 'var w = [1: [[1: "two"], [3: "four"]], 2: [["one": 2], ["three": 4]]];'
  {
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
              "name": "w"
            },
            "init": {
              "type": "ObjectExpression",
              "properties": [
                {
                  "type": "Property",
                  "computed": false,
                  "kind": "init",
                  "method": false,
                  "shorthand": false,
                  "key": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  },
                  "value": {
                    "type": "ArrayExpression",
                    "elements": [
                      {
                        "type": "ObjectExpression",
                        "properties": [
                          {
                            "type": "Property",
                            "computed": false,
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "key": {
                              "type": "Literal",
                              "value": 1,
                              "raw": "1"
                            },
                            "value": {
                              "type": "Literal",
                              "value": "two",
                              "raw": "\"two\""
                            }
                          }
                        ]
                      },
                      {
                        "type": "ObjectExpression",
                        "properties": [
                          {
                            "type": "Property",
                            "computed": false,
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "key": {
                              "type": "Literal",
                              "value": 3,
                              "raw": "3"
                            },
                            "value": {
                              "type": "Literal",
                              "value": "four",
                              "raw": "\"four\""
                            }
                          }
                        ]
                      }
                    ]
                  }
                },
                {
                  "type": "Property",
                  "computed": false,
                  "kind": "init",
                  "method": false,
                  "shorthand": false,
                  "key": {
                    "type": "Literal",
                    "value": 2,
                    "raw": "2"
                  },
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
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "value": {
                              "type": "Literal",
                              "value": 2,
                              "raw": "2"
                            }
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
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "value": {
                              "type": "Literal",
                              "value": 4,
                              "raw": "4"
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  }

];

module.exports = test_cases;