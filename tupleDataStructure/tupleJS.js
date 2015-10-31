function Tuple(tuple) {
  //assume the tuple has the form of ["blah", {two: 2}, 5,...], for now assuming no recursive tuples
  this.tup = {};
  if (Array.isArray(tuple)) {
    for (var i = 0; i < tuple.length; i++) {
      if (typeof tuple[i] === "object" && !Array.isArray(tuple[i])) {
        var key = Object.keys(tuple[i])[0];
        var val = tuple[i][key];
        this.tup[key] = {'val': val, 'key': i};
        this.tup[i] = {'val': val, 'key': key};
      } else if (Array.isArray(tuple[i])) {
        return null; //temporary
      } else {
        this.tup[i] = {'val': tuple[i]};
      }
    }
  }
  // console.dir(this.tup);
};
// swift: ("blah", two: 2, 5);
// new Tuple(["blah", {two: 2}, 5]);

// {
//   0: {val: "blah"},
//   1: {val: 2, key: "two"},
//   2: {val: 5},
//   "two": {val: 2, key: 1}
// }


  Tuple.prototype.findValue = function(keyOrIndex){
    var x = this.tup[keyOrIndex]
    return x === undefined ? undefined : this.tup[keyOrIndex]["val"];
  };

  Tuple.prototype.modifyVal = function(keyOrIndex, newVal) {
    var x = this.tup[keyOrIndex];
    if (x === undefined) {
      return false;
    }
    
    if (typeof x['val'] === typeof newVal) {
      x['val'] = newVal;
      if (x.hasOwnProperty('key')) {
        var otherKey = x['key'];
        this.tup[otherKey]['val'] = newVal;
      }
      return true;
    }
    return false;
    
  };

  // Tuple.prototype.deleteElement = function(keyOrIndex) {
  //   var x = this.tup[keyOrIndex];
  //   if (x === undefined) {
  //     return false;
  //   }
  //   if (x.hasOwnProperty('key')) {
  //     var otherKey = x['key'];
  //     delete this.tup[otherKey];
  //   } 
  //   delete this.tup[keyOrIndex];
  //   return true;
  // };


  // Tuple.prototype.moveElement = function(oldKeyorIndex, newIndex) {
    
  // };

  Tuple.prototype.renameElement = function(oldKey, newKey) {
    //partially implimented
    if (!isNaN(oldKey) || !isNaN(newKey)) {
      return false;
    }
    var x = this.tup[oldKey];
    if (x === undefined) {
      return false;
    }

    if (oldKey !== newKey && typeof oldKey === "string" && typeof newKey === "string") {
      var val = x['val'];
      var index = x['key'];
      this.tup[index]['key'] = newKey;
      this.tup[newKey] = x;
      delete this.tup[oldKey];
      return true;
    }
    return false;
  };

module.exports = Tuple;