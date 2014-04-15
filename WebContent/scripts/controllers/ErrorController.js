AdminUtilityApp.controller('ErrorController', function($scope,$location) {

	var status = sessionStorage.error_status;
	
	if(status == undefined || !( status >= 500 && status < 600 )){
		$location.path('/');
	} else {
		$scope.error_status = status;
		$scope.error_data = sessionStorage.error_data;
	}
	
});
