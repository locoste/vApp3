app.controller('NewUser', function($scope, $http, config) {
  const url = config.api_url;
  const port = config.api_port;
  const alf_url = config.alf_url;
  const alf_port = config.alf_port;
  const scan_url = config.scan_url;
  const scan_port = config.scan_port;
      

    $scope.createUser = function(){
      console.log('in')
      var ticket;
      var folder = '{"managers":[{"manager":"Manager1test"}],"folders":[{"Eid":"","name":"'+$scope.company+'"}]}'
      if($scope.password==$scope.repeatpassword){
        body = '{"company":"' + $scope.company + '", "contact":"' + $scope.contact + '", "email":"' + $scope.email + '", "phone_number":"' + $scope.phone_number + '", "login":"' + $scope.login + '", "password":"' + $scope.password + '"}'
        $http.post('http://'+url+':'+port+'/createUser', body).then(function(response){
          alert(JSON.stringify(response));
          //$http.get('http://'+url+':'+port+'/');
        })
      }
      else {
        alert('both password should be the same');
        $scope.password = "";
        $scope.repeatpassword = "";
      }
    }
    

    function getProject()
    {
      var str = window.location.search;
      str = str.substr(1);
      return str;
    }
  });