var util = require('util');

// Rewriter utility
// Accounts for swift language feature (variadic params) that is not present in js until ES6
var rearrangeTokensVariadicParams = function(tokens) {

  var reformat = false;
  var paramName = 0;
  var openBlock = 0;

  for(var i=0; i<tokens.length; i++) {
    if(tokens[i].value === "..." && tokens[i].type === "VARIADIC_PARAM") {
      reformat = true;
      var lookBack = i;
      while (true) {
        lookBack--;
        if (tokens[lookBack].value === ',' || tokens[lookBack].value === '(') {
          break;
        }
      }
      var lookAhead = i;
      while (true) {
        lookAhead++;
        if (tokens[lookAhead].value === ',' || tokens[lookAhead].value === ')') {
          break;
        }
      }
      openBlock = i;
      while(true) {
        openBlock++;
        if (tokens[openBlock].value === '{') {
          break;
        }
      }
      paramName = tokens[lookBack + 1].value;
      tokens.splice(lookBack + 1, (lookAhead - lookBack - 1));
    }
  }

  if(reformat) {
      tokens.splice(openBlock - 2, 0,
        //TODO insert var numbers = Array.prototype.slice.call(arguments[arguments.length-1]);
        { type: "DECLARATION_KEYWORD",  value: "var" },
        { type: "IDENTIFIER",           value: paramName },//Identifier
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "Array" },//Add to scope obj
        { type: "DOT_SYNTAX",           value: "." },
        { type: "IDENTIFIER",           value: "prototype" },//Add to scope obj
        { type: "DOT_SYNTAX",           value: "." },
        { type: "IDENTIFIER",           value: "slice" },
        { type: "DOT_SYNTAX",           value: "." },
        { type: "IDENTIFIER",           value: "call" },
        { type: "INVOCATION_START",     value: "(" },
        { type: "IDENTIFIER",           value: "arguments" },//Add to scope obj
        { type: "SUBSTRING_LOOKUP_START",value: "[" },
        { type: "IDENTIFIER",           value: "arguments" },
        { type: "DOT_SYNTAX",           value: "." },
        { type: "IDENTIFIER",           value: "length" },//Add to scope obj
        { type: "OPERATOR",             value: "-" },
        { type: "NUMBER",               value: "1" },
        { type: "SUBSTRING_LOOKUP_END", value: "]" },
        { type: "INVOCATION_END",       value: ")" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n" });
  }

  return tokens;
};

module.exports = rearrangeTokensVariadicParams;
