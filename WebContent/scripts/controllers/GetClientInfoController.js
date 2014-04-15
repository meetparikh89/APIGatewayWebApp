AdminUtilityApp.controller('GetClientInfoController', function($scope,
		$routeParams, $http) {

	$scope.ClientInfo_message = '';
	$scope.clientId = $routeParams.client;
	$http({
		method : 'GET',
		url : 'admin/client/' + $scope.clientId,
	}).success(function(data) {
		$scope.ClientInfo = data;
	}).error(function(data) {
		$scope.ClientInfo_message = "Client not found.";
	});
});