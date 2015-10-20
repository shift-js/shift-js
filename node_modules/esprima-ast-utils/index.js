'use strict';

// removeBetweenComments
// insertBetweenComments

module.exports = {};

[
require("./lib/walk.js"),
require("./lib/tokens.js"),
require("./lib/io.js"),
require("./lib/query.js"),
require("./lib/manipulations.js"),
require("./lib/transformations.js"),
require("./lib/debug.js")
].forEach(function(sub_module) {
    Object.keys(sub_module).forEach(function(k) {
        module.exports[k] = sub_module[k];
    });
});


/*

function insertBefore(node, property, index, new_node) {
    if (index === null) {
        throw new Error("is this legal ?");
    } else {
        node[property].splice(index, 0, new_node);
    }
}

function insertAfter(node, property, index, new_node) {
    if (index === null) {
        throw new Error("is this legal ?");
    } else {
        if (node[property].length > index) {
            node[property].splice(index + 1, 0, new_node);
        } else {
            node[property].push(new_node);
        }
    }
}
*/