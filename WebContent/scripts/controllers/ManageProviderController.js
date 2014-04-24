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
		}
		//$scope.getProviders();
		
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
	}
);