var request = require('../database/requestToDatabase.js')
var dateFormat = require('dateFormat');

const https = require('https');
var http = require('http');
var fs = require('fs');
var FormData = require('form-data');

exports.displayPage = function(req, res) {
  var page = req.params.page;
  console.log(page);
  if(page=='NewFeatures.html' || page=='updateFeatures.html' || page=='AcceptReject.html'){
    if(req.user.role!='admin'){
      console.log('lol')
      page='Unauthorized.html'    
    }
  }
  if(page=='DisplayProject.html'){
    if(req.user.role!='admin'){
      page = 'DisplayProjectUser.html'
    }
  }
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile('../View/'+page, function(err, html){
    if(err){  
      throw err;
    }
    res.write(html);
    res.end();
  })
}

exports.redirecting = function(req, res) {
  console.log('go Home page');
  res.redirect('/Vapp3/Accueil.html');
}

exports.displayLoginPage = function(req, res) {
  var page = req.params.page;
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile('../View/login.html', function(err, html){
    if(err){
      throw err;
    }
    res.write(html);
    res.end();
  })
}

exports.favicon = function(req, res){
  res.writeHead(200, {"Content-Type": "image/png"});
  fs.readFile('../images/favicon.png', function(err, image){
    if(err){
      throw err;
    }
    res.write(image);
    res.end();
  })
}

exports.createUserPage = function(req, res) {
  var page = req.params.page;
  res.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile('../View/CreateUser.html', function(err, html){
    if(err){
      throw err;
    }
    res.write(html);
    res.end();
  })
}

exports.get3DScript = function(req, res) {
  var script = req.params.script;
  res.writeHead(200, {"Content-Type": "text/plain"});
  fs.readFile('../js/'+script, function(err, js){
    if(err){
      throw err;
    }
    res.write(js);
    res.end();
  })
}

exports.getController = function(req, res) {
  var script = req.params.script;
  res.writeHead(200, {"Content-Type": "text/plain"});
  if (script == 'Project.js'){
    fs.readFile('./app/'+script, function(err, js){
      if(err){
        throw err;
      }
      res.write(js);
      res.end();
    })
  }
  else {
    fs.readFile('./app/controller/'+script, function(err, js){
      if(err){
        throw err;
      }
      res.write(js);
      res.end();
    })
  }
}

exports.displayImages = function(req, res) {
  var image = req.params.image;
  res.writeHead(200, {"Content-Type": "image/jpg"});
  fs.readFile('../images/'+image, function(err, image){
    if(err){
      throw err;
    }
    res.write(image);
    res.end();
  })
} 

exports.findAllProject = function(req, res) {
  var user = req.user.id;
  var query = 'SELECT project_name, project_description, C.company, C.contact, C.email FROM Project P join Customer C on P.customer = C.customer_id WHERE customer_id='+user
  odbcConnector(query, function(result){
    console.log(result)
    res.send(result)
  })
} 

exports.getProjectInformation = function(req, res) {
	var project = req.params.project;
	query = 'SELECT project_id, project_name, project_description,internal_reference, status, company, contact, email, phone_number, expected_delivery '
  + 'FROM Project P join Customer C on P.customer = C.customer_id WHERE project_name = "'+ project +'"';
  odbcConnector(query, function(result){
    console.log(result)
    res.send(result)
  })
}

exports.getCompanies = function (req, res) {
  query = 'SELECT DISTINCT company FROM customer;'
  odbcConnector(query, function(result){
    console.log(result)
    res.send(result)
  })
}

exports.getUserCompany = function(req, res){
  var user = req.user.id
  var query = 'SELECT company FROM customer WHERE customer_id='+user
  odbcConnector(query, function(result){
    res.send(result)
  })
}

exports.getUserInformation = function(req, res){
  var user = req.user.id;
  var query = 'SELECT login, password FROM users WHERE customer='+user
  odbcConnector(query, function(result){
    console.log(result)
    res.send(result)
  })
}

