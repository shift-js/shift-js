[![Build Status](https://travis-ci.org/shift-js/shift-js.png)](https://travis-ci.org/shift-js/shift-js)

## Shift.js

Shift.JS is an open source Swift to JavaScript transpiler written in JavaScript. Full documentation can be found at [shiftjs.com] (https://www.shiftjs.com).

## Usage

Requires Node 4.0.0 & up.

The command line tool can be installed via npm:

```
npm install --g shift.js
```

To transpile a single Swift file into a JavaScript file:

```
shift.js someSwiftFile.swift
```

To watch a file for changes, running the selected command when a file is updated:

```
shift.js -w someSwiftFile.swift
```

For a full list of commands:

```
shift.js -h
```

## Development

The project is in active early development.  It currently provides language support for most Swift data & collection types, mathematical & logical operators, control flow, and functions.  

### Getting Started

Clone down the repo:

```
https://github.com/shift-js/shift-js.git
```

Install the required dependencies:

```
npm install
```

### Code Overview

```/transpiler``` contains the two main components of the transpiler and the API:

- Lexer: Generates a stream of tokens representing the lexical parts of the Swift input.  The lexer uses a state object to store the token stream and other relevant information related to the Swift input.  It is organized into three main files: 
  - ```lexer.js``` iterates over the Swift code, separating it into individual parts to be evaluated based on their precedence in Swift.
  - ```lexerFunctions.js``` contains helper functions to handle particular lexical parts of Swift.
  - ```lexicalTypes.js``` organizes and lists the valid lexical tokens of Swift, such as keywords, operators, and punctuation.

- Parser: Generates an Abstract Syntax Tree from the tokens created by the lexer. The parser takes the token objects and builds a tree that represents the relationships of the different parts of the code, that is then turned into JavaScript using Escodegen.
  - The parser is brokend up into over 20 files, that handle different parts of the parsing process.
  - ```parser.js``` is where the different modules come together to build the final tree output.
  - ```rearrange``` are a group of functions that take the original tokens from the lexer and rearrange them in a manner that is conducive to building the AST so that it produces the equivalent JavaScript output of the Swift input.

- API: Provides an interface for the CLI and transpiler web app to interact with the core transpiler.

```command.js``` contains the code for the command line interface
- The CLI uses Commander.js for handling a variety of user inputs, and uses Bluebird for promises.

### Testing

The nature of this project requires extensive tests, which are located in ```/tests```

To run the test suite:

```
grunt test
```

The test suite contains tests for each of the main parts of the transpiler.  

- Lexer tests ensure that the lexer is generating the correct token stream

- Parser tests ensure that the parser is generating the correct AST based on the token stream

- Generator tests ensure that Escodgen is generating the correct JavaScript based on the AST

- End to end tests ensure that the transpiler as a whole is generating the correct JavaScript based on the Swift input

To run any of these particular tests, rather then the entire test suite, use one of the following:

```
grunt testLexer

grunt testParser

grunt testGenerator

grunt testEndToEnd
```

Each Swift language feature should have corresponding lexer, parser, generator, and end to end tests.  Please be sure to test your code before making a pull request and to include any new tests when appropriate.

Tests should remain marked as pending until they pass, otherwise Travis CI will fail.

### Contributing

1. [Check for open issues] (https://github.com/shift-js/shift-js/issues>) or open a fresh issue to start a discussion around a feature idea or a bug.

2. Fork the shift-js repository on Github to start making your changes. Cut a namespaced feature branch from develop that is named appropriately for the feature you plan to work on.

3. Tests are very important for this project. Write tests that show the bug was fixed or that the feature works as expected.

4. Send a pull request.

Please refer to CONTRIBUTING.md and STYLEGUIDE.md in ```docs/``` for detailed contributing guidelines.

## Current Version

0.1.0

## License

MIT

See the LICENSE file in ```docs/```

## Team

Shift.JS was started by [David Churchill] (https://github.com/webdevdave), [Verlon Smith] (https://github.com/kingedward35), [Rex Suter] (https://github.com/rex-en-abyme), [Don Steinert] (https://github.com/Dnld), and [Max Yazhbin] (https://github.com/myazhbin).
