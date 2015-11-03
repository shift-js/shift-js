// swift tuple example: var tup = ("blah", two: 2, (5, three: 3))
// input into Tuple class, expected in form of an array: var myTupleInput = ["blah", {two: 2}, [5, {three: 3}]];
// creating the tuple object: var t = new Tuple(myTupleInput);
// internal state of the tuple:
/*
{
  0: {val: "blah"},
  1: {val: 2, key: "two"},
  "two": {val: 2, key: 1},
  2: {
      0: {val: "blah"},
      1: {val: 3, key: "three"},
      "three": {val: 3, key: 1},
     },
  

}
*/

/*


*/

//TODO:
/*
1.) Create special error messages
2.) 
*/

function Tuple(tuple) {
  this.tup = {};
  if (Array.isArray(tuple)) {
    for (var i = 0; i < tuple.length; i++) {
      if (typeof tuple[i] === "object" && !Array.isArray(tuple[i])) {
        //Assuming that JS still typecasts the key of any object into a string
        var key = Object.keys(tuple[i])[0];
        var val = tuple[i][key];
        this.tup[key] = {'val': val, 'key': i};
        this.tup[i] = {'val': val, 'key': key};
      } else if (typeof tuple[i] === "boolean" || typeof tuple[i] === "number" || typeof tuple[i] === "string") {
        this.tup[i] = {'val': tuple[i]};
      } else if (Array.isArray(tuple[i])) {
        // this.tup[i] = (new Tuple(tuple[i]))._tupleToObject();
        this.tup[i] = new Tuple(tuple[i]);
      } else {
        //return error if the input is incorrect
        return null;
      }
      
    }
  }

  // console.dir(this.tup);
  

};

Tuple.prototype._tupleToObject = function() {
  if (this instanceof Tuple) {
    return this.tup;
  }
  return false;
};

Tuple.prototype.findLocation = function(keyOrIndex) {
  var result = [];
  //recursive IIFE here
  return result;
}

// make findValue has an optional level taking in the level as a # or a string such as "all"
//
Tuple.prototype.findValue = function(keyOrIndex){
  var x = this.tup[keyOrIndex];
  // console.log(x["tup"]);
  if (x instanceof Tuple ) {
    return x["tup"];
  } else {
    return x === undefined ? undefined : this.tup[keyOrIndex]["val"];
  }
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

Tuple.prototype.constructor = Tuple;

module.exports = Tuple;