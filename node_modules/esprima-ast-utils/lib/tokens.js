'use strict';

module.exports = {
    getToken: getToken,
    getTokens: getTokens,
    pushTokens: pushTokens,
    growTokens: growTokens,
    tokenAt: tokenAt,
    addTokens: addTokens,
    replaceCodeRange: replaceCodeRange,
    removeTokens: removeTokens
};

var traverse = require("./walk.js").traverse;

/**
 * Get token based on given range
 *
 * @param {Object} root
 * @param {Number} start
 * @param {Number} end
 * @return {Object|null}
 */
function getToken(root, start, end) {
    var i,
        token_list = root.tokens,
        max = token_list.length;

    for (i = 0; i < max; ++i) {
        if (token_list[i].range[0] === start && token_list[i].range[1] === end) {
            return token_list[i];
        }
    }

    return null;
}

/**
 * Get tokens in range
 *
 * @param {Object} root
 * @param {Number} start
 * @param {Number} end
 * @return {Array|null}
 */
function getTokens(root, start, end) {
    var i,
        token_list = root.tokens,
        max = token_list.length,
        list = [];

    for (i = 0; i < max; ++i) {
        if (token_list[i].range[0] >= start && token_list[i].range[1] <= end) {
            list.push(token_list[i]);
        }
    }

    return list;
}

/**
 * Push tokens range from start
 * @note Also update Node ranges
 *
 * @param {Object} root
 * @param {Number} start
 * @param {Number} amount
 */
function pushTokens(root, start, amount) {
    var i,
        token_list = root.tokens,
        max = token_list.length;

    for (i = 0; i < max; ++i) {
        if (start <= token_list[i].range[0]) {
            token_list[i].range[0] += amount;
            token_list[i].range[1] += amount;
        }
    }

    traverse(root, function(n) {
        if (n.range && start <= n.range[0]) {
            n.range[0] += amount;
            n.range[1] += amount;
        }
    });
}

/**
 * Grow tokens in given range
 * @note Also update Node ranges
 *
 * @param {Object} root
 * @param {Number} start
 * @param {Number} end
 * @param {Number} amount
 */
function growTokens(root, start, end, amount) {
    var i,
        token_list = root.tokens,
        max = token_list.length;

    for (i = 0; i < max; ++i) {
        if (start >= token_list[i].range[0] && end <= token_list[i].range[0]) {
            token_list[i].range[1] += amount;
        }
    }

    traverse(root, function(n) {
        if (n.range && start >= n.range[0] && max <= n.range[1]) {
            n.range[1] += amount;
        }
    });
}

/**
 * Get the first token
 *
 * @param {Array} token_list
 * @param {Number} start
 * @return {Object}
 */
function tokenAt(token_list, start) {
    // add new tokens
    var i = 0,
        max = token_list.length;

    while (i < max && token_list[i].range[0] < start) {
        ++i;
    }

    return i === max ? -1 : i;
}

/**
 * Add `src` tokens to `dst` since `start` (so keep the order)
 * @note Remember to push `src` tokens before `addTokens` otherwise won't be synced
 *
 * @param {Array} dst
 * @param {Array} src
 * @param {Number} start
 */
function addTokens(dst, src, start) {
    var i,
        max = src.length;

    for (i = 0; i < max; ++i) {
        dst.splice(start + i, 0, src[i]);
    }
}

/**
 * Replace code range with given text.
 *
 * @param {Object} root
 * @param {Array} range
 * @param {String} new_text
 */
function replaceCodeRange(root, range, new_text) {
    root.$code = [
        root.$code.substring(0, range[0]),
        new_text,
        root.$code.substring(range[1])
    ].join("");
}

/**
 * Remove tokens in range and update ranges
 *
 * @param {Object} root
 * @param {Number} min
 * @param {Number} max
 */
function removeTokens(root, min, max) {
    //console.log(require("util").inspect(root.tokens, {depth: null, colors: true}));

    var diff = (max - min);
    root.tokens = root.tokens.filter(function(n) {
        return n.range[1] < min || n.range[0] > max;
    }).map(function(n) {
        if (n.range[0] > max) { // right
            n.range[0] -= diff;
            n.range[1] -= diff;
        }

        return n;
    });

    traverse(root, function(n) {
        if (n.range[0] > max) { // right
            n.range[0] -= diff;
            n.range[1] -= diff;
        } else if (n.range[0] < min && n.range[1] > max) { // inside
            n.range[1] -= diff;
        }
    });

    //console.log(require("util").inspect(root.tokens, {depth: null, colors: true}));
}
