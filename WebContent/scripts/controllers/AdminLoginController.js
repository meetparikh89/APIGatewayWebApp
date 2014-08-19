AdminUtilityApp.controller('AdminLoginController', 
		
		function($scope, $location,	$http, $cookies, $rootScope) {

	$rootScope.loginstatus = $cookies.loginCookie;

	$scope.submitForm = function() {
		if (validateInput()) {
			var token = "Basic "
					+ Base64.encode($scope.adminUserName + ":"
							+ $scope.adminPassword);
			$http({
				method : 'POST',
				url : 'loginservlet',
				data : {
					'token' : token,
					'env' : $scope.adminEnv
				},
			})

			.success(function(data) {
				$cookies.loginCookie = 'true';
				$cookies.env = $scope.adminEnv;
				$cookies.user = $scope.adminUserName;
				$rootScope.loginstatus = $cookies.loginCookie;
				$location.path('/home');
			})

			.error(function(data, status) {
				if (status == 401) {
					$scope.loginError = "User not authenticated";
				} else {
					$scope.loginError = data;
				}
			});
		}
		;
	};
	function validateInput() {
		if ($scope.adminUserName == null
				|| $scope.adminUserName == undefined
				|| $scope.adminUserName.trim() == '') {
			$scope.loginAdmin_message = "User Name cannot be empty.";
			return false;
		}

		if ($scope.adminPassword== null
				|| $scope.adminPassword == undefined
				|| $scope.adminPassword.trim() == '') {
			$scope.loginAdmin_message  = "Password cannot be empty.";
			return false;
		}

		if ($scope.adminEnv == null || $scope.adminEnv == undefined
				|| $scope.adminEnv.trim() == '') {
			$scope.loginAdmin_message  = "Please select Environment to login.";
			return false;
		}
		return true;
	}

});
