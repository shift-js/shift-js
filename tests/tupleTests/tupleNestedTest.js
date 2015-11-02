var Tuple = require('../../tupleDataStructure/tupleJS');
var expect = require('chai').expect;
var t;

describe('Nested Tuple', function() {

  it('should store the values put into it', function () {
    t = new Tuple(["blah", {two: 2}, [5, [42] ,{three: 3}]]);
      // expect(t.findValue(0)).to.deep.equal("blah");
      // expect(t.findValue(1)).to.deep.equal(2);
      // expect(t.findValue('two')).to.deep.equal(2);
      // expect(t.findValue(2)).to.deep.equal({ 
      //   '0': { val: 5 },
      //   '1': 'Tuple' { 
      //     'tup': {
      //       '0': { val: 42 } 
      //      }
      //   },
      //   '2': { val: 3, key: 'three' },
      //   'three': { val: 3, key: 2 } 
      // }); 
      // expect(t.findValue(3)).to.deep.equal(undefined);
      // var x = t.findValue(2);

      // expect(t.findValue('four')).to.deep.equal(undefined);
    });


});
