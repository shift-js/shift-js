var advance = require('./advance');
var helpers = require('./helperFunctions');

/**
 * Begin parsing an expression phrase from the current token
 * Calls itself recursively depending on the context.
 **/
var expression = function(obj, rbp) {

  var left;
  var t = obj.token;
  obj = advance(obj);
  left = t.nud();

  if (t.value === "++" || t.value === "--") {
    //Pre-fix operator
    left = t;

    if(obj.token.value !== "}") {
      obj = advance(obj);
    }
  } else if (obj.token.value === "++" || obj.token.value === "--") {
    //Post-fix operators
    if(obj.token.value === "++") {
      left.type = "Identifier";
      left.name = left.value;
      delete left.value;

      obj = advance(obj);
      return {
        "type": "UpdateExpression",
        "operator": "++",
        "prefix": false,
        "argument": left
      }
    } else {
      left.type = "Identifier";
      left.name = left.value;
      delete left.value;
      obj = advance(obj);
      return {
        "type": "UpdateExpression",
        "operator": "--",
        "prefix": false,
        "argument": left
      }

    }
  } else if (t.operator === "+") {
    delete t.value;
    obj.token.name = obj.token.value;
    obj.token.type = "Identifier";
    delete obj.token.value;
    t.argument = obj.token;
  }

  /**
   * Logic to handle the recursive case
   */
  while (rbp < obj.token.lbp) {
    t = obj.token;
    obj = advance(obj);
    left = t.led(left);//assignments
  }


  if (left.type === "IDENTIFIER") {
    left.name = left.value;
    left.type = "Identifier";
    delete left.value;
  }
  else if (left.type === "literal" && helpers.isNum(left.value)) {
    left.type = "Literal";
    left.raw = left.value;
    if (left.value.indexOf('.')) {
      left.value = parseFloat(left.value);
    } else {
      left.value = parseInt(left.value);
    }
  }
  else if (left.type === "literal" && helpers.isBool(left.value)) {
    left.type = "Literal";
    left.raw = t.value;
    left.value = t.value === "true";
  }
  else if (left.type === "literal") {
    left.type = "Literal";
    left.raw = '"' + t.value + '"';
  }
  else if (left.operator === "=") {
    var expStmt = {};
    expStmt.type = "ExpressionStatement";
    expStmt.expression = left;
    left = expStmt;
    left.assignment = true;
  }

  return left;
};

module.exports = expression;