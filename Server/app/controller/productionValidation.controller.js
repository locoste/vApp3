app.controller('productionSequence', function($scope, $http) {
  var project = getProject();
  document.getElementById("back").href = "DisplayProject.html?" + project
  $http.get('http://localhost:3002/getProductSequence/' + project).then(function(response){
    $scope.productionInformation = response.data;
  })

  $http.get('http://localhost:3002/getUserCompany').then(function(response){
    $scope.User = response.data[0].company;
  })

  $http.get('http://localhost:3002/getSequenceDecision/' + project).then(function(response){
    if (response.data[0].sequence_decision == 1)
    {
      document.getElementById("Accept").style.backgroundColor = "#1E90FF";
    }
    if (response.data[0].sequence_decision == 0)
    {
      document.getElementById("Refuse").style.backgroundColor = "#1E90FF";
    }
  })

  $scope.SetProductionDecision = function(decision){
    var body = '{"decision" : ' + decision + '}'
    $http.put('http://localhost:3002/setSequenceDecision/' + project, body).then(function(response){
      alert("Decision saved!!");
    })
  }
});
function getProject()
{
  var str = window.location.search;
  str = str.substr(1);
  return str;
}