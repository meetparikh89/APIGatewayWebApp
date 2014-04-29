AdminUtilityApp.controller('DeprovisioningClient', [ '$scope', '$http','ngTableParams',
	function($scope,$http,ngTableParams){
		$scope.fetchClientList = function() {
			$http({
				method : 'GET',
				url : 'admin/client',
			}).success(function(data) {
				var result = new Array();
				for (var i = 0; i < data.length; i++) {
					var obj = data[i];
					result[i] = obj.id;
				}
				console.log(result);
				$scope.allclientNames = result;
			}).error(function(data) {
				console.log(data);
				$scope.allclientNames = "";
			});
		};
		
		$scope.fetchClientList();
		
		$scope.updateClient = function(typed) {
			$scope.clientNames = $scope.allclientNames;
		};
		
		$scope.getCapabilities = function(){
			$scope.clientSearchError = "";
			if($scope.clientName == null || $scope.clientName.trim() == '' || $scope.clientName === undefined){
				$scope.clientSearchError = "Please enter client name.";
			} else {
				 $http({
                     method  : 'GET',
                     url     : 'admin/client/'+ $scope.clientName
                 })
                 .success(function(data){
                	 console.log(data);
                	 console.log(JSON.stringify(data["provisions"]));
                	 $scope.provisions = data["provisions"];
                 });
			}
			
		};
		
		$scope.provisionDetailTable = new ngTableParams({
	        page: 1,            // show first page
	        count: 1,          // count per page
	        sorting: {
	            name: 'asc'     // initial sorting
	        }
	    }, {
	        total: 0,           // length of data
	        getData: $scope.provisions
	    });
		
		$scope.deprovision = function(provider_id,capability_id){
			if($scope.clientName == null || $scope.clientName.trim() == '' || $scope.clientName === undefined){
				$scope.clientSearchError = "Please enter client name.";
			} else {
				$http({
					method : 'DELETE',
					url : 'admin/client/' + $scope.clientName + "/provider/" + provider_id + "/capability/" + capability_id
				})
				.success(function(data){
					$scope.getCapabilities();
					$scope.provisionDetailTable.reload();
				})
				.error(function(data){
					window.alert("Unable to de provision " + capability_id + " capability of " + provider_id + " provider.");
				});
			}
		};
		
	}
]);