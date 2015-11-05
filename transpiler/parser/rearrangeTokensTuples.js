var util = require('util');

// Rewriter utility
// Accounts for Swift language feature (Tuples) without a native construct in js
var rearrangeTokensTuples = function(tokens) {

  var reformat = false;
  var tuples = [];

  for(var i=0; i<tokens.length; i++) {

    if(tokens[i].type === "TUPLE_START" && tokens[i].value === "(") {
      var tuple = {};
      reformat = true;
      tuple.start = i;
      var stopIdx = i;
      while(true) {
        stopIdx++;
        if(tokens[stopIdx].type === "TUPLE_END" && tokens[stopIdx].value === ")") {
          tuple.stop = stopIdx;
          break;
        }
      }

      for(var x=tuple.start; x<tuple.stop; x++) {
        if(tokens[x].value === ",") {

          tuple.hasKeys = false;

          var delimiterDiff = x-tuple.start;
          if(delimiterDiff>2) {
            tuple.hasKeys = true;
          }

          if(tuple.hasKeys) {
            tuple.tupleContentsFirstKey = tokens[x-3];
            tuple.tupleContentsFirstVal = tokens[x-1];
            tuple.tupleContentsSecondKey = tokens[x+1];
            tuple.tupleContentsSecondVal = tokens[x+3];
          } else {
            tuple.tupleContentsFirst = tokens[x-1];
            tuple.tupleContentsSecond = tokens[x+1];

          }
        }
      }
      tuples.push(tuple);
    }

  }

  if(reformat) {
    for(var j=tuples.length - 1; j>=0; j--) {
      var currentTuple = tuples[j];
      if(currentTuple.hasKeys) {
        tokens.splice(currentTuple.start, currentTuple.stop - currentTuple.start + 1,
          { type: "DECLARATION_NEW",            value: "new" },
          { type: "IDENTIFIER",                 value: "Tuple" },
          { type: "PARAMS_START",               value: "(" },
          { type: "ARRAY_START",                value: "[" },
          { type: "DICTIONARY_START",           value: "[" },
          { type: currentTuple.tupleContentsFirstKey.type,       value: currentTuple.tupleContentsFirstKey.value },
          { type: "PUNCTUATION",                value: ":" },
          { type: currentTuple.tupleContentsFirstVal.type,       value: currentTuple.tupleContentsFirstVal.value },
          { type: "DICTIONARY_END",             value: "]" },
          { type: "PUNCTUATION",                value: "," },
          { type: "DICTIONARY_START",           value: "[" },
          { type: currentTuple.tupleContentsSecondKey.type,      value: currentTuple.tupleContentsSecondKey.value },
          { type: "PUNCTUATION",                value: ":" },
          { type: currentTuple.tupleContentsSecondVal.type,      value: currentTuple.tupleContentsSecondVal.value },
          { type: "DICTIONARY_END",             value: "]" },
          { type: "ARRAY_END",                  value: "]" },
          { type: "PARAMS_END",                 value: ")" }
        );
      } else {
        tokens.splice(currentTuple.start, currentTuple.stop - currentTuple.start + 1,
          { type: "DECLARATION_NEW",            value: "new" },
          { type: "IDENTIFIER",                 value: "Tuple" },
          { type: "PARAMS_START",               value: "(" },
          { type: "ARRAY_START",                value: "[" },
          { type: currentTuple.tupleContentsFirst.type,       value: currentTuple.tupleContentsFirst.value },
          { type: "PUNCTUATION",                value: "," },
          { type: currentTuple.tupleContentsSecond.type,      value: currentTuple.tupleContentsSecond.value },
          { type: "ARRAY_END",                  value: "]" },
          { type: "PARAMS_END",                 value: ")" }
        );
      }
    }
  }

  return tokens;
};

module.exports = rearrangeTokensTuples;
