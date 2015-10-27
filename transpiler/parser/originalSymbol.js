var originalSymbol = {
  nud: function() {
    this.error("Undefined.");
  },
  led: function(left) {
    this.error("Missing operator.");
  }
};

module.exports = originalSymbol;