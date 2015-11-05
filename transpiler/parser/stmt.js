var symbol = require('./symbol');
var originalSymbol = require('./originalSymbol');

// add statements for a given symbol
var stmt = function(state, s, f) {
  var x = symbol(state, originalSymbol, s);
  x.std = f;
  return x;
};

module.exports = stmt;