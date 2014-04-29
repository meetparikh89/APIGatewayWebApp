/**
 * 
 */
AdminUtilityApp.controller('NavigatorController', function($scope,$cookies,$rootScope) {
		$scope.oneAtATime = true;
		$rootScope.loginstatus = $cookies.loginCookie;
		$scope.env = $cookies.env;

		$scope.clientOptions = [ {
			name : "Manage Client",
			hrefValue:"#manageClient"
		}, {
			name : "Create Client",
			hrefValue:"#createClient"
		}];
		
		$scope.providerOptions = [ {
			name : "Manage Providers",
			hrefValue:"#manageProvider"
		}, {
			name : "Create Providers",
			hrefValue:"#createProvider"
		} ];
		
		$scope.provisioningOptions = [ {
			name : "Provision",
			hrefValue:"#provisioning"
		}, {
			name : "Deprovision",
			hrefValue:"#deprovisioning"
		} ];
		
		$scope.capabilityOptions= [ {
			name : "Get Cabalities",
			hrefValue:"#getCapabilities"
		}, {
			name : "Create Prioritries",
			hrefValue:"#createCapabilities"
		} ];
		
		$scope.adminSettings= [ {
			name : "Manage Admin",
			hrefValue:"#manageAdmin"
		}, {
			name : "Create Admin",
			hrefValue:"#createAdmin"
		}, {
			name : "Get IP Range",
			hrefValue:"#getAdminIpRange"
		}, {
			name : "Edit IP Range",
			hrefValue:"#editAdminIpRange"
		}];
});