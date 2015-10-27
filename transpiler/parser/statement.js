var advance = require('./advance');
var expression = require('./expression');

var statement = function(obj) {
  var n = obj.token, v;

  if (n.std) {
    obj = advance(obj);
    obj.scope.reserve(n);
    return n.std();
  }
  v = expression(obj, 0);

  if(obj.token.value === "}") {
    return v;
  }

  if (!v.assignment && v.id !== "(") {
    v.error("Bad expression statement.");
  }
  obj = advance(obj, ";");
  return v;
};

module.exports = statement;