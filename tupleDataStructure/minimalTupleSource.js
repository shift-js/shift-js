//function Tuple(tuple) {
//  this.tup = {};
//  if (Array.isArray(tuple)) {
//    for (var i = 0; i < tuple.length; i++) {
//      if (typeof tuple[i] === "object" && !Array.isArray(tuple[i])) {
//        var key = Object.keys(tuple[i])[0];
//        var val = tuple[i][key];
//        this.tup[key] = {'val': val, 'key': i};
//        this.tup[i] = {'val': val, 'key': key};
//      } else if (typeof tuple[i] === "boolean" || typeof tuple[i] === "number" || typeof tuple[i] === "string") {
//        this.tup[i] = {'val': tuple[i]};
//      } else if (Array.isArray(tuple[i])) {
//        this.tup[i] = new Tuple(tuple[i]);
//      } else {
//        return null;
//      }
//    }
//  }
//};
//Tuple.prototype.findValue = function(keyOrIndex){
//  var x = this.tup[keyOrIndex];
//  if (x instanceof Tuple ) {
//    return x["tup"];
//  } else {
//    return x === undefined ? undefined : this.tup[keyOrIndex]["val"];
//  }
//};
//
//Tuple.prototype.modifyVal = function(keyOrIndex, newVal) {
//  var x = this.tup[keyOrIndex];
//  if (x === undefined) {
//    return false;
//  }
//  if (typeof x['val'] === typeof newVal) {
//    x['val'] = newVal;
//    if (x.hasOwnProperty('key')) {
//      var otherKey = x['key'];
//      this.tup[otherKey]['val'] = newVal;
//    }
//    return true;
//  }
//  return false;
//};
//Tuple.prototype.constructor = Tuple;
//module.exports = Tuple;

