var advance = require('./advance');

var block = function(state) {
  var t = state.token;
  state = advance(state, "{");
  if (state.token.value === "\\n") {
    state = advance(state);
  }
  var stdReturnVal = t.std();
  var blockStmtChildNode;

  //Logic as to whether statement node needs a parent node wrapper
  if (Array.isArray(stdReturnVal)) {
    blockStmtChildNode = stdReturnVal;
  } else if (["IfStatement", "ReturnStatement", "ForStatement"].hasItem(stdReturnVal.type)) {
    blockStmtChildNode = stdReturnVal;
  } else if (stdReturnVal.type !== "ExpressionStatement") {
    blockStmtChildNode = {
      type: 'ExpressionStatement',
      expression: stdReturnVal
    };
  }
  else {
    blockStmtChildNode = stdReturnVal;
  }

  var blockStmt = { type: 'BlockStatement' };
  blockStmt.body = (Array.isArray(blockStmtChildNode)) ? blockStmtChildNode : [blockStmtChildNode];

  return blockStmt;
};

module.exports = block;