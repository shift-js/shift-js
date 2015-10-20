var traverse = require("./walk.js").traverse,
    getCode = require("./query.js").getCode,
    archy = require("archy");

/**
 * Show your tree in various ways to easy debug
 * Big trees will be always a pain, so keep it small if possible
 *
 * @param {Object} tree Any node, if root tokens & source will be displayed
 * @param {Number} [max_width]  max tokens per line
 * @param {Boolean} [display_code_in_tree] when display the tree attach the code on the right
 */
function debug_tree(tree, max_width, display_code_in_tree) {
    max_width = max_width || 50;
    display_code_in_tree = display_code_in_tree || false;

    var i,
        ci = -1,
        idxs = [],
        chars = [];

    if (tree.$code && tree.tokens) {
        for (i = 0; i < tree.$code.length; ++i) {
            if (i % max_width === 0) {
                ++ci;
                idxs[ci] = [];
                chars[ci] = [];
            }

            idxs[ci].push(i + 1);
            if (tree.$code[i] === "\n") {
                chars[ci].push('\\n');
            } else {
                chars[ci].push(tree.$code[i]);
            }
        }


        var Table = require('cli-table');
        var table = new Table({style: { 'padding-left': 0, 'padding-right': 0 }});

        for (i = 0; i < idxs.length; ++i) {
            table.push(idxs[i]);
            table.push(chars[i]);
        }

        console.log("** CODE (char) **");
        console.log(table.toString());

        ci = 0;
        var ranges = [[]],
            tokens = [[]];
        for (i = 0; i < tree.tokens.length; ++i) {
            if (tree.tokens[i].range[1] > (ci + 1) * max_width) {
                ++ci;
                ranges[ci] = [];
                tokens[ci] = [];
            }

            ranges[ci].push(tree.tokens[i].range.join(","));
            tokens[ci].push(tree.tokens[i].value);
        }

        table = new Table({style: { 'padding-left': 0, 'padding-right': 0 }});

        for (i = 0; i < ranges.length; ++i) {
            table.push(ranges[i]);
            table.push(tokens[i]);
        }

        console.log("** TOKENS **");
        console.log(table.toString());

        table = new Table({style: { 'padding-left': 0, 'padding-right': 0 }});

        tree.$code.split("\n").forEach(function(val, k) {
            table.push([k, val]);
        });

        console.log("** CODE (line) **");
        console.log(table.toString());
    }


    var mtree = {
            label: tree.type,
            nodes: []
        },
        cnodes = mtree.nodes,
        ptree = mtree,

        lindex = null,
        ldepth = 1;

    traverse(tree, function(node, parent, property, index, depth) {
        if (node.type == "Program") return;

        if (tree.type !== "Program") {
            depth = depth + 1;
        }

        if (ldepth < depth) {
            cnodes[cnodes.length - 1].nodes = [];
            cnodes[cnodes.length - 1].parent = ptree;

            ptree = cnodes[cnodes.length - 1];
            cnodes = cnodes[cnodes.length - 1].nodes;

        } else if (ldepth > depth) {
            while (ldepth != depth) {
                ptree = ptree.parent;
                cnodes = ptree.nodes;

                --ldepth;
            }
        }

        ldepth = depth;

        cnodes.push({
            label: node.type + " [" + node.range.join(":")  + "]" +
            (display_code_in_tree ? " - " + getCode(node).replace(/\n/g, "\\n"): ""),
            parent: ptree
        });
    });

    console.log("** TREE **");
    console.log(archy(mtree));
    console.log("---------------------------");

}

module.exports = {
    debug_tree: debug_tree
};