var tupleNode = [
  {
    "type": "FunctionDeclaration",
    "id": {
      "type": "Identifier",
      "name": "Tuple"
    },
    "params": [
      {
        "type": "Identifier",
        "name": "tuple"
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
              "type": "MemberExpression",
              "computed": false,
              "object": {
                "type": "ThisExpression"
              },
              "property": {
                "type": "Identifier",
                "name": "tup"
              }
            },
            "right": {
              "type": "ObjectExpression",
              "properties": []
            }
          }
        },
        {
          "type": "IfStatement",
          "test": {
            "type": "CallExpression",
            "callee": {
              "type": "MemberExpression",
              "computed": false,
              "object": {
                "type": "Identifier",
                "name": "Array"
              },
              "property": {
                "type": "Identifier",
                "name": "isArray"
              }
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "tuple"
              }
            ]
          },
          "consequent": {
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
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                      "type": "Identifier",
                      "name": "tuple"
                    },
                    "property": {
                      "type": "Identifier",
                      "name": "length"
                    }
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
                      "type": "IfStatement",
                      "test": {
                        "type": "LogicalExpression",
                        "operator": "&&",
                        "left": {
                          "type": "BinaryExpression",
                          "operator": "===",
                          "left": {
                            "type": "UnaryExpression",
                            "operator": "typeof",
                            "argument": {
                              "type": "MemberExpression",
                              "computed": true,
                              "object": {
                                "type": "Identifier",
                                "name": "tuple"
                              },
                              "property": {
                                "type": "Identifier",
                                "name": "i"
                              }
                            },
                            "prefix": true
                          },
                          "right": {
                            "type": "Literal",
                            "value": "object",
                            "raw": "\"object\""
                          }
                        },
                        "right": {
                          "type": "UnaryExpression",
                          "operator": "!",
                          "argument": {
                            "type": "CallExpression",
                            "callee": {
                              "type": "MemberExpression",
                              "computed": false,
                              "object": {
                                "type": "Identifier",
                                "name": "Array"
                              },
                              "property": {
                                "type": "Identifier",
                                "name": "isArray"
                              }
                            },
                            "arguments": [
                              {
                                "type": "MemberExpression",
                                "computed": true,
                                "object": {
                                  "type": "Identifier",
                                  "name": "tuple"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "i"
                                }
                              }
                            ]
                          },
                          "prefix": true
                        }
                      },
                      "consequent": {
                        "type": "BlockStatement",
                        "body": [
                          {
                            "type": "VariableDeclaration",
                            "declarations": [
                              {
                                "type": "VariableDeclarator",
                                "id": {
                                  "type": "Identifier",
                                  "name": "key"
                                },
                                "init": {
                                  "type": "MemberExpression",
                                  "computed": true,
                                  "object": {
                                    "type": "CallExpression",
                                    "callee": {
                                      "type": "MemberExpression",
                                      "computed": false,
                                      "object": {
                                        "type": "Identifier",
                                        "name": "Object"
                                      },
                                      "property": {
                                        "type": "Identifier",
                                        "name": "keys"
                                      }
                                    },
                                    "arguments": [
                                      {
                                        "type": "MemberExpression",
                                        "computed": true,
                                        "object": {
                                          "type": "Identifier",
                                          "name": "tuple"
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "name": "i"
                                        }
                                      }
                                    ]
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
                          },
                          {
                            "type": "VariableDeclaration",
                            "declarations": [
                              {
                                "type": "VariableDeclarator",
                                "id": {
                                  "type": "Identifier",
                                  "name": "val"
                                },
                                "init": {
                                  "type": "MemberExpression",
                                  "computed": true,
                                  "object": {
                                    "type": "MemberExpression",
                                    "computed": true,
                                    "object": {
                                      "type": "Identifier",
                                      "name": "tuple"
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "name": "i"
                                    }
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "name": "key"
                                  }
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
                                  "type": "MemberExpression",
                                  "computed": false,
                                  "object": {
                                    "type": "ThisExpression"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "name": "tup"
                                  }
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "key"
                                }
                              },
                              "right": {
                                "type": "ObjectExpression",
                                "properties": [
                                  {
                                    "type": "Property",
                                    "key": {
                                      "type": "Literal",
                                      "value": "val",
                                      "raw": "'val'"
                                    },
                                    "computed": false,
                                    "value": {
                                      "type": "Identifier",
                                      "name": "val"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                  },
                                  {
                                    "type": "Property",
                                    "key": {
                                      "type": "Literal",
                                      "value": "key",
                                      "raw": "'key'"
                                    },
                                    "computed": false,
                                    "value": {
                                      "type": "Identifier",
                                      "name": "i"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
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
                                  "type": "MemberExpression",
                                  "computed": false,
                                  "object": {
                                    "type": "ThisExpression"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "name": "tup"
                                  }
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "i"
                                }
                              },
                              "right": {
                                "type": "ObjectExpression",
                                "properties": [
                                  {
                                    "type": "Property",
                                    "key": {
                                      "type": "Literal",
                                      "value": "val",
                                      "raw": "'val'"
                                    },
                                    "computed": false,
                                    "value": {
                                      "type": "Identifier",
                                      "name": "val"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                  },
                                  {
                                    "type": "Property",
                                    "key": {
                                      "type": "Literal",
                                      "value": "key",
                                      "raw": "'key'"
                                    },
                                    "computed": false,
                                    "value": {
                                      "type": "Identifier",
                                      "name": "key"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      },
                      "alternate": {
                        "type": "IfStatement",
                        "test": {
                          "type": "LogicalExpression",
                          "operator": "||",
                          "left": {
                            "type": "LogicalExpression",
                            "operator": "||",
                            "left": {
                              "type": "BinaryExpression",
                              "operator": "===",
                              "left": {
                                "type": "UnaryExpression",
                                "operator": "typeof",
                                "argument": {
                                  "type": "MemberExpression",
                                  "computed": true,
                                  "object": {
                                    "type": "Identifier",
                                    "name": "tuple"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "name": "i"
                                  }
                                },
                                "prefix": true
                              },
                              "right": {
                                "type": "Literal",
                                "value": "boolean",
                                "raw": "\"boolean\""
                              }
                            },
                            "right": {
                              "type": "BinaryExpression",
                              "operator": "===",
                              "left": {
                                "type": "UnaryExpression",
                                "operator": "typeof",
                                "argument": {
                                  "type": "MemberExpression",
                                  "computed": true,
                                  "object": {
                                    "type": "Identifier",
                                    "name": "tuple"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "name": "i"
                                  }
                                },
                                "prefix": true
                              },
                              "right": {
                                "type": "Literal",
                                "value": "number",
                                "raw": "\"number\""
                              }
                            }
                          },
                          "right": {
                            "type": "BinaryExpression",
                            "operator": "===",
                            "left": {
                              "type": "UnaryExpression",
                              "operator": "typeof",
                              "argument": {
                                "type": "MemberExpression",
                                "computed": true,
                                "object": {
                                  "type": "Identifier",
                                  "name": "tuple"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "i"
                                }
                              },
                              "prefix": true
                            },
                            "right": {
                              "type": "Literal",
                              "value": "string",
                              "raw": "\"string\""
                            }
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
                                  "type": "MemberExpression",
                                  "computed": true,
                                  "object": {
                                    "type": "MemberExpression",
                                    "computed": false,
                                    "object": {
                                      "type": "ThisExpression"
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "name": "tup"
                                    }
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "name": "i"
                                  }
                                },
                                "right": {
                                  "type": "ObjectExpression",
                                  "properties": [
                                    {
                                      "type": "Property",
                                      "key": {
                                        "type": "Literal",
                                        "value": "val",
                                        "raw": "'val'"
                                      },
                                      "computed": false,
                                      "value": {
                                        "type": "MemberExpression",
                                        "computed": true,
                                        "object": {
                                          "type": "Identifier",
                                          "name": "tuple"
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "name": "i"
                                        }
                                      },
                                      "kind": "init",
                                      "method": false,
                                      "shorthand": false
                                    }
                                  ]
                                }
                              }
                            }
                          ]
                        },
                        "alternate": {
                          "type": "IfStatement",
                          "test": {
                            "type": "CallExpression",
                            "callee": {
                              "type": "MemberExpression",
                              "computed": false,
                              "object": {
                                "type": "Identifier",
                                "name": "Array"
                              },
                              "property": {
                                "type": "Identifier",
                                "name": "isArray"
                              }
                            },
                            "arguments": [
                              {
                                "type": "MemberExpression",
                                "computed": true,
                                "object": {
                                  "type": "Identifier",
                                  "name": "tuple"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "i"
                                }
                              }
                            ]
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
                                    "type": "MemberExpression",
                                    "computed": true,
                                    "object": {
                                      "type": "MemberExpression",
                                      "computed": false,
                                      "object": {
                                        "type": "ThisExpression"
                                      },
                                      "property": {
                                        "type": "Identifier",
                                        "name": "tup"
                                      }
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "name": "i"
                                    }
                                  },
                                  "right": {
                                    "type": "NewExpression",
                                    "callee": {
                                      "type": "Identifier",
                                      "name": "Tuple"
                                    },
                                    "arguments": [
                                      {
                                        "type": "MemberExpression",
                                        "computed": true,
                                        "object": {
                                          "type": "Identifier",
                                          "name": "tuple"
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "name": "i"
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
                                "type": "ReturnStatement",
                                "argument": {
                                  "type": "Literal",
                                  "value": null,
                                  "raw": "null"
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ]
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
  },
  {
    "type": "EmptyStatement"
  },
  {
    "type": "ExpressionStatement",
    "expression": {
      "type": "AssignmentExpression",
      "operator": "=",
      "left": {
        "type": "MemberExpression",
        "computed": false,
        "object": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "Tuple"
          },
          "property": {
            "type": "Identifier",
            "name": "prototype"
          }
        },
        "property": {
          "type": "Identifier",
          "name": "findValue"
        }
      },
      "right": {
        "type": "FunctionExpression",
        "id": null,
        "params": [
          {
            "type": "Identifier",
            "name": "keyOrIndex"
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
                    "name": "x"
                  },
                  "init": {
                    "type": "MemberExpression",
                    "computed": true,
                    "object": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "ThisExpression"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "tup"
                      }
                    },
                    "property": {
                      "type": "Identifier",
                      "name": "keyOrIndex"
                    }
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "IfStatement",
              "test": {
                "type": "BinaryExpression",
                "operator": "instanceof",
                "left": {
                  "type": "Identifier",
                  "name": "x"
                },
                "right": {
                  "type": "Identifier",
                  "name": "Tuple"
                }
              },
              "consequent": {
                "type": "BlockStatement",
                "body": [
                  {
                    "type": "ReturnStatement",
                    "argument": {
                      "type": "MemberExpression",
                      "computed": true,
                      "object": {
                        "type": "Identifier",
                        "name": "x"
                      },
                      "property": {
                        "type": "Literal",
                        "value": "tup",
                        "raw": "\"tup\""
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
                      "type": "ConditionalExpression",
                      "test": {
                        "type": "BinaryExpression",
                        "operator": "===",
                        "left": {
                          "type": "Identifier",
                          "name": "x"
                        },
                        "right": {
                          "type": "Identifier",
                          "name": "undefined"
                        }
                      },
                      "consequent": {
                        "type": "Identifier",
                        "name": "undefined"
                      },
                      "alternate": {
                        "type": "MemberExpression",
                        "computed": true,
                        "object": {
                          "type": "MemberExpression",
                          "computed": true,
                          "object": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                              "type": "ThisExpression"
                            },
                            "property": {
                              "type": "Identifier",
                              "name": "tup"
                            }
                          },
                          "property": {
                            "type": "Identifier",
                            "name": "keyOrIndex"
                          }
                        },
                        "property": {
                          "type": "Literal",
                          "value": "val",
                          "raw": "\"val\""
                        }
                      }
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
  },
  {
    "type": "ExpressionStatement",
    "expression": {
      "type": "AssignmentExpression",
      "operator": "=",
      "left": {
        "type": "MemberExpression",
        "computed": false,
        "object": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "Tuple"
          },
          "property": {
            "type": "Identifier",
            "name": "prototype"
          }
        },
        "property": {
          "type": "Identifier",
          "name": "modifyVal"
        }
      },
      "right": {
        "type": "FunctionExpression",
        "id": null,
        "params": [
          {
            "type": "Identifier",
            "name": "keyOrIndex"
          },
          {
            "type": "Identifier",
            "name": "newVal"
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
                    "name": "x"
                  },
                  "init": {
                    "type": "MemberExpression",
                    "computed": true,
                    "object": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                        "type": "ThisExpression"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "tup"
                      }
                    },
                    "property": {
                      "type": "Identifier",
                      "name": "keyOrIndex"
                    }
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
                  "type": "Identifier",
                  "name": "x"
                },
                "right": {
                  "type": "Identifier",
                  "name": "undefined"
                }
              },
              "consequent": {
                "type": "BlockStatement",
                "body": [
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
              "alternate": null
            },
            {
              "type": "IfStatement",
              "test": {
                "type": "BinaryExpression",
                "operator": "===",
                "left": {
                  "type": "UnaryExpression",
                  "operator": "typeof",
                  "argument": {
                    "type": "MemberExpression",
                    "computed": true,
                    "object": {
                      "type": "Identifier",
                      "name": "x"
                    },
                    "property": {
                      "type": "Literal",
                      "value": "val",
                      "raw": "'val'"
                    }
                  },
                  "prefix": true
                },
                "right": {
                  "type": "UnaryExpression",
                  "operator": "typeof",
                  "argument": {
                    "type": "Identifier",
                    "name": "newVal"
                  },
                  "prefix": true
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
                        "type": "MemberExpression",
                        "computed": true,
                        "object": {
                          "type": "Identifier",
                          "name": "x"
                        },
                        "property": {
                          "type": "Literal",
                          "value": "val",
                          "raw": "'val'"
                        }
                      },
                      "right": {
                        "type": "Identifier",
                        "name": "newVal"
                      }
                    }
                  },
                  {
                    "type": "IfStatement",
                    "test": {
                      "type": "CallExpression",
                      "callee": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": {
                          "type": "Identifier",
                          "name": "x"
                        },
                        "property": {
                          "type": "Identifier",
                          "name": "hasOwnProperty"
                        }
                      },
                      "arguments": [
                        {
                          "type": "Literal",
                          "value": "key",
                          "raw": "'key'"
                        }
                      ]
                    },
                    "consequent": {
                      "type": "BlockStatement",
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "id": {
                                "type": "Identifier",
                                "name": "otherKey"
                              },
                              "init": {
                                "type": "MemberExpression",
                                "computed": true,
                                "object": {
                                  "type": "Identifier",
                                  "name": "x"
                                },
                                "property": {
                                  "type": "Literal",
                                  "value": "key",
                                  "raw": "'key'"
                                }
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
                                "type": "MemberExpression",
                                "computed": true,
                                "object": {
                                  "type": "MemberExpression",
                                  "computed": false,
                                  "object": {
                                    "type": "ThisExpression"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "name": "tup"
                                  }
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "otherKey"
                                }
                              },
                              "property": {
                                "type": "Literal",
                                "value": "val",
                                "raw": "'val'"
                              }
                            },
                            "right": {
                              "type": "Identifier",
                              "name": "newVal"
                            }
                          }
                        }
                      ]
                    },
                    "alternate": null
                  },
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
  },
  {
    "type": "ExpressionStatement",
    "expression": {
      "type": "AssignmentExpression",
      "operator": "=",
      "left": {
        "type": "MemberExpression",
        "computed": false,
        "object": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "Tuple"
          },
          "property": {
            "type": "Identifier",
            "name": "prototype"
          }
        },
        "property": {
          "type": "Identifier",
          "name": "constructor"
        }
      },
      "right": {
        "type": "Identifier",
        "name": "Tuple"
      }
    }
  }
];

module.exports = tupleNode;