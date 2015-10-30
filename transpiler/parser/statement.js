var advance = require('./advance');
var expression = require('./expression');

var statement = function(state) {
  var n = state.token, v;

  if (n.std) {
    state = advance(state);
    state.scope.reserve(n);
    var statementResultNode = n.std();
    return statementResultNode;
  }


  if(state.token.value === ";") {
    state = advance(state);
  }
  while(true) {
    if(state.token.value === "\\n") {
      state = advance(state);
    }
    else {
      break;
    }
  }
  if(state.token.value === "}") {
    return v;
  }
  if(state.token.value === "EOF") {
    return v;
  }

  v = expression(state, 0);

  if(state.token.value === ";") {
    state = advance(state);
  }
  if(state.token.value === "\\n") {
    state = advance(state);
  }
  if(state.token.value === "}") {
    return v;
  }

  if(state.token.value === "EOF") {
    return v;
  } else if (!v.assignment && v.id !== "(") {
    console.log(state.token);
    v.error("Bad expression statement.");
  }
  //state = advance(state, ";");
  //state = advance(state);

  return v;
};

module.exports = statement;