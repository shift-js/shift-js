// Helper functions used throughout the modules
var helpers = {
  deletePropertyIfExists : function (node, propertyArray) {
    if(node !== null) {
      for (var i = 0; i < propertyArray.length; i++) {
        var prop = propertyArray[i];
        var hasProp = node.hasOwnProperty(prop);
        if (hasProp) {
          delete node[prop];
        }
      }
    }
  },
  //Recursively walk a tree and apply a callback on each node
  traverse: function (node, func) {
    var self = this;
    func(node);
    if(node !== null) {
      if (node.scope) {
        delete node.scope;
      }
      for (var key in node) {
        if (node.hasOwnProperty(key)) {
          var child = node[key];
          if (typeof child === 'object' && child !== null) {
            if (Array.isArray(child)) {
              child.forEach(function(node) {
                self.traverse(node, func);
              });
            } else {
              self.traverse(child, func);
            }
          }
        }
      }
    }
  },
    //Make initial pass through input token stream removing ambiguity of certain token permutations to the parser.
    //Example 1: Characters of pre- and post-fix increment & decrement
          //operators are lexed independently as separate operators.
    //Example 2: Swift, but not Javascript, allows for dynamic property
          //look-ups within literal declarations of collections.

  cleanUpTokenStream: function(input) {
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
      if (input[i].value === "*") {
        if (input[i + 1].value === "=") {
          input.splice(i + 1, 1);
          input[i].value = "*=";
        }
      }
      if (input[i].value === "/") {
        if (input[i + 1].value === "=") {
          input.splice(i + 1, 1);
          input[i].value = "/=";
        }
      }
      if (input[i].value === "+") {
        if (input[i + 1].value === "=") {
          input.splice(i + 1, 1);
          input[i].value = "+=";
        }
      }
      if (input[i].value === "-") {
        if (input[i + 1].value === "=") {
          input.splice(i + 1, 1);
          input[i].value = "-=";
        }
      }
      //Remove inline comments
      if (input[i].type === "COMMENT_START") {
        if (input[i + 1].type === "COMMENT") {
          input.splice(i, 2);
        }
      }
      //Remove multi-line comments
      if (input[i].type === "MULTI_LINE_COMMENT_START") {

        for(var j=i; input.length; j++) {
          if (input[j].type === "MULTI_LINE_COMMENT_END") {
            input.splice(i, j - i + 1);
            return input;//TODO BUG BUG if multiple comments
          }
        }
      }
    }
    return input;
  },
  isNum : function(val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
  },
  isBool : function(val) {
    return val === 'true' || val === 'false';
  },
  itself : function() {
    return this;
  }

};

module.exports = helpers;
