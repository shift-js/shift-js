var lexerFunctions = require("./lexerFunctions");

module.exports = function(code) {
  var NUMBER = /^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i;
  
  code = code.trim();
  var i = 0;
  var tokens = [];
  var chunk = '';
  var currCol, prevCol, nextCol;
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
    var lastToken = tokens[tokens.length - 1];
    var lastCollection = insideCollection[insideCollection.length - 1];
    var lastCollectionIndex = insideCollection.length - 1;
    
    // console.log(chunk);
    
    if (currCol === '/' && nextCol === '*' && 
      (!insideComment.multi || !insideComment.single)) {
      insideComment.multi = true;
      chunk += nextCol;
      lexerFunctions.checkFor('COMMENT', chunk, tokens);
      advanceAndClear(2);
      continue;
    }
    if (currCol === '/' && nextCol === '/' &&
      (!insideComment.multi || !insideComment.single)) {
      insideComment.single = true;
      chunk += nextCol;
      lexerFunctions.checkFor('COMMENT', chunk, tokens);
      advanceAndClear(2);
      continue;
    }
    if (insideComment.multi && (nextCol === '*' && code[i + 2] === '/')) {
      insideComment.multi = false;
      lexerFunctions.makeToken(undefined, undefined, tokens, 'COMMENT', chunk);
      chunk = nextCol + code[i + 2];
      lexerFunctions.checkFor('COMMENT', chunk, tokens);
      advanceAndClear(4);
      continue;
    }
    if (insideComment.single && (nextCol === undefined)) {
      // TO DO -- handle single line comment once we start handling multi line blocks
      insideComment.multi = false;
      lexerFunctions.makeToken(undefined, undefined, tokens, 'COMMENT', chunk);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
      advanceAndClear(1);
      continue;
    }
    if (insideComment.multi || insideComment.single) {
      advance(1);
      continue;
    }
    
    if (currCol === '"' && insideString.status) {
      insideString.status = false;
    } else if (currCol === '"') {
      insideString.status = true;
    }
    
    if (NUMBER.test(chunk) && !insideString.status && !insideNumber.status) {
      insideNumber.status = true;
    }
    if (insideNumber.status && isNaN(nextCol) && nextCol !== '.') {
      insideNumber.status = false;
      lexerFunctions.checkForLiteral(chunk, tokens);
      advanceAndClear(1);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
      continue;
    }

    if (!stringInterpolation.status && nextCol === '\\' && code[i + 2] === '(') {
      stringInterpolation.status = true;
      if (chunk !== "") {
        lexerFunctions.checkForLiteral(chunk + '"', tokens);
      }
      lexerFunctions.makeToken("SPECIAL_STRING", "\\(", tokens);
      advanceAndClear(3);
      insideString.status = false;
      continue;
    }
    if (stringInterpolation.status && currCol === ")" && stringInterpolation.counter === 0) {
      stringInterpolation.status = false;
      lexerFunctions.makeToken("SPECIAL_STRING", ")", tokens);
      advanceAndClear(1);
      chunk = '"';
      insideString.status = true;
      continue;
    }
    
    if (currCol === '(' && (lastToken.value === '=' || lastToken.value === 'return' ||
      lastToken.value === '->') ) {
      lexerFunctions.makeToken(undefined, undefined, tokens, 'TUPLE_START', chunk);
      if (nextCol === ')') {
        lexerFunctions.makeToken(undefined, undefined, tokens, 'TUPLE_END', nextCol);
        advanceAndClear(2);
        lexerFunctions.handleEndOfFile(code[i + 2], tokens);
      } else {
        insideTuple.status = true;
        insideTuple.startIndex = tokens.length - 1;
        advanceAndClear(1);
      }
      continue;
    }
    if (insideTuple.status && nextCol === ':') {
      chunk = chunk.trim();
      lexerFunctions.makeToken(undefined, undefined, tokens, 'TUPLE_ELEMENT_NAME', chunk);
      advanceAndClear(1);
      continue;
    }
    if (insideTuple.status && currCol === ',') {
      insideTuple.verified = true;
    }
    if (insideTuple.status && currCol === ')') {
      if (insideTuple.verified) {
        lexerFunctions.makeToken(undefined, undefined, tokens, 'TUPLE_END', chunk);
        insideTuple.status = false;
        insideTuple.startIndex = undefined;
        insideTuple.verified = false;
        advanceAndClear(1);
        lexerFunctions.handleEndOfFile(nextCol, tokens);
        continue;
      } else {
        tokens[insideTuple.startIndex].type = 'PUNCTUATION';
        insideTuple.status = false;
        insideTuple.startIndex = undefined;
        insideTuple.verified = false;
      }
    }
    
    // console.log(chunk);
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
        lexerFunctions.checkForIdentifier(chunk, tokens, VARIABLE_NAMES) ||
        lexerFunctions.checkFor('PUNCTUATION', chunk, tokens) || 
        lexerFunctions.checkFor('SUBSTRING_LOOKUP', chunk, tokens, function() {
          substringLookup.status = !substringLookup.status;
        }) ||
        lexerFunctions.checkFor('OPERATOR', chunk, tokens) || 
        lexerFunctions.checkForLiteral(chunk, tokens);
      }
      
      clearChunk();
      
      // handles special evaluation point scenarios
      if (lexerFunctions.checkForWhitespace(nextCol)) advance(1);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
      
    }
    advance(1);
    // console.log(tokens);
  }
  // console.log(tokens);
  return tokens;
  
};