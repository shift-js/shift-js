var helpers = require('./helperFunctions');

// Function that handles the prototype for all scope objects.
var originalScope = {
  define: function(state, n) {
    var scope = state['scope'];
    var t = this.def[n.value];
    if (typeof t === "object") {
      console.log(n.value);
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
  delete: function(state, n) {
    delete this.def[n.value];
  },
  find: function(n, symbolTable) {
    var e = this,
      o;
    while (true) {
      o = e.def[n];
      if (o && typeof o !== 'function') {
        return e.def[n];
      }
      e = e.parent;
      if (!e) {
        o = symbolTable[n];
        return o && typeof o !== 'function' ? o : symbolTable["(name)"];
      }
    }
  },
  pop: function() {
    scope = this.parent;
  },
  reserve: function(n) {
    if (n.type !== "name" || n.reserved) {
      return;
    }
    var t = this.def[n.value];
    if (t) {
      if (t.reserved) {
        return;
      }
      if (t.type === "name") {
        n.error("Already defined.");
      }
    }
    this.def[n.value] = n;
    n.reserved = true;
  }
};

module.exports = originalScope;