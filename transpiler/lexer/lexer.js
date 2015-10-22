var lexerFunctions = require("./lexerFunctions");

module.exports = function(code) {
  
  code = code.trim();
  var i = 0;
  var tokens = [];
  var chunk = '';
  var currCol, prevCol, nextCol, nextNextCol;
  var VARIABLE_NAMES = {};
  
  // track state
  var insideString = {status: false};
  var insideNumber = {status: false};
  var insideCollection = [];
  var stringInterpolation = {status: false, counter: 0};
  var substringLookup = {status: false};
  var insideComment = {multi: false, single: false};
  var insideTuple = {status: false, startIndex: undefined, verified: false};
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
    nextNextCol = code[i + 2];
    var lastToken = tokens[tokens.length - 1];
    var lastCollection = insideCollection[insideCollection.length - 1];
    var lastCollectionIndex = insideCollection.length - 1;
    
    // console.log(chunk);
    // console.log(tokens);

    // track state: whether inside a string
    if (currCol === '"' && insideString.status) {
      insideString.status = false;
    } else if (currCol === '"') {
      insideString.status = true;
    }
   
    // tracks state: whether inside a number
    if (lexerFunctions.handleNumber(insideString, insideNumber, chunk, 
      tokens, nextCol)) {
      advanceAndClear(1);
      continue;
    }
    
    // comment handling
    if (lexerFunctions.checkForComment(insideComment, chunk, tokens, 
      currCol, nextCol, nextNextCol, advanceAndClear)) {
      continue;
    }
    if (lexerFunctions.checkInsideComment(insideComment)) {
      advance(1);
      continue;
    }
    
    // string interpolation handling
    if (lexerFunctions.checkForStringInterpolationStart(stringInterpolation,
      insideString, chunk, tokens, nextCol, nextNextCol)) {
      advanceAndClear(3);
      continue;      
    }
    if(lexerFunctions.checkForStringInterpolationEnd(stringInterpolation,
      insideString, tokens, currCol, nextNextCol)) {
      advanceAndClear(1);
      chunk = '"';
      continue;      
    }
    
    // tuple handling
    if (lexerFunctions.checkForTupleStart(insideTuple, chunk, tokens, lastToken,
    currCol, nextCol, nextNextCol, advanceAndClear)) {
      advanceAndClear(1);
      continue;
    }
    if (insideTuple.status && lexerFunctions.handleTuple(insideTuple, chunk, 
      tokens, currCol, nextCol)) {
      advanceAndClear(1);
      continue;
    }
    if (lexerFunctions.checkForTupleEnd(insideTuple, chunk, tokens, currCol)) {
      advanceAndClear(1);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
      continue;
    }
    
    // main evaluation block
    if (!insideString.status && !insideNumber.status && 
      lexerFunctions.checkForEvaluationPoint(currCol, nextCol)) {

      if (insideCollection.length && lastCollection.type === undefined &&
        lexerFunctions.checkFor('PUNCTUATION', chunk, tokens)){
        lexerFunctions.determineCollectionType(insideCollection, tokens);
      } else if (insideCollection.length && currCol === ']' && !substringLookup.status) {
        lexerFunctions.checkFor('COLLECTION', chunk, tokens, function() {
          tokens[tokens.length - 1].type = lastCollection.type || 'ARRAY_END';
          insideCollection.pop();
        });
      } else if (tokens.length && lastToken.type !== 'IDENTIFIER' && currCol === '[') {
        lexerFunctions.checkFor('COLLECTION', chunk, tokens, function(){
          insideCollection.push({type: undefined, location: tokens.length-1});})
      } else {
        lexerFunctions.checkFor('KEYWORD', chunk, tokens) ||
        lexerFunctions.checkFor('PUNCTUATION', chunk, tokens) || 
        lexerFunctions.checkFor('SUBSTRING_LOOKUP', chunk, tokens, function() {
          substringLookup.status = !substringLookup.status;
        }) ||
        lexerFunctions.checkFor('OPERATOR', chunk, tokens) || 
        lexerFunctions.checkFor('TERMINATOR', chunk, tokens) || 
        lexerFunctions.checkForIdentifier(chunk, tokens, lastToken, VARIABLE_NAMES) ||
        lexerFunctions.checkForLiteral(chunk, tokens);
      }
      
      clearChunk();
      
      // special evaluation point handling
      if (lexerFunctions.checkForWhitespace(nextCol)) advance(1);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
      
    }
    advance(1);
    // console.log(tokens);
  }
  // console.log(tokens);
  return tokens;
  
};