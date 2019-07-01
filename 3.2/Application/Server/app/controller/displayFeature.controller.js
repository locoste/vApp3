app.controller('DisplayFeatures', function($scope, $http, config) {
  const url = config.api_url;
  const port = config.api_port;
  const alf_url = config.alf_url;
  const alf_port = config.alf_port;

  var feature = getProject();
  $scope.file = [];
  $scope.selectedFile = [];
  var iframePath = './index.html';
  $http.get('http://'+url+':'+port+'/getFeatures/' + feature, 
    {
      headers : 
      {'Content-Type' : 'application/json'}
      
    }).then(function(response) {
        if (response.data != '{"features":]}')
        {
          $scope.feature_id = response.data[0].feature_id;
          $scope.part_reference = response.data[0].part_reference;
          $scope.label = response.data[0].label;
          $scope.attribution = response.data[0].attribution;
          $scope.component = response.data[0].component;
          $scope.compound = response.data[0].compound;
          $scope.ratio = response.data[0].ratio;
          $scope.material = response.data[0].material;
          $scope.heat_treatment = response.data[0].heat_treatment;
          $scope.surface_treatment = response.data[0].surface_treatment;
          $scope.width = response.data[0].width;
          $scope.lenght = response.data[0].lenght;
          $scope.height = response.data[0].height;
          $scope.volume = response.data[0].volume;
          $scope.manufacturing = response.data[0].manufacturing;
          $scope.tolerance = response.data[0].tolerance;
          $scope.rugosity = response.data[0].rugosity;
          $scope.comments = response.data[0].comments;
          $scope.finalComment = response.data[0].finalComment;

          if(response.data[0].metal==true){
            $scope.metal = "Yes"
          } else {
            $scope.metal = "No"
          }

          if(response.data[0].plastic==true){
            $scope.plastic = "Yes"
          } else {
            $scope.plastic = "No"
          }

          console.log(response.data[0].check_part_reference);
          if(response.data[0].check_part_reference==true)
          {
            document.getElementById("part_reference_acceptation").checked=true;
          }
           if(response.data[0].check_label==true)
          {
            document.getElementById("label_acceptation").checked=true;
          }
           if(response.data[0].check_attribution==true)
          {
            document.getElementById("attribution_acceptation").checked=true;
          }
           if(response.data[0].check_component==true)
          {
            document.getElementById("component_acceptation").checked=true;
          }
           if(response.data[0].check_compound==true)
          {
            document.getElementById("compound_acceptation").checked=true;
          }
           if(response.data[0].check_ratio==true)
          {
            document.getElementById("ratio_acceptation").checked=true;
          }
           if(response.data[0].check_material==true)
          {
            document.getElementById("material_acceptation").checked=true;
          }
           if(response.data[0].check_heat_treatment==true)
          {
            document.getElementById("heat_treatment_acceptation").checked=true;
          }
           if(response.data[0].check_surface_treatment==true)
          {
            document.getElementById("surface_treatment_acceptation").checked=true;
          }
           if(response.data[0].check_width==true)
          {
            document.getElementById("width_acceptation").checked=true;
          }
           if(response.data[0].check_lenght==true)
          {
            document.getElementById("lenght_acceptation").checked=true;
          }
           if(response.data[0].check_height==true)
          {
            document.getElementById("heigth_acceptation").checked=true;
          }
           if(response.data[0].check_volume==true)
          {
            document.getElementById("volume_acceptation").checked=true;
          }
          if(response.data[0].check_manufacturing==true)
          {
            document.getElementById("manufacturing_acceptation").checked=true;
          }
          if(response.data[0].check_tolerance==true)
          {
            document.getElementById("tolerance_acceptation").checked=true;
          }
          if(response.data[0].check_rugosity==true)
          {
            document.getElementById("rugosity_acceptation").checked=true;
          }
          if(response.data[0].check_metal==true)
          {
            document.getElementById("metal_acceptation").checked=true;
          }
          if(response.data[0].check_plastic==true)
          {
            document.getElementById("plastic_acceptation").checked=true;
          }
          if(response.data[0].check_comments==true)
          {
            document.getElementById("comments_acceptation").checked=true;
          }
          if(response.data[0].check_label == false | response.data[0].check_plastic == false | response.data[0].check_metal == false | response.data[0].check_attribution == false | response.data[0].check_heat_treatment == false | response.data[0].check_surface_treatment == false | response.data[0].check_width == false | response.data[0].check_manufacturing == false | response.data[0].check_rugosity == false | response.data[0].check_comments == false | response.data[0].check_component == false | response.data[0].check_compound == false | response.data[0].check_ratio == false | response.data[0].check_material == false | response.data[0].check_lenght == false | response.data[0].check_height == false| response.data[0].check_volume == false | response.data[0].check_tolerance == false | response.data[0].check_label == null | response.data[0].check_plastic == null | response.data[0].check_metal == null | response.data[0].check_attribution == null | response.data[0].check_heat_treatment == null | response.data[0].check_surface_treatment == null | response.data[0].check_width == null | response.data[0].check_manufacturing == null | response.data[0].check_rugosity == null | response.data[0].check_comments == null | response.data[0].check_component == null | response.data[0].check_compound == null | response.data[0].check_ratio == null | response.data[0].check_material == null | response.data[0].check_lenght == null | response.data[0].check_height == null| response.data[0].check_volume == null | response.data[0].check_tolerance == null)
          {
            document.getElementById("finalDecision").style.display = "none";
          }
        }
      });
    console.log(document.getElementById("part_reference_acceptation").checked)
    $http.get('http://'+url+':'+port+'/getProductInformation/'+feature).then(function(response) {
      $scope.product_name = response.data.product.product_name;
      if (response.data.product.metal == 1)
      {
        document.getElementById("metal").checked == true
      }
      if (response.data.product.plastic == 1)
      {
        document.getElementById("plastic").checked == true
      }
      document.getElementById("acceptButton").href = "DisplayProject.html?" + response.data.project;
      document.getElementById("refuseButton").href = "DisplayProject.html?" + response.data.project;
      document.getElementById("returnButton").href = "DisplayProject.html?" + response.data.project;
    })

  $http.get('http://'+url+':'+port+'/getDocuments/'+feature).then(function(response){
    for(i=0; i < response.data.length; i++){
      console.log(response.data[i ])
      if (response.data[i].feature==null){
        $scope.file.push(response.data[i])
      } else {
        $scope.selectedFile.push(response.data[i])
      }
    }
    console.log($scope.file)
  })

  $http.get('http://'+url+':'+port+'/getUserCompany').then(function(response){
    $scope.User = response.data.companies[0].company;
  })

  $http.get('http://'+url+':'+port+'/getProductInformation/'+feature).then(function(response) {
    $scope.product_name = response.data.product.product_name;
    if (response.data.product.metal == 1)
    {
      document.getElementById("metal").ckecked == true
    }
    if (response.data.product.plastic == 1)
    {
      document.getElementById("plastic").ckecked == true
    }
    document.getElementById("acceptButton").href = "DisplayProject.html?" + response.data.project;
    document.getElementById("refuseButton").href = "DisplayProject.html?" + response.data.project;
    document.getElementById("returnButton").href = "DisplayProject.html?" + response.data.project;
  })

    /*$http.get('http://localhost:3001/getDocuments/'+feature).then(function(response){
      $scope.documents = response.data;
      document.getElementById('display3D').src = iframePath + '?' + response.data[response.data.length-1].name_3d
    })*/

    $scope.logout = function(){
      $http.post('http://'+url+':'+port+'/logout').then(function(response){console.log(response)})
    }

      $scope.displayFile = function(index){
        var str = $scope.selectedFile[index].document_name
        var n = str.indexOf(".");
        if (str.substr(n+1) == "stp" || str.substr(n+1)=="step" || str.substr(n+1)=="stl"){
          setIFrame(str);
        } else {
        // download on dcme
        displayDCMEFiles(str)
      }
    }

    function setIFrame(fileName){
      document.getElementById('display3D').src = iframePath + '?' + fileName;
    }

    function displayDCMEFiles(file){
      $http.get('http://'+url+':'+port+'/getTicket').then(function(responseTicket){
        var ticket = responseTicket.data
        $http.get('http://'+url+':'+port+'/getFileId/'+file+'/'+feature).then(function(response){
          console.log(response.data)
          var storeType = response.data[0].adress_id.substr(0,9);
          var storeId = response.data[0].adress_id.substr(11);
          document.getElementById("pdfReader").src = 'http://'+alf_url+':'+alf_port+'/alfresco/s/api/node/'+storeType+storeId+'/content?a=false&alf_ticket='+ticket+'&embedded=true'
        })
      })
    }

    $scope.isTrue = function(){
      var bodyValidation = '{"check_label" : ' + document.getElementById("label_acceptation").checked + ', "check_metal" : ' + document.getElementById("metal_acceptation").checked + ', "check_plastic" : ' + document.getElementById("plastic_acceptation").checked + ',  "check_attribution" : ' + document.getElementById("attribution_acceptation").checked + ',  "check_component" : ' + document.getElementById("component_acceptation").checked + ',  "check_compound" : ' + document.getElementById("compound_acceptation").checked + ',  "check_ratio" : ' + document.getElementById("ratio_acceptation").checked + ',  "check_material" : ' + document.getElementById("material_acceptation").checked + ',  "check_heat_treatment" : ' + document.getElementById("heat_treatment_acceptation").checked + ',  "check_surface_treatment" : ' + document.getElementById("surface_treatment_acceptation").checked + ',  "check_width" : ' + document.getElementById("width_acceptation").checked + ',  "check_lenght" : ' + document.getElementById("lenght_acceptation").checked + ',  "check_height" : ' + document.getElementById("heigth_acceptation").checked + ',  "check_volume" : ' + document.getElementById("volume_acceptation").checked + ',  "check_manufacturing" : ' + document.getElementById("manufacturing_acceptation").checked + ',  "check_tolerance" : ' + document.getElementById("tolerance_acceptation").checked + ',  "check_rugosity" : ' + document.getElementById("rugosity_acceptation").checked + ',  "check_comments" : ' + document.getElementById("comments_acceptation").checked + ',  "check_part_reference" : ' + document.getElementById("part_reference_acceptation").checked + '}';
      $http.put('http://'+url+':'+port+'/featuresValidation/' + feature , bodyValidation).then(function(response){
        $scope.updatefeature = "features updated!";
        console.log(response.data)
        if(document.getElementById("label_acceptation").checked == true && document.getElementById("metal_acceptation").checked == true && document.getElementById("plastic_acceptation").checked == true && document.getElementById("attribution_acceptation").checked == true && document.getElementById("component_acceptation").checked == true && document.getElementById("compound_acceptation").checked == true && document.getElementById("ratio_acceptation").checked == true && document.getElementById("material_acceptation").checked == true && document.getElementById("heat_treatment_acceptation").checked == true && document.getElementById("surface_treatment_acceptation").checked == true && document.getElementById("width_acceptation").checked == true && document.getElementById("lenght_acceptation").checked == true && document.getElementById("heigth_acceptation").checked == true && document.getElementById("volume_acceptation").checked == true && document.getElementById("manufacturing_acceptation").checked == true && document.getElementById("tolerance_acceptation").checked == true &&document.getElementById("rugosity_acceptation").checked == true && document.getElementById("comments_acceptation").checked == true && document.getElementById("part_reference_acceptation").checked == true)
          {
            document.getElementById("finalDecision").style.display = "block";
          } else {
            document.getElementById("finalDecision").style.display = "none";
          }
    });
    }
    
    $scope.setFinaldecision = function(decision)
    {

      var body = '{"decision": ' + decision + '}';
      $http.put('http://'+url+':'+port+'/featuresFinalValidation/' + feature, body).then(function(response){
        alert("decision saved!!!");
      })
    }

    function getProject()
    {
      var str = window.location.search;
      str = str.substr(1);
      return str;
    }
  }); 