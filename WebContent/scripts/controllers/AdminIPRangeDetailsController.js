AdminUtilityApp.controller('AdminIPRangeDetailsController',
	function($scope,$http,ngTableParams) {
		
		$scope.getRange = function(){
			$http({
				method  : 'GET',
				url     : 'admin/alladmins/iprange',
		    })
		    .success(function(data) {
		    	console.log("Success in getting admin list");
		        console.log(JSON.stringify(data));
		        $scope.ipRanges = data;
		    })
		    .error(function(data){
		    	console.log('error');
		    });
		};
		
		$scope.listRangeTable = new ngTableParams({
	        page: 1,            // show first page
	        count: 1,          // count per page
	        sorting: {
	            name: 'asc'     // initial sorting
	        }
	    }, {
	        total: 0,           // length of data
	        getData: function($defer, params) {
	        	$scope.getRange();
                $defer.resolve($scope.ipRanges);
	        }
	    });

	    $scope.deleteIPRange = function(name){
	    	var confirmation = window.confirm("Are you sure you want to delete this Range.\nCaution : This cannot be undone.");
	    	if (confirmation == true) {
	    		$http({
					method: 'DELETE',
					url : 'admin/alladmins/iprange/' + name,
				})
				.success(function(data){
					console.log("removed successfully");
					$scope.listRangeTable.reload();
				})
				.error(function(data){
					console.log("Error occurred.");
				});
	    	} else {
	    		$scope.admin_message = "";
	    	}						
	    };
	}
);