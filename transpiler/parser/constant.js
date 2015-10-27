var symbol = require('./symbol');
var original_symbol = require('./original_symbol');

var constant = function(obj, s, v) {
  var x = symbol(obj, original_symbol, s);
  x.nud = function() {
    obj.scope.reserve(this);
    this.value = symbol_table[this.id].value;
    this.type = "literal";//"literal" -> "Literal"
    return this;
  };
  x.value = v;
  return x;
};

module.exports = constant;