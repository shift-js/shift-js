var statement = require('./statement');

var statements = function(obj, optionalNumLoops) {
  var a = [], s, count = 0;
  while (true) {
    if(count >= optionalNumLoops) break;
    if (obj.token.id === ";" || obj.token.id === "}" || obj.token.id === "(end)" || obj.token.id === "EOF") {
      if(obj.token.id === ";") {
        a.push({
          "type": "EmptyStatement"
        });
      }
      break;
    }
    s = statement(obj);
    if (s) {
      a.push(s);
      count++;
    }
  }
  return a.length === 0 ? null : a.length === 1 ? a[0] : a;
};

module.exports = statements;