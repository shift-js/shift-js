'use strict';

module.exports = {
    getFunction: getFunction,
    getFunctionBlock: getFunctionBlock,
    isFunctionDeclared: isFunctionDeclared,
    isComment: isComment,
    hasVarDeclaration: hasVarDeclaration,
    isVarDeclared: isVarDeclared,
    contains: contains,
    hasBody: hasBody,
    getComment: getComment,
    getCode: getCode,
    getArgumentList: getArgumentList
};

var filter = require("./walk.js").filter,
    traverse = require("./walk.js").traverse,
    getRoot = require("./walk.js").getRoot,
    is_function = function (node) {
        return node.type === "FunctionDeclaration" || node.type === "FunctionExpression";
    };

/**
 * `filter` the AST and return the function with given name, null otherwise.
 *
 * @param {Object} node
 * @param {String} fn_name
 * @return {Object|null}
 */
function getFunction(node, fn_name) {
    // search nearest function
    var fn = filter(node, function(node) {
        return is_function(node) && node.id && node.id.name == fn_name;
    });

    if (fn && fn.length) {
        return fn[0];
    }

    return null;
}
/**
 * `filter` the AST and return the function > block with given name, null otherwise.
 *
 * @param {Object} node
 * @param {String} fn_name
 * @return {Object|null}
 */
function getFunctionBlock(node, fn_name) {
    var ret = null;

    traverse(node, function(node) {
        if (
            node.type === "BlockStatement" &&
            node.$parent.type === "FunctionExpression" &&
            node.$parent.id && node.$parent.id.name === fn_name
        ) {
            ret = node;
            return false;
        }
    });

    return ret;
}
/**
 * shortcut
 *
 * @param {Object} node
 * @param {String} fn_name
 * @return {Boolean}
 */
function isFunctionDeclared(node, fn_name) {
    return getFunction(node, fn_name) !== null;
}
/**
 * shortcut
 *
 * @param {Object} node
 * @param {String} var_name
 * @return {Boolean}
 */
function hasVarDeclaration(node, var_name) {
    var found = false;
    traverse(node, function(n) {
        if (n.$parent.type === "VariableDeclarator" &&
            n.type === "Identifier" &&
            n.name === var_name
        ) {
            found = true;
        }
    });

    return found;
}
/**
 * reverse from node to root and look for a Variable declaration
 * @note It's not perfect because `VariableDeclaration` it's not hoisted
 *
 * @param {Object} node
 * @param {String} var_name
 * @return {Boolean}
 */
function isVarDeclared(node, var_name) {
    var found = false;

    getParent(node, function(n) {
        var i,
            j;

        //console.log(n.type, n.body && n.body.length);

        if (n.body && n.body.length) {
            for (i = 0; i < n.body.length; ++i) {
                if (n.body[i].type === "VariableDeclaration") {
                    if (hasVarDeclaration(n.body[i], var_name)) {
                        found = true;
                    }

                }
            }
        }
    });

    //console.log("isVarDeclared", var_name, found);

    return found;
}
/**
 * `node` constains `subnode`
 *
 * @param {Object} node
 * @param {Object} subnode
 * @return {Boolean}
 */
function contains(node, subnode) {
    return node.range[0] <= subnode.range[0] && node.range[1] >= subnode.range[1];
}
/**
 * Has a body property, use to freely attach/detach
 *
 * @param {Object} node
 * @return {Boolean}
 */
function hasBody(node) {
    return [
        "Program",
        "BlockStatement",
    ].indexOf(node.type) !== -1;
}
/**
 * shortcut: Is a comment (Line or Block) and has text
 *
 * @param {Object} node
 * @return {Boolean}
 */
function isComment(node) {
    return (
        (node.type === "Line" && node.value && node.value.length) ||
        (node.type === "Block" && node.value.length)
    ) > 0;
}
/**
 * shortcut: search for a comment (trim it's content for maximum compatibility)
 *
 * @param {Object} node
 * @param {String} comment
 * @return {Object}
 */
function getComment(node, comment) {
    var output = null;
    traverse(node, function(n, parent, property, index, depth) {
        if(isComment(n) && n.value.trim() === comment) {
            output = n;
            return false;
        }
    });

    return output;
}
/**
 * shortcut: Return node code
 *
 * @param {Object} node
 * @return {String}
 */
function getCode(node) {
    var root = getRoot(node);

    return root.$code.substring(node.range[0], node.range[1]);
}
/**
 * Return `FunctionDeclaration` arguments name as a list
 *
 * @param {Object} node
 * @return {Array}
 */
function getArgumentList(node) {
    var args = [],
        arg,
        i,
        max;

    if (node.type === "FunctionDeclaration" && node.id && node.id.name) {
        if (node.id.name[0] === "_") {
            //internal skip!
            return;
        }

        // define a new function!


        for (i = 0, max = node.params.length; i < max; ++i) {
            args.push(node.params[i].name);
        }
    }

    return args;
}