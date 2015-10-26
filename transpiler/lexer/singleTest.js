var lexer = require("./lexer");
var deepEqual = require("./helperFunctions").deepEqual;
var diff = require("./helperFunctions").diff;


var swiftCode = String.raw`

                    

                    var gameInProgress = false;

                    var score = 0

                    var typeOfScore = "";
                                             var PAT = "";


                    while gameInProgress {
                        if               (typeOfScore != "")
                        {
                        if typeOfScore == "TD" {
                                score += 6
                            } else if typeOfScore == "PAT" {
                                if PAT == "TD" {
                                    
                                    score += 2;
                                } else {
                                    score += 1;
                                    
                            
                                                                       }
                            } else if (typeOfScore == "FG") {
                                score += 3
                            }
                        
                        else {
                            
                                score += 2
                    }
                            typeOfScore = ""
                        }
                     }

                    `;
     
var swiftCodeAnswers = [
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'DECLARATION_KEYWORD',            value: 'var' },
    { type: 'IDENTIFIER',                     value: 'gameInProgress' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'BOOLEAN',                        value: 'false' },
    { type: 'PUNCTUATION',                    value: ';' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'DECLARATION_KEYWORD',            value: 'var' },
    { type: 'IDENTIFIER',                     value: 'score' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'NUMBER',                         value: '0' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'DECLARATION_KEYWORD',            value: 'var' },
    { type: 'IDENTIFIER',                     value: 'typeOfScore' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'STRING',                         value: '' },
    { type: 'PUNCTUATION',                    value: ';' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'DECLARATION_KEYWORD',            value: 'var' },
    { type: 'IDENTIFIER',                     value: 'PAT' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'STRING',                         value: '' },
    { type: 'PUNCTUATION',                    value: ';' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'STATEMENT_KEYWORD',              value: 'while' },
    { type: 'IDENTIFIER',                     value: 'gameInProgress' },
    { type: 'PUNCTUATION',                    value: '{' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'STATEMENT_KEYWORD',              value: 'if' },
    { type: 'PUNCTUATION',                    value: '(' },
    { type: 'IDENTIFIER',                     value: 'typeOfScore' },
    { type: 'OPERATOR',                       value: '!' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'STRING',                         value: '' },
    { type: 'PUNCTUATION',                    value: ')' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'PUNCTUATION',                    value: '{' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'STATEMENT_KEYWORD',              value: 'if' },
    { type: 'IDENTIFIER',                     value: 'typeOfScore' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'STRING',                         value: 'TD' },
    { type: 'PUNCTUATION',                    value: '{' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'IDENTIFIER',                     value: 'score' },
    { type: 'OPERATOR',                       value: '+' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'NUMBER',                         value: '6' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'PUNCTUATION',                    value: '}' },
    { type: 'STATEMENT_KEYWORD',              value: 'else' },
    { type: 'STATEMENT_KEYWORD',              value: 'if' },
    { type: 'IDENTIFIER',                     value: 'typeOfScore' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'STRING',                         value: 'PAT' },
    { type: 'PUNCTUATION',                    value: '{' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'STATEMENT_KEYWORD',              value: 'if' },
    { type: 'IDENTIFIER',                     value: 'PAT' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'STRING',                         value: 'TD' },
    { type: 'PUNCTUATION',                    value: '{' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'IDENTIFIER',                     value: 'score' },
    { type: 'OPERATOR',                       value: '+' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'NUMBER',                         value: '2' },
    { type: 'PUNCTUATION',                    value: ';' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'PUNCTUATION',                    value: '}' },
    { type: 'STATEMENT_KEYWORD',              value: 'else' },
    { type: 'PUNCTUATION',                    value: '{' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'IDENTIFIER',                     value: 'score' },
    { type: 'OPERATOR',                       value: '+' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'NUMBER',                         value: '1' },
    { type: 'PUNCTUATION',                    value: ';' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'PUNCTUATION',                    value: '}' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'PUNCTUATION',                    value: '}' },
    { type: 'STATEMENT_KEYWORD',              value: 'else' },
    { type: 'STATEMENT_KEYWORD',              value: 'if' },
    { type: 'PUNCTUATION',                    value: '(' },
    { type: 'IDENTIFIER',                     value: 'typeOfScore' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'STRING',                         value: 'FG' },
    { type: 'PUNCTUATION',                    value: ')' },
    { type: 'PUNCTUATION',                    value: '{' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'IDENTIFIER',                     value: 'score' },
    { type: 'OPERATOR',                       value: '+' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'NUMBER',                         value: '3' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'PUNCTUATION',                    value: '}' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'STATEMENT_KEYWORD',              value: 'else' },
    { type: 'PUNCTUATION',                    value: '{' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'IDENTIFIER',                     value: 'score' },
    { type: 'OPERATOR',                       value: '+' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'NUMBER',                         value: '2' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'PUNCTUATION',                    value: '}' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'IDENTIFIER',                     value: 'typeOfScore' },
    { type: 'OPERATOR',                       value: '=' },
    { type: 'STRING',                         value: '' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'PUNCTUATION',                    value: '}' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'PUNCTUATION',                    value: '}' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: '\\n' },
    { type: 'TERMINATOR',                     value: 'EOF' } 
  ];

console.log(lexer(swiftCode));
console.log(diff(lexer(swiftCode),swiftCodeAnswers));
console.log(deepEqual(lexer(swiftCode),swiftCodeAnswers));

