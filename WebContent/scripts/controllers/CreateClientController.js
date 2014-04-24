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
				function($scope, $http, $location, $routeParams,
						ConfirmationDataFactory) {

					var OldIPranges = [];
					$scope.clientName = $routeParams.client;
					$scope.IPranges = [ {
						'id' : "IP1"
					} ];
					ConfirmationDataFactory.setUpdateRequest(false);
					console.log("Update Client Controller is called");
					console.log("Client NAme is " + $scope.clientName);
					if ($scope.clientName != null
							&& $scope.clientName != undefined
							&& $scope.clientName != '') {

						ConfirmationDataFactory.setUpdateRequest(true);
						$scope.ClientTextBox = true;
						$http(
								{
									method : 'GET',
									url : 'admin/client/' + $scope.clientName
											+ '/iprange'
								}).success(function(data) {
							console.log(JSON.stringify(data));

							OldIPranges = angular.copy(data);
							console.log("data value " + JSON.stringify(data));
							if (data != null && data != '') {
								console.log("Inside data");
								$scope.IPranges = data;

							} else {
								$scope.IPranges = [ {
									'id' : "IP1"
								} ];
							}
						}).error(function(data) {
							console.log('error');

						});
					}

					console.log("is Updated Request ="
							+ ConfirmationDataFactory.getUpdateRequest());
					if (!ConfirmationDataFactory.getUpdateRequest()) {
						$scope.checkClient = function() {
							console.log("Inside checkClient");
							$http({
								method : 'GET',
								url : 'admin/client/' + $scope.clientName
							}).success(function(data) {
								$scope.clientName = "";
							}).error(function(data) {
								console.log('error');

							});
						};
					}
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
						if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
								.test(ipaddress)) {
							return true;
						}
						return false;
					};

					console.log($scope.clientName);
					$scope.createClient = function() {
						if (ConfirmationDataFactory.getUpdateRequest()) {
							if ($scope.password != $scope.confirmpassword) {
								$scope.createClient_message = 'Password mismatch.';
							} else {
								//var myMap = new Map();
								var myMap = {};
								var deleteArray = [];
								var addArray = [];
								var ignoreArray = [];
								for (var i = 0; i < $scope.IPranges.length; i++) {

									if ($scope
											.ValidateIPaddress($scope.IPranges[i].to) == true
											&& $scope
													.ValidateIPaddress($scope.IPranges[i].from) == true) {
										myMap[$scope.IPranges[i].name] = $scope.IPranges[i];
										//myMap.set($scope.IPranges[i].name,$scope.IPranges[i]);
										//addArray.push(myMap.get($scope.IPranges[i].name));
										addArray.push(myMap[$scope.IPranges[i].name]);
										console.log("Set in the map"
												+ $scope.IPranges[i].name);
									} else {
										$scope.createClient_message = 'Invalid IP Address entered.';
										errorOccured = true;
										break;
									}

								}
								var AllIpArray = angular.copy(addArray);
								ConfirmationDataFactory
										.setAllIPRanges(AllIpArray);

								for (var i = 0; i < OldIPranges.length; i++) {
									console.log("Old Ip ranges inside for "
											+ JSON.stringify(OldIPranges));
									if(OldIPranges[i].name in myMap){
									//if (myMap.has(OldIPranges[i].name)) {
										console.log("Found in the map"
												+ OldIPranges[i].name);
										var newIP = myMap[OldIPranges[i].name];
										//var newIP = myMap.get(OldIPranges[i].name);
										console.log(JSON
												.stringify(OldIPranges[i]));
										console.log(JSON.stringify(newIP));
										if (angular.equals(newIP.from,
												OldIPranges[i].from)
												&& angular.equals(newIP.to,
														OldIPranges[i].to)) {
											console.log("Inside IF the map"
													+ OldIPranges[i].name);
											ignoreArray.push(myMap[newIP.name]);
											//ignoreArray.push(myMap.get(newIP.name));
											//addArray.splice(myMap.get(newIP.name), 1);
											addArray.splice(myMap[newIP.name], 1);
										} else {
											//deleteArray.push(myMap.get(OldIPranges[i].name));
											deleteArray.push(myMap[OldIPranges[i].name]);
											//addArray.push(myMap.get(newIP.name));
											addArray.push(myMap[newIP.name]);
										}
									} else {
										console
												.log("i ="
														+ i
														+ "deleted Element "
														+ JSON
																.stringify(OldIPranges[i]));
										deleteArray.push(OldIPranges[i]);
									}
								}

								console.log("Adding elements " + addArray);
								console.log("Deleting elements " + deleteArray);
								console.log("Existing elements " + ignoreArray);
								ConfirmationDataFactory
										.setValidity($scope.validityPeriod);
								ConfirmationDataFactory
										.setClientName($scope.clientName
												.toLowerCase());
								ConfirmationDataFactory
										.setPassword($scope.password);
								ConfirmationDataFactory
										.setDeleteIPRanges(deleteArray);
								ConfirmationDataFactory
										.setAddIPRanges(addArray);
								$location.path("/confirmationPage");
							}
						}
						;

						if (ConfirmationDataFactory.getUpdateRequest() == false) {

							if ($scope.clientName == undefined
									|| $scope.clientName == ''
									|| $scope.clientName == null) {
								$scope.createClient_message = 'Please enter client name.';
							} else if ($scope.password != $scope.confirmpassword) {
								$scope.createClient_message = 'Password mismatch.';
							} else {
								var errorOccured = false;
								var addArray = [];
								console.log("IPRangeCheckBox"
										+ $scope.IPRangeCheckBox);
								if ($scope.IPRangeCheckBox) {

									for (var i = 0; i < $scope.IPranges.length; i++) {
										if ($scope
												.ValidateIPaddress($scope.IPranges[i].to) == true
												&& $scope
														.ValidateIPaddress($scope.IPranges[i].from) == true) {
											addArray.push($scope.IPranges[i]);
										} else {
											$scope.createClient_message = 'Invalid IP Address entered.';
											errorOccured = true;
											break;
										}
									}

									ConfirmationDataFactory
											.setAddIPRanges(addArray);
									ConfirmationDataFactory
											.setAllIPRanges(addArray);

								}

								if (errorOccured == false) {
									ConfirmationDataFactory
											.setValidity($scope.validityPeriod);
									ConfirmationDataFactory
											.setClientName($scope.clientName
													.toLowerCase());
									ConfirmationDataFactory
											.setPassword($scope.password);

									ConfirmationDataFactory
											.setUpdateRequest(false);
									$location.path("/confirmationPage");
								}
							}

						}
						;

					};

				});