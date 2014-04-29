AdminUtilityApp.controller('CreateProviderController', ['$scope','$http','$location','$routeParams', function($scope,$http,$location,$routeParams){
	
	var provider = $routeParams.provider;
	console.log(provider);
	$scope.isUpdate = false;
	
	if(provider != null && provider != undefined && provider != '') {
		$scope.isUpdate = true;
		$http({
			method  : 'GET',
            url     : 'admin/provider/'+provider,
		}).success(function(data) {
			$scope.providerName = provider;
			$scope.providerBaseUrl = data.base_uri;
			$scope.providerCertificate = data.certificate;
		});
		
	}
	
	
	function validateInput(){
		if($scope.providerName == null || $scope.providerName === undefined || $scope.providerName.trim() == '' ){
			$scope.createProvider_message = "Provider Name cannot be empty.";
			return false;
		}
		if($scope.providerBaseUrl == null || $scope.providerBaseUrl === undefined || $scope.providerBaseUrl.trim() == '' ){
			$scope.createProvider_message = "Provider Base url cannot be empty.";
			return false;
		}
		if(!($scope.providerBaseUrl.match('^[^:]+://[^/:]+:[0-9]{1,5}(/.*)?$'))){
			$scope.createProvider_message = "Please provide valid provider base url.";
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

	$scope.saveProvider = function() {
		if(validateInput()){
			var bodyData = generateDataObject();
			console.log(bodyData);
			if($scope.isUpdate) {
				$http({
					method: 'POST',
					url : 'admin/provider/' + $scope.providerName,
					data : bodyData
				})
				.success(function(data){
					$scope.createProvider_message = 'Provider updated successfully.';
				})
				.error(function(data){
					$scope.createProvider_message = data.error_description;
				});
			} else {
				$http({
					method: 'PUT',
					url : 'admin/provider/' + $scope.providerName,
					data : bodyData
				})
				.success(function(data){
					console.log(JSON.stringify(data));
					$scope.createProvider_message = 'Provider created successfully';
				})
				.error(function(data){
				$scope.createProvider_message = data.error_description;
				});
			}
		}
	};
}]);