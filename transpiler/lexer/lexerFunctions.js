var lexicalTypes = require("./lexicalTypes");

var NUMBER = /^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i;

module.exports = {

  // helper function to check for whitespace
  checkForWhitespace: function(col) {
    return col === ' ';
  },
  
  // default check for point at which to evaluate chunk
  checkForEvaluationPoint: function(STATE) {
    if (
      module.exports.checkForWhitespace(STATE.currCol) ||
      module.exports.checkForWhitespace(STATE.nextCol) ||
      module.exports.checkFor('PUNCTUATION', STATE.nextCol) ||
      module.exports.checkFor('PUNCTUATION', STATE.currCol) ||
      module.exports.checkFor('OPERATOR', STATE.nextCol) ||
      module.exports.checkFor('OPERATOR', STATE.currCol) ||
      STATE.nextCol === '"' || STATE.nextCol === ']' || STATE.currCol === '[' ||
      STATE.currCol === ']' || STATE.nextCol === '[' || STATE.nextCol === '\n' ||
      STATE.nextCol === undefined

    ) {

      return true;

    }
    return false;
  },

  // helper function to handle function invocation
  handleFunctionInvocationStart: function(STATE) {
    if (STATE.chunk === '(' && ((STATE.FUNCTION_NAMES[STATE.lastToken.value] &&
      STATE.tokens[STATE.tokens.length - 2].value !== 'func') || STATE.lastToken.type === 'NATIVE_METHOD' || STATE.lastToken.type === 'TYPE_STRING' ||
      STATE.lastToken.type === 'TYPE_NUMBER')) {
      module.exports.checkFor('FUNCTION_INVOCATION', STATE.chunk, STATE.tokens);
      var tmp = {};
      tmp.name = STATE.lastToken.value;
      tmp.status = true;
      tmp.parens = 0;
      STATE.insideInvocation.push(tmp);
      STATE.advanceAndClear(1);
      return true;
    }
    return false;
  },

  handleFunctionInvocationEnd: function(STATE) {
    if (STATE.insideInvocation.length && (STATE.insideInvocation[STATE.insideInvocation.length - 1]).status && STATE.chunk === ')' && (STATE.insideInvocation[STATE.insideInvocation.length - 1]).parens === 0) {
      module.exports.checkFor('FUNCTION_INVOCATION', STATE.chunk, STATE.tokens);
      var last = STATE.insideInvocation[STATE.insideInvocation.length - 1]; //may be unnecessary
      last.status = false; //may be unnecessary since poping next
      STATE.insideInvocation.pop();
      STATE.advanceAndClear(1);
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      return true;
    }
    return false;
  },

  handleFunctionInvocationInside: function(STATE) {
    if (STATE.insideInvocation.length && STATE.chunk === '(' && (STATE.insideInvocation[STATE.insideInvocation.length - 1]).status) {
      module.exports.checkFor('PUNCTUATION', STATE.chunk, STATE.tokens);
      var last = STATE.insideInvocation[STATE.insideInvocation.length - 1];
      last.parens++;
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.insideInvocation.length && STATE.chunk === ')' && (STATE.insideInvocation[STATE.insideInvocation.length - 1]).status) {
      module.exports.checkFor('PUNCTUATION', STATE.chunk, STATE.tokens);
      var last = STATE.insideInvocation[STATE.insideInvocation.length - 1];
      last.parens--;
      STATE.advanceAndClear(1);
      return true;
    }
    return false;
  },

  // helper function to make token and add to tokens array
  makeToken: function(lexicalType, chunk, tokens, type, value) {
    if (tokens) {
      var obj = {};
      obj.type = type || lexicalTypes[lexicalType][chunk];
      obj.value = value || chunk.trim();
      tokens.push(obj);
    }
  },

  // helper function to handle new lines
  handleNewLine: function(STATE) {
    if (STATE.currCol === '\n') {
      module.exports.makeToken(undefined, undefined, STATE.tokens, 'TERMINATOR', '\\n');
      STATE.emptyLine = true;
      return true;
    }
    if (STATE.emptyLine && !module.exports.checkForWhitespace(STATE.currCol)) {
      STATE.emptyLine = false;
    }
    if (STATE.emptyLine && STATE.lastToken && STATE.lastToken.value === '\\n') {
      return true;
    }
    return false;
  },

  // checks for string and boolean values
  checkForLiteral: function(chunk, tokens, cb) {
    if (chunk) {
      chunk = JSON.parse(chunk.trim());
    }
    var type = typeof chunk;
    var obj = {
      'boolean': function(chunk, tokens) {
        if (tokens) {
          module.exports.makeToken(undefined, chunk, tokens, 'BOOLEAN', JSON.stringify(chunk));
        }
        if (cb) {cb(chunk, tokens)}
        return true;
      },
      'string': function(chunk, tokens) {
        if (tokens) {
          module.exports.makeToken(undefined, chunk, tokens, 'STRING', chunk);
        }
        if (cb) {cb(chunk, tokens)}
        return true;
      },
    };
    if (obj[type] === undefined) {
      return false;
    } else {
      obj[type](chunk, tokens);
    }
  },

  // handles start of multi-line and single-line comments
  checkForCommentStart: function(STATE) {
    if (STATE.currCol === '/' && STATE.nextCol === '*' && !(STATE.insideComment.multi && STATE.insideComment.single)) {
      STATE.insideComment.multi = true;
      STATE.chunk += STATE.nextCol;
      module.exports.checkFor('COMMENT', STATE.chunk, STATE.tokens);
      return true;
    }
    else if (STATE.currCol === '/' && STATE.nextCol === '/' && !(STATE.insideComment.multi && STATE.insideComment.single)) {
      STATE.insideComment.single = true;
      STATE.chunk += STATE.nextCol;
      module.exports.checkFor('COMMENT', STATE.chunk, STATE.tokens);
      return true;
    }
    return false;
  },

  // tokenizes comment contents and handles end of single and multi-line comments
  handleComment: function(STATE, cb) {
    if (STATE.insideComment.multi) {
      if (STATE.chunk === '*/') {
        module.exports.checkFor('COMMENT', STATE.chunk, STATE.tokens);
        STATE.insideComment.multi = false;
        if (STATE.nextCol === '\n') {
          STATE.advanceAndClear(1);
        } else {
          STATE.advanceAndClear(2);
        }
        return true;
      } else if ((STATE.nextCol === '*' && STATE.nextNextCol === '/') || STATE.nextCol === '\n') {
        module.exports.makeToken(undefined, undefined, STATE.tokens, 'COMMENT', STATE.chunk);
        STATE.advanceAndClear(1);
        return true;
      }
    }
    else if (STATE.insideComment.single && (STATE.nextCol === undefined || STATE.nextCol === '\n')) {
      STATE.insideComment.single = false;
      module.exports.makeToken(undefined, undefined, STATE.tokens, 'COMMENT', STATE.chunk);
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      STATE.advanceAndClear(1);
      return true;
    }
    return false;
  },

  checkIfInsideComment: function(STATE) {
    if (STATE.insideComment.multi || STATE.insideComment.single) {
      return true;
    }
    return false;
  },

  // main helper function to check whether chunk is a Swift lexical type
  checkFor: function(lexicalType, chunk, tokens, cb) {
    if (chunk) {
      chunk = chunk.trim();
    }
    if(lexicalTypes[lexicalType][chunk]){
      if (tokens) {
        module.exports.makeToken(lexicalType, chunk, tokens);
        if (cb) {
          cb();
        }
      }
      return true;
    }
    return false;
  },

  // helper function to handle numbers, including numbers written with underscores
  handleNumber: function(STATE, cb) {
    if (NUMBER.test(STATE.chunk) && !STATE.insideString && !STATE.insideNumber) {
      STATE.insideNumber = true;
    }
    // have an _ in the input
    if (STATE.insideNumber && STATE.nextCol === '_') {
      return "skip";
    }

    //have an integer or decimal
    if (STATE.insideNumber && (STATE.nextCol === '\n' ||
      (isNaN(STATE.nextCol) && (STATE.nextCol !== '.') && (STATE.nextNextCol !== '.')))) {
      STATE.insideNumber = false;
      module.exports.makeToken(undefined, STATE.chunk, STATE.tokens, 'NUMBER', STATE.chunk.trim());
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      return true;
    }

    //have a range
    if (STATE.insideNumber && (STATE.nextCol === '.') && (STATE.nextNextCol === '.')) {
      STATE.insideNumber = false;
      module.exports.makeToken(undefined, STATE.chunk, STATE.tokens, 'NUMBER', STATE.chunk.trim());
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      return true;
    }
  },
  
  // helper function to handle range operators
  handleRange: function(STATE) {
    if (!STATE.insideString && !module.exports.checkIfInsideComment(STATE)) {
      if (STATE.currCol === '.' && STATE.nextCol === '.' && STATE.nextNextCol === '.') {
        if (STATE.insideFunction.length && STATE.insideFunction[STATE.insideFunction.length - 1].insideParams === true) {
          module.exports.checkFor('FUNCTION_DECLARATION', '...', STATE.tokens);
          return true;
        } else {
          module.exports.checkFor('RANGE', '...', STATE.tokens);
          return true;
        }
      }
      if (STATE.currCol === '.' && STATE.nextCol === '.' && STATE.nextNextCol === '<') {
        module.exports.checkFor('RANGE', '..<', STATE.tokens);
        return true;
      }
    }
    return false;
  },

  checkForStringInterpolationStart: function(STATE) {
    if (!STATE.stringInterpolation.status && STATE.nextCol === '\\' && STATE.nextNextCol === '(') {
      STATE.stringInterpolation.status = true;
      if (STATE.chunk !== "") {
        module.exports.checkForLiteral(STATE.chunk + '"', STATE.tokens);
      }
      module.exports.makeToken("SPECIAL_STRING", "\\(", STATE.tokens);
      STATE.insideString = false;
      return true;
    }
  },

  checkForStringInterpolationEnd: function(STATE) {
    if (STATE.stringInterpolation.status && STATE.currCol === ")") {
      STATE.stringInterpolation.status = false;
      module.exports.makeToken("SPECIAL_STRING", ")", STATE.tokens);
      STATE.insideString = true;
      return true;
    }
  },
  
  
  // handles classes and structures
  handleClassOrStruct: function(STATE) {
    if (STATE.insideClass.length && STATE.insideClass[STATE.insideClass.length - 1].curly === 0 && STATE.chunk === '{') {
      module.exports.checkFor('CLASS_DEFINITION', STATE.chunk, STATE.tokens);
      STATE.insideClass[STATE.insideClass.length - 1].curly++;
      return true;
    }
    if (STATE.insideClass.length && STATE.insideClass[STATE.insideClass.length - 1].curly === 1 && STATE.chunk === '}') {
      module.exports.checkFor('CLASS_DEFINITION', STATE.chunk, STATE.tokens);
      STATE.insideClass.pop();
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      return true;
    }
    if (STATE.insideStruct.length && STATE.insideStruct[STATE.insideStruct.length - 1].curly === 0 &&
      STATE.chunk === '{') {
      module.exports.checkFor('STRUCT_DEFINITION', STATE.chunk, STATE.tokens);
      STATE.insideStruct[STATE.insideStruct.length - 1].curly++;
      return true;
    }
    if (STATE.insideStruct.length && STATE.insideStruct[STATE.insideStruct.length - 1].curly === 1 &&
      STATE.chunk === '}') {
      module.exports.checkFor('STRUCT_DEFINITION', STATE.chunk, STATE.tokens);
      STATE.insideStruct.pop();
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      return true;
    }
    if (STATE.tokens.length && (STATE.CLASS_NAMES[STATE.lastToken.value] || 
      STATE.STRUCT_NAMES[STATE.lastToken.value]) && STATE.chunk === '(') {
      module.exports.checkFor('INITIALIZATION', STATE.chunk, STATE.tokens)
      var temp = {};
      temp.status = true;
      temp.parens = 1;
      STATE.insideInitialization.push(temp);
      return true;
    }
    if (STATE.chunk === ')' && STATE.insideInitialization.length && 
      STATE.insideInitialization[STATE.insideInitialization.length - 1].parens === 1) {
      module.exports.checkFor('INITIALIZATION', STATE.chunk, STATE.tokens);
      STATE.insideInitialization.pop();
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      return true;
    }
    return false;
  },
  
  checkForTupleStart: function(STATE) {
    if (!STATE.insideTuple.status && STATE.currCol === '(' && (STATE.lastToken.value === '=' ||
      STATE.lastToken.value === 'return' || STATE.lastToken.value === '->') ) {
      module.exports.makeToken(undefined, undefined, STATE.tokens,
        'TUPLE_START', STATE.chunk);
      // special handling of empty tuples
      if (STATE.nextCol === ')') {
        module.exports.makeToken(undefined, undefined, STATE.tokens, 'TUPLE_END', STATE.nextCol);
        module.exports.handleEndOfFile(STATE.nextNextCol, STATE.tokens);
        STATE.advanceAndClear(1);
      } else {
        STATE.insideTuple.status = true;
        STATE.insideTuple.startIndex = STATE.tokens.length - 1;
      }
      return true;
    }
    return false;
  },

  handleTuple: function(STATE) {
    if (STATE.nextCol === ':') {
      module.exports.makeToken(undefined, undefined, STATE.tokens, 'TUPLE_ELEMENT_NAME', STATE.chunk);
      STATE.TUPLE_ELEMENT_NAMES[STATE.chunk] = true;
      return true;
    } else if (STATE.currCol === ',') {
      STATE.insideTuple.verified = true;
      return false
    }
  },

  checkForTupleEnd: function(STATE) {
    if (STATE.insideTuple.status && STATE.currCol === ')') {
      if (STATE.insideTuple.verified) {
        module.exports.makeToken(undefined, undefined, STATE.tokens, 'TUPLE_END', STATE.chunk);
        STATE.insideTuple.status = false;
        STATE.insideTuple.startIndex = undefined;
        STATE.insideTuple.verified = false;
        return true;
      } else {
        STATE.tokens[STATE.insideTuple.startIndex].type = 'PUNCTUATION';
        STATE.insideTuple.status = false;
        STATE.insideTuple.startIndex = undefined;
        STATE.insideTuple.verified = false;
        return false;
      }
    }
  },

  // helper function to check for identifiers
  checkForIdentifier: function(STATE) {
    if (STATE.VARIABLE_NAMES[STATE.chunk]) {
      if (STATE.tokens) {
        module.exports.makeToken(undefined, STATE.chunk, STATE.tokens, 'IDENTIFIER', STATE.chunk);
      }
      return true;
    } else if (STATE.lastToken && (STATE.lastToken.type === 'DECLARATION_KEYWORD' ||
      STATE.lastToken.value === 'for' ||
      
      // special condition for multiple variables of the same type declared on a single line
      (STATE.lastToken.value === ',' && STATE.VARIABLE_NAMES[STATE.tokens[STATE.tokens.length -2].value]) ||

        // special conditions to handle for-in loops that iterate over dictionaries
      (STATE.lastToken.value === '(' && STATE.tokens[STATE.tokens.length - 2].value === 'for') ||
      (STATE.lastToken.value === ',' && STATE.tokens[STATE.tokens.length - 3].value) === '(' &&
      STATE.tokens[STATE.tokens.length - 4].value === 'for' || (STATE.insideFunction.length && STATE.insideFunction[STATE.insideFunction.length - 1].insideParams === true && STATE.lastToken.value !== '='))) {
      if (STATE.tokens) {
        module.exports.makeToken(undefined, STATE.chunk, STATE.tokens, 'IDENTIFIER', STATE.chunk);
      }
      STATE.VARIABLE_NAMES[STATE.chunk] = true;
      
      // special conditions to handle identifiers for classes and structs
      if (STATE.tokens[STATE.tokens.length - 2].value === 'class') {
        var temp = {};
        temp.status = true;
        temp.curly = 0;
        STATE.insideClass.push(temp);
        STATE.CLASS_NAMES[STATE.chunk] = true;
      }
      if (STATE.tokens[STATE.tokens.length - 2].value === 'struct') {
        var temp = {};
        temp.status = true;
        temp.curly = 0;
        STATE.insideStruct.push(temp);
        STATE.STRUCT_NAMES[STATE.chunk] = true;
      }
      return true;
    }
    return false;
  },

  determineCollectionType: function(STATE, cb) {
    if (STATE.tokens[STATE.tokens.length - 1].value === ':') {
      STATE.tokens[STATE.insideCollection[STATE.insideCollection.length - 1].location].type = 'DICTIONARY_START';
      STATE.insideCollection[STATE.insideCollection.length - 1].type = 'DICTIONARY_END';
    } else {
      STATE.insideCollection[STATE.insideCollection.length - 1].type  = 'ARRAY_END';
    }
    if (cb) {
      cb();
    }
  },

  handleEndOfFile: function(col, tokens) {
    if (col === undefined) module.exports.makeToken(undefined, undefined, tokens, 'TERMINATOR', 'EOF');
  }

};
