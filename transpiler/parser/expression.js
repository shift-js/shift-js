var advance = require('./advance');
var helpers = require('./helperFunctions');

/**
 * Begin parsing an expression phrase from the current token
 * Calls itself recursively depending on the context.
 **/
var expression = function(state, rbp, dontWrapBinExpNodeInExpStmtBool) {

  var left;
  var t = state.token;
  state = advance(state);
  //console.log(t);
  left = t.nud();

  if (t.value === "++" || t.value === "--") {
    /*Pre-fix operator*/
    left = t;

    if(state.token.value !== "}" && state.token.value !== "==") {
      state = advance(state);
    }
  } else if (state.token.value === "++" || state.token.value === "--") {
    /*Post-fix operators*/
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
    var overwrittenMemberExpression = left;//TODO delete
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

    if(left.left.object && left.left.property) {
      left.left.type = "MemberExpression";
      delete left.left.name;
    }
    expStmt.expression = left;
    left = expStmt;
    left.assignment = true;
  } else if (left.operator === "==") {

    if(!dontWrapBinExpNodeInExpStmtBool) {
      var expressionStmtNode = { type: 'ExpressionStatement' };
      expressionStmtNode.expression = left;
      left = expressionStmtNode;
    }

  } else if (left.operator === "===") {
    //TODO
  } else if (t.value === ".") {
    //TODO stuff

    state = advance(state);

    //console.log("####################################");
    //console.log('----------- START t -------------');
    //console.log(t);
    //console.log('----------- END t -------------');
    //
    //console.log('----------- START state.token -------------');
    //console.log(state.token);
    //console.log('----------- END state.token -------------');
    //
    //console.log('----------- START left -------------');
    //console.log(left);
    //console.log('----------- END left -------------');
    //console.log("####################################");
  }
  //else if (left.type === "AssignmentExpression") {
  //  //left.left = overwrittenMemberExpression;
  //  left.left.type = "MemberExpression";
  //  delete left.left.name;
  //}

  return left;
};

module.exports = expression;