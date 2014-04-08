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
                    .when('/createClient', {
                    	templateUrl : 'views/createClient.html',
                    	controller  : 'CreateClientController'
                    })
                    .when('/deleteClient', {
                    	templateUrl : 'views/deleteClient.html',
                    	controller  : 'DeleteClientController'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
                  }
      	])
      	
.config(['$provide','$httpProvider',function ($provide, $httpProvider) {
	 $provide.factory('SessionHttpInterceptor', function ($q,$location,$cookies) {
		 return {
			 responseError: function (rejection) {
				 console.log(rejection);
				 $cookies.loginCookie = undefined;
				 if(rejection.status == 401 || rejection.status == 500){
					 $location.path('/');
				 }
				 return $q.reject(rejection);
			 }
		 };
	 });
	 $httpProvider.interceptors.push('SessionHttpInterceptor');
 }]);
