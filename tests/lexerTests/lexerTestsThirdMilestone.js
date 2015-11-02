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
        { type: "SUBSCRIPT_LOOKUP_START",       value: "[" },
        { type: "NUMBER",                       value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",         value: "]" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "DECLARATION_KEYWORD",          value: "var" },
        { type: "IDENTIFIER",                   value: "currentMax" },
        { type: "OPERATOR",                     value: "=" },
        { type: "IDENTIFIER",                   value: "array" },
        { type: "SUBSCRIPT_LOOKUP_START",       value: "[" },
        { type: "NUMBER",                       value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",         value: "]" },
        { type: "TERMINATOR",                   value: "\\n"},

        { type: "STATEMENT_KEYWORD",            value: "for" },
        { type: "IDENTIFIER",                   value: "value" },
        { type: "STATEMENT_KEYWORD",            value: "in" },
        { type: "IDENTIFIER",                   value: "array" },
        { type: "SUBSCRIPT_LOOKUP_START",       value: "[" },

        { type: "NUMBER",                       value: "1" },
        { type: "HALF_OPEN_RANGE",              value: "..<" },

        { type: "IDENTIFIER",                   value: "array" },
        { type: "DOT_SYNTAX",                   value: "." },
        { type: "TYPE_PROPERTY",                value: "count" },

        { type: "SUBSCRIPT_LOOKUP_END",         value: "]" },
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
        { type: "SUBSCRIPT_LOOKUP_START",         value: "[" },
        { type: "NUMBER",                         value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",           value: "]" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "DECLARATION_KEYWORD",            value: "var" },
        { type: "IDENTIFIER",                     value: "currentMax" },
        { type: "OPERATOR",                       value: "=" },
        { type: "IDENTIFIER",                     value: "array" },
        { type: "SUBSCRIPT_LOOKUP_START",         value: "[" },
        { type: "NUMBER",                         value: "0" },
        { type: "SUBSCRIPT_LOOKUP_END",           value: "]" },
        { type: "TERMINATOR",                     value: "\\n"},

        { type: "STATEMENT_KEYWORD",              value: "for" },
        { type: "IDENTIFIER",                     value: "value" },
        { type: "STATEMENT_KEYWORD",              value: "in" },
        { type: "IDENTIFIER",                     value: "array" },
        { type: "SUBSCRIPT_LOOKUP_START",         value: "[" },

        { type: "NUMBER",                         value: "1" },
        { type: "HALF_OPEN_RANGE",                value: "..<" },
        { type: "NUMBER",                         value: "2" },

        { type: "SUBSCRIPT_LOOKUP_END",           value: "]" },
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

    it('should handle functions that return functions which are composed of nested functions', function () {
      input = String.raw`func makeIncrementer() -> ((Int) -> Int) {
                                func addOne(number: Int) -> Int {
                                    func anon(n: Int) -> Int {
                                        return 1 + n
                                    }
                                    return anon(number)
                                }
                                return addOne
                            }`;
      output = [ 
          { type: 'DECLARATION_KEYWORD', value: 'func' },
          { type: 'IDENTIFIER', value: 'makeIncrementer' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'PUNCTUATION', value: '(' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PUNCTUATION', value: ')' },
          { type: 'STATEMENTS_START', value: '{' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'DECLARATION_KEYWORD', value: 'func' },
          { type: 'IDENTIFIER', value: 'addOne' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'IDENTIFIER', value: 'number' },
          { type: 'PUNCTUATION', value: ':' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'STATEMENTS_START', value: '{' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'DECLARATION_KEYWORD', value: 'func' },
          { type: 'IDENTIFIER', value: 'anon' },
          { type: 'PARAMS_START', value: '(' },
          { type: 'IDENTIFIER', value: 'n' },
          { type: 'PUNCTUATION', value: ':' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'PARAMS_END', value: ')' },
          { type: 'RETURN_ARROW', value: '->' },
          { type: 'TYPE_NUMBER', value: 'Int' },
          { type: 'STATEMENTS_START', value: '{' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENT_KEYWORD', value: 'return' },
          { type: 'NUMBER', value: '1' },
          { type: 'OPERATOR', value: '+' },
          { type: 'IDENTIFIER', value: 'n' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENTS_END', value: '}' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENT_KEYWORD', value: 'return' },
          { type: 'IDENTIFIER', value: 'anon' },
          { type: 'INVOCATION_START', value: '(' },
          { type: 'IDENTIFIER', value: 'number' },
          { type: 'INVOCATION_END', value: ')' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENTS_END', value: '}' },
          { type: 'TERMINATOR', value: '\\n' },

          { type: 'STATEMENT_KEYWORD', value: 'return' },
          { type: 'IDENTIFIER', value: 'addOne' },
          { type: 'TERMINATOR', value: '\\n' },
          
          { type: 'STATEMENTS_END', value: '}' },
          { type: 'TERMINATOR', value: 'EOF' } 
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

    xit('should handle functions that take a multiparameter function specified with parentheses as an argument', function () {
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
        { type: "STRING",                     value: "abc" },
        { type: "PUNCTUATION",                value: "," },
        { type: "BOOLEAN",                    value: "true" },
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

    it('should handle functions that have external and internal parameter names and have a void return type', function () {
      input = String.raw`func sayHelloNoOutput(to person: String, from anotherPerson: String) {
                              print("To \(person) from \(anotherPerson)!")
                          }

                          sayHelloNoOutput(to: "Bill", from: "Ted")`;
      output = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'sayHelloNoOutput' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'to' },
        { type: 'IDENTIFIER', value: 'person' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'from' },
        { type: 'IDENTIFIER', value: 'anotherPerson' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'STRING', value: 'To ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'person' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: ' from ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'anotherPerson' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: '!' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'sayHelloNoOutput' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'to' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'Bill' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'from' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'Ted' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that have external and internal parameter names and have a string return type', function () {
      input = String.raw`func sayHello(to person: String, from anotherPerson: String) -> String {
                              return "To \(person) from \(anotherPerson)"
                          }
                          print(sayHello(to: "Bill", from: "Ted"))`;
      output = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'sayHello' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'to' },
        { type: 'IDENTIFIER', value: 'person' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'from' },
        { type: 'IDENTIFIER', value: 'anotherPerson' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'STRING', value: 'To ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'person' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: ' from ' },
        { type: 'STRING_INTERPOLATION_START', value: '\\(' },
        { type: 'IDENTIFIER', value: 'anotherPerson' },
        { type: 'STRING_INTERPOLATION_END', value: ')' },
        { type: 'STRING', value: '' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'sayHello' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'to' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'Bill' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'IDENTIFIER', value: 'from' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'STRING', value: 'Ted' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that return a dictionary type', function () {
      input = String.raw`func dictionary() -> [String: Int] {
                              return ["one":1,"two":2,"three":3,"four":4,"five":5]
                          }`;
      output = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'dictionary' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'DICTIONARY_START', value: '[' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'DICTIONARY_END', value: ']' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'DICTIONARY_START', value: '[' },
        { type: 'STRING', value: 'one' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '1' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'two' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '2' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'three' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '3' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'four' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '4' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'five' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '5' },
        { type: 'DICTIONARY_END', value: ']' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that return an array type', function () {
      input = String.raw`func array() -> [Int] {
                              return [1,2,3,4,5]
                          }`;
      output = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'array' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'RETURN_ARROW', value: '->' },
        { type: 'ARRAY_START', value: '[' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'ARRAY_END', value: ']' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENT_KEYWORD', value: 'return' },
        { type: 'ARRAY_START', value: '[' },
        { type: 'NUMBER', value: '1' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '2' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '3' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '4' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'NUMBER', value: '5' },
        { type: 'ARRAY_END', value: ']' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: 'EOF' }
        ];
      expect(lexer(input)).to.deep.equal(output);
    });

    it('should handle functions that accept dictionaries as inputs', function () {
      input = String.raw`func abc(a: [String: Int]) {
                                print(a)
                            }

                            abc(["one":1,"two":2])`;
      output = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'abc' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'DICTIONARY_START', value: '[' },
        { type: 'TYPE_STRING', value: 'String' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'DICTIONARY_END', value: ']' },
        { type: 'PARAMS_END', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'abc' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'DICTIONARY_START', value: '[' },
        { type: 'STRING', value: 'one' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '1' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'STRING', value: 'two' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '2' },
        { type: 'DICTIONARY_END', value: ']' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: 'EOF' }
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

    xit('should handle functions that has an internal parameter that takes in a tuple and prints out the elements of that tuple ', function () {
      input = String.raw`func ab(a: (plusFive: Int, timesFive: Int)) {
                                print(a.plusFive)
                                print(a.timesFive)
                            }

                            ab((plusFive: 6, timesFive: 8))`;
      output = [
        { type: 'DECLARATION_KEYWORD', value: 'func' },
        { type: 'IDENTIFIER', value: 'ab' },
        { type: 'PARAMS_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TUPLE_START', value: '(' },
        { type: 'TUPLE_ELEMENT_NAME', value: 'plusFive' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'TUPLE_ELEMENT_NAME', value: 'timesFive' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'TYPE_NUMBER', value: 'Int' },
        { type: 'TUPLE_END', value: ')' },
        { type: 'PARAMS_START', value: ')' },
        { type: 'STATEMENTS_START', value: '{' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'DOT_SYNTAX', value: '.' },
        { type: 'IDENTIFIER', value: 'plusFive' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'NATIVE_METHOD', value: 'print' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'IDENTIFIER', value: 'a' },
        { type: 'DOT_SYNTAX', value: '.' },
        { type: 'IDENTIFIER', value: 'timesFive' },
        { type: 'INVOCATION_END', value: ')' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'STATEMENTS_END', value: '}' },
        { type: 'TERMINATOR', value: '\\n' },
        { type: 'TERMINATOR', value: '\\n' },

        { type: 'IDENTIFIER', value: 'ab' },
        { type: 'INVOCATION_START', value: '(' },
        { type: 'TUPLE_START', value: '(' },
        { type: 'TUPLE_ELEMENT_NAME', value: 'plusFive' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '6' },
        { type: 'PUNCTUATION', value: ',' },
        { type: 'TUPLE_ELEMENT_NAME', value: 'timesFive' },
        { type: 'PUNCTUATION', value: ':' },
        { type: 'NUMBER', value: '8' },
        { type: 'TUPLE_END', value: ')' },
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
});
