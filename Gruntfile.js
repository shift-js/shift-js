module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      api: {
        src: 'client/app/components/repl/browserApi.js',
        dest: 'client/app/components/repl/api.js'
      }
    },

    mochaTest: {
      lexer: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/lexerTests/*'
        ]
      },
      parser: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/parserTests/*',
        ]
      },
      generator: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/generatorTests/*',
        ]
      },
     endToEnd: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/endToEndTests/*',
        ]
      },
      test: {
        options: {
          reporter: 'spec'
        },
        src: [
          'tests/lexerTests/*',
          'tests/parserTests/*',
          'tests/generatorTests/*',
          'tests/endToEndTests/*'
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
        ]
      }
    },

    shell: {
      rebase: {
        command: 'git pull --rebase origin develop'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-concat');

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

  grunt.registerTask('testGenerator', [
    // 'jshint',
    'mochaTest:generator'
  ]);

  grunt.registerTask('testEndToEnd', [
    // 'jshint',
    'mochaTest:endToEnd'
  ]);

  grunt.registerTask('rebase', [
    'shell:rebase'
  ]);

  grunt.registerTask('build', [
    'browserify',
    'test'
  ]);

};
