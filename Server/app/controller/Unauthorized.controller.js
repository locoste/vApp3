app.controller('unauthorized', function($scope, $http) {

    $http.get('http://localhost:3002/getUserCompany').then(function(response){
      $scope.User = response.data.companies[0].company;
    })

  $scope.logout = function(){
    $http.post('http://localhost:3002/logout').then(function(response){console.log(response)})
  }
});