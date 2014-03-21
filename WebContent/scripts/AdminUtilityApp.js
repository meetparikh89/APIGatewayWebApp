var AdminUtilityApp = angular.module('AdminUtilityApp', ['ngRoute','ui.bootstrap','ngCookies'])

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
                    .when('/getClient', {
                    	templateUrl : 'views/getClient.html',
                    	controller  : 'GetClientController'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
                  }
      	]);
//.config(['$httpProvider',function($httpProvider) {
//  $httpProvider.interceptors.push('AdminUtilityHttpResponseInterceptor');
//}]);




