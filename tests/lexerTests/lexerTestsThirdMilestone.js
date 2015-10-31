var lexicalTypes    = require('../../transpiler/lexer/lexicalTypes');
var lexerFunctions  = require('../../transpiler/lexer/lexerFunctions');
var lexer           = require('../../transpiler/lexer/lexer');
var expect          = require('chai').expect;

describe('Lexer: Third Milestone', function() {

  describe('Functions', function() {

    it('should handle function declaration and invocation with no spacing and with var in function parameters', function() {
      input = String.raw`func someFunction(a: Int) -> Int {
                            a = a + 1;
                            return a;
                        }
                        someFunction(5);`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENTS_END",       value: "}"},
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "INVOCATION_START",     value: "(" },
        { type: "NUMBER",               value: "5" },
        { type: "INVOCATION_END",       value: ")" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ]
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle function declaration and invocation with no spacing', function() {
      input = String.raw`func someFunction(a: Int)->Int{
                              let a = a + 1;
                              return a
                          }
                          someFunction(5);`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENTS_END",       value: "}"},
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "INVOCATION_START",     value: "(" },
        { type: "NUMBER",               value: "5" },
        { type: "INVOCATION_END",       value: ")" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ]
      expect(lexer(input)).to.deep.equal(output);
    });


    it('should handle function declaration and invocation with spaces between each part of the declaration', function() {
      input = String.raw`func someFunction (a: Int) -> Int {
                              let a = a + 1;
                              return a
                          }
                          someFunction(5);`
      output = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENTS_END",       value: "}"},
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "INVOCATION_START",     value: "(" },
        { type: "NUMBER",               value: "5" },
        { type: "INVOCATION_END",       value: ")" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ]
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle function declaration and invocation with no space after the function name', function() {
      input = String.raw`func someFunction(a: Int) -> Int {
                              let a = a + 1;
                              return a
                          }
                          someFunction(5);`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENTS_END",       value: "}"},
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "INVOCATION_START",     value: "(" },
        { type: "NUMBER",               value: "5" },
        { type: "INVOCATION_END",       value: ")" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ]
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle function declaration and invocation with no space after the parameter declaration', function() {
      input = String.raw`func someFunction(a: Int)-> Int {
                              let a = a + 1;
                              return a
                          }
                          someFunction(5);`
      output = [
       { type: "DECLARATION_KEYWORD",  value: "func"},
       { type: "IDENTIFIER",           value: "someFunction" },
       { type: "PARAMS_START",         value: "(" },
       { type: "IDENTIFIER",           value: "a" },
       { type: "PUNCTUATION",          value: ":" },
       { type: "TYPE_NUMBER",          value: "Int" },
       { type: "PARAMS_END",           value: ")" },
       { type: "RETURN_ARROW",         value: "->" },
       { type: "TYPE_NUMBER",          value: "Int" },
       { type: "STATEMENTS_START",     value: "{" },
       { type: "TERMINATOR",           value: "\\n"},
       { type: "DECLARATION_KEYWORD",  value: "let"},
       { type: "IDENTIFIER",           value: "a" },
       { type: "OPERATOR",             value: "=" },
       { type: "IDENTIFIER",           value: "a" },
       { type: "OPERATOR",             value: "+" },
       { type: "NUMBER",               value: "1" },
       { type: "PUNCTUATION",          value: ";" },
       { type: "TERMINATOR",           value: "\\n"},
       { type: "STATEMENT_KEYWORD",    value: "return"},
       { type: "IDENTIFIER",           value: "a" },
       { type: "TERMINATOR",           value: "\\n"},
       { type: "STATEMENTS_END",       value: "}"},
       { type: "TERMINATOR",           value: "\\n"},
       { type: "IDENTIFIER",           value: "someFunction" },
       { type: "INVOCATION_START",     value: "(" },
       { type: "NUMBER",               value: "5" },
       { type: "INVOCATION_END",       value: ")" },
       { type: "PUNCTUATION",          value: ";" },
       { type: "TERMINATOR",           value: "EOF"}
      ]
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle function declaration and invocation with erratic spacing', function() {
      input = String.raw`func  someFunction(a: Int)           ->  Int{
                              let a = a +               1;
                              return                                  a
                          }
                          someFunction           (5)       ;`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_NUMBER",          value: "Int" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "=" },
        { type: "IDENTIFIER",           value: "a" },
        { type: "OPERATOR",             value: "+" },
        { type: "NUMBER",               value: "1" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "a" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENTS_END",       value: "}"},
        { type: "TERMINATOR",           value: "\\n"},
        { type: "IDENTIFIER",           value: "someFunction" },
        { type: "INVOCATION_START",     value: "(" },
        { type: "NUMBER",               value: "5" },
        { type: "INVOCATION_END",       value: ")" },
        { type: "PUNCTUATION",          value: ";" },
        { type: "TERMINATOR",           value: "EOF"}
      ]
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that return strings', function() {
      input = String.raw`func sayHelloWorld() -> String {
                             return "hello, world"
                         }`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "sayHelloWorld" },
        { type: "PARAMS_START",         value: "(" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_STRING",          value: "String" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "STRING",               value: "hello, world" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENTS_END",       value: "}"},
        { type: "TERMINATOR",           value: "EOF"}
      ]
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions with an input that return strings', function() {
      input = String.raw`func sayHello(personName: String) -> String {
                            let greeting = "Hello, " + personName + "!"
                            return greeting
                        }`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "sayHello" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "personName" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_STRING",          value: "String" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "DECLARATION_KEYWORD",  value: "let" },
        { type: "IDENTIFIER",           value: "greeting" },
        { type: "OPERATOR",             value: "=" },
        { type: "STRING",               value: "Hello, " },
        { type: "OPERATOR",             value: "+" },
        { type: "IDENTIFIER",           value: "personName" },
        { type: "OPERATOR",             value: "+" },
        { type: "STRING",               value: "!" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "greeting" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "STATEMENTS_END",       value: "}"},
        { type: "TERMINATOR",           value: "EOF"}
      ]
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that have if else statements that use curly braces and have a return value', function() {
      input = String.raw`func sayHello(alreadyGreeted: Bool) -> String {
                              if alreadyGreeted {
                                  return "blah"
                              } else {
                                  return "hello"
                              }
                          }

                          sayHello(true)`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "sayHello" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "alreadyGreeted" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_BOOLEAN",         value: "Bool" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_STRING",          value: "String" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENT_KEYWORD",    value: "if" },
        { type: "IDENTIFIER",           value: "alreadyGreeted" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "STRING",               value: "blah" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "PUNCTUATION",          value: "}" },
        { type: "STATEMENT_KEYWORD",    value: "else" },
        { type: "PUNCTUATION",          value: "{" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "STRING",               value: "hello" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "PUNCTUATION",          value: "}" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENTS_END",       value: "}" },
        { type: "TERMINATOR",           value: "\\n"},
        { type: "TERMINATOR",           value: "\\n"},

        { type: "IDENTIFIER",           value: "sayHello" },
        { type: "INVOCATION_START",     value: "(" },
        { type: "BOOLEAN",              value: "true" },
        { type: "INVOCATION_END",       value: ")" },
        { type: "TERMINATOR",           value: "EOF"}
      ]
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle nested functions with function invocation', function() {
      input = String.raw`func sayHello(firstName: String, lastName: String) -> String {
                  func giveString() -> String {
                    return firstName + " " + lastName
                  }
                  return giveString()
              }`;
      output = [
        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "sayHello" },
        { type: "PARAMS_START",         value: "(" },
        { type: "IDENTIFIER",           value: "firstName" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String" },
        { type: "PUNCTUATION",          value: "," },
        { type: "IDENTIFIER",           value: "lastName" },
        { type: "PUNCTUATION",          value: ":" },
        { type: "TYPE_STRING",          value: "String" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_STRING",          value: "String" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "DECLARATION_KEYWORD",  value: "func"},
        { type: "IDENTIFIER",           value: "giveString" },
        { type: "PARAMS_START",         value: "(" },
        { type: "PARAMS_END",           value: ")" },
        { type: "RETURN_ARROW",         value: "->" },
        { type: "TYPE_STRING",          value: "String" },
        { type: "STATEMENTS_START",     value: "{" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "firstName" },
        { type: "OPERATOR",             value: "+" },
        { type: "STRING",               value: " " },
        { type: "OPERATOR",             value: "+" },
        { type: "IDENTIFIER",           value: "lastName" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENTS_END",       value: "}" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENT_KEYWORD",    value: "return"},
        { type: "IDENTIFIER",           value: "giveString" },
        { type: "INVOCATION_START",     value: "(" },
        { type: "INVOCATION_END",       value: ")" },
        { type: "TERMINATOR",           value: "\\n"},

        { type: "STATEMENTS_END",       value: "}" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions with string interpolation', function () {
      input = String.raw`func greet(name: String, day: String) -> String {
                      return "Hello \(name), today is \(day)."
                  }
                  greet("Bob", day: "Tuesday")`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "greet" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "name" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "day" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "STRING",                     value: "Hello " },
        { type: "STRING_INTERPOLATION_START", value: "\\(" },
        { type: "IDENTIFIER",                 value: "name" },
        { type: "STRING_INTERPOLATION_END",   value: ")" },
        { type: "STRING",                     value: ", today is " },
        { type: "STRING_INTERPOLATION_START", value: "\\(" },
        { type: "IDENTIFIER",                 value: "day" },
        { type: "STRING_INTERPOLATION_END",   value: ")" },
        { type: "STRING",                     value: "." },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "IDENTIFIER",                 value: "greet" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "STRING",                     value: "Bob" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "day" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "STRING",                     value: "Tuesday" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions with many arguments', function () {
      input = String.raw`func addSevenInts(first: Int, second: Int, third: Int, fourth: Int, fifth: Int, sixth: Int, seventh: Int) -> Int {
                        let sum = first + second + third + fourth + fifth + sixth + seventh
                        return sum
                    }
                    addSevenInts(143242134, second: 34543, third: 4, fourth: 6, fifth: 0, sixth: 56, seventh: 5)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "addSevenInts" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "first" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "second" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "third" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "fourth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "fifth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "sixth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "seventh" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },

        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "sum" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "first" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "second" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "third" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "fourth" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "fifth" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "sixth" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "seventh" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "IDENTIFIER",                 value: "sum" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "addSevenInts" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "NUMBER",                     value: "143242134" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "second" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "34543" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "third" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "4" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "fourth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "6" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "fifth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "0" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "sixth" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "56" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "seventh" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "5" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}

      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that use all possible types as parameters and arguments', function () {
      input = String.raw`func printAllTypes(first: Character, second: Double, third: Float, fourth: Bool, fifth: Int, sixth: Int8, seventh: Int16, eigth: Int32, nineth: Int64, tenth: String, eleventh: UInt, twelvth: UInt8, thirteenth: UInt16, fourteenth: UInt32, fifteenth: UInt64) {
                        print(first)
                        print(second)
                        print(third)
                        print(fourth)
                        print(fifth)
                        print(sixth)
                        print(seventh)
                        print(eigth)
                        print(nineth)
                        print(tenth)
                        print(eleventh)
                        print(twelvth)
                        print(thirteenth)
                        print(fourteenth)
                        print(fifteenth)
                    }
                    printAllTypes("a", second: 15.5, third: -16.66, fourth: true, fifth: -5, sixth: -6, seventh: -7, eigth: -8, nineth: -9, tenth: "blah", eleventh: 11, twelvth: 12, thirteenth: 13, fourteenth: 14, fifteenth: 15)`;
      output = [ 
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'printAllTypes' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'first' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'Character' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'second' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Double' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'third' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Float' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fourth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_BOOLEAN', value: 'Bool' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fifth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'sixth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int8' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'seventh' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int16' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'eigth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int32' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'nineth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int64' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'tenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'eleventh' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'twelvth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt8' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'thirteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt16' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fourteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt32' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fifteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'UInt64' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'first' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'second' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'third' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'fourth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'fifth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'sixth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'seventh' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'eigth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'nineth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'tenth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'eleventh' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'twelvth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'thirteenth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'fourteenth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'fifteenth' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'printAllTypes' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'STRING', value: 'a' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'second' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '15.5' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'third' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '16.66' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fourth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'BOOLEAN', value: 'true' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fifth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '5' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'sixth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '6' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'seventh' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '7' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'eigth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '8' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'nineth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '9' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'tenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'blah' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'eleventh' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '11' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'twelvth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '12' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'thirteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '13' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fourteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '14' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'fifteenth' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '15' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' } 
        ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle function invocations with internal parentheses', function () {
      input = String.raw`func addOne(input: Int) -> Int {
                              return input + 1
                          }
                          addOne(((17 * 4) - 3) * 5)`;

      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "input" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "IDENTIFIER",                 value: "input" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "1" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "NUMBER",                     value: "17" },
        { type: "OPERATOR",                   value: "*" },
        { type: "NUMBER",                     value: "4" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "-" },
        { type: "NUMBER",                     value: "3" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "*" },
        { type: "NUMBER",                     value: "5" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that return tuples', function () {
      input = String.raw`func returnTuple(num: Int) -> (plusFive: Int, timesFive: Int) {
                        let plusFiveResult = num + 5
                        let timesFiveResult = num * 5
                        return (plusFiveResult, timesFiveResult)
                    }
                    returnTuple(5)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "returnTuple" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "num" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },

        { type: "RETURN_ARROW",               value: "->" },

        { type: "TUPLE_START",                value: "("},
        { type: "TUPLE_ELEMENT_NAME",         value: "plusFive" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "TUPLE_ELEMENT_NAME",         value: "timesFive" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "TUPLE_END",                  value: ")"},
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "plusFiveResult" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "num" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "5" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "timesFiveResult" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "num" },
        { type: "OPERATOR",                   value: "*" },
        { type: "NUMBER",                     value: "5" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "TUPLE_START",                value: "("},
        { type: "IDENTIFIER",                 value: "plusFiveResult" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "timesFiveResult" },
        { type: "TUPLE_END",                  value: ")"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "returnTuple" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "NUMBER",                     value: "5" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that return tuples with mixed values', function () {
      input = String.raw`func nameAndAge(name: String, age: Int) -> (name: String, age: Int) {
                        return (name, age)
                    }
                    let person = nameAndAge("Steve", age: 45)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "nameAndAge" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "name" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "age" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },

        { type: "RETURN_ARROW",               value: "->" },

        { type: "TUPLE_START",                value: "(" },
        { type: "TUPLE_ELEMENT_NAME",         value: "name" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PUNCTUATION",                value: "," },
        { type: "TUPLE_ELEMENT_NAME",         value: "age" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "TUPLE_END",                  value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "TUPLE_START",                value: "("},
        { type: "IDENTIFIER",                 value: "name" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "age" },
        { type: "TUPLE_END",                  value: ")"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let"},
        { type: "IDENTIFIER",                 value: "person" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "nameAndAge" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "STRING",                     value: "Steve" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "age" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "45" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions with for loops, if and else if statments, and native count methods', function () {
      input = String.raw`func minMax(array: [Int]) -> (min: Int, max: Int) {
                  var currentMin = array[0]
                  var currentMax = array[0]
                  for value in array[1..<array.count] {
                      if value < currentMin {
                          currentMin = value
                      } else if value > currentMax {
                          currentMax = value
                      }
                  }
                  return (currentMin, currentMax)
              }`;
      output = [
        { type: "DECLARATION_KEYWORD",          value: "func"},
        { type: "IDENTIFIER",                   value: "minMax" },
        { type: "PARAMS_START",                 value: "(" },
        { type: "IDENTIFIER",                   value: "array" },
        { type: "PUNCTUATION",                  value: ":" },
        { type: "ARRAY_START",                  value: "["},
        { type: "TYPE_NUMBER",                  value: "Int" },
        { type: "ARRAY_END",                    value: "]"},
        { type: "PARAMS_END",                   value: ")" },
        { type: "RETURN_ARROW",                 value: "->" },
        { type: "TUPLE_START",                  value: "("},
        { type: "TUPLE_ELEMENT_NAME",           value: "min"},
        { type: "PUNCTUATION",                  value: ":" },
        { type: "TYPE_NUMBER",                  value: "Int" },
        { type: "PUNCTUATION",                  value: "," },
        { type: "TUPLE_ELEMENT_NAME",           value: "max"},
        { type: "PUNCTUATION",                  value: ":" },
        { type: "TYPE_NUMBER",                  value: "Int" },
        { type: "TUPLE_END",                    value: ")"},
        { type: "STATEMENTS_START",             value: "{" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "DECLARATION_KEYWORD",          value: "var" },
        { type: "IDENTIFIER",                   value: "currentMin" },
        { type: "OPERATOR",                     value: "=" },
        { type: "IDENTIFIER",                   value: "array" },
        { type: "SUBSTRING_LOOKUP_START",       value: "[" },
        { type: "NUMBER",                       value: "0" },
        { type: "SUBSTRING_LOOKUP_END",         value: "]" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "DECLARATION_KEYWORD",          value: "var" },
        { type: "IDENTIFIER",                   value: "currentMax" },
        { type: "OPERATOR",                     value: "=" },
        { type: "IDENTIFIER",                   value: "array" },
        { type: "SUBSTRING_LOOKUP_START",       value: "[" },
        { type: "NUMBER",                       value: "0" },
        { type: "SUBSTRING_LOOKUP_END",         value: "]" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "STATEMENT_KEYWORD",            value: "for" },
        { type: "IDENTIFIER",                   value: "value" },
        { type: "STATEMENT_KEYWORD",            value: "in" },
        { type: "IDENTIFIER",                   value: "array" },
        { type: "SUBSTRING_LOOKUP_START",       value: "[" },

        { type: "NUMBER",                       value: "1" },
        { type: "HALF-OPEN_RANGE",              value: "..<" },

        { type: "IDENTIFIER",                   value: "array" },
        { type: "DOT_SYNTAX",                   value: "." },
        { type: "TYPE_PROPERTY",                value: "count" },

        { type: "SUBSTRING_LOOKUP_END",         value: "]" },
        { type: "PUNCTUATION",                  value: "{" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "STATEMENT_KEYWORD",            value: "if" },
        { type: "IDENTIFIER",                   value: "value" },
        { type: "OPERATOR",                     value: "<" },
        { type: "IDENTIFIER",                   value: "currentMin" },
        { type: "PUNCTUATION",                  value: "{" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "IDENTIFIER",                   value: "currentMin" },
        { type: "OPERATOR",                     value: "=" },
        { type: "IDENTIFIER",                   value: "value" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "PUNCTUATION",                  value: "}" },
        { type: "STATEMENT_KEYWORD",            value: "else" },
        { type: "STATEMENT_KEYWORD",            value: "if" },
        { type: "IDENTIFIER",                   value: "value" },
        { type: "OPERATOR",                     value: ">" },
        { type: "IDENTIFIER",                   value: "currentMax" },
        { type: "PUNCTUATION",                  value: "{" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "IDENTIFIER",                   value: "currentMax" },
        { type: "OPERATOR",                     value: "=" },
        { type: "IDENTIFIER",                   value: "value" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "PUNCTUATION",                  value: "}" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "PUNCTUATION",                  value: "}" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "STATEMENT_KEYWORD",            value: "return"},
        { type: "TUPLE_START",                  value: "("},
        { type: "IDENTIFIER",                   value: "currentMin"},
        { type: "PUNCTUATION",                  value: "," },
        { type: "IDENTIFIER",                   value: "currentMax"},
        { type: "TUPLE_END",                    value: ")"},
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "STATEMENTS_END",               value: "}" },
        { type: "TERMINATOR",                   value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions with for loops and if and else if statments', function () {
      input = String.raw`func minMax(array: [Int]) -> (min: Int, max: Int) {
                  var currentMin = array[0]
                  var currentMax = array[0]
                  for value in array[1..<2] {
                      if value < currentMin {
                          currentMin = value
                      } else if value > currentMax {
                          currentMax = value
                      }
                  }
                  return (currentMin, currentMax)
              }`;
      output = [
        { type: "DECLARATION_KEYWORD",            value: "func"},
        { type: "IDENTIFIER",                     value: "minMax" },
        { type: "PARAMS_START",                   value: "(" },
        { type: "IDENTIFIER",                     value: "array" },
        { type: "PUNCTUATION",                    value: ":" },
        { type: "ARRAY_START",                    value: "["},
        { type: "TYPE_NUMBER",                    value: "Int" },
        { type: "ARRAY_END",                      value: "]"},
        { type: "PARAMS_END",                     value: ")" },
        { type: "RETURN_ARROW",                   value: "->" },
        { type: "TUPLE_START",                    value: "("},
        { type: "TUPLE_ELEMENT_NAME",             value: "min"},
        { type: "PUNCTUATION",                    value: ":" },
        { type: "TYPE_NUMBER",                    value: "Int" },
        { type: "PUNCTUATION",                    value: "," },
        { type: "TUPLE_ELEMENT_NAME",             value: "max"},
        { type: "PUNCTUATION",                    value: ":" },
        { type: "TYPE_NUMBER",                    value: "Int" },
        { type: "TUPLE_END",                      value: ")"},
        { type: "STATEMENTS_START",               value: "{" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "currentMin" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "array" },
        { type: "SUBSTRING_LOOKUP_START",         value: "[" },
        { type: "NUMBER",                         value: "0" },
        { type: "SUBSTRING_LOOKUP_END",           value: "]" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "currentMax" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "array" },
        { type: "SUBSTRING_LOOKUP_START",         value: "[" },
        { type: "NUMBER",                         value: "0" },
        { type: "SUBSTRING_LOOKUP_END",           value: "]" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "STATEMENT_KEYWORD",              value: "for" },
        { type: "IDENTIFIER",                     value: "value" },
        { type: "STATEMENT_KEYWORD",              value: "in" },
        { type: "IDENTIFIER",                     value: "array" },
        { type: "SUBSTRING_LOOKUP_START",         value: "[" },

        { type: "NUMBER",                         value: "1" },
        { type: "HALF-OPEN_RANGE",                value: "..<" },
        { type: "NUMBER",                         value: "2" },

        { type: "SUBSTRING_LOOKUP_END",           value: "]" },
        { type: "PUNCTUATION",                    value: "{" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "STATEMENT_KEYWORD",              value: "if" },
        { type: "IDENTIFIER",                     value: "value" },
        { type: "OPERATOR",                       value: "<" },
        { type: "IDENTIFIER",                     value: "currentMin" },
        { type: "PUNCTUATION",                    value: "{" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "IDENTIFIER",                     value: "currentMin" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "value" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "PUNCTUATION",                    value: "}" },
        { type: "STATEMENT_KEYWORD",              value: "else" },
        { type: "STATEMENT_KEYWORD",              value: "if" },
        { type: "IDENTIFIER",                     value: "value" },
        { type: "OPERATOR",                       value: ">" },
        { type: "IDENTIFIER",                     value: "currentMax" },
        { type: "PUNCTUATION",                    value: "{" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "IDENTIFIER",                     value: "currentMax" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "value" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "PUNCTUATION",                    value: "}" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "PUNCTUATION",                    value: "}" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "STATEMENT_KEYWORD",              value: "return"},
        { type: "TUPLE_START",                    value: "("},
        { type: "IDENTIFIER",                     value: "currentMin"},
        { type: "PUNCTUATION",                    value: "," },
        { type: "IDENTIFIER",                     value: "currentMax"},
        { type: "TUPLE_END",                      value: ")"},
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "STATEMENTS_END",       value: "}" },
        { type: "TERMINATOR",           value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that only have variadic parameters', function () {
      input = String.raw`func sumOf(numbers: Int...) -> Int {
                        var sum = 0
                        for number in numbers {
                            sum += number
                        }
                        return sum
                    }
                    sumOf(1,2,3)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "sumOf" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "numbers" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "VARIADIC_PARAM",             value: "..." },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "sum" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "number" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "numbers" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "sum" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "number" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "IDENTIFIER",                 value: "sum" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "sumOf" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "3" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that has an optional parameter and variadic parameters', function () {
      input = String.raw`func sumOf(start: Int=0, numbers: Int...) -> Int {
                            var sum = start
                            for number in numbers {
                                sum += number
                            }
                            return sum
                        }
                        sumOf(start: 1,2,3)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "sumOf" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "start" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "numbers" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "VARIADIC_PARAM",             value: "..." },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "sum" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "start" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "number" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "numbers" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "sum" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "number" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "IDENTIFIER",                 value: "sum" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "sumOf" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "start" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "3" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that return functions where the return function is specified within parentheses', function () {
      input = String.raw`func makeIncrementer() -> ((Int) -> Int) {
                            func addOne(number: Int) -> Int {
                                return 1 + number
                            }
                            return addOne
                        }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "makeIncrementer" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "number" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "NUMBER",                     value: "1" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "number" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that return functions where the return function is specified without parentheses', function () {
      input = String.raw`func makeIncrementer() -> (Int) -> Int {
                            func addOne(number: Int) -> Int {
                                return 1 + number
                            }
                            return addOne
                        }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "makeIncrementer" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "number" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "NUMBER",                     value: "1" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "number" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    xit('should handle functions that take a function specified with parentheses as an argument', function () {
      input = String.raw`func any(list: [Int], condition: ((Int) -> Bool)) -> Bool {
                              for item in list {
                                  if condition(item) {
                                      return true
                                  }
                              }
                              return false
                          }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "any" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "if" },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "true" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that take a function specified without parentheses as an argument', function () {
      input = String.raw`func any(list: [Int], condition: (Int) -> Bool) -> Bool {
                              for item in list {
                                  if condition(item) {
                                      return true
                                  }
                              }
                              return false
                          }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "any" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "if" },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "true" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    xit('should handle functions that take a function specified with parentheses as an argument and parenthesis around the return type', function () {
      input = String.raw`func any(list: [Int], condition: ((Int) -> Bool)) -> (Bool) {
                              for item in list {
                                  if condition(item) {
                                      return true
                                  }
                              }
                              return false
                          }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "any" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "if" },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "true" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    xit('should handle functions that take a function specified with parentheses around an argument and parenthesis', function () {
      input = String.raw`func any(list: [Int], condition: ((Int,String,Bool) -> Bool)) -> Bool {
                              for item in list {
                                  if condition(item,"abc",true) {
                                      return true
                                  }
                              }
                              return false
                          }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "any" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PUNCTUATION",                value: "," },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "if" },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "PUNCTUATION",                value: "," },

        { type: "PUNCTUATION",                value: "," },
        { type: "BOOLEAN",                    value: "true" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "STRING",                     value: "abc" },
        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "true" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that take a function specified without parentheses as an argument and parenthesis around the return type', function () {
      input = String.raw`func any(list: [Int], condition: (Int) -> Bool) -> (Bool) {
                              for item in list {
                                  if condition(item) {
                                      return true
                                  }
                              }
                              return false
                          }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "any" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "ARRAY_START",                value: "["},
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "ARRAY_END",                  value: "]"},
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "PARAMS_START",               value: "(" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "TYPE_BOOLEAN",               value: "Bool" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "IDENTIFIER",                 value: "list" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "if" },
        { type: "IDENTIFIER",                 value: "condition" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "item" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "true" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions with mathematical operations and parentheses in their invocation', function () {
      input = String.raw `func addOne(input: Int) -> Int {
                              return input + 1
                          }
                          addOne(((5 + 4) + 1) + 7)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "input" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "IDENTIFIER",                 value: "input" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "1" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "addOne" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "NUMBER",                     value: "5" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "4" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "7" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"},
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    xit('should handle functions whose invocation contains string interpolation that contains a function invocation returning an int', function () {
      input = String.raw`func returnWorld() -> Int {
                              return 2
                          }
                          func printInput(input: String) {
                              print(input)
                          }
                          printInput("Hello, \(returnWorld())!")`;
      output = [ 
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'returnWorld' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'NUMBER', value: '2' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'printInput' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'printInput' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'STRING', value: 'Hello, ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'returnWorld' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: '!' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' } 
        ];
      expect(lexer(input)).to.deep.equal(output);
    });

    xit('should handle functions whose invocation contains string interpolation that contains a function invocation returning a string', function () {
      input = String.raw`func returnWorld() -> String {
                              return "World"
                          }
                          func printInput(input: String) {
                              print(input)
                          }
                          printInput("Hello, \(returnWorld())!")`;
      output = [ 
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'returnWorld' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'STRING', value: 'World' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'printInput' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'printInput' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'STRING', value: 'Hello, ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'returnWorld' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: '!' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' } 
        ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that use inputs, native methods, and string interpolation ', function () {
      input = String.raw`func printFirstName(firstName:String) {
                            print(firstName)
                        }
                        func printFirstName(firstName:String,surname:String) {
                            print("\(firstName) \(surname)")
                        }
                        printFirstName("Joe")
                        printFirstName("Joe", surname: "Blow")`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "printFirstName" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "firstName" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "NATIVE_METHOD",              value: "print"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "firstName" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},


        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "printFirstName" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "firstName" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "surname" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "NATIVE_METHOD",              value: "print"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "STRING",                     value: "" },
        { type: "STRING_INTERPOLATION_START", value: "\\(" },
        { type: "IDENTIFIER",                 value: "firstName" },
        { type: "STRING_INTERPOLATION_END",   value: ")" },
        { type: "STRING",                     value: " " },
        { type: "STRING_INTERPOLATION_START", value: "\\(" },
        { type: "IDENTIFIER",                 value: "surname" },
        { type: "STRING_INTERPOLATION_END",   value: ")" },
        { type: "STRING",                     value: "" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "printFirstName" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "STRING",                     value: "Joe" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "printFirstName" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "STRING",                     value: "Joe" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "surname" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "STRING",                     value: "Blow" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    xit('should handle functions that get assigned to a variable and are invoked later', function () {
      input = String.raw`func addTwoInts(a: Int, b: Int) -> Int {
                                return a+b
                            }

                            var mathFunction: (Int, Int) -> Int = addTwoInts

                            print(mathFunction(2,3))`;
      output = [ 
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'addTwoInts' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'b' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'OPERATOR', value: '+' },
        { type: 'IDENTIFIER', value: 'b' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'DECLARATION_KEYWORD', value: 'var' },
        { type: 'IDENTIFIER', value: 'mathFunction' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'PUNCTUATION', value: '(' }, //TODO make Params_start
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ')' }, //TODO make Params_end
        { type: 'OPERATOR', value: '-' }, // Not correct
        { type: 'OPERATOR', value: '>' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'OPERATOR', value: '=' },
        { type: 'IDENTIFIER', value: 'addTwoInts' }, //Need to go backward frmo here to var keyword and modify accordingly
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },
        
        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'mathFunction' },
        { type: 'PUNCTUATION', value: '(' },
        { type: 'NUMBER', value: '2' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '3' },
        { type: 'PUNCTUATION', value: ')' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' } 
        ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that return nil when the input is invalid', function () {
      input = String.raw`func giveTwoValuesIfNumberGreaterThan5(input: Int) -> (one: Int, two: Int)? {
                            if input > 5 {
                                return (input+1,input-1)
                            } else {
                                return nil
                            }
                        }

                        giveTwoValuesIfNumberGreaterThan5(6)
                        giveTwoValuesIfNumberGreaterThan5(4)`;
      output = [ 
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER',value: 'giveTwoValuesIfNumberGreaterThan5' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'TUPLE_START', value: '(' },
        { type: 'TUPLE_ELEMENT_NAME', value: 'one' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'TUPLE_ELEMENT_NAME', value: 'two' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'TUPLE_END', value: ')' },
        { type: 'OPERATOR', value: '?' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'if' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'OPERATOR', value: '>' },
        { type: 'NUMBER', value: '5' },
        { type: 'PUNCTUATION', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'TUPLE_START', value: '(' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'OPERATOR', value: '+' },
        { type: 'NUMBER', value: '1' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'input' },
        { type: 'OPERATOR', value: '-' },
        { type: 'NUMBER', value: '1' },
        { type: 'TUPLE_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'PUNCTUATION', value: '}' },
        { type: 'STATEMENT_KEYWORD', value: 'else' },
        { type: 'PUNCTUATION', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'EXPRESSION_OR_TYPE_KEYWORD', value: 'nil' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'PUNCTUATION', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER',
          value: 'giveTwoValuesIfNumberGreaterThan5' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'NUMBER', value: '6' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },
        
        { type: 'IDENTIFIER',
          value: 'giveTwoValuesIfNumberGreaterThan5' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'NUMBER', value: '4' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' } 
        ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that use inputs, native methods, string interpolation, and ? operator in parameters and nil input to function invocation', function () {
          input = String.raw`func printFirstName(firstName:String,surname:String?) {
                                    if let unwrappedSurname = surname {
                                        print("\(firstName) \(unwrappedSurname)")
                                    } else {
                                        print(firstName)
                                    }
                                }
                                printFirstName("Joe", surname: nil)
                                printFirstName("Joe", surname: "Blow")`;
          output = [
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" }, 
            { type: "TYPE_STRING",                value: "String" },            
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" }, 
            { type: "TYPE_STRING",                value: "String" }, 
            { type: "OPERATOR",                   value: "?"}, 
            { type: "PARAMS_END",                 value: ")" }, 
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'STATEMENT_KEYWORD',       value: 'if' },
            { type: 'DECLARATION_KEYWORD',     value: 'let' },
            { type: 'IDENTIFIER',              value: 'unwrappedSurname' },
            { type: 'OPERATOR',                value: '=' },
            { type: 'IDENTIFIER',              value: 'surname' },
            { type: 'PUNCTUATION',             value: '{' },
            { type: 'TERMINATOR',              value: '\\n' },

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "" },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "unwrappedSurname" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: "" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'PUNCTUATION',             value: '}' },
            { type: 'STATEMENT_KEYWORD',       value: 'else' },
            { type: 'PUNCTUATION',             value: '{' },
            { type: 'TERMINATOR',              value: '\\n' },

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'PUNCTUATION',             value: '}' },
            { type: 'TERMINATOR',              value: '\\n' },

            { type: "STATEMENTS_END",           value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "Joe" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "nil" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "Joe" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Blow" },
            { type: "INVOCATION_END",             value: ")" },

            { type: "TERMINATOR",                 value: "EOF"}
          ];
          expect(lexer(input)).to.deep.equal(output);
        });

    it('should handle functions that use string parameters with a default of nil, native methods, and if else blocks', function () {
          input = String.raw`func printFirstName(firstName:String,surname:String?=nil) {
                                    if let surname = surname {
                                        print("\(firstName) \(surname)")
                                    } else {
                                        print(firstName)
                                    }
                                }
                                printFirstName("Joe")
                                printFirstName("Joe", surname: "Blow")`;
          output = [
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" }, 
            { type: "TYPE_STRING",                value: "String" },            
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" }, 
            { type: "TYPE_STRING",                value: "String" }, 
            { type: "OPERATOR",                   value: "?"}, 
            { type: "OPERATOR",                   value: "="}, 
            { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "nil" },
            { type: "PARAMS_END",                 value: ")" }, 
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'STATEMENT_KEYWORD',       value: 'if' },
            { type: 'DECLARATION_KEYWORD',     value: 'let' },
            { type: 'IDENTIFIER',              value: 'surname' },
            { type: 'OPERATOR',                value: '=' },
            { type: 'IDENTIFIER',              value: 'surname' },
            { type: 'PUNCTUATION',             value: '{' },
            { type: 'TERMINATOR',              value: '\\n' },

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "" },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: "" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'PUNCTUATION',             value: '}' },
            { type: 'STATEMENT_KEYWORD',       value: 'else' },
            { type: 'PUNCTUATION',             value: '{' },
            { type: 'TERMINATOR',              value: '\\n' },

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'PUNCTUATION',             value: '}' },
            { type: 'TERMINATOR',              value: '\\n' },

            { type: "STATEMENTS_END",           value: "}" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "Joe" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printFirstName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "Joe" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Blow" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];
          expect(lexer(input)).to.deep.equal(output);
        });

    it('should handle functions with an integer input and no returned output', function () {
      input = String.raw`func printManyTimes(a: Int) {
                              for i in 1...a {
                                  print("a");
                              }
                          }
                          printManyTimes(1)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "printManyTimes" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "for" },
        { type: "IDENTIFIER",                 value: "i" },
        { type: "STATEMENT_KEYWORD",          value: "in" },
        { type: "NUMBER",                     value: "1" },
        { type: "CLOSED_RANGE",               value: "..." },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "PUNCTUATION",                value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "NATIVE_METHOD",              value: "print"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "STRING",                     value: "a" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "PUNCTUATION",                value: ";"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "PUNCTUATION",                value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "printManyTimes" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "NUMBER",                     value: "1" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"},
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that use default string inputs and string interpolation ', function () {
          input = String.raw`func printName(firstName firstName:String="Joe",middleName:String="Andrew",surname:String="Blow") {
                                print("\(firstName) \(middleName) \(surname)")
                            }
                            printName(firstName: "John", middleName: "Juan", surname: "Smith")
                            printName(firstName: "John")
                            printName()
                            printName(surname: "Smith", middleName: "Julius", firstName: "John")`;
          output = [
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "printName" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_STRING",                value: "String" },
            { type: 'OPERATOR',                   value: '=' },
            { type: "STRING",                     value: "Joe" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "middleName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_STRING",                value: "String" },
            { type: 'OPERATOR',                   value: '=' },
            { type: "STRING",                     value: "Andrew" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_STRING",                value: "String" },
            { type: 'OPERATOR',                   value: '=' },
            { type: "STRING",                     value: "Blow" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "" },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "middleName" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: "" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'STATEMENTS_END',             value: '}' },
            { type: 'TERMINATOR',                 value: '\\n' },

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "John" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "middleName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Juan" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Smith" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "John" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Smith" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "middleName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Julius" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "John" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];

          expect(lexer(input)).to.deep.equal(output);
        });

      it('should handle functions that use default numeric and string inputs and interpolation ', function () {
          input = String.raw`func printName(firstName firstName:String="Joe",age:Int=18,surname:String="Blow") {
                                print("\(firstName) \(age) \(surname)")
                            }
                            printName(firstName: "John", age: 27, surname: "Smith")
                            printName(firstName: "John")
                            printName()
                            printName(surname: "Smith", age: 0, firstName: "John")`;

          output = [
            { type: "DECLARATION_KEYWORD",        value: "func"},
            { type: "IDENTIFIER",                 value: "printName" },
            { type: "PARAMS_START",               value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_STRING",                value: "String" },
            { type: 'OPERATOR',                   value: '=' },
            { type: "STRING",                     value: "Joe" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "age" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_NUMBER",                value: "Int" },
            { type: 'OPERATOR',                   value: '=' },
            { type: "NUMBER",                     value: "18" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "TYPE_STRING",                value: "String" },
            { type: 'OPERATOR',                   value: '=' },
            { type: "STRING",                     value: "Blow" },
            { type: "PARAMS_END",                 value: ")" },
            { type: "STATEMENTS_START",           value: "{" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "NATIVE_METHOD",              value: "print"},
            { type: "INVOCATION_START",           value: "(" },
            { type: "STRING",                     value: "" },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "age" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: " " },
            { type: "STRING_INTERPOLATION_START", value: "\\(" },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "STRING_INTERPOLATION_END",   value: ")" },
            { type: "STRING",                     value: "" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: 'STATEMENTS_END',             value: '}' },
            { type: 'TERMINATOR',                 value: '\\n' },

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "John" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "age" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "27" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Smith" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "John" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "\\n"},

            { type: "IDENTIFIER",                 value: "printName" },
            { type: "INVOCATION_START",           value: "(" },
            { type: "IDENTIFIER",                 value: "surname" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "Smith" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "age" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "NUMBER",                     value: "0" },
            { type: "PUNCTUATION",                value: "," },
            { type: "IDENTIFIER",                 value: "firstName" },
            { type: "PUNCTUATION",                value: ":" },
            { type: "STRING",                     value: "John" },
            { type: "INVOCATION_END",             value: ")" },
            { type: "TERMINATOR",                 value: "EOF"}
          ];

          expect(lexer(input)).to.deep.equal(output);
        });

  });

  describe('Classes and Stuctures', function () {

    it('should handle basic definitions of classes and structs', function () {
      input = String.raw`class VideoMode {
                            var interlaced = false
                            var frameRate = 0.0
                        }
                        struct Resolution {
                            var width = 0
                            var height = 0
                        }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "VideoMode" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "interlaced" },
        { type: "OPERATOR",                   value: "=" },
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "frameRate" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0.0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "struct" },
        { type: "IDENTIFIER",                 value: "Resolution" },
        { type: "STRUCT_DEFINITION_START",    value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "width" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "height" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STRUCT_DEFINITION_END",      value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });


    it('should handle basic initialization of classes and structs', function () {
      input = String.raw`class VideoMode {
                     var interlaced = false
                     var frameRate = 0.0
                  }
                  struct Resolution {
                      var width = 0
                      var height = 0
                  }

                  let someVideoMode = VideoMode()
                  let someResolution = Resolution();`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "VideoMode" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "interlaced" },
        { type: "OPERATOR",                   value: "=" },
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "frameRate" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0.0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "struct" },
        { type: "IDENTIFIER",                 value: "Resolution" },
        { type: "STRUCT_DEFINITION_START",    value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "width" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "height" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STRUCT_DEFINITION_END",      value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "someVideoMode" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "VideoMode" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "someResolution" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "Resolution" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle basic property access via dot notation', function () {
      input = String.raw`class VideoMode {
                             var interlaced = false
                             var frameRate = 0.0
                          }
                          struct Resolution {
                              var width = 0
                              var height = 0
                          }

                          let someVideoMode = VideoMode()
                          let someResolution = Resolution();

                          let someFrameRate = someVideoMode.frameRate;
                          let someWidth = someResolution.width`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "VideoMode" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "interlaced" },
        { type: "OPERATOR",                   value: "=" },
        { type: "BOOLEAN",                    value: "false" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "frameRate" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0.0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "struct" },
        { type: "IDENTIFIER",                 value: "Resolution" },
        { type: "STRUCT_DEFINITION_START",    value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "width" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "height" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STRUCT_DEFINITION_END",      value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "someVideoMode" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "VideoMode" },
        { type: "INITIALIZATION_START",        value: "(" },
        { type: "INITIALIZATION_END",          value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "someResolution" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "Resolution" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "someFrameRate" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "someVideoMode" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "frameRate" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "someWidth" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "someResolution" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "width" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle basic memberwise initialization', function () {
      input = String.raw`struct Resolution {
                            var width = 0
                            var height = 0
                        }

                        let someResolution = Resolution(width: 640, height: 480)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "struct" },
        { type: "IDENTIFIER",                 value: "Resolution" },
        { type: "STRUCT_DEFINITION_START",    value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "width" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "height" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STRUCT_DEFINITION_END",      value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "someResolution" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "Resolution" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "IDENTIFIER",                 value: "width" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "640" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "height" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "480" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle complex memberwise initialization with internal parentheses', function () {
      input = String.raw`var resolutionHeight = 480
                          struct Resolution {
                              var width = 0
                              var height = 0
                          }

                          let someResolution = Resolution(width: ((50 * 2) * 6) + 40, height: resolutionHeight)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "resolutionHeight" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "480" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "struct" },
        { type: "IDENTIFIER",                 value: "Resolution" },
        { type: "STRUCT_DEFINITION_START",    value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "width" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "height" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STRUCT_DEFINITION_END",      value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "someResolution" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "Resolution" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "IDENTIFIER",                 value: "width" },
        { type: "PUNCTUATION",                value: ":" },

        { type: "PUNCTUATION",                value: "(" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "NUMBER",                     value: "50" },
        { type: "OPERATOR",                   value: "*" },
        { type: "NUMBER",                     value: "2" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "*" },
        { type: "NUMBER",                     value: "6" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "40" },

        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "height" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "IDENTIFIER",                 value: "resolutionHeight" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    xit('should handle complex memberwise initialization with string interpolation that contains a function invocation', function () {
      input = String.raw`struct Greeting {
                            var greeting = ""
                        }
                        func returnWorld() -> String {
                            return "World"
                        }
                        var helloWorld = Greeting(greeting: "Hello, \(returnWorld())!")`;
      output = [

      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle variable and constant stored properties', function () {
      input = String.raw`struct FixedLengthRange {
                              var firstValue: Int
                              let length: Int
                          }

                          let rangeOfOneHundred = FixedLengthRange(firstValue: 1, length: 100)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "struct" },
        { type: "IDENTIFIER",                 value: "FixedLengthRange" },
        { type: "STRUCT_DEFINITION_START",    value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "firstValue" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "length" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STRUCT_DEFINITION_END",      value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "rangeOfOneHundred" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "FixedLengthRange" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "IDENTIFIER",                 value: "firstValue" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "length" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "100" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle properties of all kinds', function () {
      input = String.raw`class Medley {
                      var a = 1
                      var b = "hai, world"
                      let c = true
                      /* Comment 1

                      */ var d = 1 // Comment 2
                      var e = ["Eggs", "Milk", "Bacon"];
                      var f = ["one": 1, "two": 2, "three": 3]
                      let http200Status = (statusCode: 200, description: "OK")
                      var g = 5 + 6 / 4 - (-16 % 4.2) * 55
                      let h = 6 != 9
                      var i = "Stephen" + " " + "Tabor" + "!"
                  }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "Medley" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "1" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "b" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "hai, world" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "c" },
        { type: "OPERATOR",                   value: "=" },
        { type: "BOOLEAN",                    value: "true" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "MULTI_LINE_COMMENT_START",   value: "/*"},
        { type: "COMMENT",                    value: " Comment 1"},
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "MULTI_LINE_COMMENT_END",     value: "*/"},
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "d" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "1" },
        { type: "COMMENT_START",              value: "//"},
        { type: "COMMENT",                    value: " Comment 2"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "e" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "[" },
        { type: "STRING",                     value: "Eggs" },
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "Milk" },
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "Bacon" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "PUNCTUATION",                value: ";" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "f" },
        { type: "OPERATOR",                   value: "=" },
        { type: "DICTIONARY_START",           value: "[" },
        { type: "STRING",                     value: "one" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "two" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "2" },
        { type: "PUNCTUATION",                value: "," },
        { type: "STRING",                     value: "three" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "3" },
        { type: "DICTIONARY_END",             value: "]" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "http200Status" },
        { type: "OPERATOR",                   value: "=" },
        { type: "TUPLE_START",                value: "("},
        { type: "TUPLE_ELEMENT_NAME",         value: "statusCode"},
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "200"},
        { type: "PUNCTUATION",                value: "," },
        { type: "TUPLE_ELEMENT_NAME",         value: "description"},
        { type: "PUNCTUATION",                value: ":" },
        { type: "STRING",                     value: "OK"},
        { type: "TUPLE_END",                  value: ")"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "g" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "5" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "6" },
        { type: "OPERATOR",                   value: "/" },
        { type: "NUMBER",                     value: "4" },
        { type: "OPERATOR",                   value: "-" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "OPERATOR",                   value: "-" },
        { type: "NUMBER",                     value: "16" },
        { type: "OPERATOR",                   value: "%" },
        { type: "NUMBER",                     value: "4.2" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "OPERATOR",                   value: "*" },
        { type: "NUMBER",                     value: "55" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "let" },
        { type: "IDENTIFIER",                 value: "h" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "6" },
        { type: "OPERATOR",                   value: "!" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "9" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "i" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "Stephen" },
        { type: "OPERATOR",                   value: "+" },
        { type: "STRING",                     value: " " },
        { type: "OPERATOR",                   value: "+" },
        { type: "STRING",                     value: "Tabor" },
        { type: "OPERATOR",                   value: "+" },
        { type: "STRING",                     value: "!" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle basic class instance method definitions, and their invocation', function () {
      input = String.raw`class Counter {
                              var total = 0
                              func increment() {
                                  ++total
                              }
                              func incrementBy(amount: Int) {
                                  total += amount
                              }
                              func reset() {
                                  total = 0
                              }
                          }
                          var someCounter = Counter()
                          someCounter.incrementBy(5)`;

      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "Counter" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "increment" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "incrementBy" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "amount" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "amount" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "reset" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        {type: "DECLARATION_KEYWORD",         value: "var" },
        { type: "IDENTIFIER",                 value: "someCounter" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "Counter" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "someCounter" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "incrementBy" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "NUMBER",                     value: "5" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle basic class instance method definitions with multiple parameter names, and their invocation', function () {
      input = String.raw`class Counter {
                              var total = 0
                              func increment() {
                                  ++total
                              }
                              func incrementBy(amount: Int, numberOfTimes: Int) {
                                      total += amount * numberOfTimes
                              }
                              func reset() {
                                  total = 0
                              }
                          }
                          var someCounter = Counter()
                          someCounter.incrementBy(50, numberOfTimes: 10)
                          someCounter.total`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "Counter" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "increment" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "incrementBy" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "amount" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "numberOfTimes" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "amount" },
        { type: "OPERATOR",                   value: "*" },
        { type: "IDENTIFIER",                 value: "numberOfTimes" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "reset" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        {type: "DECLARATION_KEYWORD",         value: "var" },
        { type: "IDENTIFIER",                 value: "someCounter" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "Counter" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "someCounter" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "incrementBy" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "NUMBER",                     value: "50" },
        { type: "PUNCTUATION",                value: "," },
        { type: "IDENTIFIER",                 value: "numberOfTimes" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "NUMBER",                     value: "10" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "someCounter" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle basic instance method definitions that use self, and their invocation', function () {
      input = String.raw`class Counter {
                              var total = 0
                              func increment() {
                                  ++self.total
                              }
                              func incrementBy(amount: Int) {
                                  self.total += amount
                              }
                              func reset() {
                                  self.total = 0
                              }
                          }
                          var someCounter = Counter()
                          someCounter.incrementBy(5)`;

      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "Counter" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "increment" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "+" },
        { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "self" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "incrementBy" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "amount" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "self" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "amount" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "reset" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "self" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        {type: "DECLARATION_KEYWORD",         value: "var" },
        { type: "IDENTIFIER",                 value: "someCounter" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "Counter" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "someCounter" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "incrementBy" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "NUMBER",                     value: "5" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle basic struct mutating method definitions', function () {
      input = String.raw`struct Counter {
                              var total = 0
                              mutating func increment() {
                                  ++total
                              }
                              mutating func incrementBy(amount: Int) {
                                  total += amount
                              }
                              mutating func reset() {
                                  total = 0
                              }
                          }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "struct" },
        { type: "IDENTIFIER",                 value: "Counter" },
        { type: "STRUCT_DEFINITION_START",    value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "mutating"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "increment" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "mutating"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "incrementBy" },
        { type: "PARAMS_START",               value: "(" },
        { type: "IDENTIFIER",                 value: "amount" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "amount" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "mutating"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "reset" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STRUCT_DEFINITION_END",      value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle basic struct mutating methods that assign to self', function () {
      input = String.raw`struct Counter {
                              var total = 0
                              mutating func increment() {
                                  self = Counter(total: ++total)
                              }
                          }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "struct" },
        { type: "IDENTIFIER",                 value: "Counter" },
        { type: "STRUCT_DEFINITION_START",    value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "mutating"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "increment" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "EXPRESSION_OR_TYPE_KEYWORD", value: "self" },
        { type: "OPERATOR",                   value: "=" },
        { type: "IDENTIFIER",                 value: "Counter" },
        { type: "INITIALIZATION_START",       value: "(" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "PUNCTUATION",                value: ":" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "total" },
        { type: "INITIALIZATION_END",         value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STRUCT_DEFINITION_END",      value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle type methods declared with the static or class keyword', function () {
      input = String.raw`class ParentClass {
                              static func returnTen() -> Int {
                                  return 10
                              }
                              class func returnString() -> String {
                                  return "my string"
                              }
                          }
                          ParentClass.returnTen()
                          ParentClass.returnString()`;

      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "ParentClass" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "static"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "returnTen" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "NUMBER",                     value: "10" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "class"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "returnString" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "STRING",                     value: "my string" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "ParentClass" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "returnTen" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "ParentClass" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "IDENTIFIER",                 value: "returnString" },
        { type: "INVOCATION_START",           value: "(" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle basic class inheritance', function () {
      input = String.raw`class SuperClass {
                              var a = 0
                              var b = 1
                              func incrementA() {
                                  ++a
                              }
                              static func returnTen() -> Int {
                                  return 10
                              }
                              class func returnString() -> String {
                                  return "my string"
                              }
                          }

                          class SubClass: SuperClass {
                              var c = 2
                          }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "SuperClass" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "b" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "1" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "incrementA" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "static"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "returnTen" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "NUMBER",                     value: "10" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "class"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "returnString" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "STRING",                     value: "my string" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "SubClass" },
        { type: "INHERITANCE_OPERATOR",       value: ":" },
        { type: "IDENTIFIER",                 value: "SuperClass" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "c" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "2" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle methods declared as final methods and methods that override inherited methods', function () {
      input = String.raw`class SuperClass {
                            var a = 0
                            var b = 1
                            func incrementA() {
                                ++a
                            }
                            static func returnTen() -> Int {
                                return 10
                            }
                            final func returnString() -> String {
                                return "my string"
                            }
                        }

                        class SubClass: SuperClass {
                            override func incrementA() {
                                a++
                            }
                        }`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "SuperClass" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "0" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "b" },
        { type: "OPERATOR",                   value: "=" },
        { type: "NUMBER",                     value: "1" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "incrementA" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "+" },
        { type: "IDENTIFIER",                 value: "a" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "static"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "returnTen" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_NUMBER",                value: "Int" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "NUMBER",                     value: "10" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "final"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "returnString" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "RETURN_ARROW",               value: "->" },
        { type: "TYPE_STRING",                value: "String" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENT_KEYWORD",          value: "return"},
        { type: "STRING",                     value: "my string" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "class" },
        { type: "IDENTIFIER",                 value: "SubClass" },
        { type: "INHERITANCE_OPERATOR",       value: ":" },
        { type: "IDENTIFIER",                 value: "SuperClass" },
        { type: "CLASS_DEFINITION_START",     value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "override"},
        { type: "DECLARATION_KEYWORD",        value: "func"},
        { type: "IDENTIFIER",                 value: "incrementA" },
        { type: "PARAMS_START",               value: "(" },
        { type: "PARAMS_END",                 value: ")" },
        { type: "STATEMENTS_START",           value: "{" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "IDENTIFIER",                 value: "a" },
        { type: "OPERATOR",                   value: "+" },
        { type: "OPERATOR",                   value: "+" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "STATEMENTS_END",             value: "}" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "CLASS_DEFINITION_END",       value: "}" },
        { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle class declaration, initialization, property value lookups, and method calls with erratic spacing and inconsistent use of semi-colons', function () {
      input = String.raw`       class    SuperClass            {    var a = 0

                         var     b = 1   ;
                             func incrementA(){
                                 ++a
                                                              }
                             static       func returnTen() -> Int {
                                 return 10
                         }
                                                   final func returnString()-> String     {
                                 return "my string"
                              }
                         }

                         class  SubClass :  SuperClass {
                             override func  incrementA() {
                                 a++ ;
                             }
                         }

                          var  someSuper            = SuperClass  ()

                                 someSuper.a         ;someSuper.returnString() ;
                                `;
      output = [
         { type: "DECLARATION_KEYWORD",        value: "class" },
         { type: "IDENTIFIER",                 value: "SuperClass" },
         { type: "CLASS_DEFINITION_START",     value: "{" },
         { type: "DECLARATION_KEYWORD",        value: "var" },
         { type: "IDENTIFIER",                 value: "a" },
         { type: "OPERATOR",                   value: "=" },
         { type: "NUMBER",                     value: "0" },
         { type: "TERMINATOR",                 value: "\\n"},
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "DECLARATION_KEYWORD",        value: "var" },
         { type: "IDENTIFIER",                 value: "b" },
         { type: "OPERATOR",                   value: "=" },
         { type: "NUMBER",                     value: "1" },
         { type: "PUNCTUATION",                value: ";" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "DECLARATION_KEYWORD",        value: "func"},
         { type: "IDENTIFIER",                 value: "incrementA" },
         { type: "PARAMS_START",               value: "(" },
         { type: "PARAMS_END",                 value: ")" },
         { type: "STATEMENTS_START",           value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "OPERATOR",                   value: "+" },
         { type: "OPERATOR",                   value: "+" },
         { type: "IDENTIFIER",                 value: "a" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "STATEMENTS_END",             value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "DECLARATION_KEYWORD",        value: "static"},
         { type: "DECLARATION_KEYWORD",        value: "func"},
         { type: "IDENTIFIER",                 value: "returnTen" },
         { type: "PARAMS_START",               value: "(" },
         { type: "PARAMS_END",                 value: ")" },
         { type: "RETURN_ARROW",               value: "->" },
         { type: "TYPE_NUMBER",                value: "Int" },
         { type: "STATEMENTS_START",           value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "STATEMENT_KEYWORD",          value: "return"},
         { type: "NUMBER",                     value: "10" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "STATEMENTS_END",             value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "final"},
         { type: "DECLARATION_KEYWORD",        value: "func"},
         { type: "IDENTIFIER",                 value: "returnString" },
         { type: "PARAMS_START",               value: "(" },
         { type: "PARAMS_END",                 value: ")" },
         { type: "RETURN_ARROW",               value: "->" },
         { type: "TYPE_STRING",                value: "String" },
         { type: "STATEMENTS_START",           value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "STATEMENT_KEYWORD",          value: "return"},
         { type: "STRING",                     value: "my string" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "STATEMENTS_END",             value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "CLASS_DEFINITION_END",       value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "DECLARATION_KEYWORD",        value: "class" },
         { type: "IDENTIFIER",                 value: "SubClass" },
         { type: "INHERITANCE_OPERATOR",       value: ":" },
         { type: "IDENTIFIER",                 value: "SuperClass" },
         { type: "CLASS_DEFINITION_START",     value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "CONTEXT_SPECIFIC_KEYWORD",   value: "override"},
         { type: "DECLARATION_KEYWORD",        value: "func"},
         { type: "IDENTIFIER",                 value: "incrementA" },
         { type: "PARAMS_START",               value: "(" },
         { type: "PARAMS_END",                 value: ")" },
         { type: "STATEMENTS_START",           value: "{" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "IDENTIFIER",                 value: "a" },
         { type: "OPERATOR",                   value: "+" },
         { type: "OPERATOR",                   value: "+" },
         { type: "PUNCTUATION",                value: ";" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "STATEMENTS_END",             value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "CLASS_DEFINITION_END",       value: "}" },
         { type: "TERMINATOR",                 value: "\\n"},
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "DECLARATION_KEYWORD",        value: "var" },
         { type: "IDENTIFIER",                 value: "someSuper" },
         { type: "OPERATOR",                   value: "=" },
         { type: "IDENTIFIER",                 value: "SuperClass" },
         { type: "INITIALIZATION_START",       value: "(" },
         { type: "INITIALIZATION_END",         value: ")" },
         { type: "TERMINATOR",                 value: "\\n"},
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "IDENTIFIER",                 value: "someSuper" },
         { type: "DOT_SYNTAX",                 value: "." },
         { type: "IDENTIFIER",                 value: "a" },
         { type: "PUNCTUATION",                value: ";" },
         { type: "IDENTIFIER",                 value: "someSuper" },
         { type: "DOT_SYNTAX",                 value: "." },
         { type: "IDENTIFIER",                 value: "returnString" },
         { type: "INVOCATION_START",           value: "(" },
         { type: "INVOCATION_END",             value: ")" },
         { type: "PUNCTUATION",                value: ";" },
         { type: "TERMINATOR",                 value: "\\n"},

         { type: "TERMINATOR",                 value: "EOF"}
      ];
      expect(lexer(input)).to.deep.equal(output);
    });
  });

  describe('Native Methods and Type Properties', function () {

    it('should handle calls to print', function () {
      input = String.raw`var name = "Joe"
                         var arr = [1,2]
                         var tup = (1,2)
                         print(name)
                         print("Hello, \(name)")
                         print(5 * (1 + 1))
                         print(arr[1])
                         print(tup.0)`;
      output = [
        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "name" },
        { type: "OPERATOR",                   value: "=" },
        { type: "STRING",                     value: "Joe" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "OPERATOR",                   value: "=" },
        { type: "ARRAY_START",                value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "ARRAY_END",                  value: "]" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "DECLARATION_KEYWORD",        value: "var" },
        { type: "IDENTIFIER",                 value: "tup" },
        { type: "OPERATOR",                   value: "=" },
        { type: "TUPLE_START",                value: "(" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: "," },
        { type: "NUMBER",                     value: "2" },
        { type: "TUPLE_END",                  value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "NATIVE_METHOD",              value: "print"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "name" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "NATIVE_METHOD",              value: "print"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "STRING",                     value: "Hello, " },
        { type: "STRING_INTERPOLATION_START", value: "\\(" },
        { type: "IDENTIFIER",                 value: "name" },
        { type: "STRING_INTERPOLATION_END",   value: ")" },
        { type: "STRING",                     value: "" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "NATIVE_METHOD",              value: "print"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "NUMBER",                     value: "5" },
        { type: "OPERATOR",                   value: "*" },
        { type: "PUNCTUATION",                value: "(" },
        { type: "NUMBER",                     value: "1" },
        { type: "OPERATOR",                   value: "+" },
        { type: "NUMBER",                     value: "1" },
        { type: "PUNCTUATION",                value: ")" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "NATIVE_METHOD",              value: "print"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "arr" },
        { type: "SUBSTRING_LOOKUP_START",     value: "[" },
        { type: "NUMBER",                     value: "1" },
        { type: "SUBSTRING_LOOKUP_END",       value: "]" },
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "\\n"},

        { type: "NATIVE_METHOD",              value: "print"},
        { type: "INVOCATION_START",           value: "(" },
        { type: "IDENTIFIER",                 value: "tup" },
        { type: "DOT_SYNTAX",                 value: "." },
        { type: "NUMBER",                     value: "0"},
        { type: "INVOCATION_END",             value: ")" },
        { type: "TERMINATOR",                 value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle type conversion of strings, ints, floats, doubles', function () {
      input = String.raw `var one = 1
                          var oneToString = String(one)
                          var oneBackToInt = Int(oneToString)
                          var twoTwo = "2.2"
                          var twoTwoToFloat = Float(twoTwo)
                          var twoTwoToDouble = Double(twoTwo)
                          var twoTwoBackToString = String(twoTwoToFloat)`;
      output = [
       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "one" },
       { type: "OPERATOR",                      value: "=" },
       { type: "NUMBER",                        value: "1" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "oneToString" },
       { type: "OPERATOR",                      value: "=" },
       { type: "TYPE_STRING",                   value: "String"},
       { type: "INVOCATION_START",              value: "(" },
       { type: "IDENTIFIER",                    value: "one" },
       { type: "INVOCATION_END",                value: ")" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "oneBackToInt" },
       { type: "OPERATOR",                      value: "=" },
       { type: "TYPE_NUMBER",                   value: "Int"},
       { type: "INVOCATION_START",              value: "(" },
       { type: "IDENTIFIER",                    value: "oneToString" },
       { type: "INVOCATION_END",                value: ")" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "twoTwo" },
       { type: "OPERATOR",                      value: "=" },
       { type: "STRING",                        value: "2.2" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "twoTwoToFloat" },
       { type: "OPERATOR",                      value: "=" },
       { type: "TYPE_NUMBER",                   value: "Float"},
       { type: "INVOCATION_START",              value: "(" },
       { type: "IDENTIFIER",                    value: "twoTwo" },
       { type: "INVOCATION_END",                value: ")" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "twoTwoToDouble" },
       { type: "OPERATOR",                      value: "=" },
       { type: "TYPE_NUMBER",                   value: "Double"},
       { type: "INVOCATION_START",              value: "(" },
       { type: "IDENTIFIER",                    value: "twoTwo" },
       { type: "INVOCATION_END",                value: ")" },
       { type: "TERMINATOR",                    value: "\\n"},

       { type: "DECLARATION_KEYWORD",           value: "var" },
       { type: "IDENTIFIER",                    value: "twoTwoBackToString" },
       { type: "OPERATOR",                      value: "=" },
       { type: "TYPE_STRING",                   value: "String"},
       { type: "INVOCATION_START",              value: "(" },
       { type: "IDENTIFIER",                    value: "twoTwoToFloat" },
       { type: "INVOCATION_END",                value: ")" },
       { type: "TERMINATOR",                    value: "EOF" }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle native absolute value method', function () {
      input = String.raw `var negOne = -1
                            var one = abs(negOne)`;
      output = [
         { type: 'DECLARATION_KEYWORD',          value: 'var' },
         { type: 'IDENTIFIER',                   value: 'negOne' },
         { type: 'OPERATOR',                     value: '=' },
         { type: 'OPERATOR',                     value: '-' },
         { type: 'NUMBER',                       value: '1' },
         { type: 'TERMINATOR',                   value: '\\n' },
         
         { type: 'DECLARATION_KEYWORD',          value: 'var' },
         { type: 'IDENTIFIER',                   value: 'one' },
         { type: 'OPERATOR',                     value: '=' },
         { type: "NATIVE_METHOD",                value: "abs"},
         { type: "INVOCATION_START",             value: "(" },
         { type: "IDENTIFIER",                   value: "negOne" },
         { type: "INVOCATION_END",               value: ")" },   
         { type: 'TERMINATOR',                   value: 'EOF' } 
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    describe('Range Operations', function () {

      it('should handle closed ranges', function () {
        input = String.raw`var a = 1...5`;
        output = [
          { type: "DECLARATION_KEYWORD",      value: "var" },
          { type: "IDENTIFIER",               value: "a" },
          { type: "OPERATOR",                 value: "=" },
          { type: "NUMBER",                   value: "1" },
          { type: "CLOSED_RANGE",             value: "..." },
          { type: "NUMBER",                   value: "5" },
          { type: "TERMINATOR",               value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle decimal ending in 0 closed ranges', function () {
        input = String.raw`var a = 1.0...5.0`;
        output = [
          { type: "DECLARATION_KEYWORD",      value: "var" },
          { type: "IDENTIFIER",               value: "a" },
          { type: "OPERATOR",                 value: "=" },
          { type: "NUMBER",                   value: "1.0" },
          { type: "CLOSED_RANGE",             value: "..." },
          { type: "NUMBER",                   value: "5.0" },
          { type: "TERMINATOR",               value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle random decimal closed ranges', function () {
        input = String.raw`var a = 1.2...5.3`;
        output = [
          { type: "DECLARATION_KEYWORD",      value: "var" },
          { type: "IDENTIFIER",               value: "a" },
          { type: "OPERATOR",                 value: "=" },
          { type: "NUMBER",                   value: "1.2" },
          { type: "CLOSED_RANGE",             value: "..." },
          { type: "NUMBER",                   value: "5.3" },
          { type: "TERMINATOR",               value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle half-open ranges', function () {
        input = String.raw`var b = 1..<5`;
        output = [
          { type: "DECLARATION_KEYWORD",      value: "var" },
          { type: "IDENTIFIER",               value: "b" },
          { type: "OPERATOR",                 value: "=" },
          { type: "NUMBER",                   value: "1" },
          { type: "HALF-OPEN_RANGE",          value: "..<" },
          { type: "NUMBER",                   value: "5" },
          { type: "TERMINATOR",               value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle decimal ending in 0 half-open ranges', function () {
        input = String.raw`var a = 1.0..<5.0`;
        output = [
          { type: "DECLARATION_KEYWORD",      value: "var" },
          { type: "IDENTIFIER",               value: "a" },
          { type: "OPERATOR",                 value: "=" },
          { type: "NUMBER",                   value: "1.0" },
          { type: "HALF-OPEN_RANGE",          value: "..<" },
          { type: "NUMBER",                   value: "5.0" },
          { type: "TERMINATOR",               value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle random decimal half-open ranges', function () {
        input = String.raw`var a = 1.2..<5.3`;
        output = [
          { type: "DECLARATION_KEYWORD",       value: "var" },
          { type: "IDENTIFIER",                value: "a" },
          { type: "OPERATOR",                  value: "=" },
          { type: "NUMBER",                    value: "1.2" },
          { type: "HALF-OPEN_RANGE",           value: "..<" },
          { type: "NUMBER",                    value: "5.3" },
          { type: "TERMINATOR",                value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle all ranges', function () {
        input = String.raw`var a = 1...5; var b = 2..<6`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "a" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "1" },
          { type: "CLOSED_RANGE",               value: "..." },
          { type: "NUMBER",                     value: "5" },
          { type: "PUNCTUATION",                value: ";"},
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "b" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "2" },
          { type: "HALF-OPEN_RANGE",            value: "..<" },
          { type: "NUMBER",                     value: "6" },
          { type: "TERMINATOR",                 value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle ranges delimited by identifiers', function () {
        input = String.raw`let start = 0; let end = 10; let range = start..<end; let fullRange = start...end;`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "start" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "0" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "end" },
          { type: "OPERATOR",                   value: "=" },
          { type: "NUMBER",                     value: "10" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "range" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "start" },
          { type: "HALF-OPEN_RANGE",            value: "..<" },
          { type: "IDENTIFIER",                 value: "end" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "fullRange" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "start" },
          { type: "CLOSED_RANGE",               value: "..." },
          { type: "IDENTIFIER",                 value: "end" },
          { type: "PUNCTUATION",                value: ";" },
          { type: "TERMINATOR",                 value: "EOF"}
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

    });

    describe('String Properties and Methods', function () {

      it('should handle the String characters property', function () {
        input = String.raw `var s = "my string, 123!"
                            for c in s.characters {
                                print(c)
                            }`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "my string, 123!" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "STATEMENT_KEYWORD",          value: "for" },
          { type: "IDENTIFIER",                 value: "c" },
          { type: "STATEMENT_KEYWORD",          value: "in" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "characters" },
          { type: "PUNCTUATION",                value: "{" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "NATIVE_METHOD",              value: "print"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "IDENTIFIER",                 value: "c" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "PUNCTUATION",                value: "}" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the String count property', function () {
        input = String.raw `var s = "my string, 123!"
                            let fifteen = s.characters.count`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "my string, 123!" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "let" },
          { type: "IDENTIFIER",                 value: "fifteen" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "characters" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "count" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the string isEmpty property', function () {
        input = String.raw `var s: String = ""
                            s.isEmpty`;

        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "TYPE_STRING",                value: "String"},
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "isEmpty"},
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the String append method', function () {
        input = String.raw `var s = "my string, 123!"
                            var addChar: Character = "!"
                            s.append(addChar)`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "my string, 123!" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "addChar" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "TYPE_STRING",                value: "Character"},
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "!" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "append"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "IDENTIFIER",                 value: "addChar" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the String indices and their associated methods', function () {
        input = String.raw`var s = "my string, 123!"
                           var zero = s.startIndex
                           var one = s.startIndex.successor()
                           var two = s.startIndex.advancedBy(2)
                           var m = s[s.startIndex]
                           var y = s[s.startIndex.advancedBy(1)]
                           var fifteen = s.endIndex
                           var fourteen = s.endIndex.predecessor()
                           var bang = s[s.endIndex.predecessor()]`;
                    //TODO // print("the letter s: \(s[s.startIndex.advancedBy(3)])")`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "my string, 123!" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "zero" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "startIndex" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "one" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "startIndex" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "successor"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "two" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "startIndex" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "advancedBy"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "NUMBER",                     value: "2" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "m" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "startIndex" },
          { type: "SUBSTRING_LOOKUP_END",       value: "]" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "y" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "startIndex" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "advancedBy"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "NUMBER",                     value: "1" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "SUBSTRING_LOOKUP_END",       value: "]" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "fifteen" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "endIndex" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "fourteen" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "endIndex" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "predecessor"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "bang" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "IDENTIFIER",                 value: "s" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "endIndex" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "predecessor"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "SUBSTRING_LOOKUP_END",       value: "]" },
          // { type: "TERMINATOR",                 value: "\\n"},

          // { type: "NATIVE_METHOD",              value: "print"},
          // { type: "INVOCATION_START",           value: "(" },
          // { type: "STRING",                     value: "the letter s: " },
          // { type: "STRING_INTERPOLATION_START", value: "\\(" },
          // { type: "IDENTIFIER",                 value: "s" },
          // { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          // { type: "IDENTIFIER",                 value: "s" },
          // { type: "DOT_SYNTAX",                 value: "." },
          // { type: "TYPE_PROPERTY",              value: "startIndex" },
          // { type: "DOT_SYNTAX",                 value: "." },
          // { type: "NATIVE_METHOD",              value: "advancedBy"},
          // { type: "INVOCATION_START",           value: "(" },
          // { type: "NUMBER",                     value: "3" },
          // { type: "INVOCATION_END",             value: ")" },
          // { type: "SUBSTRING_LOOKUP_END",       value: "]" },
          // { type: "STRING_INTERPOLATION_END",   value: ")" },
          // { type: "STRING",                     value: "" },
          // { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the String methods for inserting and removing characters', function () {
        input = String.raw`var greeting = "World"
                            var firstPart = "Hello, "
                            greeting.insert("!", atIndex: greeting.endIndex)
                            greeting.insertContentsOf(firstPart.characters, at: greeting.startIndex)
                            greeting.removeAtIndex(greeting.endIndex.predecessor())
                            var range = greeting.startIndex...greeting.startIndex.advancedBy(6)
                            greeting.removeRange(range)`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "World" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "firstPart" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "Hello, " },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "insert"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "STRING",                     value: "!" },
          { type: "PUNCTUATION",                value: "," },
          { type: "METHOD_ARGUMENT_NAME",       value: "atIndex" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "endIndex" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "insertContentsOf"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "IDENTIFIER",                 value: "firstPart" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "characters" },
          { type: "PUNCTUATION",                value: "," },
          { type: "METHOD_ARGUMENT_NAME",       value: "at" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "startIndex" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "removeAtIndex"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "endIndex" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "predecessor"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "range" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "startIndex" },
          { type: "CLOSED_RANGE",               value: "..." },
          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "startIndex" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "advancedBy"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "NUMBER",                     value: "6" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "greeting" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "removeRange"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "IDENTIFIER",                 value: "range" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the has prefix and has suffix string methods', function () {
        input = String.raw `var famousAuthor = "F. Scott Fitzgerald"
                            print(famousAuthor.hasPrefix("F. Scott"))
                            var famousDriver = "Dale Earnhardt, Jr."
                            print(famousDriver.hasSuffix("Jr."))`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "famousAuthor" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "F. Scott Fitzgerald" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "NATIVE_METHOD",              value: "print"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "IDENTIFIER",                 value: "famousAuthor" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "hasPrefix"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "STRING",                     value: "F. Scott" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "famousDriver" },
          { type: "OPERATOR",                   value: "=" },
          { type: "STRING",                     value: "Dale Earnhardt, Jr." },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "NATIVE_METHOD",              value: "print"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "IDENTIFIER",                 value: "famousDriver" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "hasSuffix"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "STRING",                     value: "Jr." },
          { type: "INVOCATION_END",             value: ")" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      
      it('should handle string uppercase and lowercase properties', function () {
        input = String.raw `var s = "String"
                              s.uppercaseString
                              s.lowercaseString`;
        output = [
           { type: 'DECLARATION_KEYWORD',          value: 'var' },
           { type: 'IDENTIFIER',                   value: 's' },
           { type: 'OPERATOR',                     value: '=' },
           { type: 'STRING',                       value: 'String' },
           { type: 'TERMINATOR',                   value: '\\n' },
           
           { type: 'IDENTIFIER',                   value: 's' },
           { type: "DOT_SYNTAX",                   value: "." },
           { type: "TYPE_PROPERTY",                value: "uppercaseString" },
           { type: 'TERMINATOR',                   value: '\\n' },

           { type: 'IDENTIFIER',                   value: 's' },
           { type: "DOT_SYNTAX",                   value: "." },
           { type: "TYPE_PROPERTY",                value: "lowercaseString" },
           { type: 'TERMINATOR',                   value: 'EOF' } 
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

    });

    describe('Collection Properties and Methods', function () {

      it('should handle the array append method', function () {
        input = String.raw `var arr = [1,2]
                            arr.append(3)`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "arr" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "[" },
          { type: "NUMBER",                     value: "1" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "2" },
          { type: "ARRAY_END",                  value: "]" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "append"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "NUMBER",                     value: "3" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the array count property', function () {
        input = String.raw `var arr = [1,2]
                            arr.count`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "arr" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "[" },
          { type: "NUMBER",                     value: "1" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "2" },
          { type: "ARRAY_END",                  value: "]" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "count"},
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the array isEmpty property', function () {
        input = String.raw `var arr = [Int]()
                            arr.isEmpty`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "arr" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "["},
          { type: "TYPE_NUMBER",                value: "Int"},
          { type: "ARRAY_END",                  value: "]"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "TYPE_PROPERTY",              value: "isEmpty"},
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle array initialization with a default value', function () {
        input = String.raw `var arrOfThreeZeros = [Int](count: 3, repeatedValue: 0)`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "arrOfThreeZeros" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "["},
          { type: "TYPE_NUMBER",                value: "Int"},
          { type: "ARRAY_END",                  value: "]"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "TYPE_PROPERTY",              value: "count"},
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "3" },
          { type: "PUNCTUATION",                value: "," },
          { type: "METHOD_ARGUMENT_NAME",       value: "repeatedValue"},
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "0" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the array insertion and removal methods', function () {
        input = String.raw `var arr = [1,2,4,8,5,7]
                            arr.insert(3, atIndex: 2)
                            var eight = arr.removeAtIndex(4)
                            arr.removeLast()
                            var arrTwo = [6,7,8,9,10]
                            arr.insertContentsOf(arrTwo, at: 5)
                            var one = arr.removeFirst()
                            arr.popLast()
                            arr.removeAll()`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "arr" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "[" },
          { type: "NUMBER",                     value: "1" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "2" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "4" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "8" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "5" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "7" },
          { type: "ARRAY_END",                  value: "]" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "insert"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "NUMBER",                     value: "3" },
          { type: "PUNCTUATION",                value: "," },
          { type: "METHOD_ARGUMENT_NAME",       value: "atIndex" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "2" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "eight" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "removeAtIndex"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "NUMBER",                     value: "4" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "removeLast"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "arrTwo" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "[" },
          { type: "NUMBER",                     value: "6" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "7" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "8" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "9" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "10" },
          { type: "ARRAY_END",                  value: "]" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "insertContentsOf"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "IDENTIFIER",                 value: "arrTwo" },
          { type: "PUNCTUATION",                value: "," },
          { type: "METHOD_ARGUMENT_NAME",       value: "at" },
          { type: "PUNCTUATION",                value: ":" },
          { type: "NUMBER",                     value: "5" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "one" },
          { type: "OPERATOR",                   value: "=" },
          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "removeFirst"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},
          
          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "popLast"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "arr" },
          { type: "DOT_SYNTAX",                 value: "." },
          { type: "NATIVE_METHOD",              value: "removeAll"},
          { type: "INVOCATION_START",           value: "(" },
          { type: "INVOCATION_END",             value: ")" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle subscript syntax ranges to change many array values where replacement array has different length than range', function () {
        input = String.raw `var arr = [1,2,3,4,5,6,7]
                            arr[0...3] = [0]
                            arr[0..<9] = [5,6,7]`;
        output = [
          { type: "DECLARATION_KEYWORD",        value: "var" },
          { type: "IDENTIFIER",                 value: "arr" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "[" },
          { type: "NUMBER",                     value: "1" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "2" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "3" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "4" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "5" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "6" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "7" },
          { type: "ARRAY_END",                  value: "]" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "arr" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "NUMBER",                     value: "0" },
          { type: "CLOSED_RANGE",               value: "..." },
          { type: "NUMBER",                     value: "3" },
          { type: "SUBSTRING_LOOKUP_END",       value: "]" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "[" },
          { type: "NUMBER",                     value: "0" },
          { type: "ARRAY_END",                  value: "]" },
          { type: "TERMINATOR",                 value: "\\n"},

          { type: "IDENTIFIER",                 value: "arr" },
          { type: "SUBSTRING_LOOKUP_START",     value: "[" },
          { type: "NUMBER",                     value: "0" },
          { type: "HALF-OPEN_RANGE",            value: "..<" },
          { type: "NUMBER",                     value: "9" },
          { type: "SUBSTRING_LOOKUP_END",       value: "]" },
          { type: "OPERATOR",                   value: "=" },
          { type: "ARRAY_START",                value: "[" },
          { type: "NUMBER",                     value: "5" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "6" },
          { type: "PUNCTUATION",                value: "," },
          { type: "NUMBER",                     value: "7" },
          { type: "ARRAY_END",                  value: "]" },
          { type: "TERMINATOR",                 value: "EOF"},
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should the dictionary count property', function () {
        input = String.raw `var d = ["array1": [1,2,3], "array2": [4,5,6]]
                            d.count`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "d" },
          { type: "OPERATOR",                     value: "=" },
          { type: "DICTIONARY_START",             value: "[" },
          { type: "STRING",                       value: "array1" },
          { type: "PUNCTUATION",                  value: ":" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "STRING",                       value: "array2" },
          { type: "PUNCTUATION",                  value: ":" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "6" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "DICTIONARY_END",               value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "IDENTIFIER",                   value: "d" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "TYPE_PROPERTY",                value: "count" },
          { type: "TERMINATOR",                   value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should the dictionary update value method', function () {
        input = String.raw `var d = ["array1": [1,2,3], "array2": [4,5,6]]
                            d.updateValue([1], forKey: "array1")`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "d" },
          { type: "OPERATOR",                     value: "=" },
          { type: "DICTIONARY_START",             value: "[" },
          { type: "STRING",                       value: "array1" },
          { type: "PUNCTUATION",                  value: ":" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "STRING",                       value: "array2" },
          { type: "PUNCTUATION",                  value: ":" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "6" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "DICTIONARY_END",               value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "IDENTIFIER",                   value: "d" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "updateValue" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "METHOD_ARGUMENT_NAME",         value: "forKey" },
          { type: "PUNCTUATION",                  value: ":" },
          { type: "STRING",                       value: "array1" },
          { type: "INVOCATION_END",               value: ")" },
          { type: "TERMINATOR",                   value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should the dictionary remove value for key method', function () {
        input = String.raw `var d = ["array1": [1,2,3], "array2": [4,5,6]]
                            d.removeValueForKey("array1")`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "d" },
          { type: "OPERATOR",                     value: "=" },
          { type: "DICTIONARY_START",             value: "[" },
          { type: "STRING",                       value: "array1" },
          { type: "PUNCTUATION",                  value: ":" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "STRING",                       value: "array2" },
          { type: "PUNCTUATION",                  value: ":" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "6" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "DICTIONARY_END",               value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "IDENTIFIER",                   value: "d" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "removeValueForKey" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "STRING",                       value: "array1" },
          { type: "INVOCATION_END",               value: ")" },
          { type: "TERMINATOR",                   value: "EOF" }
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

    });

    describe('Sequence Type Methods', function () {

      it('should handle the contains method', function () {
        input = String.raw `var arr = [1,2,3,4,5]
                            var yes = arr.contains(4)
                            var no = arr.contains(6)`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "OPERATOR",                     value: "=" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "yes" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "contains" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "NUMBER",                       value: "4" },
          { type: "INVOCATION_END",               value: ")" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "no" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "contains" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "NUMBER",                       value: "6" },
          { type: "INVOCATION_END",               value: ")" },       
          { type: "TERMINATOR",                   value: "EOF" }   
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the drop first method', function () {
        input = String.raw `var arr = [1,2,3,4,5]
                              var lessFirst = arr.dropFirst()
                              var lessFirstThree = arr.dropFirst(3)`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "OPERATOR",                     value: "=" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "lessFirst" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "dropFirst" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "INVOCATION_END",               value: ")" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "lessFirstThree" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "dropFirst" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "NUMBER",                       value: "3" },
          { type: "INVOCATION_END",               value: ")" },       
          { type: "TERMINATOR",                   value: "EOF" }   
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the drop first method', function () {
        input = String.raw `var arr = [1,2,3,4,5]
                              var lessLast = arr.dropLast()
                              var lessLastThree = arr.dropLast(3)`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "OPERATOR",                     value: "=" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "lessLast" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "dropLast" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "INVOCATION_END",               value: ")" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "lessLastThree" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "dropLast" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "NUMBER",                       value: "3" },
          { type: "INVOCATION_END",               value: ")" },       
          { type: "TERMINATOR",                   value: "EOF" }   
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the starts with method', function () {
        input = String.raw `var arr = [1,2,3,4,5]
                              var yes = arr.startsWith([1,2,3])
                              var no = arr.startsWith([2,3])`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "OPERATOR",                     value: "=" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "yes" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "startsWith" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "INVOCATION_END",               value: ")" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "no" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "startsWith" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "INVOCATION_END",               value: ")" },       
          { type: "TERMINATOR",                   value: "EOF" }   
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle the min and max element methods', function () {
        input = String.raw `var arr = [1,2,3,4,5]
                            var one = arr.minElement()
                            var five = arr.maxElement()`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "OPERATOR",                     value: "=" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "one" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "minElement" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "INVOCATION_END",               value: ")" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "five" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "maxElement" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "INVOCATION_END",               value: ")" },       
          { type: "TERMINATOR",                   value: "EOF" }   
        ];
        expect(lexer(input)).to.deep.equal(output);
      });

      it('should handle element equal method', function () {
        input = String.raw `var arr = [1,2,3,4,5]
                              var yes = arr.elementsEqual([1,2,3,4,5])
                              var no = arr.elementsEqual([1,2,3,4])`;
        output = [
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "OPERATOR",                     value: "=" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "TERMINATOR",                   value: "\\n"},
          
          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "yes" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "elementsEqual" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "4" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "5" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "INVOCATION_END",               value: ")" },
          { type: "TERMINATOR",                   value: "\\n"},

          { type: "DECLARATION_KEYWORD",          value: "var" },
          { type: "IDENTIFIER",                   value: "no" },
          { type: "OPERATOR",                     value: "=" },
          { type: "IDENTIFIER",                   value: "arr" },
          { type: "DOT_SYNTAX",                   value: "." },
          { type: "NATIVE_METHOD",                value: "elementsEqual" },
          { type: "INVOCATION_START",             value: "(" },
          { type: "ARRAY_START",                  value: "[" },
          { type: "NUMBER",                       value: "1" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "2" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "3" },
          { type: "PUNCTUATION",                  value: "," },
          { type: "NUMBER",                       value: "4" },
          { type: "ARRAY_END",                    value: "]" },
          { type: "INVOCATION_END",               value: ")" },       
          { type: "TERMINATOR",                   value: "EOF" }   
        ];
        expect(lexer(input)).to.deep.equal(output);
      });
       

    });

  });

  describe('Fizz Buzz Examples', function () {

    it('should handle FizzBuzz example with ranges, nested control flow, and native method invocations', function () {
      input = String.raw `let range = 1...100
                          var results = [String]()
                          for i in range {
                              if i % 3 == 0 {
                                  if i % 5 == 0 {
                                      results.append("FizzBuzz")
                                  } else {
                                      results.append("Fizz")
                                  }
                              } else if i % 5 == 0 {
                                  results.append("Buzz")
                              } else {
                                  results.append(String(i))
                              }
                          }
                          print(results)`;
      output = [
       { type: 'DECLARATION_KEYWORD',     value: 'let' },
       { type: 'IDENTIFIER',              value: 'range' },
       { type: 'OPERATOR',                value: '=' },
       { type: 'NUMBER',                  value: '1' },
       { type: 'CLOSED_RANGE',            value: '...' },
       { type: 'NUMBER',                  value: '100' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'DECLARATION_KEYWORD',     value: 'var' },
       { type: 'IDENTIFIER',              value: 'results' },
       { type: 'OPERATOR',                value: '=' },
       { type: 'ARRAY_START',             value: '[' },
       { type: 'TYPE_STRING',             value: 'String' },
       { type: 'ARRAY_END',               value: ']' },
       { type: 'INVOCATION_START',        value: '(' },
       { type: 'INVOCATION_END',          value: ')' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'STATEMENT_KEYWORD',       value: 'for' },
       { type: 'IDENTIFIER',              value: 'i' },
       { type: 'STATEMENT_KEYWORD',       value: 'in' },
       { type: 'IDENTIFIER',              value: 'range' },
       { type: 'PUNCTUATION',             value: '{' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'STATEMENT_KEYWORD',       value: 'if' },
       { type: 'IDENTIFIER',              value: 'i' },
       { type: 'OPERATOR',                value: '%' },
       { type: 'NUMBER',                  value: '3' },
       { type: 'OPERATOR',                value: '=' },
       { type: 'OPERATOR',                value: '=' },
       { type: 'NUMBER',                  value: '0' },
       { type: 'PUNCTUATION',             value: '{' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'STATEMENT_KEYWORD',       value: 'if' },
       { type: 'IDENTIFIER',              value: 'i' },
       { type: 'OPERATOR',                value: '%' },
       { type: 'NUMBER',                  value: '5' },
       { type: 'OPERATOR',                value: '=' },
       { type: 'OPERATOR',                value: '=' },
       { type: 'NUMBER',                  value: '0' },
       { type: 'PUNCTUATION',             value: '{' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'IDENTIFIER',              value: 'results' },
       { type: 'DOT_SYNTAX',              value: '.' },
       { type: 'NATIVE_METHOD',           value: 'append' },
       { type: 'INVOCATION_START',        value: '(' },
       { type: 'STRING',                  value: 'FizzBuzz' },
       { type: 'INVOCATION_END',          value: ')' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'PUNCTUATION',             value: '}' },
       { type: 'STATEMENT_KEYWORD',       value: 'else' },
       { type: 'PUNCTUATION',             value: '{' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'IDENTIFIER',              value: 'results' },
       { type: 'DOT_SYNTAX',              value: '.' },
       { type: 'NATIVE_METHOD',           value: 'append' },
       { type: 'INVOCATION_START',        value: '(' },
       { type: 'STRING',                  value: 'Fizz' },
       { type: 'INVOCATION_END',          value: ')' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'PUNCTUATION',             value: '}' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'PUNCTUATION',             value: '}' },
       { type: 'STATEMENT_KEYWORD',       value: 'else' },
       { type: 'STATEMENT_KEYWORD',       value: 'if' },
       { type: 'IDENTIFIER',              value: 'i' },
       { type: 'OPERATOR',                value: '%' },
       { type: 'NUMBER',                  value: '5' },
       { type: 'OPERATOR',                value: '=' },
       { type: 'OPERATOR',                value: '=' },
       { type: 'NUMBER',                  value: '0' },
       { type: 'PUNCTUATION',             value: '{' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'IDENTIFIER',              value: 'results' },
       { type: 'DOT_SYNTAX',              value: '.' },
       { type: 'NATIVE_METHOD',           value: 'append' },
       { type: 'INVOCATION_START',        value: '(' },
       { type: 'STRING',                  value: 'Buzz' },
       { type: 'INVOCATION_END',          value: ')' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'PUNCTUATION',             value: '}' },
       { type: 'STATEMENT_KEYWORD',       value: 'else' },
       { type: 'PUNCTUATION',             value: '{' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'IDENTIFIER',              value: 'results' },
       { type: 'DOT_SYNTAX',              value: '.' },
       { type: 'NATIVE_METHOD',           value: 'append' },
       { type: 'INVOCATION_START',        value: '(' },
       { type: 'TYPE_STRING',             value: 'String' },
       { type: 'INVOCATION_START',        value: '(' },
       { type: 'IDENTIFIER',              value: 'i' },
       { type: 'INVOCATION_END',          value: ')' },
       { type: 'INVOCATION_END',          value: ')' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'PUNCTUATION',             value: '}' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'PUNCTUATION',             value: '}' },
       { type: 'TERMINATOR',              value: '\\n' },

       { type: 'NATIVE_METHOD',           value: 'print' },
       { type: 'INVOCATION_START',        value: '(' },
       { type: 'IDENTIFIER',              value: 'results' },
       { type: 'INVOCATION_END',          value: ')' },
       { type: 'TERMINATOR',              value: 'EOF' }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle FizzBuzz as a function with ranges, nested control flow, and native method invocations', function () {
      input = String.raw `func fizzBuzz(start: Int, end: Int) {
                              let range = start...end
                              for i in range {
                                  var output = ""
                                  if i % 3 == 0 {
                                      output += "Fizz"
                                  }
                                  if i % 5 == 0 {
                                      output += "Buzz"
                                  }
                                  if output.isEmpty {
                                      print(i)
                                  } else {
                                      print(output)
                                  }
                              }
                          }

                          fizzBuzz(1, end: 100)`;
      output = [
         { type: 'DECLARATION_KEYWORD',          value: 'func' },
         { type: 'IDENTIFIER',                   value: 'fizzBuzz' },
         { type: 'PARAMS_START',                 value: '(' },
         { type: 'IDENTIFIER',                   value: 'start' },
         { type: 'PUNCTUATION',                  value: ':' },
         { type: 'TYPE_NUMBER',                  value: 'Int' },
         { type: 'PUNCTUATION',                  value: ',' },
         { type: 'IDENTIFIER',                   value: 'end' },
         { type: 'PUNCTUATION',                  value: ':' },
         { type: 'TYPE_NUMBER',                  value: 'Int' },
         { type: 'PARAMS_END',                   value: ')' },
         { type: 'STATEMENTS_START',             value: '{' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'DECLARATION_KEYWORD',          value: 'let' },
         { type: 'IDENTIFIER',                   value: 'range' },
         { type: 'OPERATOR',                     value: '=' },
         { type: 'IDENTIFIER',                   value: 'start' },
         { type: 'CLOSED_RANGE',                 value: '...' },
         { type: 'IDENTIFIER',                   value: 'end' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'STATEMENT_KEYWORD',            value: 'for' },
         { type: 'IDENTIFIER',                   value: 'i' },
         { type: 'STATEMENT_KEYWORD',            value: 'in' },
         { type: 'IDENTIFIER',                   value: 'range' },
         { type: 'PUNCTUATION',                  value: '{' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'DECLARATION_KEYWORD',          value: 'var' },
         { type: 'IDENTIFIER',                   value: 'output' },
         { type: 'OPERATOR',                     value: '=' },
         { type: 'STRING',                       value: '' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'STATEMENT_KEYWORD',            value: 'if' },
         { type: 'IDENTIFIER',                   value: 'i' },
         { type: 'OPERATOR',                     value: '%' },
         { type: 'NUMBER',                       value: '3' },
         { type: 'OPERATOR',                     value: '=' },
         { type: 'OPERATOR',                     value: '=' },
         { type: 'NUMBER',                       value: '0' },
         { type: 'PUNCTUATION',                  value: '{' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'IDENTIFIER',                   value: 'output' },
         { type: 'OPERATOR',                     value: '+' },
         { type: 'OPERATOR',                     value: '=' },
         { type: 'STRING',                       value: 'Fizz' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'PUNCTUATION',                  value: '}' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'STATEMENT_KEYWORD',            value: 'if' },
         { type: 'IDENTIFIER',                   value: 'i' },
         { type: 'OPERATOR',                     value: '%' },
         { type: 'NUMBER',                       value: '5' },
         { type: 'OPERATOR',                     value: '=' },
         { type: 'OPERATOR',                     value: '=' },
         { type: 'NUMBER',                       value: '0' },
         { type: 'PUNCTUATION',                  value: '{' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'IDENTIFIER',                   value: 'output' },
         { type: 'OPERATOR',                     value: '+' },
         { type: 'OPERATOR',                     value: '=' },
         { type: 'STRING',                       value: 'Buzz' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'PUNCTUATION',                  value: '}' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'STATEMENT_KEYWORD',            value: 'if' },
         { type: 'IDENTIFIER',                   value: 'output' },
         { type: 'DOT_SYNTAX',                   value: '.' },
         { type: 'TYPE_PROPERTY',                value: 'isEmpty' },
         { type: 'PUNCTUATION',                  value: '{' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'NATIVE_METHOD',                value: 'print' },
         { type: 'INVOCATION_START',             value: '(' },
         { type: 'IDENTIFIER',                   value: 'i' },
         { type: 'INVOCATION_END',               value: ')' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'PUNCTUATION',                  value: '}' },
         { type: 'STATEMENT_KEYWORD',            value: 'else' },
         { type: 'PUNCTUATION',                  value: '{' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'NATIVE_METHOD',                value: 'print' },
         { type: 'INVOCATION_START',             value: '(' },
         { type: 'IDENTIFIER',                   value: 'output' },
         { type: 'INVOCATION_END',               value: ')' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'PUNCTUATION',                  value: '}' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'PUNCTUATION',                  value: '}' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'STATEMENTS_END',               value: '}' },
         { type: 'TERMINATOR',                   value: '\\n' },
         { type: 'TERMINATOR',                   value: '\\n' },

         { type: 'IDENTIFIER',                   value: 'fizzBuzz' },
         { type: 'INVOCATION_START',             value: '(' },
         { type: 'NUMBER',                       value: '1' },
         { type: 'PUNCTUATION',                  value: ',' },
         { type: 'IDENTIFIER',                   value: 'end' },
         { type: 'PUNCTUATION',                  value: ':' },
         { type: 'NUMBER',                       value: '100' },
         { type: 'INVOCATION_END',               value: ')' },
         { type: 'TERMINATOR',                   value: 'EOF' }
      ];
      expect(lexer(input)).to.deep.equal(output);
    });


  });

});
