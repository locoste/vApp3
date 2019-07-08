app.controller('UserPage', function($scope, $http) {
  var project = getProject();

  $http.get('http://localhost:3002/getUserCompany').then(function(response){
    $scope.User = response.data[0].company;
    $scope.company = response.data[0].company;
    $http.get('http://localhost:3002/getUserInformation').then(function(responseUser){
      $scope.login = responseUser.data[0].login;
      $http.get('http://localhost:3002/getCompanyInformation').then(function(responseCompany){
        $scope.email= responseCompany.data[0].email;
        $scope.contact = responseCompany.data[0].contact;
        $scope.phone_number = responseCompany.data[0].phone_number;
      })
    })
  })

  $scope.ChangeUser = function()
  {
    if($scope.password==$scope.repassword){
      var body = '{"login":"'+$scope.login+'", "company":"'+$scope.company+'", "password":"'+$scope.password+'","contact":"'+$scope.contact+'","email":"'+$scope.email+'","phone_number":"'+$scope.phone_number+'"}'
      $http.post('http://localhost:3002/updateUser', body).then(alert('user upadted with success'))
    }
    else
    {
      alert('password have to be the same');
    }
  }

  function getProject()
  {
    var str = window.location.search;
    str = str.substr(1);
    return str;
  }
});