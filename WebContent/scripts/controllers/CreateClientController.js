AdminUtilityApp.controller('CreateClientController',
		function($scope,$http) {
			$scope.createClient = function() {
				if($scope.createclient_name == undefined || $scope.createclient_name == ''){
					$scope.createclient_message = "Please enter client name.";
				} else {
					$http({
		        	    method: 'PUT',
		        	    url: 'admin/client/' + $scope.createclient_name,
		        	})
		        	.success(function(data){
		        		$scope.createclient_message = "Client " + $scope.createclient_name + " created.";
		        	})
		        	.error(function(data){
		        		$scope.createclient_message = data.error_description;
		        	});
				}
			};
});