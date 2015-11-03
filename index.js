#! /usr/bin/env node


(function() {
  // External dependencies.
  var program = require('commander');
  var Promise = require('bluebird');
  var fs = Promise.promisifyAll(require("fs"));
  var chokidar = require('chokidar');
  var vm = require('vm');
  var shift = require('./transpiler/api.js');

  // Declares all the valid option flags with help descriptions.
  program
    .version('0.0.1')
    .usage('[options] [files]')
    .option('-c, --compile', 'Compile Swift file to JavaScript file.')
    .option('-t, --tokenize', 'Convert Swift file to tokens, saved as a JavaScript file.')
    .option('-a, --ast', 'Convert Swift file to AST, saved as a JavaScript file.')
    .option('-w, --watch', 'Watch files for changes, running the selected command when a file is updated.')
    .option('-r, --run', 'Run a Swift file as JavaScript.')
    .parse(process.argv);

  // Checks for action flags to determine what action will be called.
  var actionFlags = ['compile', 'tokenize', 'ast'];
  var action = 'compile';
  actionFlags.forEach(function(flag) {
    if (program[flag]) {
      if (action !== 'compile') throw 'Cannot use multiple action flags.'
      action = flag;
    }
  });

  // Applies appropriate actions to each Swift file input by the user.
  var execute = function(paths) {
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

  // Fetches files and subdirectories from a parent directory.
  var fetch = function(filePath) {
    return fs.readdirAsync(filePath)
      .then(function(files) {
        return run(Promise.map(files, function(fileName) {
          return filePath + '/' + fileName;
        }));
      });
  };

  // Applies the selected action to the input Swift file
  var applyAction = function(file) {
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

  // Watches files for changes, and applies the selected action when a file is updated.
  var watch = function(files) {
    var watcher = chokidar.watch(files);
    watcher.on('change', function(path) {
      console.log(path, 'changed');
      applyAction(path)
    });
  }

  // Runs the program.
  var start = function() {
    if (program.run) {
      if (file.slice(-6) !== '.swift') {
        applyAction(program.args[0]);
      }
    } else {
      execute(program.args)
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
  }

  start();
})();
