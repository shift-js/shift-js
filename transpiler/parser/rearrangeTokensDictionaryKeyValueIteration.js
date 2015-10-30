var util = require('util');

var t= [
  { type: 'DECLARATION_KEYWORD',         value: 'let' },
  { type: 'IDENTIFIER',                  value: 'interestingNumbers' },
  { type: 'OPERATOR',                    value: '=' },
  { type: 'DICTIONARY_START',            value: '[' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STRING',                      value: 'Prime' },
  { type: 'PUNCTUATION',                 value: ':' },
  { type: 'ARRAY_START',                 value: '[' },
  { type: 'NUMBER',                      value: '2' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '3' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '5' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '7' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '11' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '13' },
  { type: 'ARRAY_END',                   value: ']' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STRING',                      value: 'Fibonacci' },
  { type: 'PUNCTUATION',                 value: ':' },
  { type: 'ARRAY_START',                 value: '[' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '2' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '3' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '5' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '8' },
  { type: 'ARRAY_END',                   value: ']' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'STRING',                      value: 'Square' },
  { type: 'PUNCTUATION',                 value: ':' },
  { type: 'ARRAY_START',                 value: '[' },
  { type: 'NUMBER',                      value: '1' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '4' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '9' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '16' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'NUMBER',                      value: '25' },
  { type: 'ARRAY_END',                   value: ']' },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: 'DICTIONARY_END',              value: ']' },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: "DECLARATION_KEYWORD",         value: "var" },
  { type: "IDENTIFIER",                  value: "largest" },
  { type: "OPERATOR",                    value: "=" },
  { type: "NUMBER",                      value: "0" },
  { type: 'TERMINATOR',                  value: '\\n' },
  { type: "STATEMENT_KEYWORD",           value: "for" },
  { type: 'PUNCTUATION',                 value: '(' },
  { type: "IDENTIFIER",                  value: "kind" },
  { type: 'PUNCTUATION',                 value: ',' },
  { type: "IDENTIFIER",                  value: "numbers" },
  { type: 'PUNCTUATION',                 value: ')' },
  { type: "STATEMENT_KEYWORD",           value: "in" },
  { type: "IDENTIFIER",                  value: "interestingNumbers" },
  { type: "PUNCTUATION",                 value: "{" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "STATEMENT_KEYWORD",           value: "for" },
  { type: "IDENTIFIER",                  value: "number" },
  { type: "STATEMENT_KEYWORD",           value: "in" },
  { type: "IDENTIFIER",                  value: "numbers" },
  { type: "PUNCTUATION",                 value: "{" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "STATEMENT_KEYWORD",           value: "if" },
  { type: "IDENTIFIER",                  value: "number" },
  { type: "OPERATOR",                    value: ">" },
  { type: "IDENTIFIER",                  value: "largest" },
  { type: "PUNCTUATION",                 value: "{" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "IDENTIFIER",                  value: "largest" },
  { type: "OPERATOR",                    value: "=" },
  { type: "IDENTIFIER",                  value: "number" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "PUNCTUATION",                 value: "}" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "PUNCTUATION",                 value: "}" },
  { type: "TERMINATOR",                  value: "\\n"},
  { type: "PUNCTUATION",                 value: "}" },
  { type: "TERMINATOR",                  value: "EOF"},
];

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
      /* keyword:for is followed by #(; #var; #,; #var; #); #in; #var */
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
      { type: "SUBSTRING_LOOKUP_START", value: "[" },
      { type: "IDENTIFIER", value: identifierKey },
      { type: "SUBSTRING_LOOKUP_END", value: "]" },
      { type: "PUNCTUATION", value: ";" });
    tokens.splice(indicesOfTokensToRemove[0], indicesOfTokensToRemove.length);
    tokens.splice(indexToAddEndParensToken-3, 0,
      { type: 'PUNCTUATION', value: ')' });
    tokens.splice(indexToAddVarKeyword, 0,
      { type: "DECLARATION_KEYWORD", value: "var" });
  }

  //console.log(util.inspect(tokens, {colors:true, depth:null}));
  return tokens;
};

rearrangeTokensDictionaryKeyValueIteration(t);

module.exports = rearrangeTokensDictionaryKeyValueIteration;