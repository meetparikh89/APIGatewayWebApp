AdminUtilityApp.controller('GetClientInfoController',
     function($scope, $routeParams,$http) {

          console.log('Called the GetClientInfoController');
          var clientId = $routeParams.client;
       
             $http({
                          method  : 'GET',
                          url     : 'admin/client/'+clientId,
                      })
               .success(function(data) {
                              console.log(JSON.stringify(data));
                              var updatedList = new Array();
                              var len = data.provisions.length;
                              console.log(len);
                              $scope.ClientInfo =data;
                              for (var itr=0; itr < len; itr++) {
                            	  var objProvision = data.provisions[itr];
                            	  var strKey = objProvision.provision_key.provider_id;
                            	  var toSetData = new Object();
                            	  var blnFound = false;
                            	  for (var i=0;i < updatedList.length; i++) {
                            		  var tempData = updatedList[i];
                            		  if(tempData["key"] == strKey) {
                            			  blnFound = true;
                            			  toSetData = tempData;
                            			  break;
                            		  }
                            	  }
                            	  
                            	  if(blnFound) {
                            		  toSetData["key"] = objProvision.provision_key.provider_id;
                            		  toSetData["value"] = (toSetData["value"] + ", " + objProvision.provision_key.capability_id);
                            	  } else {
                            		  toSetData["key"] = objProvision.provision_key.provider_id;
                            		  toSetData["value"] = objProvision.provision_key.capability_id;
                            		  updatedList.push(toSetData);
                            	  }
                              }
                              $scope.provisions =updatedList;
                })
               .error(function(data){
                console.log('error');
            });
             
       
             
             $http({
                 method  : 'GET',
                 url     : 'admin/client/'+clientId+'/iprange',
             })
      .success(function(data) {
    	  console.log(JSON.stringify(data));
    	  $scope.ipRange = data;
      }).error(function(data){
    	  console.log('error');
      });
             
             
});



