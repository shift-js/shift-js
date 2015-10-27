var expression = require('./expression');
var infixr = require('./infixr');

var assignment = function(obj, id) {
  return infixr(obj, id, 10, function(left) {
    if (left.id !== "." && left.id !== "[" && left.type !== "name" && left.id !== "(name)") {
      left.error("Bad lvalue.");
    }
    left.type = "Identifier";
    left.name = left.value;;
    delete left.value;
    this.left = left;
    this.right = expression(obj, 9);
    this.assignment = true;
    this.operator = this.value;
    this.type = "AssignmentExpression";
    delete this.value;
    return this;
  });
};

module.exports = assignment;
