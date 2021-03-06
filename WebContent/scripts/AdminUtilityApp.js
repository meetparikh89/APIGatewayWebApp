var AdminUtilityApp = angular.module('AdminUtilityApp', ['ngRoute','ui.bootstrap','ngCookies','ngTable','autocomplete'])

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
                    .when('/manageClient', {
                    	templateUrl : 'views/manageClient.html',
                    	controller  : 'ManageClientController'
                    })
                    .when('/createClient', {
                    	templateUrl : 'views/createClient.html',
                    	controller  : 'CreateClientController'
                    })
                    .when('/getClient/:client',{
                     controller: 'GetClientInfoController',
                     templateUrl: 'views/getClientInfo.html'
                    })
                    .when('/confirmationPage', {
                        templateUrl : 'views/confirmationPage.html',
                        controller : 'ConfirmationPageController'
                    })
                    .when('/manageProvider',{
                     controller: 'ManageProviderController',
                     templateUrl: 'views/manageProvider.html'
                    })
                    .when('/updateClient/:client',{
                        controller: 'CreateClientController',
                        templateUrl: 'views/createClient.html'
                    })
                    .when('/createProvider',{
                        controller: 'CreateProviderController',
                        templateUrl: 'views/createProvider.html'
                    })
                    .when('/manageProvider/:provider',{
                    	controller : "ProviderDetailsController",
                    	templateUrl: 'views/providerDetails.html'
                    })
                    .when('/updateProvider/:provider',{
                    	controller : "CreateProviderController",
                    	templateUrl: 'views/createProvider.html'
                    })
                    .when('/provisioning',{
                        controller : "ProvisioningClient",
                        templateUrl: "views/provisionClient.html"
                    })
                    .when('/manageAdmin',{
                        controller : "ManageAdminController",
                        templateUrl: "views/ManageAdmin.html"
                    })
                    .when('/createAdmin',{
                        controller : "CreateAdminController",
                        templateUrl: "views/CreateAdmin.html"
                    })
                    .when('/updateAdmin/:admin',{
                    	 controller : "CreateAdminController",
                         templateUrl: "views/CreateAdmin.html"
                    })
                    .when('/deprovisioning',{
                        controller : "DeprovisioningClient",
                        templateUrl: "views/deprovisionClient.html"
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
					 sessionStorage.error_data = Base64.encode(rejection.data);
					 $location.path('/error');
				 }
				 return $q.reject(rejection);
			 }
		 };
	 });
	 $httpProvider.interceptors.push('SessionHttpInterceptor');
 }]);
