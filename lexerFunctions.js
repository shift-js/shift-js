var lexicalTypes = require("./lexicalTypes");



module.exports = {

  checkForEvaluationPoint: function(currCol, nextCol) {
    if (
      
        module.exports.checkForWhitespace(currCol) ||
        module.exports.checkForWhitespace(nextCol) || 
        module.exports.checkFor('PUNCTUATION', nextCol) || 
        module.exports.checkFor('PUNCTUATION', currCol) || 
        module.exports.checkFor('OPERATOR', nextCol) || 
        module.exports.checkFor('OPERATOR', currCol) || 
        nextCol === '"' || nextCol === ']' || nextCol === undefined) {
      
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
    snippet = JSON.parse(snippet.trim());
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
  
  checkFor: function(lexicalType, snippet, tokens, cb) {
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