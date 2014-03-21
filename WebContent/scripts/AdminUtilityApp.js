var AdminUtilityApp = angular.module('AdminUtilityApp', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider',
        function($routeProvider) {
                  $routeProvider
                    .when('/', {
                        controller: 'AdminLoginController',
                        templateUrl: 'views/login.html'
                    })
                    .when('/home', {
                    	controller: 'NavigatorController',
                        templateUrl: 'views/home.html'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
                  }
      	]);
//.config(['$httpProvider',function($httpProvider) {
//  $httpProvider.interceptors.push('AdminUtilityHttpResponseInterceptor');
//}]);




