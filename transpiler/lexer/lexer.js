var lexerFunctions = require("./lexerFunctions");

module.exports = function(code) {

  var STATE = {
    i: 0,
    tokens: [],
    currentTokenLength: 0,
    chunk: '',
    currCol: undefined,
    prevCol: undefined,
    nextCol: undefined,
    nextNextCol: undefined,
    VARIABLE_NAMES: {},
    FUNCTION_NAMES: {},
    CLASS_NAMES: {},
    STRUCT_NAMES: {},
    TUPLE_ELEMENT_NAMES: {},
    emptyLine: true,
    insideString: false,
    insideNumber: false,
    insideCollection: [],
    insideFunction: [],
    insideClass: [],
    insideStruct: [],
    stringInterpolation: {status: false, counter: 0, nestedInvocation: false},
    substringLookup: false,
    insideComment: {multi: false, single: false},
    insideTuple: {status: false, startIndex: undefined},
    insideInvocation: [],
    insideInitialization: [],
    lastToken: undefined,
    lastCollection: undefined,
    lastFunction: undefined,
    advance: function(positions) {
      this.i += positions;
    },
    clearChunk: function() {
      this.chunk = '';
    },
    advanceAndClear: function(positions) {
      this.i += positions;
      this.chunk = '';
    }
  }

  while (code[STATE.i] !== undefined) {
    //debugger;
    STATE.chunk += code[STATE.i];
    STATE.currCol = code[STATE.i];
    STATE.prevCol = code[STATE.i - 1];
    STATE.nextCol = code[STATE.i + 1];
    STATE.nextNextCol = code[STATE.i + 2];
    STATE.lastToken = STATE.tokens[STATE.tokens.length - 1];
    STATE.lastCollection = STATE.insideCollection[STATE.insideCollection.length - 1];
    STATE.lastFunction = STATE.insideFunction[STATE.insideFunction.length - 1];

    // console.log(STATE.chunk);
    // console.log(STATE.currCol);
    // console.log(STATE.nextCol);
    // console.log(STATE.tokens);
    // console.log(STATE.emptyLine);
    // console.log(STATE.insideInvocation[STATE.insideInvocation.length - 1]);
    
    // if (STATE.tokens.length !== STATE.currentTokenLength) {
    //  if (STATE.insideInvocation.length) {
    //    console.log(STATE.insideInvocation[STATE.insideInvocation.length - 1].name);
    //    console.log(STATE.insideInvocation[STATE.insideInvocation.length - 1].status);
    //    console.log(STATE.insideInvocation[STATE.insideInvocation.length - 1].parens);
    //  }
    //  STATE.currentTokenLength = STATE.tokens.length;
  //   // }

    // if (STATE.tokens.length !== STATE.currentTokenLengt //h) {
    //  if (STATE.insideFunction.l //ength) {
    //    console.log(STATE.tokens.length, STATE.insideFunction[STATE.insideFunction.length - 1].returnArro // //ws);
    //  }
    //  STATE.currentTokenLength = STATE.tokens //.length;
    // }

    // handles new lines
    if (lexerFunctions.handleNewLine(STATE)) {
      STATE.advanceAndClear(1);
      continue
    }

    // handles comments
    if (lexerFunctions.checkForCommentStart(STATE)) {
      STATE.advanceAndClear(2);
      continue;
    }
    if (lexerFunctions.handleComment(STATE)) {
      continue;
    }
    if (lexerFunctions.checkIfInsideComment(STATE)) {
      STATE.advance(1);
      continue;
    }

    // ignores chunks that are solely whitespace
    if (lexerFunctions.checkForWhitespace(STATE.chunk)) {
      STATE.advanceAndClear(1);
      continue;
    }

    // tracks whether inside a string
    if (STATE.currCol === '"' && STATE.insideString) {
      STATE.insideString = false;
    } else if (STATE.currCol === '"') {
      STATE.insideString = true;
    }

    // handles numbers
    if (lexerFunctions.handleNumber(STATE) === true) {
      STATE.advanceAndClear(1);
      continue;
    } else if (lexerFunctions.handleNumber(STATE) === "skip"){
      lexerFunctions.handleEndOfFile(STATE.nextCol, STATE.tokens);
      STATE.advance(2);
      continue;
    }

    // handles ranges
    if (lexerFunctions.handleRange(STATE)) {
      STATE.advanceAndClear(3);
      continue;
    }

    // handles string interpolation
    if (lexerFunctions.checkForStringInterpolationStart(STATE)) {
      STATE.advanceAndClear(3);
      continue;
    }
    if(lexerFunctions.checkForStringInterpolationEnd(STATE)) {
      STATE.advanceAndClear(1);
      STATE.chunk = '"';
      continue;
    }

    // Tokenizing return arrow
    if (STATE.insideFunction.length && STATE.currCol === "-" && STATE.nextCol === ">") {
      lexerFunctions.checkFor(STATE, 'FUNCTION_DECLARATION', "->", STATE.tokens);
      STATE.insideFunction[STATE.insideFunction.length - 1].returnArrows.push(STATE.tokens.length - 1);
      STATE.advanceAndClear(2);
      continue;
    }

    // adding the recently declared function to the FUNCTION_NAMES property, this may not work in all cases by adding incorrectly identified functions
    if (STATE.insideFunction.length && STATE.lastFunction.insideParams === true && STATE.chunk === '(') {
      // lexerFunctions.checkFor(STATE, 'FUNCTION_DECLARATION', STATE.chunk, STATE.tokens);
        var len = STATE.tokens.length - 1;
        while (STATE.tokens[len].type !== 'IDENTIFIER') {
          len--;
        }
        STATE.FUNCTION_NAMES[STATE.tokens[len].value] = true;
    }

    // Handles Function Invocations starting and ending
    if (lexerFunctions.handleFunctionInvocationStart(STATE)) {
      continue;
    }

    if (lexerFunctions.handleFunctionInvocationEnd(STATE)) {
      continue;
    }



    // tuple handling
    if (lexerFunctions.checkForTupleStart(STATE)) {
      STATE.advanceAndClear(1);
      continue;
    }
    if (STATE.insideTuple.status && lexerFunctions.handleTuple(STATE)) {
      STATE.advanceAndClear(1);
      continue;
    }
    if (lexerFunctions.checkForTupleEnd(STATE)) {
      STATE.advanceAndClear(1);
      lexerFunctions.handleEndOfFile(STATE.nextCol, STATE.tokens);
      continue;
    }

    // handling the ()'s inside of the function invocation
    if (lexerFunctions.handleFunctionInvocationInside(STATE)) {
      continue;
    }

    //handling functions declarations
    if (lexerFunctions.handleFunctionDeclarationStart(STATE)) {
      continue;
    }

    if (lexerFunctions.handleFunctionDeclarationInside(STATE)) {
      continue;
    }

    if (lexerFunctions.handleFunctionDeclarationEnd(STATE)) {
      continue;
    }

    // collection initializer handling
    if (STATE.tokens.length && STATE.currCol === '(' &&
      (STATE.lastToken.type === 'ARRAY_END' || STATE.lastToken.type === 'DICTIONARY_END')) {
      lexerFunctions.checkFor(STATE, 'FUNCTION_INVOCATION', STATE.currCol, STATE.tokens);
      var tmp = {};
      tmp.name = STATE.lastToken.value;
      tmp.status = true;
      tmp.parens = 0;
      STATE.insideInvocation.push(tmp);
      STATE.advanceAndClear(1);
      continue;
    }

    // handles colons functioning as inheritance operators
    if (STATE.tokens.length > 2 && STATE.tokens[STATE.tokens.length - 2].value === ':' &&
      STATE.CLASS_NAMES[STATE.lastToken.value] && STATE.CLASS_NAMES[STATE.tokens[STATE.tokens.length - 3].value]) {
      STATE.tokens[STATE.tokens.length - 2].type = 'INHERITANCE_OPERATOR';
    }

    // handles classes and structs
    if (lexerFunctions.handleClassOrStruct(STATE)) {
      STATE.advanceAndClear(1);
      continue;
    }

    // handles parentheses inside class and struct initialization
    if (STATE.chunk === '(' && STATE.insideInitialization.length &&
      STATE.insideInitialization[STATE.insideInitialization.length - 1].parens >= 1) {
      STATE.insideInitialization[STATE.insideInitialization.length - 1].parens++;
    }
    if (STATE.chunk === ')' && STATE.insideInitialization.length) {
      STATE.insideInitialization[STATE.insideInitialization.length - 1].parens--;
    }

    // handles property access and method calls via dot notation
    if (STATE.currCol === '.' && !lexerFunctions.checkForWhitespace(STATE.prevCol) &&
      !lexerFunctions.checkForWhitespace(STATE.nextCol) && (
        STATE.lastToken.type === 'IDENTIFIER' || STATE.lastToken.value === 'self' ||
        STATE.lastToken.type === 'TYPE_PROPERTY')) {
      lexerFunctions.makeToken(undefined, STATE.chunk, STATE.tokens, 'DOT_SYNTAX', '.');
      STATE.advanceAndClear(1);
      continue;
    }
    // main evaluation block
    if (!STATE.insideString && !STATE.insideNumber &&
      lexerFunctions.checkForEvaluationPoint(STATE)) {
      if (STATE.lastToken && STATE.lastToken.type === 'DOT_SYNTAX' && STATE.TUPLE_ELEMENT_NAMES[STATE.chunk]) {
        lexerFunctions.makeToken(undefined, undefined, STATE.tokens, 'TUPLE_ELEMENT_NAME', STATE.chunk);
      } else if (STATE.insideCollection.length && STATE.lastCollection.type === undefined &&
        lexerFunctions.checkFor(STATE, 'PUNCTUATION', STATE.chunk, STATE.tokens)) {
        lexerFunctions.determineCollectionType(STATE);
      } else if (STATE.insideCollection.length && STATE.currCol === ']' && !STATE.substringLookup) {
        lexerFunctions.checkFor(STATE, 'COLLECTION', STATE.chunk, STATE.tokens, function() {
          STATE.tokens[STATE.tokens.length - 1].type = STATE.lastCollection.type || 'ARRAY_END';
          STATE.insideCollection.pop();
        });
      } else if (STATE.tokens.length && STATE.lastToken.type !== 'IDENTIFIER' &&
        STATE.lastToken.type !== 'SUBSCRIPT_LOOKUP_END' && STATE.currCol === '[') {
        lexerFunctions.checkFor(STATE, 'COLLECTION', STATE.chunk, STATE.tokens, function(){
          STATE.insideCollection.push({type: undefined, location: STATE.tokens.length-1});})
      } else {
        lexerFunctions.checkFor(STATE, 'KEYWORD', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'NATIVE_METHOD', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'METHOD_ARGUMENT_NAME', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'TYPE_PROPERTY', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'TYPE', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'PUNCTUATION', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'SUBSCRIPT_LOOKUP', STATE.chunk, STATE.tokens, function() {
          STATE.substringLookup = !STATE.substringLookup;
        }) ||
        lexerFunctions.checkFor(STATE, 'OPERATOR', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'TERMINATOR', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkForIdentifier(STATE) ||
        lexerFunctions.checkForLiteral(STATE.chunk, STATE.tokens);
      }

      STATE.clearChunk();

      // special evaluation point handling
      if (lexerFunctions.checkForWhitespace(STATE.nextCol)) {
        STATE.advance(1);
      }
      lexerFunctions.handleEndOfFile(STATE.nextCol, STATE.tokens);

    }
    STATE.advance(1);
    // console.log(STATE.tokens);
  }

  if (STATE.tokens[STATE.tokens.length - 1].value === '\\n') {
    lexerFunctions.makeToken(undefined, undefined, STATE.tokens, 'TERMINATOR', 'EOF');
  }
  // console.log(STATE.tokens);
  return STATE.tokens;

};
