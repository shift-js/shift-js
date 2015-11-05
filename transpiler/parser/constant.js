var symbol = require('./symbol');
var originalSymbol = require('./originalSymbol');


// The constant function creates constants declared from the tokens
var constant = function(state, s, v) {
  var x = symbol(state, originalSymbol, s);
  x.nud = function() {
    state.scope.reserve(this);
    this.value = symbolTable[this.id].value;
    this.type = "Literal";
    return this;
  };
  x.value = v;
  return x;
};

module.exports = constant;