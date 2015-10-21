module.exports = {
  
  swiftCode: [
    'var a = 3', // 1
    'var b = "hello"', // 2
    'var c = true', // 3
    'var d = "Test this"', // 4
    'var e = ["Eggs", "Milk", "Bacon"]', // 5
    'var f = ["one": 1, "two": 2, "three": 3]', // 6
    'let g = [1 : "one",2   :"two", 3: "three"]', // 7
    'let h = 3.14', // 8
    'let i = 5+6', // 9
    'var j = 5 + 6 / 4 - (-16 % 4.2) * 55', // 10
    'let l = 6 !== 9', // 12
    'var a = 1; var m = ++a;', // 13
    'var a = 1; var n = a++;', // 14
    'var a = true; var b = !a; var c = -a; var d = +b',
    'var a = (6 == 7) ? 1 : -1',
    'var k = "Stephen" + " " + "Tabor" + "!"',
    'var planet = "Earth"; let o = "Hello \\(planet)!"', // 15
    'var planet = "Earth"; let o = "\\(planet)"', // 16
    'var p = "\\(100 - 99), 2, 3"', // 17
    'let q = ["array1": [1,2,3], "array2": [4,5,6]];', // 18
    'let arr = [1, 2]; var s = arr[0];', // 19
    'let arr = [1, 2]; let t = 100; var u = arr[t - 99];', // 20
    'let arr = [1,2]; var u = [arr[0]];', // 21
    'let arr = [1,2]; var v = [arr[0]: [[1,2], [3,4]], arr[1]: [["one", "two"], ["three", "four"]]];', // 22 
    '/* Comment 1 */ var a = 1 // Comment 2',
    'var error = (404, "not found")'
  ]

};

