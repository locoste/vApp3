app.controller('Order', function($scope, $http, config) {
  const url = config.api_url;
  const port = config.api_port;

  var project = getProject();
  document.getElementById("BackButton").href="DisplayProject.html?" + project;

  $http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
    $scope.User = response.data.companies.company;
  })

  $http.get('http://'+url+':'+port+'/getproductDataAnalysis/' + project).then(function(response) {
    $scope.project_name=response.data.project;
    $scope.features = response.data.features;
  });

  $scope.logout = function(){
    $http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
  }

  $scope.cellPrice = function(){
    var marg=$scope.sellPrice;
    if($scope.sellPrice != undefined){
      for(i=0; i<$scope.features.length; i++){
        marg -= $scope.features[i].costProd
      }
      $scope.production_margin = marg;
    } else {
      $scope.production_margin = "";
    }
  }

  $scope.sendOrder = function(){
    if($scope.price!=undefined){
      $http.get('http://'+url+':'+port+'/getproductDataAnalysis/'+project).then(function(response){
        window.location.assign('Order.html?'+project)
      })
    } else {
      alert("You have to enter a price!!")
    }
  }

  function getProject()
  {
    var str = window.location.search;
    str = str.substr(1);
    return str;
  }
});