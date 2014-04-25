AdminUtilityApp.controller('ProvisioningClient', [ '$scope', '$http',
		function($scope, $http) {

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

			$scope.fetchClientList();
			$scope.fetchProviderList();

			$scope.updateClient = function(typed) {
				$scope.clientNames = $scope.allclientNames;
			};
			
			$scope.updateProvider = function(typed){
				$scope.providerNames = $scope.allproviderNames;
			};

		} ]);