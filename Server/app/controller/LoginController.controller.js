app.controller('LoginController', function($scope, $http) {

    $scope.logout = function(){
    $http.post('http://localhost:3002/logout').then(function(response){console.log(response)})
  }

    $scope.loginUser = function()
    {     
        body = '{"email": "'+$scope.login+'", "password":"'+$scope.password+'"}'
        $http.post('http://localhost:3002/login', body).then(function(response){
          console.log(response)
          $scope.login = "";
          $scope.password = "";
          $http.get('http://localhost:3002/Vapp3/Accueil.html')
        });
    }
  });