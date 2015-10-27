angular.module('app.repl', [])

.controller('ReplController', ['$scope', 'api',
  function ($scope, api) {
    $scope.replInput = "var a = 3";
    $scope.api = api;
    $scope.use = function(method) {
      var args = Array.prototype.slice.call(arguments, 1);
      try {
        return method.apply(null, args);
      } catch (e) {
        console.log(e);
        return "Invalid Swift code."
      }
    };
  }
]);
