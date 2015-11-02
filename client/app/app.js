angular.module('app', [
  'app.home',
  'app.repl',
  'app.api',
  'ngRoute',
  'ui.bootstrap'
])

.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/components/home/homeView.html',
        controller: 'HomeController'
      })
      .when('/repl', {
        templateUrl: 'app/components/repl/replView.html',
        controller: 'ReplController'
      })
      .otherwise({
        redirectTo: '/repl'
      });
  }
])

.controller('DropdownCtrl', function ($scope, $log) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});
