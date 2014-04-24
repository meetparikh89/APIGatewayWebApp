AdminUtilityApp.controller('CreateProviderController', ['$scope','$http','$location', function($scope,$http,$location){
	
	function validateInput(){
		if($scope.providerName == null || $scope.providerName === undefined || $scope.providerName.trim() == '' ){
			$scope.createProvider_message = "Provider Name cannot be empty.";
			return false;
		}
		if($scope.providerBaseUrl == null || $scope.providerBaseUrl === undefined || $scope.providerBaseUrl.trim() == '' ){
			$scope.createProvider_message = "Provider Base url cannot be empty.";
			return false;
		}
		return true;
	}

	$scope.createProvider = function() {
		if(validateInput()){

		}
	}
}]);