AdminUtilityApp.controller('AdminLoginController',
    function($scope,$location,$http) {
        $scope.submitForm = function() {
        	var token = "Basic " + Base64.encode($scope.admin.userName + ":" + $scope.admin.password);      
        	$http({
        	    method: 'POST',
        	    url: 'loginservlet',
        	    data: {'token': token, 'env' : $scope.admin.env},
        	})
        		.success(function(data){
        			$location.path('/home');
        		})
        		.error(function(data,status){
        			if(status == 401){
        				$scope.loginError = "User not authenticated";
        			} else {
        				$scope.loginError = data;
        			}
        		});
//        	$http.get("https://192.168.2.71:8424/admin/client/",
//        			{headers: {'Authorization': 'Basic ' + Base64.encode($scope.admin.userName + ":" + $scope.admin.password )}})
//        			.success(
//        					function(data){
//        						window.alert("Inside success");
//        						window.alert(data);
//        						if(data.error != null){
//        							window.alert("Got Error message");
//        							$location.path('/');
//        						} else {
//        							window.alert("Got Message");
//        							$location.path('/home');
//        						}
//        					}
//            ).error(function(data, status) {
//            	window.alert("Inside error");
//            	window.alert(data);
//            	window.alert(status);
//            	$location.path('/');
//            });
        };
    });

