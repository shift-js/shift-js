var lexerFunctions = require("./lexerFunctions");

module.exports = function(code) {

  var i = 0;
  var tokens = [];
  var chunk = '';
  var currCol, prevCol, nextCol, nextNextCol;
  var VARIABLE_NAMES = {};
  var FUNCTION_NAMES = {};
  var CLASS_NAMES = {}; 
  var STRUCT_NAMES = {};

  // track state
  var emptyLine = {status: true};
  var insideString = {status: false};
  var insideNumber = {status: false};
  var insideCollection = [];
  var insideFunction = [];
  var insideClass = [];
  var insideStruct = [];
  var stringInterpolation = {status: false, counter: 0};
  var substringLookup = {status: false};
  var insideComment = {multi: false, single: false};
  var insideTuple = [];
  var insideInvocation = [];
  var insideInitialization = [];
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
    chunk += code[i];
    currCol = code[i];
    prevCol = code[i - 1];
    nextCol = code[i + 1];
    nextNextCol = code[i + 2];
    var lastToken = tokens[tokens.length - 1];
    var lastCollectionIndex = insideCollection.length - 1;
    var lastCollection = insideCollection[lastCollectionIndex];
    var lastFunctionIndex = insideFunction.length - 1;
    var lastFunction = insideFunction[lastFunctionIndex];



    // console.log(chunk);
    // console.log(currCol);
    // console.log(nextCol);
    // console.log(tokens);
    // console.log(emptyLine);

    // newline handling
    if (lexerFunctions.handleNewLine(emptyLine, tokens, lastToken, currCol)) {
      advanceAndClear(1);
      continue
    }

    // comment handling
    if (lexerFunctions.checkForCommentStart(insideComment, chunk, tokens,
        currCol, nextCol)) {
      advanceAndClear(2);
      continue;
    }
    if (lexerFunctions.handleComment(insideComment, chunk, tokens,
        currCol, nextCol, nextNextCol, advanceAndClear)) {
      continue;
    }
    if (lexerFunctions.checkIfInsideComment(insideComment)) {
      advance(1);
      continue;
    }

    if (chunk === ' ') {
      advanceAndClear(1);
      continue;
    }

    // tracks state: whether inside a string
    if (currCol === '"' && insideString.status) {
      insideString.status = false;
    } else if (currCol === '"') {
      insideString.status = true;
    }

    // number handling
    if (lexerFunctions.handleNumber(insideString, insideNumber, chunk, tokens, nextCol, nextNextCol)) {
      advanceAndClear(1);
      continue;
    }

    // handle ranges
    if (!insideString.status && !lexerFunctions.checkIfInsideComment(insideComment)) {
      if (currCol === '.' && nextCol === '.' && nextNextCol === '.') {
        if (insideFunction.length && insideFunction[insideFunction.length - 1].insideParams === true) {
          lexerFunctions.checkFor('FUNCTION_DECLARATION', '...', tokens);
          advanceAndClear(3);
          continue;
        } else {
          lexerFunctions.checkFor('RANGES', '...', tokens);
          advanceAndClear(3);
          continue;
        }
      }
      if (currCol === '.' && nextCol === '.' && nextNextCol === '<') {
        lexerFunctions.checkFor('RANGES', '..<', tokens);
        advanceAndClear(3);
        continue;
      }
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

    if (insideFunction.length && currCol === "-" && nextCol === ">") {
      lexerFunctions.checkFor('FUNCTION_DECLARATION', "->", tokens);
      if (insideFunction[insideFunction.length - 1].insideReturnStatement === false) {
        insideFunction[insideFunction.length - 1].insideReturnStatement = true;
      }     
      advanceAndClear(2);
      continue;
    }
    if (chunk === '(' && FUNCTION_NAMES[lastToken.value]) {
      lexerFunctions.checkFor('FUNCTION_INVOCATION', chunk, tokens);
      var tmp = {};
      tmp.name = lastToken.value;
      tmp.status = true;
      insideInvocation.push(tmp);
      advanceAndClear(1);
      continue;
    }
    if (insideInvocation.length && (insideInvocation[insideInvocation.length - 1]).status && chunk === ')') {
      lexerFunctions.checkFor('FUNCTION_INVOCATION', chunk, tokens);
      var last = insideInvocation[insideInvocation.length - 1];
      last.status = false;
      insideInvocation.pop();
      advanceAndClear(1);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
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

    //handling functions lexing
    if (chunk === 'func') {
      lexerFunctions.checkFor('KEYWORD', chunk, tokens);
      var temp = {};
      temp.status = true;
      temp.insideParams = false;
      temp.statements = 0;
      temp.curly = 0;
      temp.insideReturnStatement = false;
      // temp.index = tokens.length - 1;
      insideFunction.push(temp);
      advanceAndClear(2);
      continue;
    }
    if (insideFunction.length && chunk === '(' &&
      insideFunction[insideFunction.length - 1].insideParams === false) {
      FUNCTION_NAMES[lastToken.value] = true;
      lexerFunctions.checkFor('FUNCTION_DECLARATION', chunk, tokens);
      insideFunction[insideFunction.length - 1].insideParams = true;
      advanceAndClear(1);
      continue;
    }
    
    if (insideFunction.length && chunk === ')' && insideFunction[insideFunction.length - 1].insideParams === true) {
      lexerFunctions.checkFor('FUNCTION_DECLARATION', chunk, tokens);
      insideFunction[insideFunction.length - 1].insideParams = "ended";
      advanceAndClear(1);
      continue;
    }

    if (tokens.length >= 2 && tokens[tokens.length - 2]['type'] === 'PUNCTUATION' && 
      tokens[tokens.length - 2]['value'] === '(' && lastFunction && lastFunction.insideReturnStatement === true) {
      tokens[tokens.length - 2].type = 'PARAMS_START';
    }

    if (insideFunction.length && chunk === ')' && insideFunction[insideFunction.length - 1].insideReturnStatement === true) {
      lexerFunctions.checkFor('FUNCTION_DECLARATION', chunk, tokens);
      insideFunction[insideFunction.length - 1].insideReturnStatement = "ended";
      advanceAndClear(1);
      continue;
    }

    if (insideFunction.length && chunk === '{' && insideFunction[insideFunction.length - 1].statements === 0) {
      lexerFunctions.checkFor('FUNCTION_DECLARATION', chunk, tokens);
      insideFunction[insideFunction.length - 1].statements++;
      insideFunction[insideFunction.length - 1].insideReturnStatement = "ended";
      advanceAndClear(1);
      continue;
    }
    if (insideFunction.length && chunk === '{' && insideFunction[insideFunction.length - 1].statements === 1) {
      lexerFunctions.checkFor('PUNCTUATION', chunk, tokens);
      insideFunction[insideFunction.length - 1].curly++;
      advanceAndClear(1);
      continue;
    }
    if (insideFunction.length && chunk === '}' && insideFunction[insideFunction.length - 1].statements === 1 && insideFunction[insideFunction.length - 1].curly > 0) {
      lexerFunctions.checkFor('PUNCTUATION', chunk, tokens);
      insideFunction[insideFunction.length - 1].curly--;
      advanceAndClear(1);
      continue;
    }
    if (insideFunction.length && chunk === '}' && insideFunction[insideFunction.length - 1].statements === 1 && insideFunction[insideFunction.length - 1].curly === 0) {
      lexerFunctions.checkFor('FUNCTION_DECLARATION', chunk, tokens);
      insideFunction[insideFunction.length - 1].statements--;
      insideFunction.pop();
      advanceAndClear(1);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
      continue;
    }

    //TODO function declaration
    
    // collection initializer syntax handling
    if (tokens.length && currCol === '(' && nextCol === ')' &&
      (lastToken.type === 'ARRAY_END' || lastToken.type === 'DICTIONARY_END')) {
      lexerFunctions.checkFor('FUNCTION_INVOCATION', currCol, tokens);
      lexerFunctions.checkFor('FUNCTION_INVOCATION', nextCol, tokens);
      advanceAndClear(2);
      continue;
    }
    
    
    // classes and structures handling
    if (insideClass.length && insideClass[insideClass.length - 1].curly === 0 &&
      chunk === '{') {
      lexerFunctions.checkFor('CLASS_DEFINITION', chunk, tokens);
      insideClass[insideClass.length - 1].curly++;
      advanceAndClear(1);
      continue;
    }
    if (insideClass.length && insideClass[insideClass.length - 1].curly === 1 &&
      chunk === '}') {
      lexerFunctions.checkFor('CLASS_DEFINITION', chunk, tokens);
      insideClass.pop();
      advanceAndClear(1);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
      continue;
    }
    if (insideStruct.length && insideStruct[insideStruct.length - 1].curly === 0 &&
      chunk === '{') {
      lexerFunctions.checkFor('STRUCT_DEFINITION', chunk, tokens);
      insideStruct[insideStruct.length - 1].curly++;
      advanceAndClear(1);
      continue;
    }
    if (insideStruct.length && insideStruct[insideStruct.length - 1].curly === 1 &&
      chunk === '}') {
      lexerFunctions.checkFor('STRUCT_DEFINITION', chunk, tokens);
      insideStruct.pop();
      advanceAndClear(1);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
      continue;
    }
    if (tokens.length && (CLASS_NAMES[lastToken.value] || 
      STRUCT_NAMES[lastToken.value] && chunk === '(')) {
      lexerFunctions.checkFor('INITIALIZATION', chunk, tokens)
      var temp = {};
      temp.status = true;
      temp.parens = 1;
      insideInitialization.push(temp);
      advanceAndClear(1);
      continue;
    }
    if (chunk === ')' && insideInitialization.length && 
      insideInitialization[insideInitialization.length - 1].parens === 1) {
      lexerFunctions.checkFor('INITIALIZATION', chunk, tokens);
      insideInitialization.pop();
      advanceAndClear(1);
      lexerFunctions.handleEndOfFile(nextCol, tokens);
      continue;
    }
    
    // handles parentheses inside class and struct initialization
    if (chunk === '(' && insideInitialization.length && 
      insideInitialization[insideInitialization.length - 1].parens >= 1) {
      insideInitialization[insideInitialization.length - 1].parens++;
    }
    if (chunk === ')' && insideInitialization.length) {
      insideInitialization[insideInitialization.length - 1].parens--;
    }
    
    // handles property access and method calls via dot notation
    if (currCol === '.' && !lexerFunctions.checkForWhitespace(prevCol) &&
      !lexerFunctions.checkForWhitespace(nextCol) && lastToken.type === 'IDENTIFIER') {
      lexerFunctions.makeToken(undefined, chunk, tokens, 'DOT_SYNTAX', '.');
      advanceAndClear(1);
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
      } else if (tokens.length && lastToken.type !== 'IDENTIFIER' &&
        lastToken.type !== 'SUBSTRING_LOOKUP_END' && currCol === '[') {
        lexerFunctions.checkFor('COLLECTION', chunk, tokens, function(){
          insideCollection.push({type: undefined, location: tokens.length-1});})
      } else {
        lexerFunctions.checkFor('KEYWORD', chunk, tokens) ||
        lexerFunctions.checkFor('TYPE', chunk, tokens) ||
        lexerFunctions.checkFor('PUNCTUATION', chunk, tokens) ||
        lexerFunctions.checkFor('SUBSTRING_LOOKUP', chunk, tokens, function() {
          substringLookup.status = !substringLookup.status;
        }) ||
        lexerFunctions.checkFor('OPERATOR', chunk, tokens) ||
        lexerFunctions.checkFor('TERMINATOR', chunk, tokens) ||
        lexerFunctions.checkForIdentifier(chunk, tokens, lastToken, VARIABLE_NAMES, insideFunction, insideClass, insideStruct, CLASS_NAMES, STRUCT_NAMES) ||
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

  if (tokens[tokens.length - 1].value === '\\n') {
    lexerFunctions.makeToken(undefined, undefined, tokens, 'TERMINATOR', 'EOF');
  }
  // console.log(tokens);
  return tokens;

};