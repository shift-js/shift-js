
/**
 *
 */
module.exports.deletePropertyIfExists = function (node, propertyArray) {
  for (var i = 0; i < propertyArray.length; i++) {
    var prop = propertyArray[i];
    var hasProp = node.hasOwnProperty(prop);
    if (hasProp) {
      delete node[prop];
    }
  }
};

/**
 * Recursively walk a tree and apply a callback on each node
 */
var traverse = function (node, func) {
  func(node);
  if (node.scope) {
    delete node.scope;
  }
  for (var key in node) {
    if (node.hasOwnProperty(key)) {
      var child = node[key];
      if (typeof child === 'object' && child !== null) {
        if (Array.isArray(child)) {
          child.forEach(function(node) {
            traverse(node, func);
          });
        } else {
          traverse(child, func);
        }
      }
    }
  }
};
module.exports.traverse = traverse;

/**
 * Make initial pass through input token stream removing ambiguity of certain token permutations to the parser.
 * Example 1: Characters of pre- and post-fix increment & decrement
 *        operators are lexed independently as separate operators.
 * Example 2: Swift, but not Javascript, allows for dynamic property
 *        look-ups within literal declarations of collections.
 **/
module.exports.cleanUpTokenStream = function(input) {
  for (var i = 0; i < input.length; i++) {
    if (input[i].type === "STRING_INTERPOLATION_START" || input[i].type === "STRING_INTERPOLATION_END") {
      input[i].type = "OPERATOR";
      input[i].value = "+";
    }
    if (input[i].value === "!") {
      if (input[i + 1].value === "=") {
        if (input[i + 2].value === "=") {
          input.splice(i + 1, 2);
          input[i].value = "!==";
          return input;
        } else {
          input.splice(i + 1, 1);
          input[i].value = "!=";
        }
      }
    }
    if (input[i].value === "=") {
      if (input[i + 1].value === "=") {
        if (input[i + 2].value === "=") {
          input.splice(i + 1, 2);
          input[i].value = "===";
        } else {
          input.splice(i + 1, 1);
          input[i].value = "==";
        }
      }
    }
    if (input[i].value === "+") {
      if (input[i + 1].value === "+") {
        input.splice(i + 1, 1);
        input[i].value = "++";
      }
    }
    if (input[i].value === "-") {
      if (input[i + 1].value === "-") {
        input.splice(i + 1, 1);
        input[i].value = "--";
      }
    }
    if (input[i].value === "|") {
      if (input[i + 1].value === "|") {
        input.splice(i + 1, 1);
        input[i].value = "||";
      }
    }
    if (input[i].value === ">") {
      if (input[i + 1].value === "=") {
        input.splice(i + 1, 1);
        input[i].value = ">=";
      }
    }
    if (input[i].value === "<") {
      if (input[i + 1].value === "=") {
        input.splice(i + 1, 1);
        input[i].value = "<=";
      }
    }

  }
  return input;
};


module.exports.checkIfTokensNeedRearrangement = function() {

};