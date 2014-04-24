AdminUtilityApp
		.controller(
				'ConfirmationPageController',
				function($scope, $http, ConfirmationDataFactory) {
					console.log('Called the Confirmation Page Controller');
					$scope.clientName = ConfirmationDataFactory.getClientName();
					var password = ConfirmationDataFactory.getPassword();
					var validityValue = ConfirmationDataFactory.getValidity();
					$scope.allIPRanges = ConfirmationDataFactory
							.getAllIPRanges();
					console.log("All IP Ranges"
							+ JSON.stringify($scope.allIPRanges));
					$scope.deleteIPRanges = ConfirmationDataFactory
							.getIPRangesToBeDeleted();
					$scope.addIPRanges = ConfirmationDataFactory
							.getIPRangesToBeAdded();
					console.log("Deleted ranges"
							+ JSON.stringify($scope.deleteIPRanges));
					console.log("Adding range"
							+ JSON.stringify($scope.addIPRanges));

					$scope.back = function() {
						window.history.back();
					};

					$scope.submit = function() {
						console.log("Is Update in confirmation page "
								+ ConfirmationDataFactory.getUpdateRequest());
						var errorFoundInCred = false;
						var errorFoundInIP = false;
						if (!ConfirmationDataFactory.getUpdateRequest()) {
							console.log("Inside Create Part");
							$http({
								method : 'PUT',
								url : 'admin/client/' + $scope.clientName,
							})
									.success(
											function(data) {
												
												if (!(password == ''
														|| password === undefined || password == null)) {
													console
															.log("Inside Password request");
													$http(
															{
																method : 'POST',
																url : 'admin/client/'
																		+ $scope.clientName
																		+ '/credentials',
																data : {
																	"password" : password,
																	"validity_period" : validityValue
																}
															})
															.success(
																	function(
																			data) {
																		console
																				.log(JSON
																						.stringify(data));
																	})
															.error(
																	function(
																			data) {
																		errorFoundInCred = true;
																	});
												}
												for (var i = 0; i < $scope.addIPRanges.length; i++) {

													console
															.log(" Inside Iprange");
													$http(
															{
																method : 'PUT',
																url : 'admin/client/'
																		+ $scope.clientName
																		+ '/iprange/'
																		+ $scope.addIPRanges[i].name,
																data : {
																	"from" : $scope.addIPRanges[i].from,
																	"to" : $scope.addIPRanges[i].to
																}
															})
															.error(
																	function(
																			data) {
																		errorFoundInIP = true;
																	});
												}

												if (errorFoundInIP == false
														&& errorFoundInCred == false) {
													$scope.confirmation_message = 'Successfully created user.';
												} else {
													var error_scenarios='';
													if (errorFoundInCred == true
															&& errorFoundInIP == false) {
														error_scenarios = 'Credentials.';
													}
													if (errorFoundInCred == false
															&& errorFoundInIP == true) {
														error_scenarios = 'IP Ranges.';
													}
													if (errorFoundInCred == true
															&& errorFoundInIP == true) {
														error_scenarios = 'credentials and IP Ranges.';
													}
													$scope.confirmation_message = 'User created but unable to set '
															+ error_scenarios;
												}

											})

									.error(
											function(data) {
												console
														.log(data.error_description);
												$scope.confirmation_message = 'Unable to create client.';
											});

						}
						;

						// Update Part starts here.

						if ((password != '' || password != undefined || password != null)
								&& ConfirmationDataFactory.getUpdateRequest()) {
							
							console.log("Inside Password request for update");
							$http(
									{
										method : 'POST',
										url : 'admin/client/'
												+ $scope.clientName
												+ '/credentials',
										data : {
											"password" : password,
											"validity_period" : validityValue
										}
									}).success(function(data) {
								console.log("Added password Successfully");
							}).error(function(data, status) {
								console.log("Post password failed");
								errorFoundInCred = true;
							});
						}
						if (ConfirmationDataFactory.getUpdateRequest()) {
							console.log(" Inside Iprange");
							for (var i = 0; i < $scope.deleteIPRanges.length; i++) {
								$http(
										{
											method : 'DELETE',
											url : 'admin/client/'
													+ $scope.clientName
													+ '/iprange/'
													+ $scope.deleteIPRanges[i].name
										}).success(function(data) {
									console.log("Ip Deleted Successfully");
									console.log(JSON.stringify(data));
									$scope.clients = data;
								}).error(function(data) {
									console.log('error');
									errorFoundInIP=true;
								});
							}

							for (var i = 0; i < $scope.addIPRanges.length; i++) {

								console.log("Adding IP Ranges");
								var from = $scope.addIPRanges[i].from
										.toString();
								var to = $scope.addIPRanges[i].to.toString();
								var name = $scope.addIPRanges[i].name;
								$http(
										{
											method : 'PUT',
											url : 'admin/client/'
													+ $scope.clientName
													+ '/iprange/' + name,
											data : {
												"from" : from,
												"to" : to
											}
										}).success(function(data) {
									console.log("Ip added Successfully");
								}).error(function(data) {
									console.log('error');
									errorFoundInIP =true;
								});
							}
						}
						if (errorFoundInIP == false
								&& errorFoundInCred == false) {
							$scope.confirmation_message = 'Successfully Updated User.';
						} else {
							var error_scenarios='';
							if (errorFoundInCred == true
									&& errorFoundInIP == false) {
								error_scenarios = 'Credentials.';
							}
							if (errorFoundInCred == false
									&& errorFoundInIP == true) {
								error_scenarios = 'IP Ranges.';
							}
							if (errorFoundInCred == true
									&& errorFoundInIP == true) {
								error_scenarios = 'credentials and IP Ranges.';
							}
							$scope.confirmation_message = 'Unable to set '
									+ error_scenarios;
						}
					};

				});