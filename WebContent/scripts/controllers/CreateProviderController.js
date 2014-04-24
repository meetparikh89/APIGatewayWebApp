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

	function generateDataObject(){
		var bodyData = {};
		bodyData['base_uri'] = $scope.providerBaseUrl;
		if(!($scope.providerCertificate == null || $scope.providerCertificate === undefined || $scope.providerCertificate.trim() == '' )){
			bodyData['certificate'] = $scope.providerCertificate;
		}
		return bodyData;
	}

	$scope.createProvider = function() {
		if(validateInput()){
			var bodyData = generateDataObject();
			console.log(bodyData);
			$http({
				method: 'PUT',
				url : 'admin/provider/' + $scope.providerName,
				data : bodyData
			})
			.success(function(data){
				$scope.createProvider_message = 'Successfully created provider';
			})
			.error(function(data){
				$scope.createProvider_message = data.error_description;
			});
		}
	}
}]);