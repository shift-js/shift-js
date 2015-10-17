var lexerFunctions = require("./lexerFunctions");

//remember to rename the helperfunctions used here to has helperFunctions as their parent object

module.exports = function(code) {
  code = code.trim();
  var tokens = [];
  var chunk = '';
  var next = null;
  var i = 0;
  var afterAssignment = [false];
  var insideString = [false];
  var endString = [false];
  var insideCollection = [false];
  var currentCollectionType = [undefined];
  var firstCollectionInternalPuncuation = [undefined];
  var VARIABLE_NAMES = {};

  // advances the position of i by specified number of positions
  var advance = function(positions) {
    i += positions;
  };

  var clearChunk = function() {
    chunk = '';
  };

  // advances the position of i by specified number of positions and clears chunk
  var advanceAndClear = function(positions) {
    i += positions;
    clearChunk();
  };

  while (next !== undefined) {
    // debugger;
    chunk += code[i];
    next = code[i+1];
    if (code[i] === '"' && insideString[0]) {
      endString[0] = true;
      insideString[0] = false;
    } else if (code[i] === '"') {
      insideString[0] = true;
    }   
    if (code[i] === '[') {
      lexerFunctions.checkFor('ARRAY', code[i], tokens);
      insideCollection[0] = true;
      firstCollectionInternalPuncuation[0] = false;
      clearChunk();
    }
    if (insideCollection[0]) {
      if (!insideString[0] && firstCollectionInternalPuncuation[0] === false) {
        if (code[i] === ':') {
          var index = tokens.length - 1;
          while (index >= 0) {
            if (tokens[index].type === 'ARRAY_START') {
              tokens[index].type = 'DICTIONARY_START';
              break;
            }
            index--;
          }
          firstCollectionInternalPuncuation[0] = true;
          currentCollectionType[0] = 'dictionary';
        }
      }
      if (!insideString[0] && next === ']') {
        lexerFunctions.checkForLiteral(chunk, tokens);
        clearChunk();
        advance(1);
        continue;
      }
      if (code[i] === ']') {
        lexerFunctions.checkFor('PUNCTUATION', chunk, tokens)
        if (currentCollectionType[0] === 'dictionary') {
          lexerFunctions.checkFor('DICTIONARY', code[i], tokens);
        } else {
          lexerFunctions.checkFor('ARRAY', code[i], tokens);
        }
        insideCollection[0] = !insideCollection[0];
        firstCollectionInternalPuncuation[0] = undefined;
        currentCollectionType[0] = undefined;
        clearChunk();
        continue;
      }
    }
    if (chunk === ' ' && next === ' ') {
      advanceAndClear(1);
      continue;
    }
    if (!insideString[0]) {
      if (endString[0] || lexerFunctions.checkFor('PUNCTUATION', next) || next === ' ' || next === undefined) {
        if (lexerFunctions.checkFor('KEYWORDS', chunk, tokens) || lexerFunctions.checkFor('OPERATOR', chunk, tokens, function(){afterAssignment[0] = true;}) || lexerFunctions.checkFor('PUNCTUATION', chunk, tokens)) { 

        } else if (afterAssignment[0]) {
           lexerFunctions.checkForLiteral(chunk, tokens);
           // afterAssignment[0] = !afterAssignment[0];
        } else {
          lexerFunctions.checkForIdentifier(chunk, tokens, VARIABLE_NAMES);
        }
        advanceAndClear(1);
        if (endString[0] || lexerFunctions.checkFor('PUNCTUATION', next)) {
          advance(-1);
          endString[0] = false;
        }
      }
    }
    advance(1);
  }
  return tokens;
};
