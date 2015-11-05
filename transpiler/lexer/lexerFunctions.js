var lexicalTypes = require("./lexicalTypes");

// number regex
var NUMBER = /^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i;

// whitespace regex
var WHITESPACE = /^[^\n\S]+/;

// These helper functions to handle particular lexical parts of Swift.
module.exports = {
  
  // default check for point at which to evaluate chunk
  checkForEvaluationPoint: function(STATE) {
    if (
      module.exports.checkForWhitespace(STATE.currCol) ||
      module.exports.checkForWhitespace(STATE.nextCol) ||
      module.exports.checkFor(STATE, 'PUNCTUATION', STATE.currCol) ||
      module.exports.checkFor(STATE, 'PUNCTUATION', STATE.nextCol) ||
      module.exports.checkFor(STATE, 'OPERATOR', STATE.currCol) ||
      module.exports.checkFor(STATE, 'OPERATOR', STATE.nextCol) ||
      STATE.nextCol === '"' || STATE.nextCol === '[' || STATE.nextCol === ']' ||
      STATE.currCol === '[' ||  STATE.currCol === ']' || STATE.nextCol === '\n' ||
      STATE.nextCol === undefined
    ) {
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
  
  // main helper function to check whether chunk is a Swift lexical type
  checkFor: function(STATE, lexicalType, chunk, tokens, cb) {
    if (chunk) {
      chunk = chunk.trim();
    }
    if(lexicalTypes[lexicalType][chunk]){
      if (tokens) {
        module.exports.makeToken(lexicalType, chunk, tokens);
        var recentFunc = STATE.lastFunction;
        if (lexicalType === "PUNCTUATION" &&
            chunk === "(" &&
            STATE.insideFunction.length &&
            STATE.lastFunction.insideParams === true &&
            recentFunc.paramsParens.length &&
            recentFunc.paramsParens[recentFunc.paramsParens.length - 1]["tokenIndex"] !== STATE.tokens.length - 1) {
          recentFunc.paramsCounter++;
          recentFunc.paramsParens.push({tokenIndex: STATE.tokens.length - 1, tokenType: "PUNCTUATION", tokenValue: "("});
        }
        if (lexicalType === "PUNCTUATION" &&
            chunk === ")" &&
            STATE.insideFunction.length &&
            STATE.lastFunction.insideParams === true &&
            recentFunc.paramsParens.length &&
            recentFunc.paramsParens[recentFunc.paramsParens.length - 1]["tokenIndex"] !== STATE.tokens.length - 1) {
          STATE.lastFunction.paramsCounter--;
          STATE.lastFunction.paramsParens.push({tokenIndex: STATE.tokens.length - 1, tokenType: "PUNCTUATION", tokenValue: ")"});
        }
        if (cb) {
          cb();
        }
      }
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

  // helper function to handle new lines
  handleNewLine: function(STATE) {
    if (STATE.currCol === '\n') {
      module.exports.makeToken(undefined, undefined, STATE.tokens, 'TERMINATOR', '\\n');
      STATE.emptyLine = true;
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.emptyLine && !module.exports.checkForWhitespace(STATE.currCol)) {
      STATE.emptyLine = false;
    }
    if (STATE.emptyLine && STATE.lastToken && STATE.lastToken.value === '\\n') {
      STATE.advanceAndClear(1);
      return true;
    }
    return false;
  },
  
  // helper function to check for whitespace
  checkForWhitespace: function(col) {
    return WHITESPACE.test(col);
  },
  
  // handles end of file
  handleEndOfFile: function(col, tokens) {
    if (col === undefined) module.exports.makeToken(undefined, undefined, tokens, 'TERMINATOR', 'EOF');
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
      (STATE.lastToken.value === ',' && 
      STATE.VARIABLE_NAMES[STATE.tokens[STATE.tokens.length -2].value] && 
      !STATE.insideInvocation.length) ||

        // special conditions to handle for-in loops that iterate over dictionaries
      (STATE.lastToken.value === '(' && STATE.tokens[STATE.tokens.length - 2].value === 'for') ||
      (STATE.lastToken.value === ',' && STATE.tokens[STATE.tokens.length - 3].value) === '(' &&
      STATE.tokens[STATE.tokens.length - 4].value === 'for' || (STATE.insideFunction.length && 
      STATE.lastFunction.insideParams === true && STATE.lastToken.value !== '='))) {
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

  // helper function to handle the start of function invocation
  handleFunctionInvocationStart: function(STATE) {
    if (STATE.chunk === '(' && ((STATE.FUNCTION_NAMES[STATE.lastToken.value] &&
      STATE.tokens[STATE.tokens.length - 2].value !== 'func') || 
      STATE.lastToken.type === 'NATIVE_METHOD' || STATE.lastToken.type === 'TYPE_STRING' ||
      STATE.lastToken.type === 'TYPE_NUMBER')) {
      module.exports.checkFor(STATE, 'FUNCTION_INVOCATION', STATE.chunk, STATE.tokens);
      var tmp = {};
      tmp.name = STATE.lastToken.value;
      tmp.status = true;
      tmp.parens = 0;
      STATE.insideInvocation.push(tmp);
      if (STATE.stringInterpolation.status) {
        STATE.stringInterpolation.nestedInvocation = true;
      }
      STATE.advanceAndClear(1);
      return true;
    }
    return false;
  },

  // helper function to handle the end of function invocations
  handleFunctionInvocationEnd: function(STATE) {
    if (STATE.insideInvocation.length &&
        (STATE.insideInvocation[STATE.insideInvocation.length - 1]).status &&
        STATE.chunk === ')' &&
        (STATE.insideInvocation[STATE.insideInvocation.length - 1]).parens === 0 && !STATE.insideTuple.status) {
      module.exports.checkFor(STATE, 'FUNCTION_INVOCATION', STATE.chunk, STATE.tokens);
      STATE.insideInvocation.pop();
      if (STATE.stringInterpolation.nestedInvocation) {
        STATE.stringInterpolation.nestedInvocation = false;
      }
      STATE.advanceAndClear(1);
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      return true;
    }
    return false;
  },

  // helper function to handle the inside of function invocations
  handleFunctionInvocationInside: function(STATE) {
    if (STATE.insideInvocation.length && STATE.chunk === '(' &&
      (STATE.insideInvocation[STATE.insideInvocation.length - 1]).status) {
      module.exports.checkFor(STATE, 'PUNCTUATION', STATE.chunk, STATE.tokens);
      STATE.insideInvocation[STATE.insideInvocation.length - 1].parens++;
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.insideInvocation.length && STATE.chunk === ')' &&
      (STATE.insideInvocation[STATE.insideInvocation.length - 1]).status) {
      module.exports.checkFor(STATE, 'PUNCTUATION', STATE.chunk, STATE.tokens);
      STATE.insideInvocation[STATE.insideInvocation.length - 1].parens--;
      STATE.advanceAndClear(1);
      return true;
    }
    return false;
  },

  // helper function to handle function declarations
  handleFunctionDeclarationStart: function(STATE) {
    if (STATE.chunk === 'func') {
      module.exports.checkFor(STATE, 'KEYWORD', STATE.chunk, STATE.tokens);
      var temp = {};
      temp.status = true;                                   // whether inside of a function declaration or not
      temp.insideParams = false;                            // 3-valued statement for whether not started, inside, or ended function parameters declaration
      temp.paramsParens = [];                               // handles the parenthesis in the parameters of the parent function
      temp.paramsCounter = 0;                               // add's 1 if encountered ( and subtracts 1 if encounter )
      temp.statements = 0;                                  // number of statements where by a function statement start with a {
      temp.curly = 0;                                       // all other { such as for loops are counted as curly
      temp.insideReturnStatement = false;                   // whether inside original function statement or not
      temp.returnArrows = [];
      temp.endFunctionParameterDeclarationIndex = -1;
      STATE.insideFunction.push(temp);
      STATE.advanceAndClear(2);
      return true;
    }
    return false;
  },

  rewriteVariableParensHistory: function(STATE) {
    if (STATE.variableArrows.length) {
      var arrowIndex = STATE.variableArrows[STATE.variableArrows.length - 1];
      var tok = STATE.tokens[arrowIndex];
      var arr = [];
      while (tok["value"] !== "var" && tok["value"] !== "let") {
        arrowIndex--;
        tok = STATE.tokens[arrowIndex];
        if (tok["value"] === '(' || tok["value"] === ')') {
          arr.unshift({tokenIndex: arrowIndex, tokenType: tok["type"], tokenValue: tok["value"]});
        }
      }
      module.exports.reviseFunctionHistory(arr, STATE, true);
      STATE.variableArrows.pop();
    } 
  },

  // main helper function to handle the inside of function declarations
  handleInsideOfFunctionDeclaration: function(STATE) {
    if (STATE.insideFunction.length && STATE.chunk === '(' &&
      STATE.lastFunction.insideParams === false) {
      STATE.FUNCTION_NAMES[STATE.lastToken.value] = true;
      module.exports.checkFor(STATE, 'FUNCTION_DECLARATION', STATE.chunk, STATE.tokens);
      STATE.lastFunction.insideParams = true;
      STATE.lastFunction.paramsParens.push({tokenIndex: STATE.tokens.length - 1, tokenType: "PARAMS_START", tokenValue: "("});
      STATE.lastFunction.paramsCounter++;
      STATE.advanceAndClear(1);
      return true;
    }

    if (STATE.insideFunction.length && STATE.chunk === ')' && 
      STATE.lastFunction.insideParams === true &&
      STATE.lastFunction.paramsCounter === 1 ) {
      module.exports.checkFor(STATE, 'FUNCTION_DECLARATION', STATE.chunk, STATE.tokens);
      if (STATE.lastFunction.endFunctionParameterDeclarationIndex === -1) {
        STATE.lastFunction.endFunctionParameterDeclarationIndex = STATE.tokens.length - 1;
      }
      STATE.lastFunction.paramsCounter--;
      STATE.lastFunction.insideParams = "ended";
      STATE.lastFunction.paramsParens.shift();
      module.exports.reviseFunctionHistory(STATE.lastFunction.paramsParens, STATE, false);
      STATE.advanceAndClear(1);
      return true;
    }

    if (STATE.insideFunction.length && STATE.chunk === ')' && 
      STATE.lastFunction.insideReturnStatement === true && !STATE.insideInitialization.length) {
      module.exports.checkFor(STATE, 'FUNCTION_DECLARATION', STATE.chunk, STATE.tokens);
      STATE.lastFunction.insideReturnStatement = "ended";
      STATE.advanceAndClear(1);
      return true;
    }

    if (STATE.insideFunction.length && STATE.chunk === '{' && 
      STATE.lastFunction.statements === 0) {
      module.exports.checkFor(STATE, 'FUNCTION_DECLARATION', STATE.chunk, STATE.tokens);
      STATE.lastFunction.statements++;
      STATE.lastFunction.insideReturnStatement = true;
      if (STATE.lastFunction.returnArrows.length >= 2) {
        var input = [];
        if (STATE.lastFunction.returnArrows[0] > STATE.lastFunction.endFunctionParameterDeclarationIndex) {
          var start = STATE.lastFunction.returnArrows[0] ;
          for (var i = start, end = STATE.tokens.length-1; i < end; i++) {
            if (STATE.tokens[i]["value"] === '(' || STATE.tokens[i]["value"] === ')') {
              input.push({tokenIndex: i, tokenType: STATE.tokens[i]["type"], tokenValue: STATE.tokens[i]["value"]});
            }
          }
          module.exports.reviseFunctionHistory(input, STATE), false;
        }
      }
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.insideFunction.length && STATE.chunk === '{' && 
      STATE.lastFunction.statements === 1) {
      module.exports.checkFor(STATE, 'PUNCTUATION', STATE.chunk, STATE.tokens);
      STATE.lastFunction.curly++;
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.insideFunction.length && STATE.chunk === '}' && 
      STATE.lastFunction.statements === 1 && 
      STATE.lastFunction.curly > 0) {
      module.exports.checkFor(STATE, 'PUNCTUATION', STATE.chunk, STATE.tokens);
      STATE.lastFunction.curly--;
      STATE.advanceAndClear(1);
      return true;
    }
    return false;
  },

  // handles the end of function declarations
  handleFunctionDeclarationEnd: function(STATE) {
    if (STATE.insideFunction.length && STATE.chunk === '}' && 
      STATE.lastFunction.statements === 1 && 
      STATE.lastFunction.curly === 0) {
      module.exports.checkFor(STATE, 'FUNCTION_DECLARATION', STATE.chunk, STATE.tokens);
      STATE.insideFunction.pop();
      STATE.advanceAndClear(1);
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      return true;
    }
    return false;
  },

  reviseFunctionHistory: function(inputArray, STATE, flag) {
    if (flag === true) {
      var x = inputArray.shift();
      var y = inputArray.pop();
      STATE.tokens[x["tokenIndex"]]["type"] = "PARAMS_START"; 
      STATE.tokens[y["tokenIndex"]]["type"] = "PARAMS_END"; 
    }
    var arr = [];
    var len = Math.floor((inputArray.length)/2);
    var obj = {
      "PUNCTUATION": function(tokenIndexStart, tokenIndexEnd) {
        STATE.tokens[tokenIndexStart]['type'] = "PUNCTUATION";
        STATE.tokens[tokenIndexEnd]['type'] = "PUNCTUATION";
      },
      "PARAMS": function(tokenIndexStart, tokenIndexEnd) {
        STATE.tokens[tokenIndexStart]['type'] = "PARAMS_START";
        STATE.tokens[tokenIndexEnd]['type'] = "PARAMS_END";
      },
      "TUPLE": function(tokenIndexStart, tokenIndexEnd) {
        STATE.tokens[tokenIndexStart]['type'] = "TUPLE_START";
        STATE.tokens[tokenIndexEnd]['type'] = "TUPLE_END";
        for (var q = tokenIndexEnd - 1, enda = tokenIndexStart + 1; q >= enda; q--) {
          if (STATE.tokens[q]['value'] === ':') {
            STATE.tokens[q-1]['type'] = "TUPLE_ELEMENT_NAME";
          }
        }
      }
    };
    for (var j = 0; j < len; j++) {
      var x = [];
      x.push((inputArray.splice(((inputArray.length)/2 - 1),1))[0]);
      x.push((inputArray.splice(Math.floor((inputArray.length)/2),1))[0]);
      arr.push(x);
    }
    for (var j = 0; j < len; j++) {
      var y = arr[j];
      var toDo = "PUNCTUATION";
      for (var k = y[1]['tokenIndex'] - 1, z = y[0]['tokenIndex'] + 1; k >= z; k--) {
        if (STATE.tokens[k]['type'] === 'RETURN_ARROW') {
          toDo = "PUNCTUATION";
          break;
        } else if (STATE.tokens[k]['value'] === ',') {
          toDo = "PARAMS";
          break;
        } else if (STATE.tokens[k]['value'] === ':') {
          toDo = "TUPLE";
          break;
        } else if (STATE.tokens[k]['type'] === 'TYPE_BOOLEAN' || STATE.tokens[k]['type'] === 'TYPE_STRING' 
          || STATE.tokens[k]['type'] === 'TYPE_NUMBER') {
          toDo = "PARAMS";
        } else {
          toDo = "PUNCTUATION";
        }
      }
      obj[toDo](y[0]['tokenIndex'],y[1]['tokenIndex']);
    }
  },

  // handles start of multi-line and single-line comments
  checkForCommentStart: function(STATE) {
    if (STATE.currCol === '/' && STATE.nextCol === '*' && 
      !(STATE.insideComment.multi && STATE.insideComment.single)) {
      STATE.insideComment.multi = true;
      STATE.chunk += STATE.nextCol;
      module.exports.checkFor(STATE, 'COMMENT', STATE.chunk, STATE.tokens);
      STATE.advanceAndClear(2);
      return true;
    }
    else if (STATE.currCol === '/' && STATE.nextCol === '/' && 
      !(STATE.insideComment.multi && STATE.insideComment.single)) {
      STATE.insideComment.single = true;
      STATE.chunk += STATE.nextCol;
      module.exports.checkFor(STATE, 'COMMENT', STATE.chunk, STATE.tokens);
      STATE.advanceAndClear(2);
      return true;
    }
    return false;
  },

  // tokenizes comment contents and handles end of single and multi-line comments
  handleComment: function(STATE, cb) {
    if (STATE.insideComment.multi) {
      if (STATE.chunk === '*/') {
        module.exports.checkFor(STATE, 'COMMENT', STATE.chunk, STATE.tokens);
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
      STATE.advance(1);
      return true;
    }
    return false;
  },

  // helper function to handle numbers, including numbers written with underscores
  handleNumber: function(STATE, cb) {
    if (NUMBER.test(STATE.chunk) && !STATE.insideString && !STATE.insideNumber) {
      STATE.insideNumber = true;
    }
    // handles numbers written with underscores
    if (STATE.insideNumber && STATE.nextCol === '_') {
      return "skip";
    }

    // handles integers or floating point values with decimals
    if (STATE.insideNumber && (STATE.nextCol === '\n' ||
      (isNaN(STATE.nextCol) && (STATE.nextCol !== '.') && (STATE.nextNextCol !== '.')))) {
      STATE.insideNumber = false;
      module.exports.makeToken(undefined, STATE.chunk, STATE.tokens, 'NUMBER', STATE.chunk.trim());
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      return true;
    }

    // handles whether period following a number is a decimal point or range operator
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
        if (STATE.insideFunction.length && STATE.lastFunction.insideParams === true) {
          module.exports.checkFor(STATE, 'FUNCTION_DECLARATION', '...', STATE.tokens);
          STATE.advanceAndClear(3);
          return true;
        } else {
          module.exports.checkFor(STATE, 'RANGE', '...', STATE.tokens);
          STATE.advanceAndClear(3);
          return true;
        }
      }
      if (STATE.currCol === '.' && STATE.nextCol === '.' && STATE.nextNextCol === '<') {
        module.exports.checkFor(STATE, 'RANGE', '..<', STATE.tokens);
        STATE.advanceAndClear(3);
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
      STATE.advanceAndClear(3);
      return true;
    }
  },

  checkForStringInterpolationEnd: function(STATE) {
    if (STATE.stringInterpolation.status && STATE.currCol === ")" &&
      !STATE.stringInterpolation.nestedInvocation) {
      STATE.stringInterpolation.status = false;
      module.exports.makeToken("SPECIAL_STRING", ")", STATE.tokens);
      STATE.insideString = true;
      STATE.advanceAndClear(1);
      STATE.chunk = '"';
      return true;
    }
  },
  
  // handles classes and structures
  handleClassOrStruct: function(STATE) {
    if (STATE.insideClass.length && 
      STATE.insideClass[STATE.insideClass.length - 1].curly === 0 && STATE.chunk === '{') {
      module.exports.checkFor(STATE, 'CLASS_DEFINITION', STATE.chunk, STATE.tokens);
      STATE.insideClass[STATE.insideClass.length - 1].curly++;
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.insideClass.length && 
      STATE.insideClass[STATE.insideClass.length - 1].curly === 1 && STATE.chunk === '}') {
      module.exports.checkFor(STATE, 'CLASS_DEFINITION', STATE.chunk, STATE.tokens);
      STATE.insideClass.pop();
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.insideStruct.length && STATE.insideStruct[STATE.insideStruct.length - 1].curly === 0 &&
      STATE.chunk === '{') {
      module.exports.checkFor(STATE, 'STRUCT_DEFINITION', STATE.chunk, STATE.tokens);
      STATE.insideStruct[STATE.insideStruct.length - 1].curly++;
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.insideStruct.length && STATE.insideStruct[STATE.insideStruct.length - 1].curly === 1 &&
      STATE.chunk === '}') {
      module.exports.checkFor(STATE, 'STRUCT_DEFINITION', STATE.chunk, STATE.tokens);
      STATE.insideStruct.pop();
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.tokens.length && (STATE.CLASS_NAMES[STATE.lastToken.value] || 
      STATE.STRUCT_NAMES[STATE.lastToken.value]) && STATE.chunk === '(') {
      module.exports.checkFor(STATE, 'INITIALIZATION', STATE.chunk, STATE.tokens)
      var temp = {};
      temp.status = true;
      temp.parens = 1;
      STATE.insideInitialization.push(temp);
      STATE.advanceAndClear(1);
      return true;
    }
    if (STATE.chunk === ')' && STATE.insideInitialization.length && 
      STATE.insideInitialization[STATE.insideInitialization.length - 1].parens === 1) {
      module.exports.checkFor(STATE, 'INITIALIZATION', STATE.chunk, STATE.tokens);
      STATE.insideInitialization.pop();
      module.exports.handleEndOfFile(STATE.nextCol, STATE.tokens);
      STATE.advanceAndClear(1);
      return true;
    }
    return false;
  },
  
  checkForTupleStart: function(STATE) {
    if (!STATE.insideTuple.status && STATE.currCol === '(' && ((STATE.lastToken.value === '=' ||
      STATE.lastToken.value === 'return' || STATE.lastToken.value === '->') || 
      (STATE.insideInvocation.length && STATE.insideInvocation[STATE.insideInvocation.length - 1].status)) ) {
      module.exports.makeToken(undefined, undefined, STATE.tokens,'TUPLE_START', STATE.chunk);
      
      // special handling of empty tuples
      if (STATE.insideInvocation.length && STATE.insideInvocation[STATE.insideInvocation.length - 1].status) {
        STATE.insideInvocation[STATE.insideInvocation.length - 1].parens++;
      }
      if (STATE.nextCol === ')') {
        module.exports.makeToken(undefined, undefined, STATE.tokens, 'TUPLE_END', STATE.nextCol);
        module.exports.handleEndOfFile(STATE.nextNextCol, STATE.tokens);
        STATE.advanceAndClear(1);
      } else {
        STATE.insideTuple.status = true;
        STATE.insideTuple.startIndex = STATE.tokens.length - 1;
      }
      STATE.advanceAndClear(1);
      return true;
    }
    return false;
  },

  handleTuple: function(STATE) {
    if (STATE.nextCol === ':') {
      module.exports.makeToken(undefined, undefined, STATE.tokens, 'TUPLE_ELEMENT_NAME', STATE.chunk);
      STATE.TUPLE_ELEMENT_NAMES[STATE.chunk] = true;
      STATE.advanceAndClear(1);
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
        if (STATE.insideInvocation.length && STATE.insideInvocation[STATE.insideInvocation.length - 1].status) {
          STATE.insideInvocation[STATE.insideInvocation.length - 1].parens--;
        }
        STATE.insideTuple.status = false;
        STATE.insideTuple.startIndex = undefined;
        STATE.insideTuple.verified = false;
        STATE.advanceAndClear(1);
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

  // helper function to determine type of current collection based on punctuation
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
  }

};
