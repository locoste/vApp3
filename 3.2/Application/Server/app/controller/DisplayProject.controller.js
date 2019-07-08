app.controller('DisplayProject', function($scope, $http, config) {
  const url = config.api_url;
  const port = config.api_port;

  var project = getProject();
  document.getElementById("addNewFeature").href="NewFeatures.html?" + project;
  document.getElementById("hrefOrder").href="Order.html?"+project
  $http.get('http://'+url+':'+port+'/getProject/' + project).then(function(response) {
    console.log(response.data)
    $scope.project_reference = response.data.project.project_name;
    $scope.description = response.data.project.project_description;
    $scope.company = response.data.project.customer.company;
    $scope.contact = response.data.project.customer.contact;
    $scope.email = response.data.project.customer.email;
    $scope.phone_number = response.data.project.customer.phone_number;
    $scope.status = response.data.project.project;
    $scope.internal_reference = response.data.project.internal_reference;
    $scope.delivery = response.data.project.expected_delivery;

    $http.get('http://'+url+':'+port+'/getProjectFiles/'+project+'/'+response.data.company).then(function(response){
      console.log(response.data);
      var files = new Array;
      var scan = new Array;
      for (i=0; i<response.data.length; i++){
        var str = response.data[i].document_name;
        var n = str.indexOf(".");
        if (str.substr(n+1) == "stp" || str.substr(n+1)=="step" || str.substr(n+1)=="stl"){
          scan.push(response.data[i])
        } else {
          files.push(response.data[i])
        }
      }
      $scope.scans = scan;
      $scope.files = files;
    });

  });

  $http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
    $scope.User = response.data.companies.company;
  })

  $http.get('http://'+url+':'+port+'/features/' + project, 
  {
    headers : 
    {'Content-Type' : 'application/json'}

  }).then(function(response) {
    $scope.featuresInformation = response.data;
  });

  function refreshDocuments(){
    $http.get('http://'+url+':'+port+'/getProjectFiles/'+project).then(function(response){
      console.log(response.data);
      var files = new Array;
      var scan = new Array;
      for (i=0; i<response.data.length; i++){
        var str = response.data[i].document_name;
        var n = str.indexOf(".");
        if (str.substr(n+1) == "stp" || str.substr(n+1)=="step" || str.substr(n+1)=="stl"){
          scan.push(response.data[i])
        } else {
          files.push(response.data[i])
        }
      }
      $scope.scans = scan;
      $scope.files = files;
    })
  }

  $scope.showQuantity = function(){
    window.open('http://'+url+':'+port+'/Vapp2/Quantity.html?'+$scope.project_reference);
  }

  $scope.logout = function(){
    $http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
  }

  $scope.saveChangement = function()
  {
    data = '{"project": {    "project_name": "' + $scope.project_reference + '","internal_reference": "' + $scope.internal_reference + '",    "project_description": "'+ $scope.description +'",    "customer": "'+ $scope.company +'"  }}';
    $http.put('http://'+url+':'+port+'/updateProject/' + project, data, {
      headers : 
      {'Content-Type' : 'application/json'}
    }).then(function(response){
    })
  }

  function getProject()
  {
    var str = window.location.search;
    str = str.substr(1);
    return str;
  }
});