var new_scope = function(params, original_scope) {

  var scope = params['scope'];

  var s = scope;
  scope = Object.create(original_scope);
  scope.def = {};
  scope.parent = s;
  return scope;
};

module.exports = new_scope;