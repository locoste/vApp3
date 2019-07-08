app.controller('AllProjectInformation', function($scope, $http) {
    $http({method : "GET", url : 'http://localhost:3002/AllProjectInformation'}, {headers : {'Content-Type':'application/json'}}).then(function(response) {
        console.log("response: ",response.data);
        $scope.projectInformation = response.data;
    });

    $http.get('http://localhost:3002/getUserCompany').then(function(response){
      $scope.User = response.data[0].company;
    })
    
    $scope.logout = function(){
    $http.post('http://localhost:3002/logout').then(function(response){
      console.log(response)})
  }
  

    function getProject()
    {
      var str = window.location.search;
      str = str.substr(1);
      return str;
    }
});