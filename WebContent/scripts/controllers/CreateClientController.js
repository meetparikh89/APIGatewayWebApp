// AdminUtilityApp.controller('CreateClientController',
// 		function($scope,$http) {
// 			$scope.createClient = function() {
// 				if($scope.createclient_name == undefined || $scope.createclient_name == ''){
// 					$scope.createclient_message = "Please enter client name.";
// 				} else {
// 					$http({
// 		        	    method: 'PUT',
// 		        	    url: 'admin/client/' + $scope.createclient_name,
// 		        	})
// 		        	.success(function(data){
// 		        		$scope.createclient_message = "Client " + $scope.createclient_name + " created.";
// 		        	})
// 		        	.error(function(data){
// 		        		$scope.createclient_message = data.error_description;
// 		        	});
// 				}
// 			};
// });
AdminUtilityApp
		.controller(
				'CreateClientController',
				function($scope, $http, $location, ConfirmationDataFactory) {
					
					$scope.IPranges = [ {
						'id' : "IP1"
					} ];
					
					$scope.addNewIPRange = function() {
						var newItemNo = $scope.IPranges[$scope.IPranges.length - 1].id + 1;
						$scope.IPranges.push({
							'id' : 'IP' + newItemNo,
						});
					};

					$scope.AddIPRange = function(IPrange) {
						return IPrange.id === $scope.IPranges[$scope.IPranges.length - 1].id;
					};

					$scope.DeleteIPRange = function(IPRange) {
						$scope.IPranges.splice(IPRange, 1);
					};

					$scope.Delete = function(IPrange) {
						return !(IPrange.id === $scope.IPranges[$scope.IPranges.length - 1].id);
					};


					$scope.ValidateIPaddress = function(ipaddress) {
 						if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)){
    						return true;
  						}
						return false;
					}

					// $scope.checkClient = function() {
					// 	$http({
					// 		method : 'GET',
					// 		url : 'admin/client/' + $scope.clientName
					// 	}).success(function(data) {
					// 		alert("Client is Already Present");
					// 		$scope.name = "";
					// 	}).error(function(data) {
					// 		console.log('error');

					// 	});
					// };
					$scope.createClient = function() {

						if($scope.clientName == undefined || $scope.clientName == '' || $scope.clientName == null){
							$scope.createClient_message = 'Please enter client name.';
						} else if($scope.password != $scope.confirmpassword){
							$scope.createClient_message = 'Password mismatch.';
						} else {
							var errorOccured = false;
						var addArray = [];
						console.log("IPRangeCheckBox" + $scope.IPRangeCheckBox);
						if ($scope.IPRangeCheckBox) {

							for (var i = 0; i < $scope.IPranges.length; i++) {
								if($scope.ValidateIPaddress($scope.IPranges[i].to) == true && $scope.ValidateIPaddress($scope.IPranges[i].from) == true){
									addArray.push($scope.IPranges[i]);
								} else {
									$scope.createClient_message = 'Invalid IP Address entered.';
									errorOccured = true;
									break;
								}
							}

							ConfirmationDataFactory.setAddIPRanges(addArray);
							ConfirmationDataFactory.setAllIPRanges(addArray);

						}

						if(errorOccured == false){
						ConfirmationDataFactory.setValidity($scope.validityPeriod);
						ConfirmationDataFactory.setClientName($scope.clientName.toLowerCase());
						ConfirmationDataFactory.setPassword($scope.password);
						
						ConfirmationDataFactory.setUpdateRequest(false);
						$location.path("/confirmationPage");
						}
					}
					};
				});