var tap = require("tap"),
    test = tap.test,
    utils = require("../index.js"),
    object = require("object-enhancements");

test("replaceComment", function(t) {
    var tree = utils.parseFile(__dirname + "/fixture-comments-01.js");

    //console.log(require("util").inspect(tree, {depth: null, colors: true}));
    //t.equal(tree.$code, '(function test() {\'use strict\';var WRAP_ME;}())', "valid code");

    t.deepEqual(tree.body, [ { range: [ 0, 66 ],
       type: 'FunctionDeclaration',
       id:
        { range: [ 9, 14 ],
          type: 'Identifier',
          name: 'name2' },
       params: [],
       defaults: [],
       body:
        { range: [ 17, 66 ],
          type: 'BlockStatement',
          body:
           [ { type: 'Line',
               value: '0',
               range: [ 23, 26 ] },
             { range: [ 27, 33 ],
               type: 'VariableDeclaration',
               declarations:
                [ { range: [ 31, 32 ],
                    type: 'VariableDeclarator',
                    id:
                     { range: [ 31, 32 ],
                       type: 'Identifier',
                       name: 'a' },
                    init: null } ],
               kind: 'var' },
             { type: 'Line',
               value: '2',
               range: [ 38, 41 ] },
             { range: [ 42, 48 ],
               type: 'VariableDeclaration',
               declarations:
                [ { range: [ 46, 47 ],
                    type: 'VariableDeclarator',
                    id:
                     { range: [ 46, 47 ],
                       type: 'Identifier',
                       name: 'b' },
                    init: null } ],
               kind: 'var' },
             { type: 'Line',
               value: '4',
               range: [ 53, 56 ] },
             { type: 'Line',
               value: '5',
               range: [ 61, 64 ] } ] },
       rest: null,
       generator: false,
       expression: false },
     { range: [ 68, 98 ],
       type: 'FunctionDeclaration',
       id:
        { range: [ 77, 81 ],
          type: 'Identifier',
          name: 'name' },
       params: [],
       defaults: [],
       body:
        { range: [ 84, 98 ],
          type: 'BlockStatement',
          body:
           [ { type: 'Line',
               value: 'name',
               range: [ 90, 96 ] } ] },
       rest: null,
       generator: false,
       expression: false },
     { range: [ 100, 202 ],
       type: 'FunctionDeclaration',
       id:
        { range: [ 109, 114 ],
          type: 'Identifier',
          name: 'name3' },
       params: [],
       defaults: [],
       body:
        { range: [ 148, 202 ],
          type: 'BlockStatement',
          body:
           [ { range: [ 154, 200 ],
               type: 'ReturnStatement',
               argument:
                { range: [ 161, 199 ],
                  type: 'BinaryExpression',
                  operator: '*',
                  left:
                   { range: [ 161, 162 ],
                     type: 'Identifier',
                     name: 'a' },
                  right:
                   { range: [ 198, 199 ],
                     type: 'Identifier',
                     name: 'b' } } } ] },
       rest: null,
       generator: false,
       expression: false } ])

    t.end();
});



