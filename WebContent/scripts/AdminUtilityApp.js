var AdminUtilityApp = angular.module('AdminUtilityApp', ['ngRoute','ui.bootstrap','ngCookies','ngTable'])

.config(['$routeProvider',
        function($routeProvider) {
                  $routeProvider
                    .when('/', {
                        controller: 'AdminLoginController',
                        templateUrl: 'views/login.html'
                    })
                    .when('/error', {
                    	controller: 'ErrorController',
                        templateUrl: 'error.html'
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
                    .when('/getClient/:client',{
                     controller: 'GetClientInfoController',
                     templateUrl: 'views/getClientInfo.html'
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
				 if(rejection.status == 401){
					 $location.path('/');			 
				 }
				 if(rejection.status >= 500 && rejection.status < 600){
					 sessionStorage.error_status = rejection.status;
					 sessionStorage.error_data = rejection.data;
					 $location.path('/error');
				 }
				 return $q.reject(rejection);
			 }
		 };
	 });
	 $httpProvider.interceptors.push('SessionHttpInterceptor');
 }]);
