/**
 * 
 */
AdminUtilityApp.controller('NavigatorController', function($scope) {
		$scope.oneAtATime = true;

		$scope.clientOptions = [ {
			name : "Get Client",
			hrefValue:"#getClient"
		}, {
			name : "Create Client",
			hrefValue:"#createClient"
		} ];
		
		$scope.providerOptions = [ {
			name : "Get Providers",
			hrefValue:"#getProvider"
		}, {
			name : "Create Providers",
			hrefValue:"#createProvider"
		} ];
		
		
		$scope.capabilityOptions= [ {
			name : "Get Cabalities",
			hrefValue:"#getCapabilities"
		}, {
			name : "Create Prioritries",
			hrefValue:"#createCapabilities"
		} ];
});