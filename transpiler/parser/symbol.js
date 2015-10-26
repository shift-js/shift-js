var symbol = function(params, original_symbol, id, bp) {

  var symbol_table = params['symbol_table'];

  var s = symbol_table[id];
  bp = bp || 0;
  if (s) {
    if (bp >= s.lbp) {
      s.lbp = bp;
    }
  } else {
    s = Object.create(original_symbol);
    s.id = s.value = id;
    s.lbp = bp;
    symbol_table[id] = s;
  }
  return s;
};

module.exports = symbol;