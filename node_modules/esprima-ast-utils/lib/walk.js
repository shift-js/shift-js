'use strict';

//nice hack :!
module.exports = {
    traverse: traverse,
    parentize: parentize,
    idze: idze,
    attachComments: attachComments,
    filter: filter,
    getParent: getParent,
    getRoot: getRoot,
    clone: clone
};

var __debug = false,
    contains = require("./query.js").contains,
    hasBody = require("./query.js").hasBody;

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
};
var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn);
    for (var i = 0; i < xs.length; i++) {
        fn.call(xs, xs[i], i, xs);
    }
};


/**
 * traverse AST
 *
 * @param {Object} node
 * @param {Function} callback
 *   function(node, parent, property, index, depth)
 *   You can return `false` to stop traverse
 * @param {Number} [depth] (0) current depth
 * @param {Boolean} [recursive] (true) recursively traverse
 */
function traverse(node, callback, depth, recursive) {
    if ("object" !== typeof node) {
        throw new Error("node must be provided");
    }

    if ("function" !== typeof callback) {
        throw new Error("callback must be provided");
    }

    if (depth === undefined) {
        if (!node) {
            throw new Error("WTF!?");
        }
        callback(node, null, null, null, 0);
    }

    depth = depth || 0;

    forEach(objectKeys(node), function (key) {
        // do not follow internal vars
        // or extra keys
        if (key[0] === '$' || key === "loc" || key === "comments" || key === "tokens" || key === "range") return;

        var child = node[key];
        if (Array.isArray(child)) {
            forEach(child, function (c, idx) {
                if (c && typeof c.type === 'string') {
                    callback(c, node, key, idx, depth + 1);
                    recursive !== false && traverse(c, callback, depth + 1, recursive);
                }
            });
        }
        else if (child && typeof child.type === 'string') {
            callback(child, node, key, null, depth + 1);
            recursive !== false && traverse(child, callback, depth + 1, recursive);
        }
    });
}

function __set_node(node, value, property, debug) {
    if (debug) {
        node[property] = parent;
    } else {
        Object.defineProperty(node, property, {enumerable: false, value: value, writable: true});
    }
}

/**
 * `traverse` AST and set $parent node
 *
 * @param {Object} root
 * @param {Boolean} [debug] display $parent in console.log (enumerable=true)
 */
function parentize(root, debug) {
    debug = debug || __debug;

    traverse(root, function(node, parent) {
        __set_node(node, parent, "$parent", debug);
    });
}

var node_ids = 0;
/**
 * `traverse` AST and set an unique `$id` to every node
 *
 * @param {Object} node
 * @param {Boolean} [debug] display $id in console.log (enumerable=true)
 */
function idze(node, debug) {
    debug = debug || __debug;

    traverse(node, function(node, parent) {
        if (node.$id === undefined) { // do not overwrite!
            __set_node(node, ++node_ids, "$id", debug);
        }
    });
}

function __containmentFactor(anode, bnode) {
    return (bnode.range[0] - anode.range[0]) + (anode.range[1] - bnode.range[1]);
}

/**
 * Traverse the AST and add comments as nodes, so you can query them.
 * Loop thought comments and find a proper place to inject (BlockStament or alike)
 * * attach the comment to the before nearest children
 * * if a children contains the comment it's considered invalid
 * * push otherwise
 * @param {Object} root
 */
function attachComments(root) {
    var comments = root.comments,
        c,
        i,
        j,
        jmax,
        max = comments.length,
        blocks = filter(root, hasBody),
        nearest_container,
        min_f,
        f,
        container_target_idx;

    if (!blocks) {
        return ;
    }

    for (i = 0; i< max; ++i) {
        // find nearest blockstatement
        min_f = Infinity;
        c = comments[i];
        nearest_container = null;

        jmax = blocks.length;
        for (j = 0; j < jmax; ++j) {
            if (contains(blocks[j], c)) {
                f = __containmentFactor(blocks[j], c);
                if (f < min_f) {
                    min_f = f;
                    nearest_container = blocks[j];
                }
            }
        }

        //console.log("*******************************************");
        //console.log("valid", c);
        //console.log(require("util").inspect(nearest_container, {depth: null, colors: true}));

        if (nearest_container) {
            // search the first son that exceed comment.range[1]
            jmax = nearest_container.body.length;
            container_target_idx = -1; // push
            min_f = Infinity;

            for (j = 0; j < jmax; ++j) {
                // left side
                if (c.range[1] < nearest_container.body[j].range[0]) {
                    // min
                    f = nearest_container.body[j].range[0] - c.range[1];

                    //console.log("left to", j, f);

                    if (f < min_f) {
                        min_f = f;
                        container_target_idx = j;
                    }
                }
                // if comment is contained by a children, means invalid comment
                if (contains(nearest_container.body[j], c)) {
                    container_target_idx = null;
                    break;
                }
            }

            //console.log("container_target_idx", container_target_idx);

            if (container_target_idx !== null) {
                if (container_target_idx === -1) {
                    nearest_container.body.push(c);
                } else {
                    nearest_container.body.splice(container_target_idx, 0, c);
                }
            } else {
                console.info("(info) 1.- Found a comment that cannot be attached", c);
            }
        } else {
            console.info("(info) 2.- Found a comment that cannot be attached", c);
        }

        //console.log("*******************************************");
    }
//process.exit();
    //console.log(require("util").inspect(root.body, {depth: null, colors: true}));

}

/**
 * `traverse` and `filter` given AST based on given `callback`
 *
 * @param {Object} node
 * @param {Function} callback
 * @param {Function} [traverse_fn]
 * @return {Array} Every match of the `callback`
*/
function filter(node, callback, traverse_fn) {
    var out = [];

    traverse_fn = traverse_fn || traverse;

    traverse_fn(node, function(node, parent) {
        if (callback(node)) {
            out.push(node);
        }
    });

    return out.length ? out : null;
}

/**
 * Get parent node based on given callback, stops on `true`
 *
 * @param {Object} node
 * @param {Function} callback
 * @return {Object|null}
 */
function getParent(node, callback) {
    var n = node,
        depth = 0;
    while(n.$parent) {
        n = n.$parent;
        if (callback(n, ++depth)) {
            return n;
        }
    }

    return null;
}

/**
 * get the root of the AST
 *
 * @param {Object} node
 * @return {Object}
 */
function getRoot(node) {
    var n = node;

    while(n.$parent) {
        n = n.$parent;
    }

    return n;
}

/**
 * Recursive clone a node. Do no include "$" properties like $parent or $id
 * If you want those, call `parentize` - `idze` after cloning
 *
 * @param {Object} node
 * @return {Object}
 */
function clone(node) {
    if (Array.isArray(node)) {
        return node.map(clone);
    }
    if ("object" !== typeof node) {
        return node;
    }
    if (node === null) {
        return null;
    }

    var copy = {};


    forEach(objectKeys(node), function(name) {
        // ignore auto generated
        if (name[0] === "$") return;

        var value = node[name],
            cvalue;

        //recursion!
        if (Array.isArray(value)) {
            cvalue = value.map(clone);
        } else if ("object" === typeof value) {
            cvalue = clone(value);
        }

        // Note that undefined fields will be visited too, according to
        // the rules associated with node.type, and default field values
        // will be substituted if appropriate.
        copy[name] = cvalue || value;
    });

    // enumerable?
    copy.$cloned = true;

    return copy;
}