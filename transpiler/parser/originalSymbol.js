
// symbol prototype
//Function that handles and creates an object for the prototype for all other symbols
var originalSymbol = {
  nud: function() {
    this.error("Undefined.");
  },
  led: function(left) {
    this.error("Missing operator.");
  }
};

module.exports = originalSymbol;