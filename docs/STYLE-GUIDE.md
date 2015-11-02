### Indentation

When writing any block of code that is logically subordinate to the line immediately before and after it, that block should be indented two spaces more than the surrounding lines

* Do not put any tab characters anywhere in your code. You would do best to stop pressing the tab key entirely.
* Increase the indent level for all blocks by two extra spaces
    * When a line opens a block, the next line starts 2 spaces further in than the line that opened

        ```javascript
        // good:
        if(condition){
          action();
        }

        // bad:
        if(condition){
        action();
        }
        ```

    * When a line closes a block, that line starts at the same level as the line that opened the block
        ```javascript
        // good:
        if(condition){
          action();
        }

        // bad:
        if(condition){
          action();
          }
        ```

    * No two lines should ever have more or less than 2 spaces difference in their indentation. Any number of mistakes in the above rules could lead to this, but one example would be:

        ```javascript
        // bad:
        transmogrify({
          a: {
            b: function(){
            }
        }});
        ```

    * use sublime's arrow collapsing as a guide. do the collapsing lines seem like they should be 'contained' by the line with an arrow on it?


### Variable names

* A single descriptive word is best.

    ```javascript
    // good:
    var animals = ['cat', 'dog', 'fish'];

    // bad:
    var targetInputs = ['cat', 'dog', 'fish'];
    ```

* Collections such as arrays and maps should have plural noun variable names.

    ```javascript
    // good:
    var animals = ['cat', 'dog', 'fish'];

    // bad:
    var animalList = ['cat', 'dog', 'fish'];

    // bad:
    var animal = ['cat', 'dog', 'fish'];
    ```

* Name your variables after their purpose, not their structure

    ```javascript
    // good:
    var animals = ['cat', 'dog', 'fish'];

    // bad:
    var array = ['cat', 'dog', 'fish'];
    ```


### Language constructs

* Do not use `for...in` statements with the intent of iterating over a list of numeric keys. Use a for-with-semicolons statement in stead.

  ```javascript
  // good:
  var list = ['a', 'b', 'c']
  for(var i = 0; i < list.length; i++){
    alert(list[i]);
  }

  // bad:
  var list = ['a', 'b', 'c']
  for(var i in list){
    alert(list[i]);
  }
  ```

* Never omit braces for statement blocks (although they are technically optional).
    ```javascript
    // good:
    for(key in object){
      alert(key);
    }

    // bad:
    for(key in object)
      alert(key);
    ```

* Always use `===` and `!==`, since `==` and `!=` will automatically convert types in ways you're unlikely to expect.

    ```javascript
    // good:

    // this comparison evaluates to false, because the number zero is not the same as the empty string.
    if(0 === ''){
      alert('looks like they\'re equal');
    }

    // bad:

    // This comparison evaluates to true, because after type coercion, zero and the empty string are equal.
    if(0 == ''){
      alert('looks like they\'re equal');
    }
    ```

* Don't use function statements for the entire first half of the course. They introduce a slew of subtle new rules to how the language behaves, and without a clear benefit. Once you and all your peers are expert level in the second half, you can start to use the more (needlessly) complicated option if you like.

    ```javascript
    // good:
    var go = function(){...};

    // bad:
    function stop(){...};
    ```


### Semicolons

* Don't forget semicolons at the end of lines

  ```javascript
  // good:
  alert('hi');

  // bad:
  alert('hi')
  ```

* Semicolons are not required at the end of statements that include a block--i.e. `if`, `for`, `while`, etc.


  ```javascript
  // good:
  if(condition){
    response();
  }

  // bad:
  if(condition){
    response();
  };
  ```

* Misleadingly, a function may be used at the end of a normal assignment statement, and would require a semicolon (even though it looks rather like the end of some statement block).

  ```javascript
  // good:
  var greet = function(){
    alert('hi');
  };

  // bad:
  var greet = function(){
    alert('hi');
  }
  ```

# Supplemental reading

### Code density

* Conserve line quantity by minimizing the number lines you write in. The more concisely your code is written, the more context can be seen in one screen.
* Conserve line length by minimizing the amount of complexity you put on each line. Long lines are difficult to read. Rather than a character count limit, I recommend limiting the amount of complexity you put on a single line. Try to make it easily read in one glance. This goal is in conflict with the line quantity goal, so you must do your best to balance them.

### Comments

* Provide comments any time you are confident it will make reading your code easier.
* Be aware that comments come at some cost. They make a file longer and can drift out of sync with the code they annotate.
* Comment on what code is attempting to do, not how it will achieve it.
* A good comment is often less effective than a good variable name.


