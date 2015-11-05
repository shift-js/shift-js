var util = require('util');

// Rewriter utility
// Adds conditional parentheticals to make things easier for the parser
var rearrangeTokensDictionaryKeyValueIteration = function(tokens) {

  var reformat = false;
  var identifierKey = 0;
  var identifierVal = 0;
  var identifierCol = 0;
  var insertAt = 0;
  var indicesOfTokensToRemove = [];
  var indexToAddVarKeyword = 0;
  var indexToAddEndParensToken = 0;

  for(var i=0; i<tokens.length; i++) {
    if(tokens[i].value === "for" && tokens[i].type === "STATEMENT_KEYWORD") {
      if(tokens[i+1].type !== "PUNCTUATION" && tokens[i+1].value !== "(") continue;
      if(tokens[i+2].type !== "IDENTIFIER") continue;
      if(tokens[i+3].type !== "PUNCTUATION" && tokens[i+3].value !== ",") continue;
      if(tokens[i+4].type !== "IDENTIFIER") continue;
      if(tokens[i+5].type !== "PUNCTUATION" && tokens[i+5].value !== ")") continue;
      if(tokens[i+6].type !== "STATEMENT_KEYWORD") continue;
      if(tokens[i+7].type !== "IDENTIFIER") continue;
      if(tokens[i+8].type !== "PUNCTUATION" && tokens[i+8].value !== "{") continue;
      reformat = true;
      identifierKey = tokens[i+2].value;
      identifierVal = tokens[i+4].value;
      identifierCol = tokens[i+7].value;
      insertAt = i+9;
      indicesOfTokensToRemove.push(i+3);
      indicesOfTokensToRemove.push(i+4);
      indicesOfTokensToRemove.push(i+5);
      indexToAddVarKeyword = i+2;
      indexToAddEndParensToken = i+6;
    }
  }

  if(reformat) {

    tokens.splice(insertAt, 0,
      { type: "DECLARATION_KEYWORD", value: "var" },
      { type: "IDENTIFIER", value: identifierVal },
      { type: "OPERATOR", value: "=" },
      { type: "IDENTIFIER", value: identifierCol },
      { type: "SUBSCRIPT_LOOKUP_START", value: "[" },
      { type: "IDENTIFIER", value: identifierKey },
      { type: "SUBSCRIPT_LOOKUP_END", value: "]" },
      { type: "PUNCTUATION", value: ";" });
    tokens.splice(indicesOfTokensToRemove[0], indicesOfTokensToRemove.length);
    tokens.splice(indexToAddEndParensToken-3, 0,
      { type: 'PUNCTUATION', value: ')' });
    tokens.splice(indexToAddVarKeyword, 0,
      { type: "DECLARATION_KEYWORD", value: "var" });
  }

  return tokens;
};

module.exports = rearrangeTokensDictionaryKeyValueIteration;