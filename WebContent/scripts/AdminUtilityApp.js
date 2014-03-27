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
      	])
      	
.config(['$provide','$httpProvider',function ($provide, $httpProvider) {
	 $provide.factory('SessionHttpInterceptor', function ($q,$location) {
		 return {
			 responseError: function (rejection) {
				 console.log(rejection);
				 if(rejection.status == 401){
					 $location.path('/');
				 }
				 return $q.reject(rejection);
			 }
		 };
	 });
	 $httpProvider.interceptors.push('SessionHttpInterceptor');
 }]);
