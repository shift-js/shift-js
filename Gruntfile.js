module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      lexer: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/lexerTests.js'
        ]
      },
      parser: {
        options: {
          reporter: 'spec'
        },
        src: [
          'transpiler/parser/test/parserTests.js'
        ]
      },
      test: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/lexerTests.js',
          'transpiler/parser/test/parserTests.js'
        ]
      }

    },

    jshint: {
      files: [
        'transpiler/**/*'
      ],
      options: {
        force: false,
        jshintrc: '.jshintrc',
        ignores: [
          'transpiler/parser/test_cases_generator_output.js'
        ]
      }
    },

  });

  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  // grunt.loadNpmTasks('grunt-contrib-watch'); 
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('test', [
    // 'jshint',
    'mochaTest:test'
  ]);

  grunt.registerTask('testLexer', [
    // 'jshint',
    'mochaTest:lexer'
  ]);

    grunt.registerTask('testParser', [
    // 'jshint',
    'mochaTest:parser'
  ]);

};
