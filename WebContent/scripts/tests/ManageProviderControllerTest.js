describe('Controller : ManageClientControllerTest', function() {

	var $httpBackend, $rootScope, createController; 

	beforeEach(module("AdminUtilityApp"));
	
	beforeEach(inject(function($injector) {
	      // Set up the mock http service responses
	      $httpBackend = $injector.get('$httpBackend');
	      // backend definition common for all tests
	      $httpBackend.when('GET', 'admin/provider').respond({name: 'provider'});

	      // Get hold of a scope (i.e. the root scope)
	      $rootScope = $injector.get('$rootScope');
	      // The $controller service is used to create instances of controllers
	      var $controller = $injector.get('$controller');

	      createController = function() {
	        return $controller('ManageProviderController', {'$scope' : $rootScope });
	      };
	    }));


	    afterEach(function() {
	      $httpBackend.verifyNoOutstandingExpectation();
	      $httpBackend.verifyNoOutstandingRequest();
	    });
	

	it("should have a submit function", function() {
		//$httpBackend.expectGET('admin/provider');
		var controller = createController();
		$rootScope.getProviders();
		$httpBackend.flush();
		
	});
});



    