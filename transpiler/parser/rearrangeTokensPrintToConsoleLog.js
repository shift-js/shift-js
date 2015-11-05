var util = require('util');

// Rewriter utility
// Swaps native print method for console . log
var rearrangeTokensPrintToConsoleLog = function(tokens) {

  var reformat = false;
  var nativePrintIndices = [];

  for(var i=0; i<tokens.length; i++) {
    if(tokens[i].value === "print" && tokens[i].type === "NATIVE_METHOD") {
      reformat = true;
      nativePrintIndices.push(i);
    }
  }

  if(reformat) {
    for(var j=nativePrintIndices.length - 1; j>=0; j--) {
      var index = nativePrintIndices[j];
      tokens.splice(index, 1,
        { type: "IDENTIFIER",         value: "console" },
        { type: "OPERATOR",           value: "." },
        { type: "IDENTIFIER",         value: "log" });
    }
  }
  return tokens;
};

module.exports = rearrangeTokensPrintToConsoleLog;