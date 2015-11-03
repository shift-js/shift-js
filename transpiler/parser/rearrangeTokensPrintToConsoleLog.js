var util = require('util');

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

  //console.log(util.inspect(tokens, {colors:true, depth:null}));
  return tokens;
};

module.exports = rearrangeTokensPrintToConsoleLog;