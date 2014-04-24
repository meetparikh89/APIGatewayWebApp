describe('Controller : AdminLoginControllerTest', function() {  //the signature of the test suit function

	var $httpBackend, $rootScope, createController;  // these are the mock variables required to mock the controller

	beforeEach(module("AdminUtilityApp"));  //initialization/dependencies before running the test 

	beforeEach(inject(function($injector) {
		// Set up the mock http service responses
		$httpBackend = $injector.get('$httpBackend');
		// backend definition common for all tests

		// Get hold of a scope (i.e. the root scope)
		$rootScope = $injector.get('$rootScope');
		
		//$scope=$injector.get('$rootScope');

		// The $controller service is used to create instances of
		// controllers
		var $controller = $injector.get('$controller');
		
		
		createController = function() {
			return $controller('AdminLoginController as admin', {
				'$scope' : $rootScope
			});
		};
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("Login Controller login successful Test", function() {

		var controller = createController();
		$rootScope.submitForm();
		
		$httpBackend.expectPOST('loginservlet').respond(200, '');
		
		$httpBackend.flush();
	});
	
	it("Login Controller login Failed Test", function() {

		var controller = createController();
		$rootScope.submitForm();
		
		$httpBackend.expectPOST('loginservlet').respond(400, '');
		
		$httpBackend.flush();
	});
});
