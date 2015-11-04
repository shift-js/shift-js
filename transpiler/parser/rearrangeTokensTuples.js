var util = require('util');

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
    for(var j=0; j<tuples.length; j++) {
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

//var input = [
//  { type: "DECLARATION_KEYWORD",        value: "let" },
//  { type: "IDENTIFIER",                 value: "http200Status" },
//  { type: "OPERATOR",                   value: "=" },
//  { type: "TUPLE_START",                value: "("},
//  { type: "TUPLE_ELEMENT_NAME",         value: "statusCode"},
//  { type: "PUNCTUATION",                value: ":" },
//  { type: "NUMBER",                     value: "200"},
//  { type: "PUNCTUATION",                value: "," },
//  { type: "TUPLE_ELEMENT_NAME",         value: "description"},
//  { type: "PUNCTUATION",                value: ":" },
//  { type: "STRING",                     value: "OK"},
//  { type: "TUPLE_END",                  value: ")"},
//  { type: "PUNCTUATION",                value: ";" },
//  { type: "TERMINATOR",                 value: "EOF" }
//];
//
//var output = [
//  { type: "DECLARATION_KEYWORD",        value: "var" },
//  { type: "IDENTIFIER",                 value: "error" },
//  { type: "OPERATOR",                   value: "=" },
//  { type: "DECLARATION_NEW",            value: "new" },
//  { type: "IDENTIFIER",                 value: "Tuple" },
//  { type: "PARAMS_START",               value: "(" },
//  { type: "ARRAY_START",                value: "[" },
//  { type: "DICTIONARY_START",           value: "[" },
//  { type: "STRING",                     value: "statusCode"},
//  { type: "PUNCTUATION",                value: ":" },
//  { type: "NUMBER",                     value: "200"},
//  { type: "DICTIONARY_END",             value: "]" },
//  { type: "PUNCTUATION",                value: "," },
//  { type: "DICTIONARY_START",           value: "[" },
//  { type: "STRING",                     value: "description"},
//  { type: "PUNCTUATION",                value: ":" },
//  { type: "STRING",                     value: "OK"},
//  { type: "DICTIONARY_END",             value: "]" },
//  { type: "ARRAY_END",                  value: "]" },
//  { type: "PARAMS_END",                 value: ")" },
//  { type: "TERMINATOR",                 value: "EOF" }
//];
//
//console.log(util.inspect(rearrangeTokensTuples(input), {colors: true}));

//var input = [
//  { type: "DECLARATION_KEYWORD",        value: "var" },
//  { type: "IDENTIFIER",                 value: "error" },
//  { type: "OPERATOR",                   value: "=" },
//  { type: "TUPLE_START",                value: "("},
//  { type: "NUMBER",                     value: "404"},
//  { type: "PUNCTUATION",                value: "," },
//  { type: "STRING",                     value: "not found"},
//  { type: "TUPLE_END",                  value: ")"},
//  { type: "TERMINATOR",                 value: "EOF" }
//];
//
//var output = [
//  { type: "DECLARATION_KEYWORD",        value: "var" },
//  { type: "IDENTIFIER",                 value: "error" },
//  { type: "OPERATOR",                   value: "=" },
//  { type: "DECLARATION_NEW",            value: "new" },
//  { type: "IDENTIFIER",                 value: "Tuple" },
//  { type: "PARAMS_START",               value: "(" },
//  { type: "ARRAY_START",                value: "[" },
//  { type: "NUMBER",                     value: "404" },
//  { type: "PUNCTUATION",                value: "," },
//  { type: "STRING",                     value: "not found"},
//  { type: "ARRAY_END",                  value: "]" },
//  { type: "PARAMS_END",                 value: ")" },
//  { type: "TERMINATOR",                 value: "EOF" }
//];
//
//console.log(util.inspect(rearrangeTokensTuples(input), {colors: true}));