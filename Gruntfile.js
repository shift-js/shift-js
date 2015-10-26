module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [
          'transpiler/lexer/test/lexerTests.js',
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('test', [
    // 'jshint',
    'mochaTest'
  ]);

};
