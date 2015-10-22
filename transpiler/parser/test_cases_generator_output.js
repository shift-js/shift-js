
// ***** TEST 1 *****
// Swift input: 'var a = 3'
var a = 3;

// ***** TEST 2 *****
// Swift input: 'var b = "hello"'
var b = 'hello';

// ***** TEST 3 *****
// Swift input: 'var c = true'
var c = true;

// ***** TEST 4 *****
// Swift input: 'var d = "Test this"'
var d = 'Test this';

// ***** TEST 5 *****
// Swift input: 'var e = ["Eggs", "Milk", "Bacon"]'
var e = [
  'Eggs',
  'Milk',
  'Bacon'
];

// ***** TEST 6 *****
// Swift input: 'var f = ["one": 1, "two": 2, "three": 3]'
var f = {
  'one': 1,
  'two': 2,
  'three': 3
};

// ***** TEST 7 *****
// Swift input: 'let g = [1 : "one",2   :"two", 3: "three"]'
var g = {
  1: 'one',
  2: 'two',
  3: 'three'
};

// ***** TEST 8 *****
// Swift input: 'let h = 3.14'
var h = 3.14;

// ***** TEST 9 *****
// Swift input: 'let i = 5+6'
var i = 5 + 6;

// ***** TEST 10 *****
// Swift input: 'var j = 5 + 6 / 4 - (-16 % 4.2) * 55'
var j = 5 + 6 / 4 - -16 % 4.2 * 55;

// ***** TEST 11 *****
// Swift input: 'var k = "Stephen" + " " + "Tabor" + "!"'
var k = 'Stephen' + ' ' + 'Tabor' + '!';

// ***** TEST 12 *****
// Swift input: 'let l = 6 !== 9'
var l = 6 !== 9;

// ***** TEST 13 *****
// Swift input: 'var a = 1; var m = ++a;'
var a = 1;
var m = ++a;

// ***** TEST 14 *****
// Swift input: 'var a = 1; var n = a++;'
var a = 1;
var n = a++;

// ***** TEST 15 *****
// Swift input: 'var planet = "Earth"; let o = "Hello \\(planet)!"'
var planet = 'Earth';
var o = 'Hello ' + planet + '!';

// ***** TEST 16 *****
// Swift input: 'var planet = "Earth"; let o = "\\(planet)"'
var planet = 'Earth';
var o = '' + planet + '';

// ***** TEST 17 *****
// Swift input: 'var p = "\\(100 - 99), 2, 3"'
var p = '' + 100 - 99 + ', 2, 3';

// ***** TEST 18 *****
// Swift input: 'let q = ["array1": [1,2,3], "array2": [4,5,6]];'
var q = {
  'array1': [
    1,
    2,
    3
  ],
  'array2': [
    4,
    5,
    6
  ]
};

// ***** TEST 19 *****
// Swift input: 'var s = arr[0];'
var s = arr[0];

// ***** TEST 20 *****
// Swift input: 'let arr = [1, 2]; let t = 100; var u = arr[t - 99];'
var arr = [
  1,
  2
];
var t = 100;
var u = arr[t - 99];

// Swift input: 'let arr = [1,2]; var v = [ arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]] ];'
var arr = [
  1,
  2
];
var v = [];
v[arr[0]] = [
  [
    1,
    2
  ],
  [
    3,
    4
  ]
];
v[arr[1]] = [
  [
    'one',
    'two'
  ],
  [
    'three',
    'four'
  ]
];

// Swift input: 'var w = [1: [[1: "two"], [3: "four"]], 2: [["one": 2], ["three": 4]]];'
var w = {
  1: [
    { 1: 'two' },
    { 3: 'four' }
  ],
  2: [
    { 'one': 2 },
    { 'three': 4 }
  ]
};