exports.getCustomerInformation = function(req, res) {
  var user = req.user.id;
  query = 'SELECT contact, email, phone_number FROM customer WHERE customer_id = ' + user + ';';
  odbcConnector(query, function(result){
    console.log(result)
    res.send(result)
  })
}

exports.updateProject=  function (req, res) {
  var projectid = req.params.project;
  var project = req.body.project;

  query = 'UPDATE project SET project_name = "' + project.project_name + '",internal_reference = "' + project.internal_reference + '",project_description = "' + project.project_description + '", customer = (SELECT customer_id FROM customer WHERE company = "' + project.customer + '" LIMIT 1) WHERE project_name = "'+ projectid +'";';
  odbcConnector(query, function(result){
    console.log(result)
    res.send(result)
  })
}

exports.getProductInformation = function(req, res) {
  var feature = req.params.feature;
  var row = '{ "project" : "';
  query = 'SELECT project_name FROM project P join features F on P.project_id=F.project WHERE feature_id = ' + feature
  odbcConnector(query, function(result){
    row += result[0].project_name + '",'
  })
  query = 'SELECT product_name, is_metal, is_plastic FROM product P JOIN features F on P.features=F.feature_id WHERE feature_id = ' + feature
  odbcConnector(query, function(result){
    row += '"product": { "product_name": "'+ result[0].project_name + '",'
    row += '"metal": "' + result[0].is_metal +'", ' + '"plastic": "' + result[0].is_plastic + '"}}'
    res.write(row);
    res.end();
  })
}

exports.getQuantities = function(req, res)
{
  var project = req.params.project;
  query = 'SELECT quantity_id, Q.quantity , lot_size, number_of_lot, default_label FROM product_quantity Q join project P on Q.project = P.project_id WHERE project_name = "' + project + '";'
  odbcConnector(query, function(result){
    console.log(result)
    res.send(result)
  })
}

exports.projectSummary = function(req, res) {
  var project = req.params.project;
  var query = 'SELECT company, part_reference, label FROM project P JOIN customer C on P.customer=C.customer_id JOIN product PR on P.project_id = PR.project JOIN features F on PR.features = F.feature_id WHERE project_name = "' + project + '";'
  odbcConnector(query, function(result){
    var row = '{"project": {'
    row += '"company": "' + result[0].company + '",'
    row += '"features":['
    for (i = 0; i < result.length; i++)
    {
      row += '{"part_reference": "' + result[i].part_reference + '",'
      row += '"label": "' + result[i].label + '"},'
    }
    row = row.substr(0,row.length - 1);
    row = row + ']}}'
    res.write(row);
    res.end();
  })
}

exports.getProductSequence = function(req,res){
  var project = req.params.project;
  query = 'SELECT num, features, label, date_format(date, "%d/%m/%Y") as date, type, attribution, dependancies, comments FROM product_sequence WHERE project = (SELECT project_id FROM project WHERE project_name = "' + project + '") ORDER BY num;';
  odbcConnector(query, function(result){
    console.log(result)
    res.send(result)
  })
}

exports.postSequenceLine = function(req, res){
  var project = req.params.project;
  var sequence = req.body;
  query = 'SELECT max(num) as nbNum from product_sequence WHERE project=(SELECT project_id FROM project WHERE project_name = "' + project + '")'
  odbcConnector(query, function(result){
    if(result.length==0){
      var num = 1
    } else {
      var num = result[0].nbNum+1;
    }
    query = 'INSERT INTO product_sequence (num, features, label, date, type, attribution, dependancies, comments, project) VALUES ('+num+',"'+sequence.features+'","'+sequence.label+'","'+dateFormat(sequence.date, "isoDate")+'","'+sequence.type+'","'+sequence.attribution+'",'+sequence.dependancies+',"'+sequence.comments+'", (SELECT project_id FROM project WHERE project_name = "'+project+'"))';
    console.log(query);
    odbcConnector(query, function(result){
      res.end();
    })
  })
}

exports.getLabelFeatures = function(req, res) {
  var project = req.params.project;
  query = 'SELECT label FROM features F JOIN product P on F.feature_id=P.features JOIN project PR on P.project=PR.project_id WHERE project_name = "' + project +'";'
  odbcConnector(query, function(result){
    res.send(result)
  })
}

