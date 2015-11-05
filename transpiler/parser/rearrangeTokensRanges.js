var util = require('util');

// Rewriter utility
// Accounts for Swift language feature (ranges) that are not native to javscript
var rearrangeTokensRanges = function(tokens) {

  var reformat = false;
  var closedRanges = [];

  for(var i=0; i<tokens.length; i++) {
    if(tokens[i].value === "..." && tokens[i].type === "CLOSED_RANGE" ) {
      reformat = true;
      var closedRange = {
        rangeStart: i-1,
        rangeEnd: i+1,
        concatKey: tokens[i-1].value + 'to' + tokens[i+1].value
      };
      closedRanges.push(closedRange);
    } else if (tokens[i].value === "..<" && tokens[i].type === "HALF_OPEN_RANGE") {
      reformat = true;
      var halfOpenRange = {
        rangeStart: i-1,
        rangeEnd: i+1,
        concatKey: tokens[i-1].value + 'to' + (tokens[i+1].value - 1)
      };
      closedRanges.push(halfOpenRange);
    }
  }

  if(reformat) {
    for(var m=closedRanges.length-1; m >= 0; m--) {
      var range = closedRanges[m];
      tokens.splice(range.rangeStart, 3,
        { type: "IDENTIFIER",         value: "sJs" },
        { type: "DOT_SYNTAX",         value: "." },
        { type: "IDENTIFIER",         value: "range" },
        { type: "SUBSCRIPT_LOOKUP_START",         value: "[" },
        { type: "STRING",         value: range.concatKey },
        { type: "SUBSCRIPT_LOOKUP_END",         value: "]" }
      );
    }
  }
  return tokens;

};

module.exports = rearrangeTokensRanges;
