#! /usr/bin/env node

// Node command line tool

var fs = require('fs');
var shift = require('./transpiler/api.js');

var input = process.argv.slice(2);
var action = input[0];
var swiftFile = input[1];
var fileName = swiftFile.slice(0, -6);

if (swiftFile.slice(-6) === '.swift') {

  fs.readFile(swiftFile, function (err, data) {
    if (err) {
      return console.log(err);
    }
    var swift = data.toString();
    var output = shift[action](swift);

    fs.writeFile(fileName + '.js', output, function (err) {
      if (err) throw err;
      console.log(action + ' finished!');
    });
  });
}
