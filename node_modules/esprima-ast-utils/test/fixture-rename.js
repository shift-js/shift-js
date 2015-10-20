var XX;

function A(arg_a) {
    arg_a = arg_a + 1;

    return arg_a * arg_a;
}

(function() {
    var A = 0;

    A = 1;

    return A;
}());

(function() {
    var B,
        C,
        A = 0;

    A = 10;

    return A;
}());


var x = {};

x.A = 0;

A();

(function() {
    return A();
}());

module.exports = {
    A: A, // this will be replaced by the function
    XX: XX // this will be replaced by the var_name

};