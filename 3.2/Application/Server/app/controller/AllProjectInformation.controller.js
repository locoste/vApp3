app.controller('AllProjectInformation', function($scope, $http, config) {
  const url = config.api_url;
  const port = config.api_port;
  const alf_url = config.alf_url;
  const alf_port = config.alf_port;
  const scan_url = config.scan_url;
  const scan_port = config.scan_port;
  
    $http.get('http://'+url+':'+port+'/AllProjectInformation', {headers : {'Content-Type':'application/json'}}).then(function(response) {
        $scope.projectInformation = response.data;
    });

    $http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
      $scope.User = response.data.companies[0].company;
    })
    
    $scope.logout = function(){
    $http.post('http://'+url+':'+port+'/logout').then(function(response){
      console.log(response)})
  }
  

    function getProject()
    {
      var str = window.location.search;
      str = str.substr(1);
      return str;
    }
});