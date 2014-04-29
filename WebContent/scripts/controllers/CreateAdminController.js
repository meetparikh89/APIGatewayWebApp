AdminUtilityApp.controller('CreateAdminController', ['$scope','$http','$location','$routeParams', function($scope,$http,$location,$routeParams){
	
	var admin = $routeParams.admin;
	console.log(admin);
	$scope.isUpdate = false;
	
	if(admin != null && admin != undefined && admin != '') {
		$scope.isUpdate = true;
		$http({
			method  : 'GET',
            url     : 'admin/admin/'+admin,
		}).success(function(data) {
			$scope.adminName = admin;
		});
		
	}
	
	
	function validateInput(){
		if($scope.adminName == null || $scope.adminName === undefined || $scope.adminName.trim() == '' ){
			$scope.createAdmin_message = "Admin Name cannot be empty.";
			return false;
		}
		
		if($scope.password == null || $scope.password === undefined || $scope.password.trim() == '' ){
			$scope.createAdmin_message = "Password cannot be empty.";
			return false;
		}
		
		if($scope.confirmPassword == null || $scope.confirmPassword === undefined || $scope.confirmPassword.trim() == '' ){
			$scope.createAdmin_message = "Confirm Password cannot be empty.";
			return false;
		}
		
		if($scope.password.trim() != $scope.confirmPassword.trim()) {
			$scope.createAdmin_message = "Password and Confirm Password does not match.";
			return false;
		}
			
		
		return true;
	}

	function generateDataObject(){
		var bodyData = {};
		bodyData['password'] = $scope.password;
		return bodyData;
	}

	$scope.saveAdmin = function() {
		if(validateInput()){
			var bodyData = generateDataObject();
			console.log(bodyData);
			if($scope.isUpdate) {
				$http({
					method: 'POST',
					url : 'admin/admin/' + $scope.adminName,
					data : bodyData
				})
				.success(function(data){
					$scope.createAdmin_message = 'Admin updated successfully.';
				})
				.error(function(data){
					$scope.createAdmin_message = data.error_description;
				});
			} else {
				$http({
					method: 'PUT',
					url : 'admin/admin/' + $scope.adminName,
					data : bodyData
				})
				.success(function(data){
					console.log(JSON.stringify(data));
					$scope.createAdmin_message = 'Admin created successfully';
				})
				.error(function(data){
				$scope.createAdmin_message = data.error_description;
				});
			}
		}
	};
}]);