var expression = require('./expression');
var infixr = require('./infixr');


// The assignment function handles operators used for variable assignment
var assignment = function(state, id) {
  return infixr(state, id, 10, function(left) {
    if (left.id) {
      if (left.id !== "+=" && left.id !== "." && left.id !== "[" && left.type !== "name" && left.id !== "(name)") {
        left.error("Bad lvalue.");
      }
    } else if (left.type) {
      if(left.type !== "IDENTIFIER") {
        left.error("Bad lvalue.");
      }
    }
    left.type = "Identifier";
    left.name = left.value;;
    delete left.value;
    this.left = left;
    this.right = expression(state, 9);
    this.assignment = true;
    this.operator = this.value;
    this.type = "AssignmentExpression";
    delete this.value;
    return this;
  });
};

module.exports = assignment;
