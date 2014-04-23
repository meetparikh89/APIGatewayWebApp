AdminUtilityApp.controller('AdminLoginController',
    function($scope,$location,$http,$cookies,$rootScope) {
	
		$rootScope.loginstatus = $cookies.loginCookie;
	
        $scope.submitForm = function() {
        	var token = "Basic " + Base64.encode($scope.admin.userName + ":" + $scope.admin.password);      
        	$http({
        	    method: 'POST',
        	    url: 'loginservlet',
        	    data: {'token': token, 'env' : $scope.admin.env},
        	})
        	.success(function(data){
        		$cookies.loginCookie = 'true';
                $cookies.env = $scope.admin.env;
        		$rootScope.loginstatus = $cookies.loginCookie;
        		$location.path('/home');
        	})
        	.error(function(data,status){
        		if(status == 401){
        			$scope.loginError = "User not authenticated";
        		} else {
        			$scope.loginError = data;
        		}
        	});
        };
    });

