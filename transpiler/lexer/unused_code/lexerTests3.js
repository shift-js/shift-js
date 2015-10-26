var lexer           = require('./../lexer');
var code = require('./../swiftCode').swiftCode;
var answers = require('./../swiftCodeAnswers').swiftCodeAnswers;
var descriptions = require('./../swiftCodeDescription');
var title = descriptions['title'];
var description = descriptions['description'];
var expect          = require('chai').expect;
var i = 0;


describe('Lexer', function() {
  for (var a = 0; a < title.length; a++) {
    describe(title[a], function() {
      console.log(title[a]);
      for (var b = 0; b < description[a].length; b++) {
        var c = Object.keys(description[a][b])[0];
        var d = description[a][b][c];
        describe(c,function(){
          for (var e = 0; e < d.length; e++) {
            it(d[e], function() {
              input = code[i];
              output = answers[i];
              expect(lexer(input)).to.deep.equal(output);
              i++;
            });
          }
        });
      }
    });
  }
});