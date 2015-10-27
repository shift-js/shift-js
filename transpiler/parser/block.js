var advance = require('./advance');

var block = function(obj) {
  var t = obj.token;
  obj = advance(obj, "{");
  var stdReturnVal = t.std();

  return {
    type: 'BlockStatement',
    body: [{
      type: 'ExpressionStatement',
      expression: stdReturnVal
    }]
  };
};

module.exports = block;