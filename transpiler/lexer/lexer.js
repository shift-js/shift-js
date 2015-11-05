var lexerFunctions = require("./lexerFunctions");

module.exports = function(code) {

  // state object to store the token stream and other relevant information related to the Swift input
  var STATE = {
    // current position in code
    i: 0,                                                                       // current position in code
    tokens: [],                                                                 // array to hold token stream
    chunk: '',                                                                  // current chunk to be evaluated
    currCol: undefined,                                                         // current column in the code
    prevCol: undefined,                                                         // current column - 1         
    nextCol: undefined,                                                         // current column + 1
    nextNextCol: undefined,                                                     // current column + 2
    VARIABLE_NAMES: {},                                                         // object to store all variable names
    FUNCTION_NAMES: {},                                                         // object to store all function names
    CLASS_NAMES: {},                                                            // object to store all class names
    STRUCT_NAMES: {},                                                           // object to store all struct names
    TUPLE_ELEMENT_NAMES: {},                                                    // object to store all tuple element names
    emptyLine: true,                                                            // tracks whether line is empty to remove unnecessary whitespace
    insideString: false,                                                        // tracks whether the chunk is a string
    insideNumber: false,                                                        // tracks whether the chunk is a number
    insideCollection: [],                                                       // tracks whether the lexer is inside a collection; handles nested collections
    insideFunction: [],                                                         // tracks whether the lexer is inside a function; handles nested functions
    insideClass: [],                                                            // tracks whether the lexer is evaluating inside a class
    insideStruct: [],                                                           // tracks whether the lexer is evaluating inside a struct
    stringInterpolation: {status: false, counter: 0, nestedInvocation: false},  // tracks whether the lexer is evaluating inside string interpolations  
    subscriptLookup: false,                                                     // tracks whether square brackets relate to subscript lookup
    insideComment: {multi: false, single: false},                               // tracks whether the lexer is evaluating inside a comment
    insideTuple: {status: false, startIndex: undefined},                        // tracks whether the lexer is evaluating inside a tuple
    insideInvocation: [],                                                       // tracks whether the lexer is evaluating inside a function invocation
    insideInitialization: [],                                                   // tracks whether the lexer is evaluating inside a struct or class initialization
    lastToken: undefined,                                                       // reference to last token added to tokens array
    lastCollection: undefined,                                                  // reference to start of last collection added to tokens array  
    lastFunction: undefined,                                                    // reference to start of last function added to tokens array 
    variableArrows: [],                                                         // stores references to return arrows
    advance: function(positions) {                                              // helper method to advance i n positions
      this.i += positions;
    },
    clearChunk: function() {                                                    // helper method to clear the chunk
      this.chunk = '';
    },
    advanceAndClear: function(positions) {                                      // helper method to advance i n positions and clear the chunk
      this.i += positions;
      this.chunk = '';
    }
  }

  // main loop that iterates through the input code
  while (code[STATE.i] !== undefined) {

    // sets state properties for the iteration
    STATE.chunk += code[STATE.i];
    STATE.currCol = code[STATE.i];
    STATE.prevCol = code[STATE.i - 1];
    STATE.nextCol = code[STATE.i + 1];
    STATE.nextNextCol = code[STATE.i + 2];
    STATE.lastToken = STATE.tokens[STATE.tokens.length - 1];
    STATE.lastCollection = STATE.insideCollection[STATE.insideCollection.length - 1];
    STATE.lastFunction = STATE.insideFunction[STATE.insideFunction.length - 1];

    // handles new lines
    if (lexerFunctions.handleNewLine(STATE)) {
      continue
    }

    // handles comments
    if (lexerFunctions.checkForCommentStart(STATE)) {
      continue;
    }
    if (lexerFunctions.handleComment(STATE)) {
      continue;
    }
    if (lexerFunctions.checkIfInsideComment(STATE)) {
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
      continue;
    }

    // handles string interpolation
    if (lexerFunctions.checkForStringInterpolationStart(STATE)) {
      continue;
    }
    if(lexerFunctions.checkForStringInterpolationEnd(STATE)) {
      continue;
    }

    // tokenizes return arrows
    if (STATE.currCol === "-" && STATE.nextCol === ">") {
      lexerFunctions.checkFor(STATE, 'FUNCTION_DECLARATION', "->", STATE.tokens);
      if (STATE.insideFunction.length) {
        STATE.lastFunction.returnArrows.push(STATE.tokens.length - 1);
      } else {
        STATE.variableArrows.push(STATE.tokens.length - 1);
        lexerFunctions.rewriteVariableParensHistory(STATE);
      }
      STATE.advanceAndClear(2);
      continue;
    }

    // adds the recently declared function to the FUNCTION_NAMES property, this may not work in all cases by adding incorrectly identified functions
    if (STATE.insideFunction.length && STATE.lastFunction.insideParams === true && STATE.chunk === '(') {
        var len = STATE.tokens.length - 1;
        while (STATE.tokens[len].type !== 'IDENTIFIER') {
          len--;
        }
        STATE.FUNCTION_NAMES[STATE.tokens[len].value] = true;
    }

    // handles start and end of function invocations
    if (lexerFunctions.handleFunctionInvocationStart(STATE)) {
      continue;
    }
    if (lexerFunctions.handleFunctionInvocationEnd(STATE)) {
      continue;
    }

    // tuple handling
    if (lexerFunctions.checkForTupleStart(STATE)) {
      continue;
    }
    if (STATE.insideTuple.status && lexerFunctions.handleTuple(STATE)) {
      continue;
    }
    if (lexerFunctions.checkForTupleEnd(STATE)) {
      lexerFunctions.handleEndOfFile(STATE.nextCol, STATE.tokens);
      continue;
    }

    // handles parentheses inside of the function invocation
    if (lexerFunctions.handleFunctionInvocationInside(STATE)) {
      continue;
    }

    //handling functions declarations
    if (lexerFunctions.handleFunctionDeclarationStart(STATE)) {
      continue;
    }
    if (lexerFunctions.handleInsideOfFunctionDeclaration(STATE)) {
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
    
    // evaluation block that executes if the lexer is not inside a string,
    // not inside a number, and an appropriate evaluation point has been reached
    if (!STATE.insideString && !STATE.insideNumber &&
      lexerFunctions.checkForEvaluationPoint(STATE)) {
      
      // identifies tuple elements names following dot syntax lookups
      if (STATE.lastToken && STATE.lastToken.type === 'DOT_SYNTAX' && STATE.TUPLE_ELEMENT_NAMES[STATE.chunk]) {
        lexerFunctions.makeToken(undefined, undefined, STATE.tokens, 'TUPLE_ELEMENT_NAME', STATE.chunk);
      
      // invokes helper function to determine whether a collection is an array or dictionary 
      // upon identification of certain punctuation
      } else if (STATE.insideCollection.length && STATE.lastCollection.type === undefined &&
        lexerFunctions.checkFor(STATE, 'PUNCTUATION', STATE.chunk, STATE.tokens)) {
        lexerFunctions.determineCollectionType(STATE);
        
      // handles the last square bracket arrays and dictionaries appropriately 
      } else if (STATE.insideCollection.length && STATE.currCol === ']' && !STATE.subscriptLookup) {
        lexerFunctions.checkFor(STATE, 'COLLECTION', STATE.chunk, STATE.tokens, function() {
          STATE.tokens[STATE.tokens.length - 1].type = STATE.lastCollection.type || 'ARRAY_END';
          STATE.insideCollection.pop();
        });
        
      // handles the opens square bracket of arrays and dictionaries
      } else if (STATE.tokens.length && STATE.lastToken.type !== 'IDENTIFIER' &&
        STATE.lastToken.type !== 'SUBSCRIPT_LOOKUP_END' && STATE.currCol === '[') {
        lexerFunctions.checkFor(STATE, 'COLLECTION', STATE.chunk, STATE.tokens, function(){
          STATE.insideCollection.push({type: undefined, location: STATE.tokens.length-1});})
      
      // default, fallthrough evaluation of chunk based on lexical precedence
      } else {
        lexerFunctions.checkFor(STATE, 'KEYWORD', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'NATIVE_METHOD', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'METHOD_ARGUMENT_NAME', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'TYPE_PROPERTY', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'TYPE', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'PUNCTUATION', STATE.chunk, STATE.tokens) ||
        lexerFunctions.checkFor(STATE, 'SUBSCRIPT_LOOKUP', STATE.chunk, STATE.tokens, function() {
          STATE.subscriptLookup = !STATE.subscriptLookup;
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
  }

  if (STATE.tokens[STATE.tokens.length - 1].value === '\\n') {
    lexerFunctions.makeToken(undefined, undefined, STATE.tokens, 'TERMINATOR', 'EOF');
  }
  
  return STATE.tokens;

};
