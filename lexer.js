var lexerFunctions = require("./lexerFunctions");

module.exports = function(code) {
  
  code = code.trim();
  var i = 0;
  var tokens = [];
  var chunk = '';
  var currCol, prevCol, nextCol;
  var VARIABLE_NAMES = {};
  
  // track state
  var insideString = {status: false, end: false};
  var insideCollection = {status: false, type: undefined};
  // TODO - scope

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

  while (code[i] !== undefined) {
    debugger;
    chunk += code[i];
    currCol = code[i];
    prevCol = code[i - 1];
    nextCol = code[i + 1];
    
    if (currCol === '"' && insideString.status) {
      insideString.status = false;
      insideString.end = true;
    } else if (currCol === '"') {
      insideString.status = true;
    }
    
    // handles white space outside of string
    if (lexerFunctions.checkForWhitespace(currCol) && !insideString.status) {
      advanceAndClear(1);
      continue;
    }
    if (!insideString.status) {
      if (insideString.end) {
        lexerFunctions.checkForLiteral(chunk, tokens);
        insideString.end = false;
        advanceAndClear(1);
        continue;
      } else if (lexerFunctions.checkForWhitespace(nextCol) || 
        lexerFunctions.checkFor('PUNCTUATION', nextCol) || 
        lexerFunctions.checkFor('PUNCTUATION', currCol) || 
        lexerFunctions.checkFor('OPERATOR', nextCol) || 
        lexerFunctions.checkFor('OPERATOR', currCol) || 
        nextCol === '"' || nextCol === ']' || nextCol === undefined) {
        if (insideCollection.status && insideCollection.type === undefined &&
          lexerFunctions.checkFor('PUNCTUATION', chunk, tokens)){
          console.log('setting collection type....');
          lexerFunctions.determineCollectionType(insideCollection, tokens);
          console.log('collection type: ',insideCollection.type);
        } else if (insideCollection.type === 'ARRAY' && 
          lexerFunctions.checkFor('ARRAY', chunk)) {
          lexerFunctions.checkFor('ARRAY', chunk, tokens, function(){
            insideCollection.status = false;
            insideCollection.type = undefined;
          })
        } else if (insideCollection.type === 'DICTIONARY' && 
          lexerFunctions.checkFor('DICTIONARY', chunk)) {
          lexerFunctions.checkFor('DICTIONARY', chunk, tokens, function(){
            insideCollection.status = false;
            insideCollection.type = undefined;
          })
        } else {
          lexerFunctions.checkFor('KEYWORD', chunk, tokens) ||
          lexerFunctions.checkForIdentifier(chunk, tokens, VARIABLE_NAMES) ||
          lexerFunctions.checkFor('ARRAY', chunk, tokens, function(){
            insideCollection.status = true;}) ||
          lexerFunctions.checkFor('PUNCTUATION', chunk, tokens) || 
          lexerFunctions.checkFor('OPERATOR', chunk, tokens) || 
          lexerFunctions.checkForLiteral(chunk, tokens);
        }
        advanceAndClear(1);
        if (lexerFunctions.checkForWhitespace(nextCol)) advance(1);
        continue;
      }
    }

    advance(1);
    
  }
  console.log(tokens);
  return tokens;
};
