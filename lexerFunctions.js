var lexicalTypes = require("./lexicalTypes");

module.exports = {

  checkForLiteral: function(snippet, tokens, cb) {
    snippet = JSON.parse(snippet.trim());
    var ts = typeof snippet;
    var obj = {
    'boolean': function(snippet, tokens) {
                  if (tokens) tokens.push({'type': 'BOOLEAN', 'value': JSON.stringify(snippet)});
                  if (cb) {cb(snippet, tokens)};
                  return true;
                },
    'string': function(snippet, tokens) {
                if (tokens) tokens.push({'type': 'STRING', 'value': snippet});
                if (cb) {cb(snippet, tokens)};
                return true;
              },
    'number': function(snippet, tokens) {
                if (tokens) tokens.push({'type': 'NUMBER', 'value': JSON.stringify(snippet)});
                if (cb) {cb(snippet, tokens)};
                return true;         
              }    
    };
    if (obj[ts] === undefined) {
      return false;
    } else {
      obj[ts](snippet, tokens);
    }
  },
  
  checkFor: function(lexicalType, snippet, tokens, cb) {
    if(lexicalTypes[lexicalType][snippet]){
      if (tokens) {
        var obj = {};
        obj.type = lexicalTypes[lexicalType][snippet];
        obj.value = snippet.trim();
        tokens.push(obj);
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
  
  makeIdentifier: function(snippet, tokens) {
    if (tokens) {
      var obj = {};
      obj['type'] = 'IDENTIFIER';
      obj['value'] = snippet.trim();
      tokens.push(obj);
    }
  },

  // helper function to check for identifiers
  checkForIdentifier: function(snippet, tokens, variable_names) {
    
    if (variable_names[snippet]) {
      if (tokens) module.exports.makeIdentifier(snippet, tokens);
      return true;
    } else if (tokens[tokens.length - 1].type === 'DECLARATION_KEYWORD') {
      if (tokens) module.exports.makeIdentifier(snippet, tokens);
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
