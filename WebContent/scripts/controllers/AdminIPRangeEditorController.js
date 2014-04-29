AdminUtilityApp.controller('AdminIPRangeEditorController',
	function($scope,$http) {
		
		var oldData = null; 
		var removedRanges = null;
		$scope.rangeCount = 1;
	
		$scope.getRange = function(){
			$http({
				method  : 'GET',
				url     : 'admin/alladmins/iprange',
		    })
		    .success(function(data) {
		    	console.log("Success in getting admin list");
		        console.log(JSON.stringify(data));
		        
		        if(data != null) {
		        	oldData = new Object();
		        	for (var itr = 0; itr < data.length; itr++) {
		        		var objRange = new Object();
		        		objRange["name"] = data[itr].name;
		        		objRange["from"] = data[itr].from;
		        		objRange["to"] = data[itr].to;
		        		oldData[itr+1] = objRange;
		        		data[itr]["id"] = itr+1;
		        		data[itr]["enabled"] = true;
		        	}
		        }
		        
		        $scope.ipRanges = data;
		    })
		    .error(function(data){
		    	console.log('error');
		    });
		};
		
		$scope.getRange();
		
		$scope.isEditable = function (range) {
			return range.enabled;
		};
		
		$scope.addRanges = function() {
			for (var itr = 0; itr < $scope.rangeCount; itr++) {
				var objNewRange = new Object();
				objNewRange["id"] = 0;
				objNewRange["name"] = "";
				objNewRange["from"] = "";
				objNewRange["to"] = "";
				objNewRange["enabled"] = false;
				$scope.ipRanges.push(objNewRange);
			}
		};
		
		$scope.removeRange = function(range) {
			if(range.id > 0) {
				if(removedRanges == null)
					removedRanges = new Array();
				removedRanges.push(range);
			}
			//var index = ipRanges.indexOf(range); // it is not working so iterate using loop
			var index = -1;
			for (var itr = 0; itr < $scope.ipRanges.length; itr++) {
				if(range == $scope.ipRanges[itr]){
					index = itr;
					break;
				}
			}
			if(index != -1)
				$scope.ipRanges.splice(index, 1);
		};
		
		function generateDataObject(range){
			var bodyData = {};
			bodyData['from'] = range.from;
			bodyData['to'] = range.to;
			return bodyData;
		}
		
		$scope.save = function() {
			
			for (var itr = 0; itr < $scope.ipRanges.length; itr++) {
				var range = $scope.ipRanges[itr];
				var bodyData = generateDataObject(range);
				if(range.id == 0) {
					$http({
						method: 'PUT',
						url : 'admin/alladmins/iprange/' + range.name,
						data : bodyData
					})
					.success(function(data){
						console.log("Added successfully");
					})
					.error(function(data){
						console.log("Error occurred.");
					});
				} else {
					var oldRange = oldData[range.id];
					if(range.from != oldRange.from || range.to != oldRange.to) {
						console.log(range.name + " Edited");$http({
							method: 'POST',
							url : 'admin/alladmins/iprange/' + range.name,
							data : bodyData
						})
						.success(function(data){
							console.log("Updated successfully");
						})
						.error(function(data){
							console.log("Error occurred.");
						});
					}
				}
				
			}
			
			if(removedRanges != null) {
				for (var itr = 0; itr < removedRanges.length; itr++) {
					var range = removedRanges[itr];
					$http({
						method: 'DELETE',
						url : 'admin/alladmins/iprange/' + range.name,
					})
					.success(function(data){
						console.log("removed successfully");
					})
					.error(function(data){
						console.log("Error occurred.");
					});
				}				
			}
			
		};
	}
);