var advance = require('./advance');
var expression = require('./expression');

var statement = function(state) {
  var n = state.token, v;

  if (n.std) {
    state = advance(state);
    state.scope.reserve(n);
    return n.std();
  }
  //else if(n.value === "\\n") {
  //  state = advance(state);
  //}
  v = expression(state, 0);

  if(state.token.value === "}") {
    return v;
  }

  if(state.token.value === ";") {
    state = advance(state, ";");
  }
  if(state.token.value === "EOF") {
    return v;
  } else if (!v.assignment && v.id !== "(") {
    v.error("Bad expression statement.");
  }
  //if (!v.assignment && v.id !== "(") {
  //  v.error("Bad expression statement.");
  //}
  //else if(state.token.value === "EOF") {
  //  return v;
  //}

  //state = advance(state, ";");
  state = advance(state);

  if(state.token.value === "\\n") {
    state = advance(state);
  }
  return v;
};

module.exports = statement;