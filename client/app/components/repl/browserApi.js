// this is used with browserify/grunt to make api.js

var api = require('../../../../transpiler/api.js');

angular.module('app.api', [])

.factory('api', [
  function() {
    return api;
  }
]);
