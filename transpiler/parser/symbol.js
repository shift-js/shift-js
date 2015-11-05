var originalSymbol = require('./originalSymbol');

// function that returns or creates a symbol with a given identifier and binding power
var symbol = function(state, originalSymbol, id, bp) {
  var s = state.symbolTable[id];
  bp = bp || 0;
  if (s) {
    if (bp >= s.lbp) {
      s.lbp = bp;
    }
  } else {
    s = Object.create(originalSymbol);
    s.id = s.value = id;
    s.lbp = bp;
    state.symbolTable[id] = s;
  }
  return s;
};

module.exports = symbol;