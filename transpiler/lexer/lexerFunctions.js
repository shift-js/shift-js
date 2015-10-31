var lexicalTypes = require("./lexicalTypes");

var NUMBER = /^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i;

module.exports = {

  // helper function to check for whitespace
  checkForWhitespace: function(chunk) {
    return chunk === ' ';
  },
  
  // default check for point at which to evaluate chunk
  checkForEvaluationPoint: function(currCol, nextCol) {
    if (

      module.exports.checkForWhitespace(currCol) ||
      module.exports.checkForWhitespace(nextCol) ||
      module.exports.checkFor('PUNCTUATION', nextCol) ||
      module.exports.checkFor('PUNCTUATION', currCol) ||
      module.exports.checkFor('OPERATOR', nextCol) ||
      module.exports.checkFor('OPERATOR', currCol) ||
      nextCol === '"' || nextCol === ']' || currCol === '[' ||
      currCol === ']' || nextCol === '[' || nextCol === '\n' ||
      nextCol === undefined

    ) {

      return true;

    }
    return false;
  },

  // helper function to handle function invocation
  handleFunctionInvocation: function(chunk, nextCol, tokens, lastToken, FUNCTION_NAMES, insideInvocation) {
    if (chunk === '(' && ((FUNCTION_NAMES[lastToken.value] && 
      tokens[tokens.length - 2].value !== 'func') || lastToken.type === 'NATIVE_METHOD')) {
      module.exports.checkFor('FUNCTION_INVOCATION', chunk, tokens);
      var tmp = {};
      tmp.name = lastToken.value;
      tmp.status = true;
      tmp.parens = 0;
      insideInvocation.push(tmp);
      return "cb1";
    }
    
    if (insideInvocation.length && (insideInvocation[insideInvocation.length - 1]).status && chunk === ')' && 
      (insideInvocation[insideInvocation.length - 1]).parens === 0) {
      module.exports.checkFor('FUNCTION_INVOCATION', chunk, tokens);
      var last = insideInvocation[insideInvocation.length - 1]; //may be unnecessary
      last.status = false; //may be unnecessary since poping next
      insideInvocation.pop();
      return "cb2";
    }

    if (insideInvocation.length && chunk === '(' && (insideInvocation[insideInvocation.length - 1]).status) {
      module.exports.checkFor('PUNCTUATION', chunk, tokens);
      var last = insideInvocation[insideInvocation.length - 1];
      last.parens++;
      return "cb1";
    }

    if (insideInvocation.length && chunk === ')' && (insideInvocation[insideInvocation.length - 1]).status) {
      module.exports.checkFor('PUNCTUATION', chunk, tokens);
      var last = insideInvocation[insideInvocation.length - 1];
      last.parens--;
      return "cb1";
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
  handleNewLine: function(emptyLine, tokens, lastToken, currCol) {
    if (currCol === '\n') {
      module.exports.makeToken(undefined, undefined, tokens, 'TERMINATOR', '\\n');
      emptyLine.status = true;
      return true;
    }
    if (emptyLine.status && !module.exports.checkForWhitespace(currCol)) {
      emptyLine.status = false;
    }
    if (emptyLine.status && lastToken && lastToken.value === '\\n') {
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
  checkForCommentStart: function(insideComment, chunk, tokens, currCol,
                                 nextCol) {
    if (currCol === '/' && nextCol === '*' && !(insideComment.multi && insideComment.single)) {
      insideComment.multi = true;
      chunk += nextCol;
      module.exports.checkFor('COMMENT', chunk, tokens);
      return true;
    }
    else if (currCol === '/' && nextCol === '/' && !(insideComment.multi && insideComment.single)) {
      insideComment.single = true;
      chunk += nextCol;
      module.exports.checkFor('COMMENT', chunk, tokens);
      return true;
    }
    return false;
  },

  // tokenizes comment contents and handles end of single and multi-line comments
  handleComment: function(insideComment, chunk, tokens, currCol, nextCol, nextNextCol, cb) {
    if (insideComment.multi) {
      if (chunk === '*/') {
        module.exports.checkFor('COMMENT', chunk, tokens);
        insideComment.multi = false;
        if (nextCol === '\n') {
          cb(1);
        } else {
          cb(2);
        }
        return true;
      } else if ((nextCol === '*' && nextNextCol === '/') || nextCol === '\n') {
        module.exports.makeToken(undefined, undefined, tokens, 'COMMENT', chunk);
        cb(1);
        return true;
      }
    }
    else if (insideComment.single && (nextCol === undefined || nextCol === '\n')) {
      insideComment.single = false;
      module.exports.makeToken(undefined, undefined, tokens, 'COMMENT', chunk);
      module.exports.handleEndOfFile(nextCol, tokens);
      cb(1);
      return true;
    }
    return false;
  },

  checkIfInsideComment: function(insideComment) {
    if (insideComment.multi || insideComment.single) {
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
  handleNumber: function(insideString, insideNumber, chunk, tokens, nextCol, nextNextCol, cb) {
    if (NUMBER.test(chunk) && !insideString.status && !insideNumber.status) {
      insideNumber.status = true;
    }
    // have an _ in the input
    if (insideNumber.status && nextCol === '_') {
      return "skip";
    }

    //have an integer or decimal
    if (insideNumber.status && (nextCol === '\n' ||
      (isNaN(nextCol) && (nextCol !== '.') && (nextNextCol !== '.')))) {
      insideNumber.status = false;
      module.exports.makeToken(undefined, chunk, tokens, 'NUMBER', chunk.trim());
      module.exports.handleEndOfFile(nextCol, tokens);
      return true;
    }

    //have a range
    if (insideNumber.status && (nextCol === '.') && (nextNextCol === '.')) {
      insideNumber.status = false;
      module.exports.makeToken(undefined, chunk, tokens, 'NUMBER', chunk.trim());
      module.exports.handleEndOfFile(nextCol, tokens);
      return true;
    }
  },
  
  // helper function to handle range operators
  handleRange: function(insideString, insideFunction, insideComment, 
                        tokens, currCol, nextCol, nextNextCol) {
    if (!insideString.status && !module.exports.checkIfInsideComment(insideComment)) {
      if (currCol === '.' && nextCol === '.' && nextNextCol === '.') {
        if (insideFunction.length && insideFunction[insideFunction.length - 1].insideParams === true) {
          module.exports.checkFor('FUNCTION_DECLARATION', '...', tokens);
          return true;
        } else {
          module.exports.checkFor('RANGE', '...', tokens);
          return true;
        }
      }
      if (currCol === '.' && nextCol === '.' && nextNextCol === '<') {
        module.exports.checkFor('RANGE', '..<', tokens);
        return true;
      }
    }
    return false;
  },

  checkForStringInterpolationStart: function(stringInterpolation, insideString,
                                             chunk, tokens, nextCol, nextNextCol) {
    if (!stringInterpolation.status && nextCol === '\\' && nextNextCol === '(') {
      stringInterpolation.status = true;
      if (chunk !== "") {
        module.exports.checkForLiteral(chunk + '"', tokens);
      }
      module.exports.makeToken("SPECIAL_STRING", "\\(", tokens);
      insideString.status = false;
      return true;
    }
  },

  checkForStringInterpolationEnd: function(stringInterpolation, insideString,
                                           tokens, currCol) {
    if (stringInterpolation.status && currCol === ")") {
      stringInterpolation.status = false;
      module.exports.makeToken("SPECIAL_STRING", ")", tokens);
      insideString.status = true;
      return true;
    }
  },
  
  
  // handles classes and structures
  handleClassOrStruct: function(insideClass, insideStruct, insideInitialization,
                                chunk, tokens, lastToken, nextCol, CLASS_NAMES,
                                STRUCT_NAMES) {
    if (insideClass.length && insideClass[insideClass.length - 1].curly === 0 &&
      chunk === '{') {
      module.exports.checkFor('CLASS_DEFINITION', chunk, tokens);
      insideClass[insideClass.length - 1].curly++;
      return true;
    }
    if (insideClass.length && insideClass[insideClass.length - 1].curly === 1 &&
      chunk === '}') {
      module.exports.checkFor('CLASS_DEFINITION', chunk, tokens);
      insideClass.pop();
      module.exports.handleEndOfFile(nextCol, tokens);
      return true;
    }
    if (insideStruct.length && insideStruct[insideStruct.length - 1].curly === 0 &&
      chunk === '{') {
      module.exports.checkFor('STRUCT_DEFINITION', chunk, tokens);
      insideStruct[insideStruct.length - 1].curly++;
      return true;
    }
    if (insideStruct.length && insideStruct[insideStruct.length - 1].curly === 1 &&
      chunk === '}') {
      module.exports.checkFor('STRUCT_DEFINITION', chunk, tokens);
      insideStruct.pop();
      module.exports.handleEndOfFile(nextCol, tokens);
      return true;
    }
    if (tokens.length && (CLASS_NAMES[lastToken.value] || 
      STRUCT_NAMES[lastToken.value]) && chunk === '(') {
      module.exports.checkFor('INITIALIZATION', chunk, tokens)
      var temp = {};
      temp.status = true;
      temp.parens = 1;
      insideInitialization.push(temp);
      return true;
    }
    if (chunk === ')' && insideInitialization.length && 
      insideInitialization[insideInitialization.length - 1].parens === 1) {
      module.exports.checkFor('INITIALIZATION', chunk, tokens);
      insideInitialization.pop();
      module.exports.handleEndOfFile(nextCol, tokens);
      return true;
    }
    return false;
  },
  
  checkForTupleStart: function(insideTuple, chunk, tokens, lastToken,
                               currCol, nextCol, nextNextCol, cb) {
    if (!insideTuple.status && currCol === '(' && (lastToken.value === '=' ||
      lastToken.value === 'return' || lastToken.value === '->') ) {
      module.exports.makeToken(undefined, undefined, tokens,
        'TUPLE_START', chunk);
      // special handling of empty tuples
      if (nextCol === ')') {
        module.exports.makeToken(undefined, undefined, tokens, 'TUPLE_END', nextCol);
        module.exports.handleEndOfFile(nextNextCol, tokens);
        cb(1);
      } else {
        insideTuple.status = true;
        insideTuple.startIndex = tokens.length - 1;
      }
      return true;
    }
    return false;
  },

  handleTuple: function(insideTuple, chunk, tokens, currCol, nextCol, TUPLE_ELEMENT_NAMES) {
    if (nextCol === ':') {
      module.exports.makeToken(undefined, undefined, tokens, 'TUPLE_ELEMENT_NAME', chunk);
      TUPLE_ELEMENT_NAMES[chunk] = true;
      return true;
    } else if (currCol === ',') {
      insideTuple.verified = true;
      return false
    }
  },

  checkForTupleEnd: function(insideTuple, chunk, tokens, currCol) {
    if (insideTuple.status && currCol === ')') {
      if (insideTuple.verified) {
        module.exports.makeToken(undefined, undefined, tokens, 'TUPLE_END', chunk);
        insideTuple.status = false;
        insideTuple.startIndex = undefined;
        insideTuple.verified = false;
        return true;
      } else {
        tokens[insideTuple.startIndex].type = 'PUNCTUATION';
        insideTuple.status = false;
        insideTuple.startIndex = undefined;
        insideTuple.verified = false;
        return false;
      }
    }
  },

  // helper function to check for identifiers
  checkForIdentifier: function(chunk, tokens, lastToken, VARIABLE_NAMES, insideFunction, insideClass, insideStruct, CLASS_NAMES, STRUCT_NAMES) {
    if (VARIABLE_NAMES[chunk]) {
      if (tokens) {
        module.exports.makeToken(undefined, chunk, tokens, 'IDENTIFIER', chunk);
      }
      return true;
    } else if (lastToken && (lastToken.type === 'DECLARATION_KEYWORD' ||
      lastToken.value === 'for' ||
      
      // special condition for multiple variables of the same type declared on a single line
      (lastToken.value === ',' && VARIABLE_NAMES[tokens[tokens.length -2].value]) ||

        // special conditions to handle for-in loops that iterate over dictionaries
      (lastToken.value === '(' && tokens[tokens.length - 2].value === 'for') ||
      (lastToken.value === ',' && tokens[tokens.length - 3].value) === '(' &&
      tokens[tokens.length - 4].value === 'for' || (insideFunction.length && insideFunction[insideFunction.length - 1].insideParams === true && lastToken.value !== '='))) {
      if (tokens) {
        module.exports.makeToken(undefined, chunk, tokens, 'IDENTIFIER', chunk);
      }
      VARIABLE_NAMES[chunk] = true;
      
      // special conditions to handle identifiers for classes and structs
      if (tokens[tokens.length - 2].value === 'class') {
        var temp = {};
        temp.status = true;
        temp.curly = 0;
        insideClass.push(temp);
        CLASS_NAMES[chunk] = true;
      }
      if (tokens[tokens.length - 2].value === 'struct') {
        var temp = {};
        temp.status = true;
        temp.curly = 0;
        insideStruct.push(temp);
        STRUCT_NAMES[chunk] = true;
      }
      return true;
    }
    return false;
  },

  determineCollectionType: function(collectionInformation, tokens, cb) {
    if (tokens[tokens.length - 1].value === ':') {
      tokens[collectionInformation[collectionInformation.length - 1].location].type = 'DICTIONARY_START';
      collectionInformation[collectionInformation.length - 1].type = 'DICTIONARY_END';
    } else {
      collectionInformation[collectionInformation.length - 1].type  = 'ARRAY_END';
    }
    if (cb) {
      cb();
    }
  },

  handleEndOfFile: function(col, tokens) {
    if (col === undefined) module.exports.makeToken(undefined, undefined, tokens, 'TERMINATOR', 'EOF');
  }

};