exports.setSequenceDecision = function(req, res){
  var project = req.params.project;
  var decision = req.body;
  query = 'UPDATE project SET sequence_decision = ' + decision.decision + ' WHERE project_name = "' + project + '";'
  odbcConnector(query, function(result){
    res.end()
  })
}

exports.getSequenceDecision = function(req, res){
  var project = req.params.project;
  query = 'SELECT sequence_decision FROM project WHERE project_name = "' + project + '";'
  odbcConnector(query, function(result){
    res.send(result)
  })
}

exports.deleteSequenceLine = function(req, res){
  var line = req.params.num;
  var project = req.params.project;
  console.log(req.body)
  query = 'DELETE FROM product_sequence WHERE num='+line+' AND project=(SELECT project_id FROM project WHERE project_name="'+project+'");'
  odbcConnector(query, function(result){
    query = 'UPDATE product_sequence SET dependancies=NULL WHERE dependancies='+line+' AND project=(SELECT project_id FROM project WHERE project_name="'+project+'")'
    odbcConnector(query, function(result){
      res.end()
    })
  })
}

exports.updateLine = function(req, res){
  var project=req.params.project;
  var line=req.body;
  console.log('lol')
  var query = 'UPDATE product_sequence SET features="'+line.features+'", label="'+line.label+'", date="'+dateFormat(line.date, "isoDate")+'", type="'+line.type+'", attribution="'+line.attribution+'", comments="'+line.comments+'", dependancies='+line.dep+' WHERE num='+line.num+' AND project=(SELECT project_id FROM project WHERE project_name="'+project+'")'
  odbcConnector(query, function(result){
    res.end()
  })
}

exports.upProductionLine = function(req, res){
  var project = req.params.project;
  var line = req.body
  var query = 'SELECT sequence_id FROM product_sequence WHERE num='+line.num+' AND project=(SELECT project_id FROM project WHERE project_name="'+project+'")'
  console.log(query)
  odbcConnector(query, function(result){
    var query = 'SELECT sequence_id FROM product_sequence WHERE num='+line.num2+' AND project=(SELECT project_id FROM project WHERE project_name="'+project+'")'
    console.log(query)
    odbcConnector(query, function(result2){
      var query = 'UPDATE product_sequence SET num='+line.num2+' WHERE sequence_id='+result[0].sequence_id;
      console.log(query)
      odbcConnector(query, function(something){
        var query = 'UPDATE product_sequence SET num='+line.num+' WHERE sequence_id='+result2[0].sequence_id;
        console.log(query)
        odbcConnector(query, function(something2){
          var query = 'SELECT sequence_id FROM product_sequence WHERE dependancies='+line.num
          console.log(query)
          odbcConnector(query, function(depResult){
            var query = 'SELECT sequence_id FROM product_sequence WHERE dependancies='+line.num2
            console.log(query)
            odbcConnector(query, function(depResult2){
              var query = 'UPDATE product_sequence SET dependancies='+line.num2+' WHERE sequence_id in ('
              if(depResult.length>0){
                for(i=0; i<depResult.length; i++){
                  query += depResult[i].sequence_id +','
                }
                query=query.substr(0, query.length-1)
                query += ')'
              }
              else {
                query = "SELECT * FROM product_sequence"
              }
              console.log(query)
              odbcConnector(query, function(){
                var query = 'UPDATE product_sequence SET dependancies='+line.num+' WHERE sequence_id in ('
                if(depResult2.length>0){
                  for(i=0; i<depResult2.length; i++){
                    query += depResult2[i].sequence_id +','
                  }
                  query=query.substr(0, query.length-1)
                  query += ')'
                } else {
                  var query = "SELECT * FROM product_sequence"
                }
                console.log(query)
                odbcConnector(query, function(){
                  res.send('product line up')
                })
              })
            })
          })
        })
      })
    })
  })
}

