AdminUtilityApp.controller('DeleteClientController',
		function($scope,$http) {
			$scope.deleteClient = function() {
				if($scope.deleteclient_name == undefined || $scope.deleteclient_name == ''){
					$scope.deleteclient_message = "Please enter client name.";
				} else {
					$scope.deleteclient_message = "";
					var confirmation = window.confirm("Are you sure you want to delete this client.\nCaution : This cannot be undone.");
					if(confirmation == true) {
						$http({
			        	    method: 'DELETE',
			        	    url: 'admin/client/' + $scope.deleteclient_name,
			        	})
			        	.success(function(data){
			        		$scope.deleteclient_message = "Client " + $scope.deleteclient_name + " deleted.";
			        	})
			        	.error(function(data){
			        		$scope.deleteclient_message = data.error_description;
			        	});
					}				
				}
			};
});