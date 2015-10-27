var advance = require('./advance');
var expression = require('./expression');

var statement = function(state) {
  var n = state.token, v;

  if (n.std) {
    state = advance(state);
    state.scope.reserve(n);
    return n.std();
  }
  v = expression(state, 0);

  if(state.token.value === "}") {
    return v;
  }

  if (!v.assignment && v.id !== "(") {
    v.error("Bad expression statement.");
  }
  else if(state.token.value === "EOF") {
    return v;
  }
  state = advance(state, ";");
  return v;
};

module.exports = statement;