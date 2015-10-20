'use strict';

module.exports = {
    parse: parse,
    parseWrap: parseWrap,
    parseFile: parseFile,
    encode: encode
};

var walk = require('./walk.js'),
    idze = walk.idze,
    attachComments = walk.attachComments,
    parentize = walk.parentize,
    toProgram = require('./transformations.js').toProgram,
    __debug = false,
    esprima_parse = require('esprima').parse;

/**
* Parse given str
* @note location it's not supported, and won't sync with changes, range/rokens do.
*
* @param {String} str
* @param {Boolean} [debug] display $id, $parent and $code in console.log (enumerable=true)
* @return {Object}
*/
function parse(str, debug) {
    var tree = esprima_parse(str, {
        comment: true,
        range: true,
        //loc: true, // this make no sense right now, escodegen will have problems but not my problem :D
        tokens: true,
        raw: false,
        //attachComment: true this is shitty
    });

    // this fix first comments :)
    tree.range[0] = 0;
    // this fix last comments :)
    //tree.range[1] = tree.tokens[tree.tokens.length - 1].range[1];
    tree.range[1] = str.length;

    attachComments(tree, debug);
    parentize(tree, debug);
    idze(tree, debug);

    if (debug || __debug) {
        tree.$code = str;
    } else {
        Object.defineProperty(tree, "$code", {enumerable: false, value: str, writable: true});
    }

    return tree;
}

/**
* Wrap your code into a function and parse given str.
* Needed if you small snippet contains a `ReturnStatement`,
* @note location it's not supported, and won't sync with changes, range/rokens do.
*
* @param {String} str
* @param {Boolean} [debug] display $id, $parent and $code in console.log (enumerable=true)
* @return {Object}
*/
function parseWrap(str, debug) {
    str = ['(function() {', str, '});'].join("\n");
    var parsed = parse(str, debug);

    return toProgram(parsed.body[0].expression.body.body);
}

/**
* Parse given file
*
* @note: NodeJS only
*
* @param {String} file Path
* @param {Boolean} [debug] display $id, $parent and $code in console.log (enumerable=true)
* @return {Object}
*/
function parseFile(file, debug) {
    return parse(require("fs").readFileSync(file, {encoding: "UTF-8"}), debug);
}

/**
* Return tree.$code, just for API completeness.
*
* @param {Object} tree
* @return {String}
*/
function encode(tree) {
    return tree.$code;
}