var util = require('util');

// Rewriter utility
// Adds conditional parentheticals to make things easier for the parser
var rearrangeTokensAddParens = function(tokens) {

  var reformat = false;
  var ifStatements = [];

  for(var i=0; i<tokens.length; i++) {
    if(tokens[i].value === "if" && tokens[i].type === "STATEMENT_KEYWORD") {
      reformat = true;
      var ifStatement = {
        ifIdx: i
      };
      var j = i;
      while (true) {
        j++;
        if (tokens[j].value === '{') {
          ifStatement.curlyIdx = j;
          break;
        }
      }
      ifStatements.push(ifStatement);
    }
  }

  if(reformat) {
    for(var m=ifStatements.length-1; m >= 0; m--) {
      var currentIfStmt = ifStatements[m];
      tokens.splice(currentIfStmt.ifIdx + 1, 0, { type: "PUNCTUATION",         value: "(" });
      tokens.splice(currentIfStmt.curlyIdx + 1, 0, { type: "PUNCTUATION",         value: ")" });
    }
  }

  return tokens;
};

module.exports = rearrangeTokensAddParens;

