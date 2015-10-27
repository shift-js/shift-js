var symbol = require('./symbol');
var original_symbol = require('./original_symbol');
var expression = require('./expression');

var prefix = function(obj, id, nud) {
  var s = symbol(obj, original_symbol, id);
  s.nud = nud || function() {
      obj.scope.reserve(this);
      if (this.value === "++" || this.value === "--") {
        this.type = "UpdateExpression";
        this.operator = this.value;
        this.prefix = true;
        this.argument = expression(obj, 70);
        delete this.value;
        //TODO Why don't we: 'return this;'
      } else if(this.value === "--") {
        this.type = "UpdateExpression";
        this.operator = "--";
        this.prefix = true;
        this.argument = expression(obj, 70);
        delete this.value;
        //TODO Why don't we: 'return this;'
      } else if (this.value === "+") {
        this.type = "UnaryExpression";
        this.prefix = true;
        this.operator = "+";
        return this;
      } else {
        this.type = "UnaryExpression";
        this.operator = this.value;
        delete this.value;
        this.argument = expression(obj, 70);
        this.prefix = true;
        return this;
      }

    };
  return s;
};

module.exports = prefix;