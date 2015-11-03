

var getNodesForGivenRange = function(key, start, end) {
  return {
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
            "type": "Identifier",
            "name": "sJs"
          },
          "property": {
            "type": "Identifier",
            "name": "range"
          }
        },
        "property": {
          "type": "Literal",
          "value": key,
          "raw": '"'+key+'"'
        }
      },
      "right": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "MemberExpression",
            "computed": false,
            "object": {
              "type": "Identifier",
              "name": "sJs"
            },
            "property": {
              "type": "Identifier",
              "name": "range"
            }
          },
          "property": {
            "type": "Identifier",
            "name": "fn"
          }
        },
        "arguments": [
          {
            "type": "Literal",
            "value": start,
            "raw": ""+start
          },
          {
            "type": "Literal",
            "value": end,
            "raw": ""+end
          }
        ]
      }
    }
  };
};

module.exports = getNodesForGivenRange;