var tap = require("tap"),
    test = tap.test,
    utils = require("../index.js");


test("utils.remove 1", function(t) {
    console.log("***************************************");

    var tree = utils.parseFile(__dirname + "/fixture-remove.js");

    utils.detach(tree.body[0]);
    //console.log(require("util").inspect(tree, {depth: null, colors: true}));


    t.equal(tree.$code, '\n\nvar b;\nvar c;');
    t.equal(tree.tokens.length, 6);

    t.end();
});

test("utils.remove 2", function(t) {
    console.log("***************************************");

    var tree = utils.parseFile(__dirname + "/fixture-remove.js");

    utils.detach(tree.body[1]);
    //console.log(require("util").inspect(tree, {depth: null, colors: true}));


    t.equal(tree.$code, 'var a;\n\n\nvar c;');
    t.equal(tree.tokens.length, 6);

    t.end();
});

test("utils.remove 3", function(t) {
    console.log("***************************************");

    var tree = utils.parseFile(__dirname + "/fixture-remove.js");

    utils.detach(tree.body[2]);

    t.equal(tree.$code, 'var a;\n\nvar b;\n');
    t.equal(tree.tokens.length, 6);

    t.end();
});