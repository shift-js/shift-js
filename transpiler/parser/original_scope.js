var helpers = require('./helperFunctions');

var original_scope = {
  define: function(params, n) {
    var scope = params['scope'];
    var t = this.def[n.value];
    if (typeof t === "object") {
      n.error(t.reserved ? "Already reserved." : "Already defined.");
    }
    this.def[n.value] = n;
    n.reserved = false;
    n.nud = helpers.itself;
    n.led = null;
    n.std = null;
    n.lbp = 0;
    n.scope = scope;
    return n;
  },
  find: function(n, symbol_table) {
    var e = this,
      o;
    while (true) {
      o = e.def[n];
      if (o && typeof o !== 'function') {
        return e.def[n];
      }
      e = e.parent;
      if (!e) {
        o = symbol_table[n];
        return o && typeof o !== 'function' ? o : symbol_table["(name)"];
      }
    }
  },
  pop: function() {
    scope = this.parent;
  },
  reserve: function(n) {
    if (n.arity !== "name" || n.reserved) {
      return;
    }
    var t = this.def[n.value];
    if (t) {
      if (t.reserved) {
        return;
      }
      if (t.arity === "name") {
        n.error("Already defined.");
      }
    }
    this.def[n.value] = n;
    n.reserved = true;
  }
};

module.exports = original_scope;