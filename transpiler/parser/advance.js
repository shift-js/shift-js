var original_scope = require('./original_scope');
var token_types = require('./token_types');

/**
 * Look forward one token in the collection
 */
var advance = function(obj, id) {

  var a, o, t, v;

  if (id && obj.token.id !== id) {
    obj.token.error("Expected '" + id + "'.");
  }

  if (obj.token_nr >= obj.tokens.length) {
    obj.token = obj.symbol_table["(end)"];
    return obj;
  }

  t = obj.tokens[obj.token_nr];
  obj.token_nr += 1;
  v = t.value;
  a = t.type;

  if (token_types.noun.hasItem(a)) {
    if (a === "DECLARATION_KEYWORD") v = "var";
    o = obj.scope.find(v, obj.symbol_table);
  } else if (token_types.collectionStart.hasItem(a)) {

    if(a === "ARRAY_START") {
      v = '[';
      o = obj.symbol_table['['];
    } else {
      v = '{';
      o = obj.symbol_table['{'];
    }

    if (!o) {
      t.error("Unknown operator.");
    }
  } else if (token_types.terminator.hasItem(a) || token_types.verb.hasItem(a)) {
    o = obj.symbol_table[v];
    if (!o) {
      t.error("Unknown operator.");
    }
  } else if (token_types.primitive.hasItem(a)) {
    o = obj.symbol_table["(literal)"];
    a = "literal";
  } else {
    t.error("Unexpected token.");
  }

  obj.token = Object.create(o);
  obj.token.value = v;
  obj.token.arity = a;

  return obj;

};

module.exports = advance;