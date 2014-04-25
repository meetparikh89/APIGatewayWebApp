AdminUtilityApp.controller('ManageProviderController',
	function($scope,$http,ngTableParams) {
		
		$scope.getProviders = function(){
			console.log('start of getProviders');
			$http({
	        method  : 'GET',
	        url     : 'admin/provider',
		    })
		    .success(function(data) {
		    	console.log("Success in getting provider list");
		        console.log(JSON.stringify(data));
		        $scope.providers = data;
		    })
		    .error(function(data){
		    	console.log('error');
		    });
			console.log("End of getProviders");
		};
		
		$scope.listProviderTable = new ngTableParams({
	        page: 1,            // show first page
	        count: 1,          // count per page
	        sorting: {
	            name: 'asc'     // initial sorting
	        }
	    }, {
	        total: 0,           // length of data
	        getData: function($defer, params) {
	        	$scope.getProviders();
                $defer.resolve($scope.providers);
	        }
	    });

	    $scope.deleteProvider = function(providername){
	    	var confirmation = window.confirm("Are you sure you want to delete this provider.\nCaution : This cannot be undone.");
	    	if (confirmation == true) {
	    		$http({
	    			method: 'DELETE',
	    			url : 'admin/provider/' + providername
	    		})
	    		.success(function(data){
	    			$scope.provider_message = "Provider " + providername + " deleted.";
					$scope.listProviderTable.reload();
	    		})
	    		.error(function(data){
	    			$scope.provider_message = data.error_description;
	    		});
	    	} else {
	    		$scope.provider_message = "";
	    	}						
	    };
	}
);