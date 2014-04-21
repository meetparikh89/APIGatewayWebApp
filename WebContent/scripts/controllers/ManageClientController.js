AdminUtilityApp
		.controller(
				'ManageClientController',
				function($scope, $http,ngTableParams) {
					
					$scope.getClientList = function(){
						$http({
							method : 'GET',
							url : 'admin/client',
						}).success(function(data) {
							console.log(JSON.stringify(data));
							$scope.clients = data;
						}).error(function(data) {
							console.log('error');
						});
					};
					
					$scope.getClientList();
					
					$scope.listClientTable = new ngTableParams({
				        page: 1,            // show first page
				        count: 10,          // count per page
				        sorting: {
				            name: 'asc'     // initial sorting
				        }
				    }, {
				        total: 0,           // length of data
				        getData: function($defer, params) {
				        	$scope.getClientList();
				        	//params.total($scope.clients.total);
		                    // set new data
				        	//params.total(JSON.parse(JSON.stringify($scope.clients)).length);
		                    $defer.resolve($scope.clients);
				        }
				    });
					
					$scope.deleteClient = function(clientname) {
						$scope.client_message = "Please wait..";
						var confirmation = window
								.confirm("Are you sure you want to delete this client.\nCaution : This cannot be undone.");
						if (confirmation == true) {
							$http(
									{
										method : 'DELETE',
										url : 'admin/client/' + clientname
									})
									.success(
											function(data) {
												$scope.client_message = "Client "
														+ clientname
														+ " deleted.";
												$scope.listClientTable.reload();
											})
									.error(
											function(data) {
												$scope.client_message = data.error_description;
											});
						} else {
							$scope.client_message = "";
						}
					};
				});
