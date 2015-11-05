var originalScope = require('./originalScope');
var tokenTypes = require('./tokenTypes');


// The advance function is used to advance through the tokens one at a time
  // without the need of a for loop


var advance = function(state, id) {
  var a, o, t, v;

  if (id && state.token.id !== id) {
    state.token.error("Expected '" + id + "'.");
  }

  if (state.index >= state.tokens.length) {
    state.token = state.symbolTable["(end)"];
    return state;
  }

  t = state.tokens[state.index];
  state.index += 1;
  v = t.value;
  a = t.type;

  if (tokenTypes.noun.hasItem(a)) {
    if (a === "DECLARATION_KEYWORD" && (v === "var" || v === "let")) {
      v = "var";
    }
    o = state.scope.find(v, state.symbolTable);
  } else if (tokenTypes.collectionStart.hasItem(a)) {

    if (a === "ARRAY_START") {
      v = '[';
      o = state.symbolTable['['];
    } else {
      v = '{';
      o = state.symbolTable['{'];
    }

    if (!o) {
      t.error("Unknown operator.");
    }
  } else if (tokenTypes.terminator.hasItem(a) || tokenTypes.verb.hasItem(a)) {
    o = state.symbolTable[v];
    if (!o) {
      t.error("Unknown operator.");
    }
  } else if (tokenTypes.primitive.hasItem(a)) {
    o = state.symbolTable["(literal)"];
    a = "literal";
  } else if(tokenTypes.comment.hasItem(a)) {

  } else {
    console.log(t);
    t.error("Unexpected token.");
  }

  state.token = Object.create(o);
  state.token.value = v;
  state.token.type = a;

  return state;

};

module.exports = advance;