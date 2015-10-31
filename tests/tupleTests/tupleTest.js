var Tuple = require('../../tupleDataStructure/tupleJS');
var expect = require('chai').expect;

describe('Simple Tuple', function() {

  it('should store the values put into it', function () {
    t = new Tuple(["blah", {two: 2}, 5]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(5);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
      expect(t.findValue('three')).to.deep.equal(undefined);
    });

  it('should function like an array if only values are put into it', function () {
    t = new Tuple(["blah", 3, true]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(3);
      expect(t.findValue(2)).to.deep.equal(true);
      expect(t.findValue(3)).to.deep.equal(undefined);
      expect(t.findValue('three')).to.deep.equal(undefined);
    });

  it('should function like an dictionary if only objects are put into it', function () {
    t = new Tuple([{one: 1}, {two: true}, {three: "blah"}]);
      expect(t.findValue(0)).to.deep.equal(1);
      expect(t.findValue('one')).to.deep.equal(1);
      expect(t.findValue(1)).to.deep.equal(true);
      expect(t.findValue('two')).to.deep.equal(true);
      expect(t.findValue(2)).to.deep.equal("blah");
      expect(t.findValue('three')).to.deep.equal("blah");
      expect(t.findValue(3)).to.deep.equal(undefined);
      expect(t.findValue('four')).to.deep.equal(undefined);
    });

  it('should not modify values if new and old value types do not match', function () {
    t = new Tuple(["blah", {two: 2}, {three: 7}]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.modifyVal(0,7);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.modifyVal(1,"someString");
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    });

  it('should modify only the values requested and if the types of values match', function () {
    t = new Tuple(["blah", {two: 2}, {three: 7}]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.modifyVal(0,"newBlah");
      expect(t.findValue(0)).to.deep.equal("newBlah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.modifyVal(1,8);
      expect(t.findValue(0)).to.deep.equal("newBlah");
      expect(t.findValue(1)).to.deep.equal(8);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(8);
      expect(t.findValue(3)).to.deep.equal(undefined);
    // t.modifyVal("three",21);
    //   expect(t.findValue(0)).to.deep.equal("newBlah");
    //   expect(t.findValue(1)).to.deep.equal(8);
    //   expect(t.findValue(2)).to.deep.equal(7);
    //   expect(t.findValue('three')).to.deep.equal(21);
    //   expect(t.findValue('two')).to.deep.equal(8);
    //   expect(t.findValue(3)).to.deep.equal(undefined);
    });

  // it('should delete only the values requested', function () {
  //   t = new Tuple(["blah", {two: 2}, {three: 7}]);
  //     expect(t.findValue(0)).to.deep.equal("blah");
  //     expect(t.findValue(1)).to.deep.equal(2);
  //     expect(t.findValue(2)).to.deep.equal(7);
  //     expect(t.findValue('three')).to.deep.equal(7);
  //     expect(t.findValue('two')).to.deep.equal(2);
  //     expect(t.findValue(3)).to.deep.equal(undefined);
  //   t.deleteElement(0);
  //     expect(t.findValue(0)).to.deep.equal(undefined);
  //     expect(t.findValue(1)).to.deep.equal(2);
  //     expect(t.findValue('two')).to.deep.equal(2);
  //     expect(t.findValue(2)).to.deep.equal(7);
  //     expect(t.findValue('three')).to.deep.equal(7);
  //     expect(t.findValue(3)).to.deep.equal(undefined);
  //   t.deleteElement(1);
  //     expect(t.findValue(0)).to.deep.equal(undefined);
  //     expect(t.findValue(1)).to.deep.equal(undefined);
  //     expect(t.findValue('two')).to.deep.equal(undefined);
  //     expect(t.findValue(2)).to.deep.equal(7);
  //     expect(t.findValue('three')).to.deep.equal(7);
  //     expect(t.findValue(3)).to.deep.equal(undefined);
  //   t.deleteElement("three");
  //     expect(t.findValue(0)).to.deep.equal(undefined);
  //     expect(t.findValue(1)).to.deep.equal(undefined);
  //     expect(t.findValue('two')).to.deep.equal(undefined);
  //     expect(t.findValue(2)).to.deep.equal(undefined);
  //     expect(t.findValue('three')).to.deep.equal(undefined);
  //     expect(t.findValue(3)).to.deep.equal(undefined);
  //   });

  it('should not rename the key if passed incorrect arguments', function () {
    t = new Tuple(["blah", {two: 2}, {three: 7}]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement(0,1);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement(0,"abc");
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement("abc",1);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement("four","five");
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
      expect(t.findValue('four')).to.deep.equal(undefined);
      expect(t.findValue('five')).to.deep.equal(undefined);
    });  

  it('should rename the key if the correct arguments are passed in', function () {
    t = new Tuple(["blah", {two: 2}, {three: 7}]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement("two","ten");
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue('two')).to.deep.equal(undefined);
      expect(t.findValue('ten')).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue(3)).to.deep.equal(undefined);
    }); 

});

describe('Nested Tuple', function() {

  it('should store the values put into it', function () {
    t = new Tuple(["blah", {two: 2}, 5]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(5);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
      expect(t.findValue('three')).to.deep.equal(undefined);
    });

  it('should function like an array if only values are put into it', function () {
    t = new Tuple(["blah", 3, true]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(3);
      expect(t.findValue(2)).to.deep.equal(true);
      expect(t.findValue(3)).to.deep.equal(undefined);
      expect(t.findValue('three')).to.deep.equal(undefined);
    });

  it('should function like an dictionary if only objects are put into it', function () {
    t = new Tuple([{one: 1}, {two: true}, {three: "blah"}]);
      expect(t.findValue(0)).to.deep.equal(1);
      expect(t.findValue('one')).to.deep.equal(1);
      expect(t.findValue(1)).to.deep.equal(true);
      expect(t.findValue('two')).to.deep.equal(true);
      expect(t.findValue(2)).to.deep.equal("blah");
      expect(t.findValue('three')).to.deep.equal("blah");
      expect(t.findValue(3)).to.deep.equal(undefined);
      expect(t.findValue('four')).to.deep.equal(undefined);
    });

  it('should not modify values if new and old value types do not match', function () {
    t = new Tuple(["blah", {two: 2}, {three: 7}]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.modifyVal(0,7);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.modifyVal(1,"someString");
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    });

  it('should modify only the values requested and if the types of values match', function () {
    t = new Tuple(["blah", {two: 2}, {three: 7}]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.modifyVal(0,"newBlah");
      expect(t.findValue(0)).to.deep.equal("newBlah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.modifyVal(1,8);
      expect(t.findValue(0)).to.deep.equal("newBlah");
      expect(t.findValue(1)).to.deep.equal(8);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(8);
      expect(t.findValue(3)).to.deep.equal(undefined);
    // t.modifyVal("three",21);
    //   expect(t.findValue(0)).to.deep.equal("newBlah");
    //   expect(t.findValue(1)).to.deep.equal(8);
    //   expect(t.findValue(2)).to.deep.equal(7);
    //   expect(t.findValue('three')).to.deep.equal(21);
    //   expect(t.findValue('two')).to.deep.equal(8);
    //   expect(t.findValue(3)).to.deep.equal(undefined);
    });

  // it('should delete only the values requested', function () {
  //   t = new Tuple(["blah", {two: 2}, {three: 7}]);
  //     expect(t.findValue(0)).to.deep.equal("blah");
  //     expect(t.findValue(1)).to.deep.equal(2);
  //     expect(t.findValue(2)).to.deep.equal(7);
  //     expect(t.findValue('three')).to.deep.equal(7);
  //     expect(t.findValue('two')).to.deep.equal(2);
  //     expect(t.findValue(3)).to.deep.equal(undefined);
  //   t.deleteElement(0);
  //     expect(t.findValue(0)).to.deep.equal(undefined);
  //     expect(t.findValue(1)).to.deep.equal(2);
  //     expect(t.findValue('two')).to.deep.equal(2);
  //     expect(t.findValue(2)).to.deep.equal(7);
  //     expect(t.findValue('three')).to.deep.equal(7);
  //     expect(t.findValue(3)).to.deep.equal(undefined);
  //   t.deleteElement(1);
  //     expect(t.findValue(0)).to.deep.equal(undefined);
  //     expect(t.findValue(1)).to.deep.equal(undefined);
  //     expect(t.findValue('two')).to.deep.equal(undefined);
  //     expect(t.findValue(2)).to.deep.equal(7);
  //     expect(t.findValue('three')).to.deep.equal(7);
  //     expect(t.findValue(3)).to.deep.equal(undefined);
  //   t.deleteElement("three");
  //     expect(t.findValue(0)).to.deep.equal(undefined);
  //     expect(t.findValue(1)).to.deep.equal(undefined);
  //     expect(t.findValue('two')).to.deep.equal(undefined);
  //     expect(t.findValue(2)).to.deep.equal(undefined);
  //     expect(t.findValue('three')).to.deep.equal(undefined);
  //     expect(t.findValue(3)).to.deep.equal(undefined);
  //   });

  it('should not rename the key if passed incorrect arguments', function () {
    t = new Tuple(["blah", {two: 2}, {three: 7}]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement(0,1);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement(0,"abc");
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement("abc",1);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement("four","five");
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
      expect(t.findValue('four')).to.deep.equal(undefined);
      expect(t.findValue('five')).to.deep.equal(undefined);
    });  

  it('should rename the key if the correct arguments are passed in', function () {
    t = new Tuple(["blah", {two: 2}, {three: 7}]);
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue('two')).to.deep.equal(2);
      expect(t.findValue(3)).to.deep.equal(undefined);
    t.renameElement("two","ten");
      expect(t.findValue(0)).to.deep.equal("blah");
      expect(t.findValue(1)).to.deep.equal(2);
      expect(t.findValue('two')).to.deep.equal(undefined);
      expect(t.findValue('ten')).to.deep.equal(2);
      expect(t.findValue(2)).to.deep.equal(7);
      expect(t.findValue('three')).to.deep.equal(7);
      expect(t.findValue(3)).to.deep.equal(undefined);
    }); 

});

