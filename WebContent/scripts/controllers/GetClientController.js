AdminUtilityApp.controller('GetClientController',
     function($scope, $http) {

          console.log('Called the GetClientController')
             $http({
                          method  : 'GET',
                          url     : 'admin/client',
                      })
               .success(function(data) {
                              console.log(JSON.stringify(data));
                              $scope.clients =data;
                })
               .error(function(data){
                console.log('error');
            });
});
