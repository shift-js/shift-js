var lexicalTypes = require("./lexicalTypes");

var NUMBER = /^0b[01]+|^0o[0-7]+|^0x[\da-f]+|^\d*\.?\d+(?:e[+-]?\d+)?/i;

module.exports = {

  checkForEvaluationPoint: function(currCol, nextCol) {
    if (
      
        module.exports.checkForWhitespace(currCol) ||
        module.exports.checkForWhitespace(nextCol) || 
        module.exports.checkFor('PUNCTUATION', nextCol) || 
        module.exports.checkFor('PUNCTUATION', currCol) || 
        module.exports.checkFor('OPERATOR', nextCol) || 
        module.exports.checkFor('OPERATOR', currCol) || 
        nextCol === '"' || nextCol === ']' || currCol === '[' ||
        currCol === ']' || nextCol === '[' || nextCol === undefined) {
      
      return true;
    
    }
    return false;
  },
  
  makeToken: function(lexicalType, snippet, tokens, type, value) {
    if (tokens) {
      var obj = {};
      obj['type'] = type || lexicalTypes[lexicalType][snippet];
      obj['value'] = value || snippet.trim();
      tokens.push(obj);
    }
  },

  checkForLiteral: function(snippet, tokens, cb) {
    if (snippet) {
      snippet = JSON.parse(snippet.trim());
    }
    var type = typeof snippet;
    var obj = {
    'boolean': function(snippet, tokens) {
                if (tokens) {
                  module.exports.makeToken(undefined, snippet, tokens, 'BOOLEAN', JSON.stringify(snippet));
                }
                if (cb) {cb(snippet, tokens)};
                return true;
              },
    'string': function(snippet, tokens) {
                if (tokens) {
                  module.exports.makeToken(undefined, snippet, tokens, 'STRING', snippet);
                }
                if (cb) {cb(snippet, tokens)};
                return true;
              },
    'number': function(snippet, tokens) {
                if (tokens) {
                  module.exports.makeToken(undefined, snippet, tokens, 'NUMBER', JSON.stringify(snippet));
                }
                if (cb) {cb(snippet, tokens)};
                return true;         
              }    
    };
    if (obj[type] === undefined) {
      return false;
    } else {
      obj[type](snippet, tokens);
    }
  },

  checkForComment: function(insideComment, snippet, tokens, currCol, nextCol, codeAt2, cb) {
    // TODO, make O(1) and make such that it handles all error cases
    if (currCol === '/' && nextCol === '*' && !(insideComment.multi && insideComment.single)) {
      insideComment.multi = true;
      snippet += nextCol;
      module.exports.checkFor('COMMENT', snippet, tokens);
      cb(2);
      return true;
    }
    else if (currCol === '/' && nextCol === '/' && !(insideComment.multi && insideComment.single)) {
      insideComment.single = true;
      snippet += nextCol;
      module.exports.checkFor('COMMENT', snippet, tokens);
      cb(2);
      return true;
    }
    else if (insideComment.multi && nextCol === '*' && codeAt2 === '/') {
      insideComment.multi = false;
      module.exports.makeToken(undefined, undefined, tokens, 'COMMENT', snippet);
      snippet = nextCol + codeAt2;
      module.exports.checkFor('COMMENT', snippet, tokens);
      cb(4);
      return true;
    }
    else if (insideComment.single && nextCol === undefined) {
      // TO DO -- handle single line comment once we start handling multi line blocks
      insideComment.multi = false;
      module.exports.makeToken(undefined, undefined, tokens, 'COMMENT', snippet);
      module.exports.handleEndOfFile(nextCol, tokens);
      cb(1);
      return true;
    }
    return false;
  },

  checkInsideComment: function(insideComment) {
    if (insideComment.multi || insideComment.single) {
      return true;
    }
    return false;
  },
  
  checkFor: function(lexicalType, snippet, tokens, cb) {
    if (snippet) {
      snippet = snippet.trim();
    }
    if(lexicalTypes[lexicalType][snippet]){
      if (tokens) {
        module.exports.makeToken(lexicalType, snippet, tokens);
        if (cb) {
          cb();
        }
      }
      return true;
    }
    return false;
  },
  
  handleNumber: function(insideString, insideNumber, tokens, chunk, nextCol) {
    if (NUMBER.test(chunk) && !insideString.status && !insideNumber.status) {
      insideNumber.status = true;
    }
    if (insideNumber.status && isNaN(nextCol) && nextCol !== '.') {
      insideNumber.status = false;
      module.exports.checkForLiteral(chunk, tokens);
      module.exports.handleEndOfFile(nextCol, tokens);
      return true;
    }
  },
  
  // helper function to check for whitespace
  checkForWhitespace: function(snippet) {
    return snippet === ' ';
  },

  // helper function to check for identifiers
  checkForIdentifier: function(snippet, tokens, variable_names) {
      if (variable_names[snippet]) {
        if (tokens) {
          module.exports.makeToken(undefined, snippet, tokens, 'IDENTIFIER', snippet);
        }
        return true;
      } else if (tokens[tokens.length - 1].type === 'DECLARATION_KEYWORD') {
        if (tokens) {
          module.exports.makeToken(undefined, snippet, tokens, 'IDENTIFIER', snippet);
        }
        variable_names[snippet] = true;
        return true;
      }
    return false;
  },
  
  determineCollectionType: function(collectionInformation, tokens, cb) {
    if (tokens[tokens.length - 1]['value'] === ':') {
      tokens[collectionInformation[collectionInformation.length - 1]['location']]['type'] = 'DICTIONARY_START';
      collectionInformation[collectionInformation.length - 1]['type'] = 'DICTIONARY_END';
    } else {
      collectionInformation[collectionInformation.length - 1]['type']  = 'ARRAY_END';
    }
    if (cb) {
      cb();
    }
  },
  
  handleEndOfFile: function(nextCol, tokens) {
      if (nextCol === undefined) module.exports.makeToken(undefined, undefined, tokens, 'TERMINATOR', 'EOF');
    }
  
};