### Padding & additional whitespace

* Generally, we don't care where you put extra spaces, provided they are not distracting.
* You may use it as padding for visual clarity. If you do though, make sure it's balanced on both sides.

    ```javascript
    // optional:
    alert( "I chose to put visual padding around this string" );

    // bad:
    alert( "I only put visual padding on one side of this string");
    ```

* You may use it to align two similar lines, but it is not recommended. This pattern usually leads to unnecessary edits of many lines in your code every time you change a variable name.

    ```javascript
    // discouraged:
    var firstItem  = getFirst ();
    var secondItem = getSecond();
    ```

* Put `else` and `else if` statements on the same line as the ending curly brace for the preceding `if` block
    ```javascript
    // good:
    if(condition){
      response();
    }else{
      otherResponse();
    }

    // bad:
    if(condition){
      response();
    }
    else{
      otherResponse();
    }
    ```



### Working with files

* Do not end a file with any character other than a newline.
* Don't use the -a or -m flags for `git commit` for the first half of the class, since they conceal what is actually happening (and do slightly different things than most people expect).

    ```shell
    # good:
    > git add .
    > git commit
    [save edits to the commit message file using the text editor that opens]

    # bad:
    > git commit -a
    [save edits to the commit message file using the text editor that opens]

    # bad:
    > git add .
    > git commit -m "updated algorithm"
    ```


### Opening or closing too many blocks at once

* The more blocks you open on a single line, the more your reader needs to remember about the context of what they are reading. Try to resolve your blocks early, and refactor. A good rule is to avoid closing more than two blocks on a single line--three in a pinch.

    ```javascript
    // avoid:
    _.ajax(url, {success: function(){
      // ...
    }});

    // prefer:
    _.ajax(url, {
      success: function(){
        // ...
      }
    });
    ```


### Variable declaration

* Use a new var statement for each line you declare a variable on.
* Do not break variable declarations onto mutiple lines.
* Use a new line for each variable declaration.
* See http://benalman.com/news/2012/05/multiple-var-statements-javascript/ for more details

    ```javascript
    // good:
    var ape;
    var bat;

    // bad:
    var cat,
        dog

    // use sparingly:
    var eel, fly;
    ```

### Capital letters in variable names

* Some people choose to use capitalization of the first letter in their variable names to indicate that they contain a [class](http://en.wikipedia.org/wiki/Class_(computer_science\)). This capitalized variable might contain a function, a prototype, or some other construct that acts as a representative for the whole class.
* Optionally, some people use a capital letter only on functions that are written to be run with the keyword `new`.
* Do not use all-caps for any variables. Some people use this pattern to indicate an intended "constant" variable, but the language does not offer true constants, only mutable variables.


### Minutia

* Don't rely on JavaScripts implicit global variables. If you are intending to write to the global scope, export things to `window.*` explicitly instead.

    ```javascript
    // good:
    var overwriteNumber = function(){
      window.exported = Math.random();
    };

    // bad:
    var overwriteNumber = function(){
      exported = Math.random();
    };
    ```

* For lists, put commas at the end of each newline, not at the beginning of each item in a list

    ```javascript
    // good:
    var animals = [
      'ape',
      'bat',
      'cat'
    ];

    // bad:
    var animals = [
        'ape'
      , 'bat'
      , 'cat'
    ];
    ```

* Avoid use of `switch` statements altogether. They are hard to outdent using the standard whitespace rules above, and are prone to error due to missing `break` statements. See [this article](http://ericleads.com/2012/12/switch-case-considered-harmful/) for more detail.

* Prefer single quotes around JavaScript strings, rather than double quotes. Having a standard of any sort is preferable to a mix-and-match approach, and single quotes allow for easy embedding of HTML, which prefers double quotes around tag attributes.

    ```javascript
    // good:
    var dog = 'dog';
    var cat = 'cat';

    // acceptable:
    var dog = "dog";
    var cat = "cat";

    // bad:
    var dog = 'dog';
    var cat = "cat";
    ```


### HTML

* Do not use ids for html elements. Use a class instead.

    ```html
    <!-- good -->
    <img class="lucy" />

    <!-- bad -->
    <img id="lucy" />
    ```

* Do not include a `type=text/javascript"` attribute on script tags

    ```html
    <!-- good -->
    <script src="a.js"></script>

    <!-- bad -->
    <script src="a.js" type="text/javascript"></script>
    ```
