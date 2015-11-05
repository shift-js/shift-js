var advance = require('./advance');
var expression = require('./expression');

// returns nodes for a single statement
// invokes a tokens statement declaration method or goes until terminated
var statement = function(state) {

  while(true) {
    if(state.token.value === "\\n") {
      state = advance(state);
    }
    else {
      break;
    }
  }

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

  if(state.token.value === "->") {
    state = advance(state);
    state = advance(state);
  }

  v = expression(state, 0);

  if(state.token.value === ";") {
    state = advance(state);
  }
  while(true) {
    if(state.token.value === "\\n") {
      state = advance(state);
    } else {
      break;
    }
  }
  if(state.token.value === "}") {
    return v;
  }
  if (state.token.value === ')') {
    state = advance(state);
  }

  if(state.token.value === "EOF") {
    return v;
  } if(v.type === "FunctionDeclaration") {
    return v;
  } else if (!v.assignment && v.id !== "(" && state.token.value !== "console") {
    v.error("Bad expression statement.");
  }

  return v;
};

module.exports = statement;