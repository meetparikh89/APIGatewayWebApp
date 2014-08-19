/**
 * 
 */
AdminUtilityApp.controller('NavigatorController', function($scope,$cookies,$rootScope) {
		$scope.oneAtATime = true;
		$rootScope.loginstatus = $cookies.loginCookie;
		$scope.env = $cookies.env
		$scope.user=$cookies.user;
		

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
		
		$scope.adminSettings= [ {
			name : "Manage Admin",
			hrefValue:"#manageAdmin"
		}, {
			name : "Create Admin",
			hrefValue:"#createAdmin"
		}];
});