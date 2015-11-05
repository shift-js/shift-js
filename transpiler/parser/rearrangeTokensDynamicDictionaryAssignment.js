var util = require('util');

// Rewriter utility
// Accounts for Swift language feature not allowed in javascript (scope lookups inside array & dictionary literal declarations)
var rearrangeTokensDynamicDictionaryAssignment = function(tokensArray) {

  var start = 0;
  var end = 0;
  var identifierName;

  for(var i=0; i<tokensArray.length; i++) {
    var token = tokensArray[i];
    if(token.type === "DICTIONARY_START") {
      start = i;
      identifierName = tokensArray[i-2].value;
    }
    if(token.type === "DICTIONARY_END") {
      end = i;
    }
  }

  if(end === 0) {
    return tokensArray;
  }

  var dictionaryContents = tokensArray.slice(start+1, end);
  var kvDelim = [];
  for(var i=0; i<dictionaryContents.length; i++) {
    var token = dictionaryContents[i];
    if(token.value === ":" && token.type === "PUNCTUATION") {
      if(i === 0 && !dictionaryContents[i-1]) {
        return tokensArray;
      }
      if(dictionaryContents[i-1].type === "IDENTIFIER") {
        // the variable is the key
        kvDelim.push({ colonIdx: i, keyIdx: i-1 });
      } else if(dictionaryContents[i-1].value === "]" && dictionaryContents[i-3].value === "[" && dictionaryContents[i-4].type === "IDENTIFIER") {
        // property lookup is the key
        kvDelim.push({ colonIdx: i, keyIdx: i-4 });
      }
    }
  }

  if(kvDelim.length === 0) {
    return tokensArray;
  }

  for(var i=0; i<kvDelim.length; i++) {
    var obj = kvDelim[i];
    var idx = obj.keyIdx;
    if( ( idx - 1 ) >= 0) {
      if(dictionaryContents[idx-1]) {
        if(dictionaryContents[idx-1].value === ",") {
          //Swap comma token for semi-colon.
          dictionaryContents[idx-1].value = ";";
        }
      }
    }
  }

  for(var i=0; i<kvDelim.length; i++) {
    var obj = kvDelim[i];
    var idx = obj.colonIdx;
    if(dictionaryContents[idx]) {
      if(dictionaryContents[idx].value === ":") {
        //Swap colon for equal sign.
        dictionaryContents[idx].value = "=";
        dictionaryContents[idx].type = "OPERATOR";
      }
    }
  }

  var ranges = [];
  //split dictionaryContents
  for(var i=0; i<kvDelim.length; i++) {
    var kvpairObj = kvDelim[i];
    var kvStart = kvpairObj.keyIdx;
    var kvStop;
    if(kvDelim[i+1]) {
      kvStop = kvDelim[i+1].keyIdx - 1;
    } else {
      kvStop = null;
    }
    if(kvStop === null) {
      ranges.push({ start: kvStart });
    } else {
      ranges.push({ start: kvStart, stop: kvStop });
    }

  }

  var kvps = [];
  for(var i=0; i<ranges.length; i++) {
    var range = ranges[i];
    if(range.kvStop) {
      var kvp = dictionaryContents.slice(range.start);
    } else {
      var kvp = dictionaryContents.slice(range.start, range.stop);
    }
    kvps.push(kvp);
  }

  var statements = [];
  for(var i=0; i<kvDelim.length; i++) {
    var currentArray = [];
    currentArray.push({ type: "IDENTIFIER", value: identifierName });
    currentArray.push({ type: "PUNCTUATION", value: "[" });

    var sequence = kvps[i];
    var endKeyIndex = 0;
    for(var z=0; z<sequence.length; z++) {
      if(sequence[z].value === "=") {
        endKeyIndex = z;
        break;
      }
    }

    // insert key
    var keyArray = sequence.slice(0,endKeyIndex);
    for(var j=0; j<keyArray.length; j++) {
      currentArray.push(keyArray[j]);
    }
    currentArray.push({ type: "PUNCTUATION", value: "]" });

    // insert the rest
    var valArray = sequence.slice(endKeyIndex);
    for(var j=0; j<valArray.length; j++) {
      currentArray.push(valArray[j]);
    }

    statements.push(currentArray);
  }

  var throughDeclaration = tokensArray.slice(0, start+1);
  var dictEndThroughEnd = tokensArray.slice(end);

  var finalOutputArray = [];

  for(var i=0; i<throughDeclaration.length; i++) {
    finalOutputArray.push(throughDeclaration[i]);
  }
  for(var i=0; i<dictEndThroughEnd.length; i++) {
    if(i===0) {
      finalOutputArray.push(dictEndThroughEnd[i]);
    } else if(i===1) {
      finalOutputArray.push(dictEndThroughEnd[i]);
      for(var j=0; j<statements.length; j++) {
        var statement = statements[j];
        for(var k=0; k<statement.length; k++) {
          var item = statement[k];
          finalOutputArray.push(item);
          if(k === statement.length - 1) {
            finalOutputArray.push({ type: "PUNCTUATION", value: ";" });
          }
        }
      }
    } else {
      finalOutputArray.push(dictEndThroughEnd[i]);
    }
  }

  return finalOutputArray;
};

module.exports = rearrangeTokensDynamicDictionaryAssignment;