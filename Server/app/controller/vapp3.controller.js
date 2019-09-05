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
  fs.readFile('./View/'+page, function(err, html){
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
  fs.readFile('./View/login.html', function(err, html){
    if(err){
      throw err;
    }
    res.write(html);
    res.end();
  })
}

exports.favicon = function(req, res){
  res.writeHead(200, {"Content-Type": "image/png"});
  fs.readFile('./images/favicon.png', function(err, image){
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
  fs.readFile('./View/CreateUser.html', function(err, html){
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
  fs.readFile('./js/'+script, function(err, js){
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
    fs.readFile('./Server/app/'+script, function(err, js){
      if(err){
        throw err;
      }
      res.write(js);
      res.end();
    })
  }
  else {
    fs.readFile('./Server/app/controller/'+script, function(err, js){
      if(err){
        throw err;
      }
      res.write(js);
      res.end();
    })
  }
}

exports.getTreantFile = function(req, res){
  var page = req.params.page;
  var path = '';
  switch(page){
    case 'app.js':
      path = page;
      break;
    case 'Treant.css':
      path = 'treant-js/'+page;
      break;
    case 'conn.css':
      path = page;
      break;
    case 'controller.js':
      path = page;
      break;
    case 'raphael.js':
      path = 'treant-js/vendor/'+page;
      break;
    case 'Treant.js':
      path = 'treant-js/'+page;
      break;
  }
  res.writeHead(200, {"Content-Type": "text/plain"});
  fs.readFile('./Server/app/tree/'+path, function(err, js){
      if(err){
        throw err;
      }
      res.write(js);
      res.end();
    })
}

exports.getTreantVendorFile = function(req, res){
  var page = req.params.page;
  res.writeHead(200, {"Content-Type": "text/plain"});
  fs.readFile('./Server/app/treant-js-master/vendor/'+page, function(err, js){
      if(err){
        throw err;
      }
      res.write(js);
      res.end();
    })
}

exports.getTreantCssFile = function(req, res){
  var page = req.params.page;
  res.writeHead(200, {"Content-Type": "text/css"});
  fs.readFile('./Server/app/treant-js-master/'+page, function(err, js){
      if(err){
        throw err;
      }
      res.write(js);
      res.end();
    })
}

exports.displayImages = function(req, res) {
  var image = req.params.image;
  res.writeHead(200, {"Content-Type": "image/jpg"});
  fs.readFile('./images/'+image, function(err, image){
    if(err){
      throw err;
    }
    res.write(image);
    res.end();
  })
} 

exports.findAllOrder = function(req, res) {
  var user = req.user.id;
  var query = 'SELECT * FROM product_sequence WHERE pere is null'
  odbcConnector(query, function(result){
    console.log(result)
    res.send(result)
  })
} 

exports.getProjectInformation = function(req, res) {
	var project = req.params.project;
	query = 'SELECT product, quantity, manufacturer , delivery_date FROM product_sequence WHERE pere is null AND groupe = "'+ project +'"';
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

exports.getJSONTree = function(req, res){
  var product = req.params.product;
  var query = 'select * from product_sequence where groupe = '+product+' order by pere';
  odbcConnector(query, function(tab){
    console.log(tab)
    var json = {prod:tab[0].id,text:{name:tab[0].product}, children:[]};
    curpere = tab[0].id
    var curjson=json;
    for(i=1;i<tab.length;i++){
      console.log(json)
      if(tab[i].pere==curpere){
        curjson['children'].push({prod:tab[i].id,text:{name:tab[i].product}, children:[]})
      } else {
        curpere = tab[i].pere
        console.log(curjson['children'])
        for(j=0;curjson['children'].length-1;j++){
          console.log(curjson['children'][j])
          if(curjson['children'][j].prod==curpere){
            curjson = curjson['children'][j];
            curjson['children'].push({prod:tab[i].id,text:{name:tab[i].product}, children:[]})
            console.log(json)
          }
        }
      }
    }
    console.log(JSON.stringify(json))
    var result = '{"chart": {container: "#example-graph",levelSeparation: 45,rootOrientation: "WEST",nodeAlign: "BOTTOM",connectors: {type: "step",style: { "stroke-width": 2}},node: {HTMLclass: "big-commpany"},callback: {onClick: function (nodeId, node, event) {ctrl.selectEvent(nodeId, node, event);}.bind(this),onTreeLoaded: function () {console.log("Graph loaded!!");}}},"nodeStructure": '+JSON.stringify(json)+'}';
    res.send(result)
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

function getDataTARDY(request, callback){
  try{
    console.log(request)
    con.query(request, function (err, result, moreResultSets) {
      if (err) 
      {
        console.log(err);
        result = err;
      }
      callback(result);
    });
  } catch(err){
    console.log(err)
  }
}

function getDataAPR(request, callback){
  try {
    var pool = new sql.ConnectionPool(config);
    pool.connect().then(result => {
     var aResult = pool.request().query(request);
     var res = Promise.resolve(aResult);
     res.then(function(data){callback(data.recordset)});

   });
  }
  catch (err){
    callback(returnData(err));
  }
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

// https://fperucic.github.io/treant-js/