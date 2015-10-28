var advance = require('./advance');

var block = function(state) {
  var t = state.token;
  state = advance(state, "{");
  if(state.token.value === "\\n") {
    state = advance(state);
  }
  var stdReturnVal = t.std();
  var blockStmtChildNode;
  if(stdReturnVal.type !== "ExpressionStatement") {
    blockStmtChildNode = {
      type: 'ExpressionStatement',
      expression: stdReturnVal
    };
  } else {
    blockStmtChildNode = stdReturnVal;
  }
  return {
    type: 'BlockStatement',
    body: [ blockStmtChildNode ]
  };
};

module.exports = block;