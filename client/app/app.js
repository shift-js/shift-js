angular.module('app', [
  'app.repl',
  'ngRoute'
])

.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/repl', {
        templateUrl: 'app/components/repl/replView.html',
        controller: 'ReplController'
      })
      .otherwise({
        redirectTo: '/repl'
      });
  }
])
