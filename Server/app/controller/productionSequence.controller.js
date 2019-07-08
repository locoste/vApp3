app.controller('productionSequence', function($scope, $http) {
  var project = getProject();
  document.getElementById("back").href = "DisplayProject.html?" + project
  document.getElementById("decision").href = "ProductionDecision.html?" + project
  $http.get('http://localhost:3002/getProductSequence/' + project).then(function(response){
    $scope.productionInformation = response.data;
  })

  $http.get('http://localhost:3002/getLabelFeatures/' + project).then(function(response){
    $scope.labelFeatures = response.data;
  })

  $http.get('http://localhost:3002/getUserCompany').then(function(response){
    $scope.User = response.data[0].company;
  })

  $scope.postNewLine = function()
  {
    var body = '{"features": "' + $scope.features + '", "label": "'+$scope.label+'", "date": "'+$scope.date+'", "type":"'+$scope.type+'", "attribution":"'+$scope.attribution+'", "dependancies": '+$scope.dep+', "comments": "'+$scope.comments+'", "project":"'+project+'"}';
    console.log(body);
    $http.post('http://localhost:3002/postSequenceLine/' + project, body).then(function(response){
      alert("production sequence updated!!");
      updateTable();
    })
  }

  $scope.deleteOperation = function(num){
      // check if there is no dependancies at this num
      $http.get('http://localhost:3002/getDependancies/'+project).then(function(response){
        if(response.data.length>0){
          for (i=0; i<response.data.length; i++){
            if(response.data[i].dependancies == num){
              if(confirm('Some actions have this action in dependancies Do you want to delete it?')){
                deleteRow(num);
                break;
              } else {
                break;
              }
            }
          }
        }
        deleteRow(num);
      })

      
    }

    $scope.generateJsonFile = function(){
      $http.post('http://localhost:3002/generateJSON/'+project).then(function(response){
        alert('file generated');
      })
    }

    function deleteRow(num){
      $http.delete('http://localhost:3002/deleteSequenceLine/'+num+'/'+project).then(function(){
        $http.get('http://localhost:3002/getProductSequence/' + project).then(function(response){
          $scope.productionInformation = response.data;
          alert('line delete');
          
        })
      })
    }

    $scope.updateOperation = function(index){
      $scope.num = $scope.productionInformation[index].num
      $scope.features = $scope.productionInformation[index].features
      $scope.label = $scope.productionInformation[index].label
      $scope.date = new Date($scope.productionInformation[index].date.substr(6),parseInt($scope.productionInformation[index].date.substr(3,4))-1,$scope.productionInformation[index].date.substr(0,2))
      $scope.type = $scope.productionInformation[index].type
      $scope.attribution = $scope.productionInformation[index].attribution;
      $scope.dep = $scope.productionInformation[index].dependancies
      $scope.comments = $scope.productionInformation[index].comments
      document.getElementById('update').style.display = "block"
      document.getElementById('cancel').style.display = "block"
      document.getElementById('lines').style.display = "none"
    }

    $scope.updateLine = function(){
      var body = '{"num":'+$scope.num+', "features":"'+$scope.features+'", "label":"'+$scope.label+'", "date":"'+$scope.date+'", "type":"'+$scope.type+'", "attribution":"'+$scope.attribution+'","dep":'+$scope.dep+', "comments":"'+$scope.comments+'"}'
      $http.put('http://localhost:3002/updateLine/'+project, body).then(function(response){
        $http.get('http://localhost:3002/getProductSequence/' + project).then(function(response){
          $scope.productionInformation = response.data;
          document.getElementById('lines').onclick="postNewLine()"
          $scope.cancelUpdate();
          alert('line updated');
        })
      })
    }

    $scope.upOperation = function(index){
      if(index>0){
        var body = '{"num":'+$scope.productionInformation[index].num+', "num2":'+$scope.productionInformation[index-1].num+'}'
        $http.put('http://localhost:3002/upProductionLine/'+project, body).then(function(response){
          $http.get('http://localhost:3002/getProductSequence/' + project).then(function(response){
            $scope.productionInformation = response.data;
          })
        })
      } else {
        alert('This operation is already on the top');
      }
    }

    $scope.downOperation = function(index){
      if(index < $scope.productionInformation.length -1){
        var body = '{"num":'+$scope.productionInformation[index].num+', "num2":'+$scope.productionInformation[index+1].num+'}'
        $http.put('http://localhost:3002/upProductionLine/'+project, body).then(function(response){
          $http.get('http://localhost:3002/getProductSequence/' + project).then(function(response){
            $scope.productionInformation = response.data;
          })
        })
      } else {
        alert('This operation is already on the bottom');
      }
    }

    $scope.cancelUpdate = function(){
      $scope.num = ""
      $scope.features = ""
      $scope.label = ""
      $scope.date = ""
      $scope.type = ""
      $scope.attribution = ""
      $scope.dep = ""
      $scope.comments = ""
      document.getElementById('update').style.display = "none"
      document.getElementById('cancel').style.display = "none"
      document.getElementById('lines').style.display = "block"
    }

    function updateTable()
    {
      $http.get('http://localhost:3002/getProductSequence/' + project).then(function(response){
        $scope.productionInformation = response.data;
      })
    }

    function getProject()
    {
      var str = window.location.search;
      str = str.substr(1);
      return str;
    }
  });