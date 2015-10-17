module.exports = {
  deepEqual: function(a,b) {
    if (a === b) {
      return true;
    }
    if (a == null || typeof a != "object" || b == null || typeof b != "object") {
      return false;
    }
    var propsInA = 0, propsInB = 0;
    for (var prop in a) {
      propsInA += 1;
    }
    for (var prop in b) {
      propsInB += 1;
      if (!(prop in a) || !(module.exports.deepEqual(a[prop],b[prop]))) {
        return false;
      }
    }
    return propsInA === propsInB;
  } 
};
