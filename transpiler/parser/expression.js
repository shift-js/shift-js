var advance = require('./advance');
var helpers = require('./helperFunctions');

/**
 * Begin parsing an expression phrase from the current token
 * Calls itself recursively depending on the context.
 **/
var expression = function(state, rbp, noWrapBinExpNodeInExpStmtBool) {

  var left;
  var t = state.token;
  state = advance(state);
  if(t.value === "\\n") {
    t = state.token;
    state = advance(state);
  }
  left = t.nud();

  if (t.value === "++" || t.value === "--") {
    //Pre-fix operator
    left = t;

    if(state.token.value !== "}" && state.token.value !== "==") {
      //state.token.value == "=="
      state = advance(state);
    }
  } else if (state.token.value === "++" || state.token.value === "--") {
    //Post-fix operators
    if(state.token.value === "++") {
      left.type = "Identifier";
      left.name = left.value;
      delete left.value;
      state = advance(state);
      var tmpParentNode = {
        "type": "UpdateExpression",
        "operator": "++",
        "prefix": false,
        "argument": left,
        assignment: true
      };
      left = tmpParentNode;
    } else {
      left.type = "Identifier";
      left.name = left.value;
      delete left.value;
      state = advance(state);
      var tmpParentNode = {
        "type": "UpdateExpression",
        "operator": "--",
        "prefix": false,
        "argument": left
      };
      left = tmpParentNode;
    }
  } else if (t.operator === "+") {
    delete t.value;
    state.token.name = state.token.value;
    state.token.type = "Identifier";
    delete state.token.value;
    t.argument = state.token;
  }

  /**
   * Logic to handle the recursive case
   */
  while (rbp < state.token.lbp) {
    t = state.token;
    state = advance(state);
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
  } else if (left.operator === "==") {
    //TODO toggle between two cases Ternary vs !Ternary

    if(!noWrapBinExpNodeInExpStmtBool){
      var expressionStmtNode = { type: 'ExpressionStatement' };
      expressionStmtNode.expression = left;
      left = expressionStmtNode;
    }


    } else if (left.operator === "===") {
    //TODO
  }

  return left;
};

module.exports = expression;