exports.getDependancies = function(req, res){
  var project = req.params.project;
  var query = 'SELECT dependancies FROM product_sequence WHERE project = (SELECT project_id FROM project WHERE project_name="'+project+'")'
  odbcConnector(query, function(result){
    res.send(result)
  })
}

exports.generateJSON = function(req, res){
  var project = req.params.project;
  var query = 'SELECT project_id FROM project WHERE project_name="'+project+'"'
  odbcConnector(query, function(result){
    generateProdJSON(result[0].project_id);
  })
}

function odbcConnector(request, callback){
  const id = {
        host : 'localhost',
        path: '/api/odbcModels/requestdb?request='+escape(request),
        port: 3000,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };  

      const idCallback = function(response) {
        let str = '';
        response.on('data', function(chunk) {
          str += chunk;
        });

        response.on('end', function(){
          console.log(str)
          var result = JSON.parse(str)
          callback(result.request);
        })
      }

      console.log(id.path)
      const idReq = http.request(id, idCallback);
      idReq.end();
}

function schedulerConnector(art, datedem, qteDem, mo, company, callback){
  const id = {
        host : 'localhost',
        path: '/api/schedulerModels/getProductPlanning?art='+art+'&datedem='+datedem+'&qteDem='+qteDem+'&mo='+mo+'&company='+company,
        port: 3001,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };  

      const idCallback = function(response) {
        let str = '';
        response.on('data', function(chunk) {
          str += chunk;
        });

        response.on('end', function(){
          console.log(str)
          var result = JSON.parse(str)
          callback(result.request);
        })
      }

      console.log(id.path)
      const idReq = http.request(id, idCallback);
      idReq.end();
}

function generateProdJSONOld(project){
  var query = "SELECT num, label, date, type, attribution, dependancies, comments FROM product_sequence WHERE project="+project+" ORDER BY dependancies"
  
  odbcConnector(query, function(result){
    var i=0;
    var compt=1;
    var prod = JSON.parse('{"num":'+result[0].num+', "label":"'+result[0].label+'", "type":"'+result[0].type+'", "attribution":"'+result[0].attribution+'", "comment":"'+result[0].comments+'", "subProduct":[]}')
    var num = result[0].num
    var sub=[]
    while (compt < result.length){
      console.log(i)
      if(result[i].dependancies==num){
        sub.push('{"num":'+result[i].num+', "label":"'+result[i].label+'", "type":"'+result[i].type+'", "attribution":"'+result[i].attribution+'", "comment":"'+result[i].comments+'", "subProduct":[]}');
        console.log(sub);
        compt++;
      }
      if(i<result.length-1){
        i++;
      } else {
        for(j=0; j<sub.length; j++){

        }
        
        console.log(prod);
        prod['subProduct'].push(JSON.parse(sub));
        console.log(prod);
        i=0;
      }
    }
  })
}

function generateProdJSON(project){
  var query = "SELECT num, label, date, type, attribution, dependancies, comments FROM product_sequence WHERE project="+project+" ORDER BY dependancies"
  
  odbcConnector(query, function(result){
    var prod = JSON.parse('{"num":'+result[0].num+', "label":"'+result[0].label+'", "date":"'+result[0].date+'", "type":"'+result[0].type+'", "attribution":"'+result[0].attribution+'", "comment":"'+result[0].comments+'", "subProduct":[]}')
    prod['subProduct'].push(addNode(result[0].num, result));
    console.log(JSON.stringify(prod))
  });
}

function addNode(num, result){
  for (i=0; i<result.length; i++){
    console.log(i)
    if(result[i].dependancies==num){
      console.log(result[i]);
      var seq = JSON.parse('{"num":'+result[i].num+', "label":"'+result[i].label+'", "date":"'+result[i].date+'", "type":"'+result[i].type+'", "attribution":"'+result[i].attribution+'", "comment":"'+result[i].comments+'", "subProduct":[]}')
      var subSeq = addNode(result[i].num, result);
      console.log(subSeq);
      seq['subProduct'].push(subSeq);
    }
  }
  console.log(seq);
  return seq;
}