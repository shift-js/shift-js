
//Stores scoped variables
var newScope = function(state, originalScope) {
  var s = state.scope;
  state.scope = Object.create(originalScope);
  state.scope.def = {};
  state.scope.parent = s;
  return state.scope;
};

module.exports = newScope;