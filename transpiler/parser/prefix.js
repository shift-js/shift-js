var symbol = require('./symbol');
var originalSymbol = require('./originalSymbol');
var expression = require('./expression');

// Helper for prefix declarations
var prefix = function(state, id, nud) {
  var s = symbol(state, originalSymbol, id);
  s.nud = nud || function() {
      state.scope.reserve(this);
      if (this.value === "++" || this.value === "--") {
        this.type = "UpdateExpression";
        this.operator = this.value;
        this.prefix = true;
        this.argument = expression(state, 70);
        delete this.value;
      } else if(this.value === "--") {
        this.type = "UpdateExpression";
        this.operator = "--";
        this.prefix = true;
        this.argument = expression(state, 70);
        delete this.value;
      } else if (this.value === "+") {
        this.type = "UnaryExpression";
        this.prefix = true;
        this.operator = "+";
      } else {
        this.type = "UnaryExpression";
        this.operator = this.value;
        delete this.value;
        this.argument = expression(state, 70);
        this.prefix = true;
      }

      return this;

    };
  return s;
};

module.exports = prefix;