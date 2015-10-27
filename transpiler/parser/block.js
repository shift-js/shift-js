var advance = require('./advance');

var block = function(obj) {
  var t = obj.token;
  obj = advance(obj, "{");
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