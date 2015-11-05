#! /usr/bin/env node

// Node command line tool

(function() {
var program = require('commander');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var chokidar = require('chokidar');
var vm = require('vm');
var shift = require('./transpiler/api.js');

program
  .version('0.0.1')
  .usage('[options] [files]')
  .option('-c, --compile', 'Compile Swift file to JavaScript file.')
  .option('-t, --tokenize', 'Convert Swift file to tokens, saved as a JavaScript file.')
  .option('-a, --ast', 'Convert Swift file to AST, saved as a JavaScript file.')
  .option('-w, --watch', 'Watch files for changes, running the selected command when a file is updated.')
  .option('-r, --run', 'Run a Swift file as JavaScript.')
  // execute still needs implemented
  .option('-e, --execute [swift]', 'Execute Swift code as JavaScript from the command line. (Not yet implemented)')
  .parse(process.argv);

var actionFlags = ['compile', 'tokenize', 'ast'];
var action = 'compile';
actionFlags.forEach(function(flag) {
  if (program[flag]) {
    if (action !== 'compile') throw 'Cannot use multiple action flags.'
    action = flag;
  }
});



var run = function(paths) {
  return Promise.reduce(paths, function(list, filePath) {
    return fs.statAsync(filePath)
      .then(function(stats) {
        if (stats.isDirectory()) {
          return fetch(filePath);
        }
        if (filePath.slice(-6) === '.swift') {
          return applyAction(filePath);
        }
      }).then(function(data) {
        return data ? list.concat(data) : list;
      });
  }, [])
};

var fetch = function(filePath) {
  return fs.readdirAsync(filePath)
    .then(function(files) {
      return run(Promise.map(files, function(fileName) {
        return filePath + '/' + fileName;
      }));
    });
};

var applyAction = function(file) {
  // todo: refactor (if statement is used only for --run)
  if (file.slice(-6) !== '.swift') return;
  return fs.readFileAsync(file)
    .then(function (data) {
      var swift = data.toString();
      var output = shift[action](swift);
      var suffix = "";
      if (program.tokenize) {
        suffix = "Tokens";
      } else if (program.ast) {
        suffix = "AST";
      }
      var newFile = file.slice(0, -6) + suffix + '.js';
      if (program.run) {
        vm.runInThisContext(output);
        return;
      }
      return fs.writeFileAsync(newFile, output)
        .then(function (err) {
          console.log(newFile + ' saved.')
          return file;
        });
    })
}

var watch = function(files) {
  var watcher = chokidar.watch(files);
  watcher.on('change', function(path) {
    console.log(path, 'changed');
    applyAction(path)
  });
}

if (program.run) {
  applyAction(program.args[0]);
} else {
  run(program.args)
    .then(function(allFiles) {
      if (!allFiles.length) {
        console.log('No swift files found.');
        return;
      }
      console.log('All files converted');
      if (program.watch) {
        watch(allFiles)
        console.log('Watching files');
      }
    });
}
})();
