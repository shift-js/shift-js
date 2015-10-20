# esprima-ast-utils [![Build Status](https://secure.travis-ci.org/llafuente/esprima-ast-utils.png?branch=master)](http://travis-ci.org/llafuente/esprima-ast-utils)

Node module to manipulate, transform, query and debug [esprima](https://github.com/ariya/esprima) ASTs.

## Objective

When you edit esprima AST and go back to code with escodegen you lose too much information because primary you don't keep track of ranges, tokens, comments etc.
esprima-ast-utils do this for you, so no escodegen is needed, you can edit the AST directly and code everything is in sync.

## API


### io


#### `parse` (String:str, [Boolean]:debug)

Parse given str

* `debug`: display $id, $parent and $code in console.log (enumerable=true)

**Note**: location it's not supported, and won't sync with changes, range/rokens do.



#### `parseFile` (String:file, [Boolean]:debug)

Parse given file

* `file`: Path

* `debug`: display $id, $parent and $code in console.log (enumerable=true)

**Note**: : NodeJS only



#### `encode` (Object:tree)

Return tree.$code, just for API completeness.



### walk


#### `traverse` (Object:node, Function:callback, [Number]:depth, [Boolean]:recursive)

traverse AST

* `callback`: function(node, parent, property, index, depth)
  You can return `false` to stop traverse

* `depth`: (0) current depth

* `recursive`: (true) recursively traverse



#### `parentize` (Object:root, [Boolean]:debug)

`traverse` AST and set $parent node

* `debug`: display $parent in console.log (enumerable=true)



#### `idze` (Object:node, [Boolean]:debug)

`traverse` AST and set an unique `$id` to every node

* `debug`: display $id in console.log (enumerable=true)



#### `attachComments` (Object:root)

Traverse the AST and add comments as nodes, so you can query them.

Loop thought comments and find a proper place to inject (BlockStament or alike)

* attach the comment to the before nearest children

* if a children contains the comment it's considered invalid

* push otherwise



#### `filter` (Object:node, Function:callback, [Function]:traverse_fn)

`traverse` and `filter` given AST based on given `callback`



#### `getParent` (Object:node, Function:callback)

Get parent node based on given callback, stops on `true`



#### `getRoot` (Object:node)

get the root of the AST



#### `clone` (Object:node)

Recursive clone a node. Do no include "$" properties like $parent or $id

If you want those, call `parentize` - `idze` after cloning



### debug


#### `debug_tree` (Object:tree, [Number]:max_width, [Boolean]:display_code_in_tree)

Show your tree in various ways to easy debug

Big trees will be always a pain, so keep it small if possible

* `tree`: Any node, if root tokens & source will be displayed

* `max_width`: max tokens per line

* `display_code_in_tree`: when display the tree attach the code on the right



### query


#### `getFunction` (Object:node, String:fn_name)

`filter` the AST and return the function with given name, null otherwise.



#### `getFunctionBlock` (Object:node, String:fn_name)

`filter` the AST and return the function > block with given name, null otherwise.



#### `isFunctionDeclared` (Object:node, String:fn_name)

shortcut



#### `hasVarDeclaration` (Object:node, String:var_name)

shortcut



#### `isVarDeclared` (Object:node, String:var_name)

reverse from node to root and look for a Variable declaration

**Note**: It's not perfect because `VariableDeclaration` it's not hoisted



#### `contains` (Object:node, Object:subnode)

`node` constains `subnode`



#### `hasBody` (Object:node)

Has a body property, use to freely attach/detach



#### `isComment` (Object:node)

shortcut: Is a comment (Line or Block) and has text



#### `getComment` (Object:node, String:comment)

shortcut: search for a comment (trim it's content for maximum compatibility)



#### `getCode` (Object:node)

shortcut: Return node code



#### `getArgumentList` (Object:node)

Return `FunctionDeclaration` arguments name as a list



### manipulations


#### `attach` (Object:node, String:property, Number|NULL:position, String|Object:str)

Attach Code/Program to given node.

* `node`: node to attach

* `property`: Where attach, could be an array or an object

* `position`: index if an array is used as target property

* `str`: String is preferred if not possible remember that only Program can be attached, you may consider using `toProgram`

**Note**: tokens are updated

**Note**: range is updated

**Note**: comments are not attached to root.comments (invalid-comments)



#### `detach` (Object:node, String:property)

Detach given node from it's parent

**Note**: `node.$parent` is set to `null`, remember to save it first if you need it.



#### `attachAfter` (Object:node, String|Object:str)

Attach after node, that means `node.$parent.type` is a `BockStament`

* `str`: String is preferred if not possible remember that only Program can be attached, you may consider using `toProgram`



#### `attachBefore` (Object:node, String|Object:str)

Attach before node, that means `node.$parent.type` is a `BockStament`

* `str`: String is preferred if not possible remember that only Program can be attached, you may consider using `toProgram`



#### `attachAfterComment` (Object:node, String:comment, String|Object:str)

Shortcut: Search for given comment, and attachAfter

* `str`: String is preferred if not possible remember that only Program can be attached, you may consider using `toProgram`



#### `replace` (Object:node, String|Object:str)

Shortcut: detach/attach

* `str`: String is preferred if not possible remember that only Program can be attached, you may consider using `toProgram`



#### `replaceComment` (Object:node, String:comment, String|Object:str)

Shortcut: Search for a comment and replace

* `str`: String is preferred if not possible remember that only Program can be attached, you may consider using `toProgram`



#### `injectCode` (Object:tree, Array:range, String|Object:str, Boolean:debug)

Inject code directly intro the given range.

After the injection the code will be parsed again so original `$id` will be lost

* `str`: String is preferred if not possible remember that only Program can be attached, you may consider using `toProgram`

* `debug`: display $id, $parent and $code in console.log (enumerable=true)

**Note**: this is dangerous and powerful



### transformations


#### `setIdentifier` (Object:node, String:new_name)

rename `Identifier`



#### `renameProperty` (Object:node, Object:replacements)

`traverse` and apply given `replacements`

Example:
```js
renameProperty(node, {"old_var": "new_var", "much_older": "shinnig_new"})
```



#### `renameVariable` (Object:node, Object:replacements)

`traverse` and apply given `replacements`

Example:
```js
renameVariable(node, {"old_var": "new_var", "much_older": "shinnig_new"})
```



#### `renameFunction` (Object:node, Object:replacements)

traverse and apply given `replacements`

Example:
```js
renameFunction(node, {"old_var": "new_var", "much_older": "shinnig_new"})
```



#### `toProgram` (Object:node)

clone given node and extract tokens/code from root to given you a Program-like node



### tokens


#### `getToken` (Object:root, Number:start, Number:end)

Get token based on given range



#### `getTokens` (Object:root, Number:start, Number:end)

Get tokens in range



#### `pushTokens` (Object:root, Number:start, Number:amount)

Push tokens range from start

**Note**: Also update Node ranges



#### `growTokens` (Object:root, Number:start, Number:end, Number:amount)

Grow tokens in given range

**Note**: Also update Node ranges



#### `tokenAt` (Array:token_list, Number:start)

Get the first token



#### `addTokens` (Array:dst, Array:src, Number:start)

Add `src` tokens to `dst` since `start` (so keep the order)

**Note**: Remember to push `src` tokens before `addTokens` otherwise won't be synced



#### `replaceCodeRange` (Object:root, Array:range, String:new_text)

Replace code range with given text.



#### `removeTokens` (Object:root, Number:min, Number:max)

Remove tokens in range and update ranges


## Common errors

### Comments errors

Comments need to be attached to a proper way but sometimes, it also fail. Check out this example:

```js
Something.call(function())

// XXX
```

Give you the error:

```
(info) 1.- Found a comment that cannot be attached { type: 'Line',
  value: ' XXX',
  range: [ 538, 560 ] }
```
You forgot your semicolons, you are lazy so `esprima` is too, fix it and you will have your comment properly atached.

```js
Something.call(function());

// XXX
```


## License
MIT
