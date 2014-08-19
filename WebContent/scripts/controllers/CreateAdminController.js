AdminUtilityApp
		.controller(
				'CreateAdminController',
				[
						'$scope',
						'$http',
						'$location',
						'$routeParams',
						function($scope, $http, $location, $routeParams) {
							$scope.loader = true;
							var admin = $routeParams.admin;
							console.log(admin);
							$scope.isUpdate = false;

							$scope.createAdmin_message = '';
							$scope.createAdmin_Sucmessage = '';

							if (admin != null && admin != undefined
									&& admin != '') {
								$scope.isUpdate = true;
								$http({
									method : 'GET',
									url : 'admin/admin/' + admin,
								}).success(function(data) {
									$scope.adminName = admin;
								});

							}
							$scope.isEditable = function(range) {
								return range.enabled;
							};
							$scope.getRange = function() {
								$http({
									method : 'GET',
									url : 'admin/alladmins/iprange',
								})
										.success(
												function(data) {
													console
															.log("Success in getting admin list");
													console.log(JSON
															.stringify(data));
													$scope.ipRanges = data;
													if (data != null) {
														oldData = new Object();
														for ( var itr = 0; itr < data.length; itr++) {
															var objRange = new Object();
															objRange["name"] = data[itr].name;
															objRange["from"] = data[itr].from;
															objRange["to"] = data[itr].to;
															oldData[itr + 1] = objRange;
															data[itr]["id"] = itr + 1;
															data[itr]["enabled"] = true;
														}
													}

												}).error(function(data) {
											console.log('error');
										});
							};
							$scope.getRange();

							$scope.deleteIPRange = function(name) {
								var confirmation = window
										.confirm("Are you sure you want to delete this Range.\nCaution : This cannot be undone.");
								if (confirmation == true) {
									$http(
											{
												method : 'DELETE',
												url : 'admin/alladmins/iprange/'
														+ name,
											}).success(function(data) {
										console.log("removed successfully");
										$scope.listRangeTable.reload();
									}).error(function(data) {
										console.log("Error occurred.");
									});
								} else {
									$scope.admin_message = "";
								}
							};
							var oldData = null;
							var removedRanges = null;
							$scope.rangeCount = 1;
							$scope.creationMessage = "";

							$scope.addRanges = function() {
								for ( var itr = 0; itr < $scope.rangeCount; itr++) {
									var objNewRange = new Object();
									objNewRange["id"] = 0;
									objNewRange["name"] = "";
									objNewRange["from"] = "";
									objNewRange["to"] = "";
									objNewRange["enabled"] = false;
									$scope.ipRanges.push(objNewRange);
								}
							};
							$scope.save = function() {
								// $scope.loader = true;
								var isError = false;
								for ( var itr = 0; itr < $scope.ipRanges.length; itr++) {
									var range = $scope.ipRanges[itr];
									var bodyData = generateDataObject1(range);
									document.getElementById('loader').style.display = 'block';
									if (range.id == 0) {
										$http(
												{
													method : 'PUT',
													url : 'admin/alladmins/iprange/'
															+ range.name,
													data : bodyData
												})
												.success(
														function(data) {
															console
																	.log("Added successfully");
															$scope.creationMessage = "IP Ranges saved successfully.";
															document
																	.getElementById('loader').style.display = 'none';
														})
												.error(
														function(data) {
															isError = true;
															console
																	.log("Error occurred.");
															$scope.creationMessage = "IP Ranges could not be added. Please try again";
															document
																	.getElementById('loader').style.display = 'none';
														});
									} else {
										var oldRange = oldData[range.id];
										if (range.from != oldRange.from
												|| range.to != oldRange.to) {
											console.log(range.name + " Edited");
											$http(
													{
														method : 'POST',
														url : 'admin/alladmins/iprange/'
																+ range.name,
														data : bodyData
													})
													.success(
															function(data) {
																console
																		.log("Updated successfully");
																$scope.creationMessage = "IP Ranges updated successfully.";
																document.getElementById('loader').style.display = 'none';
															})
													.error(
															function(data) {
																isError = true;
																console
																		.log("Error occurred.");
																$scope.creationMessage = "IP Ranges could not be updated. Please try again";
																document
																		.getElementById('loader').style.display = 'none';
															});
										} 

									}

								}
								document.getElementById('loader').style.display = 'none';

								if (removedRanges != null) {
									for ( var itr = 0; itr < removedRanges.length; itr++) {
										var range = removedRanges[itr];
										$http(
												{
													method : 'DELETE',
													url : 'admin/alladmins/iprange/'
															+ range.name,
												})
												.success(
														function(data) {
															console
																	.log("removed successfully");
															$scope.creationMessage = "IP Ranges removed successfully.";
															document.getElementById('loader').style.display = 'none';

														})
												.error(
														function(data) {
															isError = true;
															console
																	.log("Error occurred.");
															$scope.creationMessage = "IP Ranges could not be removed. Please try again";
															document.getElementById('loader').style.display = 'none';

														});
									}
								}

							};
							$scope.removeRange = function(range) {
								var confirmation = window
										.confirm("Are you sure you want to delete this Range.\nCaution : This cannot be undone.");
								if (confirmation == true) {
									if (range.id > 0) {
										if (removedRanges == null)
											removedRanges = new Array();
										removedRanges.push(range);
									}
									// var index = ipRanges.indexOf(range); //
									// it is
									// not working so iterate using loop
									var index = -1;
									for ( var itr = 0; itr < $scope.ipRanges.length; itr++) {
										if (range == $scope.ipRanges[itr]) {
											index = itr;
											break;
										}
									}
									if (index != -1)
										$scope.ipRanges.splice(index, 1);
								}
								$scope.save();
							};
							function validateInput() {
								if ($scope.adminName == null
										|| $scope.adminName === undefined
										|| $scope.adminName.trim() == '') {
									$scope.createAdmin_message = "Admin Name cannot be empty.";
									return false;
								}

								if ($scope.password == null
										|| $scope.password === undefined
										|| $scope.password.trim() == '') {
									$scope.createAdmin_message = "Password cannot be empty.";
									return false;
								}

								if ($scope.confirmPassword == null
										|| $scope.confirmPassword === undefined
										|| $scope.confirmPassword.trim() == '') {
									$scope.createAdmin_message = "Confirm Password cannot be empty.";
									return false;
								}

								if ($scope.password.trim() != $scope.confirmPassword
										.trim()) {
									$scope.createAdmin_message = "Password and Confirm Password does not match.";
									return false;
								}

								return true;
							}

							function generateDataObject() {
								var bodyData = {};
								bodyData['password'] = $scope.password;
								return bodyData;
							}
							function generateDataObject1(range) {
								var bodyData = {};
								bodyData['from'] = range.from;
								bodyData['to'] = range.to;
								return bodyData;
							}
							$scope.saveAdmin = function() {
								if (validateInput()) {
									var bodyData = generateDataObject();
									console.log(bodyData);
									if ($scope.isUpdate) {
										$http(
												{
													method : 'POST',
													url : 'admin/admin/'
															+ $scope.adminName,
													data : bodyData
												})
												.success(
														function(data) {
															$scope.createAdmin_message = '';
															$scope.createAdmin_Sucmessage = 'Admin updated successfully.';
														})
												.error(
														function(data) {
															$scope.createAdmin_message = data.error_description;
															$scope.createAdmin_Sucmessage = '';
														});
									} else {
										$http(
												{
													method : 'PUT',
													url : 'admin/admin/'
															+ $scope.adminName,
													data : bodyData
												})
												.success(
														function(data) {
															console
																	.log(JSON
																			.stringify(data));
															$scope.createAdmin_message = '';
															$scope.createAdmin_Sucmessage = 'Admin created successfully.';
														})
												.error(
														function(data) {
															$scope.createAdmin_message = data.error_description;
															$scope.createAdmin_Sucmessage = '';
														});
									}
								}
							};
						} ]);
