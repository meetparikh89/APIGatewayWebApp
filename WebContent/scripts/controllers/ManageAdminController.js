AdminUtilityApp.controller('ManageAdminController',
	function($scope,$http,ngTableParams) {
		
		$scope.getAdmin = function(){
			$http({
				method  : 'GET',
				url     : 'admin/admin',
		    })
		    .success(function(data) {
		    	console.log("Success in getting admin list");
		        console.log(JSON.stringify(data));
		        $scope.admins = data;
		    })
		    .error(function(data){
		    	console.log('error');
		    });
		};
		
		$scope.listAdminTable = new ngTableParams({
	        page: 1,            // show first page
	        count: 1,          // count per page
	        sorting: {
	            name: 'asc'     // initial sorting
	        }
	    }, {
	        total: 0,           // length of data
	        getData: function($defer, params) {
	        	$scope.getAdmin();
                $defer.resolve($scope.admins);
	        }
	    });

	    $scope.deleteAdmin = function(adminName){
	    	var confirmation = window.confirm("Are you sure you want to delete this admin.\nCaution : This cannot be undone.");
	    	if (confirmation == true) {
	    		$http({
	    			method: 'DELETE',
	    			url : 'admin/admin/' + adminName
	    		})
	    		.success(function(data){
	    			$scope.admin_message = "Admin " + adminName + " deleted.";
					$scope.listAdminTable.reload();
	    		})
	    		.error(function(data){
	    			$scope.admin_message = data.error_description;
	    		});
	    	} else {
	    		$scope.admin_message = "";
	    	}						
	    };
	}
);