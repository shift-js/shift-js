
// Returns AST representation of javascript namespace for ranges
module.exports = {
  "type": "VariableDeclaration",
  "declarations": [
  {
    "type": "VariableDeclarator",
    "id": {
      "type": "Identifier",
      "name": "sJs"
    },
    "init": {
      "type": "ObjectExpression",
      "properties": [
        {
          "type": "Property",
          "key": {
            "type": "Identifier",
            "name": "range"
          },
          "computed": false,
          "value": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "fn"
                },
                "computed": false,
                "value": {
                  "type": "FunctionExpression",
                  "id": null,
                  "params": [
                    {
                      "type": "Identifier",
                      "name": "a"
                    },
                    {
                      "type": "Identifier",
                      "name": "z"
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
                              "name": "r"
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
                                "type": "Identifier",
                                "name": "a"
                              }
                            }
                          ],
                          "kind": "var"
                        },
                        "test": {
                          "type": "BinaryExpression",
                          "operator": "<=",
                          "left": {
                            "type": "Identifier",
                            "name": "i"
                          },
                          "right": {
                            "type": "Identifier",
                            "name": "z"
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
                                "type": "CallExpression",
                                "callee": {
                                  "type": "MemberExpression",
                                  "computed": false,
                                  "object": {
                                    "type": "Identifier",
                                    "name": "r"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "name": "push"
                                  }
                                },
                                "arguments": [
                                  {
                                    "type": "Identifier",
                                    "name": "i"
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        "type": "ReturnStatement",
                        "argument": {
                          "type": "Identifier",
                          "name": "r"
                        }
                      }
                    ]
                  },
                  "generator": false,
                  "expression": false
                },
                "kind": "init",
                "method": false,
                "shorthand": false
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