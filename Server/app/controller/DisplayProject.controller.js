app.controller('DisplayProject', function($scope, $http, config) {
  const url = config.api_url;
  const port = config.api_port;

  var ctrl = {};
  $scope.nodeSelectedLast = "(NONE)";

  var project = getProject();
  document.getElementById("treeiframe").src = "index.html?"+project;


  $http.get('http://'+url+':'+port+'/getProject/' + project).then(function(response) {
    $scope.product_reference = response.data[0].product;
    $scope.seller = response.data[0].manufacturer;
    $scope.quantity = response.data[0].quantity;
    $scope.company = response.data[0].company;
    $scope.delivery = response.data[0].delivery_date;
  });

  ctrl.selectEvent = function (nodeId, node, event) {
    $scope.nodeSelectedLast = nodeId;
    $scope.$apply();
  }


  $http.get('http://'+url+':'+port+'/getJSONTree/'+project).then(function(response){
    $scope.graph = response.data;
  });

  $http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
    $scope.User = response.data[0].company;
  });

  $scope.gotClick = function (temp) {
    console.log("aa *****");
    console.log("temp = " + temp);
  }

  $scope.logout = function(){
    $http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
  }

  function getProject()
  {
    var str = window.location.search;
    str = str.substr(1);
    return str;
  }
});