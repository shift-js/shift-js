var lexicalTypes = require("./lexicalTypes");

module.exports = {

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
  
  determineCollectionType: function(collectionInformation, tokens) {
    if (tokens[tokens.length - 1]['value'] === ':') {
      var index = tokens.length - 2;
      while (index >= 0) {
        if (tokens[index].type === 'ARRAY_START') {
          tokens[index].type = 'DICTIONARY_START';
          break;
        }
        index--;
      }
      collectionInformation.type = 'DICTIONARY';
    } else {
      collectionInformation.type = 'ARRAY';
    }
  }
  
};
