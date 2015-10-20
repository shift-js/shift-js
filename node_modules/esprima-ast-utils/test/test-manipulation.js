var tap = require("tap"),
    test = tap.test,
    utils = require("../index.js"),
    object = require("object-enhancements");

test("renameVariable", function(t) {
    var tree = utils.parseFile(__dirname + "/fixture-manipulation-01.js");

    var tokens = object.clone(tree.tokens);

    utils.renameVariable(tree, {"A": "B"});

    var i,
        offset = 0;

    t.equal(tree.tokens.length, tokens.length, "same token amount");

    for (i = 0; i < tree.tokens.length; ++i) {
        t.deepEquals(tree.tokens[i].range, tokens[i].range, "range is ok");
    }

    utils.renameVariable(tree, {"B": "BBB"});

    t.equal(tree.tokens.length, tokens.length, "same token amount");

    for (i = 0; i < tree.tokens.length; ++i) {
        if (tokens[i].value === "A") {
            t.deepEquals(tree.tokens[i].range[0], tokens[i].range[0] + offset, "range is ok");
            offset += 2;
            t.deepEquals(tree.tokens[i].range[1], tokens[i].range[1] + offset, "range is ok");

        } else {
            t.deepEquals(tree.tokens[i].range[0], tokens[i].range[0] + offset, "range is ok");
            t.deepEquals(tree.tokens[i].range[1], tokens[i].range[1] + offset, "range is ok");
        }
    }

    t.equal(tree.$code.indexOf("A"), -1, "there is A in the final code");

    //console.log(require("util").inspect(tree, {depth: null, colors: true}));
    console.log(tree.$code);

    t.end();
});

test("renameProperty", function(t) {
    var tree = utils.parseFile(__dirname + "/fixture-manipulation-02.js");

    var tokens = object.clone(tree.tokens);

    utils.renameProperty(tree, {"A": "B"});

    var i,
        offset = 0;

    t.equal(tree.tokens.length, tokens.length, "same token amount");

    for (i = 0; i < tree.tokens.length; ++i) {
        t.deepEquals(tree.tokens[i].range, tokens[i].range, "range is ok");
    }

    utils.renameProperty(tree, {"B": "BBB"});

    t.equal(tree.tokens.length, tokens.length, "same token amount");

    for (i = 0; i < tree.tokens.length; ++i) {
        if (tokens[i].value === "A") {
            t.deepEquals(tree.tokens[i].range[0], tokens[i].range[0] + offset, "range is ok");
            offset += 2;
            t.deepEquals(tree.tokens[i].range[1], tokens[i].range[1] + offset, "range is ok");

        } else {
            t.deepEquals(tree.tokens[i].range[0], tokens[i].range[0] + offset, "range is ok");
            t.deepEquals(tree.tokens[i].range[1], tokens[i].range[1] + offset, "range is ok");
        }
    }

    t.equal(tree.$code.indexOf("A"), -1, "there is A in the final code");

    //console.log(require("util").inspect(tree, {depth: null, colors: true}));
    console.log(tree.$code);

    t.end();
});


test("renameFunction", function(t) {
    var tree = utils.parseFile(__dirname + "/fixture-manipulation-03.js");

    var tokens = object.clone(tree.tokens);

    utils.renameFunction(tree, {"A": "B"});

    var i,
        offset = 0,
        odd = 0;

    t.equal(tree.tokens.length, tokens.length, "same token amount");

    for (i = 0; i < tree.tokens.length; ++i) {
        t.deepEquals(tree.tokens[i].range, tokens[i].range, "range is ok");
    }

    utils.renameFunction(tree, {"B": "BBB"});

    t.equal(tree.tokens.length, tokens.length, "same token amount");

    for (i = 0; i < tree.tokens.length; ++i) {
        if (tokens[i].value === "A") {

            t.deepEquals(tree.tokens[i].range[0], tokens[i].range[0] + offset, "range is ok");
            if ((odd % 2) == 0) {
                offset += 2;
            }
            ++odd;

            t.deepEquals(tree.tokens[i].range[1], tokens[i].range[1] + offset, "range is ok");

        } else {
            t.deepEquals(tree.tokens[i].range[0], tokens[i].range[0] + offset, "range is ok");
            t.deepEquals(tree.tokens[i].range[1], tokens[i].range[1] + offset, "range is ok");
        }
    }

    t.equal(tree.$code.match(/A/g).length, 2, "there are two A in the final code");

    t.equal(utils.isFunctionDeclared(tree, "A"), false, "Function A is not defined");
    t.equal(utils.isFunctionDeclared(tree, "BBB"), true, "Function BBB is defined");

    console.log(tree.$code);

    t.end();
});

test("wrap", function(t) {
    var tree = utils.parseFile(__dirname + "/fixture-manipulation-04.js");

    var node = tree.body[0];
    var text = utils.detach(node);

    utils.attach(tree, "body", -1, "(function test() {'use strict';}())");

    var block = utils.getFunctionBlock(tree, "test");
    utils.attach(block, "body", -1, text);

    t.equal(tree.$code, '(function test() {\'use strict\';var WRAP_ME;}())', "valid code");

    t.end();
});


test("replaceComment", function(t) {
    var tree = utils.parseFile(__dirname + "/fixture-manipulation-05.js");

    //utils.debug_tree(tree);

    //console.log(require("util").inspect(tree, {depth: null, colors: true}));
    var text = utils.replaceComment(tree, "this is a comment", "var XXX;");


    //console.log(require("util").inspect(tree, {depth: null, colors: true}));
    //console.log(require("util").inspect(tree.$code, {depth: null, colors: true}));

    t.equal(tree.$code, '\'use strict\';\n\n(function test() {var XXX;\n    \n}())\n', "valid code");

    t.end();
});



