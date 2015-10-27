var symbol = require('./symbol');
var original_symbol = require('./original_symbol');

var stmt = function(obj, s, f) {
  var x = symbol(obj, original_symbol, s);
  x.std = f;
  return x;
};

module.exports = stmt;