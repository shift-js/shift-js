angular.module('app', [
  'app.api',
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
