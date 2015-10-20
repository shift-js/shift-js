'use strict';

module.exports = {
    setIdentifier: setIdentifier,
    renameProperty: renameProperty,
    renameVariable: renameVariable,
    renameFunction: renameFunction,
    toProgram: toProgram
};

var traverse = require("./walk.js").traverse,
    getRoot = require("./walk.js").getRoot,
    parentize = require("./walk.js").parentize,
    idze = require("./walk.js").idze,
    clone = require("./walk.js").clone,
    getToken = require("./tokens.js").getToken,
    getTokens = require("./tokens.js").getTokens,
    pushTokens = require("./tokens.js").pushTokens,
    growTokens = require("./tokens.js").growTokens,
    isVarDeclared = require("./query.js").isVarDeclared,
    isFunctionDefined = require("./query.js").isFunctionDefined,
    getCode = require("./query.js").getCode,
    replaceCodeRange = require("./tokens.js").replaceCodeRange;
/**
 * rename `Identifier`
 *
 * @param {Object} node
 * @param {String} new_name
 */
function setIdentifier(node, new_name) {
    if (node.type !== "Identifier") {
        throw new Error("node must be an Identifier");
    }

    var root = getRoot(node),
        diff = (new_name.length - node.name.length),
        token = getToken(root, node.range[0], node.range[1]);

    if (!token) {
        console.log(node);
        console.log(root.tokens);
        throw new Error("token cannot be found");
    }

    token.value = new_name;
    token.range[1] += diff;

    replaceCodeRange(root, node.range, new_name);

    pushTokens(root, node.range[1], diff);
    growTokens(root, node.range[0], node.range[1], diff);

    node.name = new_name;
}

/**
 * `traverse` and apply given `replacements`
 *
 * @param {Object} node
 * @param {Object} replacements
 *
 * @example
 *   renameProperty(node, {"old_var": "new_var", "much_older": "shinnig_new"})
 */
function renameProperty(node, replacements) {
    if (node.$parent === undefined) {
        throw new Error("parentize is required");
    }

    if (node.$id === undefined) {
        throw new Error("idze is required");
    }


    traverse(node, function(node) {
        if (node.type == "Identifier" &&
            replacements[node.name] &&
            (
                "Property" === node.$parent.type ||
                (
                    "MemberExpression" === node.$parent.type &&
                    node.$parent.property === node
                )
            )
        ) {

            setIdentifier(node, replacements[node.name]);
        }
    });
}

/**
 * `traverse` and apply given `replacements`
 *
 * @param {Object} node
 * @param {Object} replacements
 *
 * @example
 *   renameVariable(node, {"old_var": "new_var", "much_older": "shinnig_new"})
 */
function renameVariable(node, replacements) {
    if (node.$parent === undefined) {
        throw new Error("parentize is required");
    }

    if (node.$id === undefined) {
        throw new Error("idze is required");
    }

    var root = getRoot(node);

    traverse(node, function(node) {
        //if (node.type == "Identifier")
            //console.log("*", node.type, node.$parent.type, node.$parent);

        if (node.type == "Identifier" &&
            replacements[node.name] &&
            (
                ["VariableDeclarator", "AssignmentExpression", "ReturnStatement"]
                    .indexOf(node.$parent.type) !== -1 ||
                (
                    "Property" === node.$parent.type &&
                    node.$parent.value.$id === node.$id &&
                    isVarDeclared(node, replacements[node.name])
                )
            )
        ) {
            setIdentifier(node, replacements[node.name]);
        }
    });
}

/**
 * traverse and apply given `replacements`
 *
 * @param {Object} node
 * @param {Object} replacements
 *
 * @example
 *   renameFunction(node, {"old_var": "new_var", "much_older": "shinnig_new"})
 */
function renameFunction(node, replacements) {
    if (node.$parent === undefined) {
        throw new Error("parentize is required");
    }

    if (node.$id === undefined) {
        throw new Error("idze is required");
    }


    traverse(node, function(node) {
        if (node.type == "Identifier" && replacements[node.name]) {
            if (
                ["FunctionDeclaration", "CallExpression"].indexOf(node.$parent.type) !== -1 ||
                (
                    "Property" === node.$parent.type &&
                    node.$parent.value.$id === node.$id &&
                    !isVarDeclared(node, replacements[node.name]) &&
                    (
                        isFunctionDefined(node, replacements[node.name]) ||
                        // could be below
                        isFunctionDefined(node, node.name)
                    )
                )
            ) {
                setIdentifier(node, replacements[node.name]);
            }
        }
    });
}

/**
 * Clone given node(s) and extract tokens & code from root to given you a Program-like attachable node
 *
 * @param {Object|Array} node
 * if array is provided will add all nodes to program.body
 */
function toProgram(node) {
    var root,
        program_range,
        tokens,
        program,
        i;

    if (Array.isArray(node)) {
        root = getRoot(node[0]);
        program_range = [Infinity, -Infinity];

        for(i = 0; i < node.length; ++i) {
            program_range[0] = Math.min(program_range[0], node[i].range[0]);
            program_range[1] = Math.max(program_range[1], node[i].range[1]);
        }

    } else {
        root = getRoot(node);
        program_range = node.range;

    }

    tokens = getTokens(root, program_range[0], program_range[1]);

    program = {
        type: "Program",
        body: null,
        range: [program_range[0], program_range[1]],
        tokens: tokens,
        comments: [],
        $code: null
    };

    if (Array.isArray(node)) {
        program.$code = getCode({$parent: root, range: program_range}); // fake
        program.body = node.slice().map(clone); // clone!
    } else {
        program.$code = getCode(node);
        program.body = [
            clone(node)
        ];
    }

    parentize(program);
    idze(program);

    pushTokens(program, 0, -program_range[0]);

    return program;
}