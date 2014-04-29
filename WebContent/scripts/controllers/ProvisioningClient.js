AdminUtilityApp.controller('ProvisioningClient', [ '$scope', '$http','ngTableParams',
		function($scope, $http,ngTableParams) {

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

			$scope.fetchProviderList = function() {
				$http({
					method : 'GET',
					url : 'admin/provider',
				}).success(function(data) {
					var result = new Array();
					for (var i = 0; i < data.length; i++) {
						var obj = data[i];
						result[i] = obj.id;
					}
					console.log(result);
					$scope.allproviderNames = result;
				}).error(function(data) {
					console.log(data);
					$scope.allproviderNames = "";
				});
			};
			
			$scope.fetchCapabilityList = function() {
				if(!($scope.providerName == null || $scope.providerName === undefined || $scope.providerName.trim() == '')){
					if($scope.capabilityName == null || $scope.capabilityName === undefined || $scope.capabilityName.trim() == ''){
						$http({
							method : 'GET',
							url : 'admin/provider/' + $scope.providerName,
						}).success(function(data) {
							console.log(data.capabilities);
							var result = new Array();
							for (var i = 0; i < data.capabilities.length; i++) {
								var obj = data.capabilities[i];
								result[i] = obj.name;
							}
							console.log(result);
							$scope.allCapabilityNames = result;
						}).error(function(data) {
							console.log(data);
							$scope.allCapabilityNames = "";
						});
					}
				}
			};

			
			$scope.fetchClientList();
			$scope.fetchProviderList();
			$scope.provisionNamesJSONObject = {};

			$scope.updateClient = function(typed) {
				$scope.clientNames = $scope.allclientNames;
			};
			
			$scope.updateProvider = function(typed){
				$scope.providerNames = $scope.allproviderNames;
			};
			
			$scope.updateCapability = function(typed){
				$scope.capabilityNames = $scope.allCapabilityNames;
			};
			
			$scope.addToTable = function(){
				$scope.add_error = "";
				$scope.submit_error = "";
				if(($scope.allCapabilityNames.indexOf($scope.capabilityName) != -1) && ($scope.allclientNames.indexOf($scope.clientName)!= -1) && ($scope.allproviderNames.indexOf($scope.providerName)!= -1)){
					var selectedProvision = {};
					selectedProvision['client'] = $scope.clientName;
					selectedProvision['provider'] = $scope.providerName;
					selectedProvision['capability'] = $scope.capabilityName;
					var selectedProvisionBase64 = CryptoJS.MD5(JSON.stringify(selectedProvision));				
					if($scope.provisionNamesJSONObject[selectedProvisionBase64] === undefined || $scope.provisionNamesJSONObject[selectedProvisionBase64] == null){
						$scope.provisionNamesJSONObject[selectedProvisionBase64] = selectedProvision;
					} else {
						$scope.add_error = "Already added to review.";
					}
				} else {
					$scope.add_error = "Please add valid data.";
				}
			};
			
			$scope.selectedCapabilitiesTable = new ngTableParams({
		        page: 1,            // show first page
		        count: 1,          // count per page
		        sorting: {
		            name: 'asc'     // initial sorting
		        }
		    }, {
		        total: 0,           // length of data
		        getData: $scope.provisionNamesJSONObject
		    });
			
			$scope.deleteProvision = function(provision){
				delete $scope.provisionNamesJSONObject[CryptoJS.MD5(JSON.stringify(provision))];
			};
			
			$scope.submitProvisions = function(){
				$scope.add_error = "";
				$scope.submit_error = "";
				if(Object.keys($scope.provisionNamesJSONObject).length < 1) {
					$scope.submit_error = "Please add some capabilities first.";
				} else {
					$scope.submitClicked = true;
					for(provision in $scope.provisionNamesJSONObject){
						$scope.submitProvisionsWorker(provision);
					}
				}
			};
			
			$scope.submitProvisionsWorker = function(provision){
				console.log($scope.provisionNamesJSONObject[provision]);
				$http({
					method : 'PUT',
					url : 'admin/client/' + $scope.provisionNamesJSONObject[provision].client + "/provider/" + $scope.provisionNamesJSONObject[provision].provider + "/capability/" + $scope.provisionNamesJSONObject[provision].capability
				})
				.success(function(data){
					console.log(data);
					$scope.provisionNamesJSONObject[provision].status = "Success";
					$scope.provisionNamesJSONObject[provision].colour = "GET";
				})
				.error(function(data){
					console.log(data);
					$scope.provisionNamesJSONObject[provision].status = "Error";
					$scope.provisionNamesJSONObject[provision].error = data.error_description;
					$scope.provisionNamesJSONObject[provision].colour = "DELETE";
				});
			};

			$scope.backButton = function(){
				window.history.back();
			};
			
		} ]);