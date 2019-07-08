app.controller('Accueil', function($scope, $http) {

  $http.get('http://localhost:3002/getUserCompany').then(function(response){
    $scope.User = response.data[0].company;
  })

  $scope.logout = function(){
  	console.log('inside function')
    $http.post('http://localhost:3002/logout').then(function(response){console.log(response)})
  }
  

  function getProject()
  {
    var str = window.location.search;
    str = str.substr(1);
    return str;
  }
})