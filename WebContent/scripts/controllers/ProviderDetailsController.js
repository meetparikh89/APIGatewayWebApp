AdminUtilityApp.controller("ProviderDetailsController",
	function($scope,$routeParams,$http) {
		console.log("To get Provider details");
		var providerId = $routeParams.provider;
		
		
		$http({
			method  : 'GET',
            url     : 'admin/provider/'+providerId,
		})
		.success(function(data) {
			$scope.providerId = providerId;
			$scope.providerInfo = data;
			//console.log(JSON.stringify(data));
			
//			<------------------ Use below code in case of multiple methods for single path -------------->
//			var capList =  new Array();
//			var lenCap = data.capabilities.length;
//			for (var itr=0; itr < lenCap; itr++) {
//				var objCap = data.capabilities[itr];
//				var capability = new Object();
//				capability["name"] = objCap["name"];
//				
//				var lenRoute = objCap.routes.length;
//				var routeList = new Array();
//				for (var itrRoute=0; itrRoute < lenRoute; itrRoute++) {
//					var objRoute = objCap.routes[itrRoute];
//					var route = new Object();
//					route["path"] = objRoute["path"];
//					var lenMethod = objRoute.methods.length;
//					var methods = "";
//					for(var itrM = 0; itrM < lenMethod; itrM++) {
//						if(methods.length > 0)
//							methods = methods + ",";
//						methods = methods + objRoute.methods[itrM];
//					}
//					route["methods"] = methods;
//					routeList.push(route);
//				}
//				capability["routes"] = routeList;
//				capList.push(capability);
//			}
			$scope.capabilities = data.capabilities;
			
		})
		.error(function(data){
			console.log("Error");
		}); 
		
		
	}
);