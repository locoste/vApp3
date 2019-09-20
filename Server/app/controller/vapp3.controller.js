var dateFormat = require('dateFormat');
var script = require('../script/SchedulerAnalysisModel.js')
const https = require('https');
var http = require('http');
var fs = require('fs');
var FormData = require('form-data');
const sql = require('mssql');
let mysql = require('mysql');

const alf_url = process.env.ALF_URL;
const alf_port = process.env.ALF_PORT;
const scan_url = process.env.SCAN_URL;
const scan_port = process.env.SCAN_PORT;
const odbc_url = process.env.ODBC_URL; 
const odbc_port = process.env.ODBC_PORT;

const default_user = 'Test_3';
const default_password = 'aqwzsxedc';
const default_server = 'localhost';
const default_database = 'Lxp';

var con;

var config = 
{
 user: default_user, // update me
 password: default_password, // update me
 server: default_server, // update me
 database:default_database
};

if (con == undefined){
  con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lamoule07130',
    database: 'tardy_scheduler'
  });
}

exports.displayPage = function(req, res) {
  var page = req.params.page;
  console.log(page);
  if(page=='NewFeatures.html' || page=='updateFeatures.html' || page=='AcceptReject.html'){
    if(req.user.role!='admin'){
      console.log('lol')
      page='Unauthorized.html'    
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
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'Treant.css':
    path = 'treant-js/'+page;
    res.writeHead(200, {"Content-Type": "text/css"});
    break;
    case 'conn.css':
    path = page;
    res.writeHead(200, {"Content-Type": "text/css"});
    break;
    case 'controller.js':
    path = page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'jquery.min.js':
    path = 'treant-js/vendor/'+page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'jquery.easing.js':
    path = 'treant-js/vendor/'+page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'raphael.js':
    path = 'treant-js/vendor/'+page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
    case 'Treant.js':
    path = 'treant-js/'+page;
    res.writeHead(200, {"Content-Type": "text/plain"});
    break;
  }
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
  var query = 'SELECT * FROM product_sequence WHERE pere is null and age is null'
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
    var querylxp ="select O.qtepre, min(O.qtefai) as qtefai, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree from ofsope O join (  select ideope, datdebpre, datdebree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select min(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[0].of+"' group by OP.ideofs) and numofs like '"+tab[0].of+"') as S on O.ideope=S.ideope join (select OP.ideofs, datfinpre, datfinree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select max(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[0].of+"' group by OP.ideofs) and numofs like '"+tab[0].of+"') as SS on O.ideofs=SS.ideofs join ofsgen OG on O.ideofs=OG.ideofs where OG.numofs like '"+tab[0].of+"'  group by O.qtepre, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree;"
    console.log(querylxp)
    getDataAPR(querylxp, function(resultAPR){
      console.log(tab)
      console.log(resultAPR)
      if(tab[0].manufacturer=='APR'){
        var json = {prod:tab[0].id,HTMLclass: "product-bot",text:{name:tab[0].product, numofs:tab[0].of, datdebpre:'Beg:'+dateFormat(new Date(resultAPR[0].datdebpre),"dd/mm/yyyy"),datdebree:'Real:'+dateFormat(new Date(resultAPR[0].datdebree),"dd/mm/yyyy"), datfinpre:'End:'+dateFormat(new Date(resultAPR[0].datfinpre),"dd/mm/yyyy"), datfinree:'Real:'+dateFormat(new Date(resultAPR[0].datfinree),"dd/mm/yyyy"), qty:'Quantity:'+resultAPR[0].qtepre+'/'+resultAPR[0].qtefai}, children:[]};
      } else {
        var json = {prod:tab[0].id,HTMLclass: "product-bot",text:{name:tab[0].product, numofs:tab[0].of, datdebpre:'Beg:N/A',datdebree:'Real:'+ tab[0].begin_date, datfinpre:'End:N/A', datfinree:'Real:'+tab[0].end_date, qty:'Quantity:'+tab[0].quantity}, children:[]}
      }
      console.log(json)
      curpere = tab[0].id;
      var curjson=json;
      var done = false;
      for(i=1;i<tab.length;i++){
        done = false;
        var querylxp ="select O.qtepre, min(O.qtefai) as qtefai, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree from ofsope O join (  select ideope, datdebpre, datdebree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select min(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[i].of+"' group by OP.ideofs) and numofs like '"+tab[i].of+"') as S on O.ideope=S.ideope join (select OP.ideofs, datfinpre, datfinree from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where codope=(select max(codope) from ofsope OP join ofsgen OG on OP.ideofs=OG.ideofs where numofs like '"+tab[i].of+"' group by OP.ideofs) and numofs like '"+tab[i].of+"') as SS on O.ideofs=SS.ideofs join ofsgen OG on O.ideofs=OG.ideofs where OG.numofs like '"+tab[i].of+"'  group by O.qtepre, S.datdebpre, S.datdebree, SS.datfinpre, SS.datfinree;"
        getDataAPR(querylxp, function(result){
          console.log('------------------------------')
          console.log(tab[i].id);
          console.log(curpere);
          console.log(curjson.prod);
          if(tab[i].pere==curpere){
            console.log('1');
            if(tab[i].manufacturer=='APR'){
              console.log(resultAPR)
              curjson['children'].push({prod:tab[i].id,HTMLclass: "product-bot",text:{name:tab[i].product, numofs:tab[i].of, datdebpre:'Beg:'+dateFormat(new Date(result[0].datdebpre),"dd/mm/yyyy"),datdebree:'Real:'+dateFormat(new Date(result[0].datdebree),"dd/mm/yyyy"), datfinpre:'End:'+dateFormat(new Date(result[0].datfinpre),"dd/mm/yyyy"), datfinree:'Real:'+dateFormat(new Date(result[0].datfinree),"dd/mm/yyyy"), qty:'Quantity:'+result[0].qtepre+'/'+result[0].qtefai}, children:[]})
              done = true
            } else {
              curjson['children'].push({prod:tab[i].id,HTMLclass: "product-bot",text:{name:tab[i].product, numofs:tab[i].of, datdebpre:'Beg:N/A',datdebree:'Real:'+tab[i].begin_date, datfinpre:'End:N/A', datfinree:'Real:'+tab[i].end_date, qty:'Quantity:'+tab[i].quantity}, children:[]})
              done = true
            }
          } else {
            console.log('2')
            curpere = tab[i].pere
            console.log(curjson['children'])
            for(j=0;j<curjson['children'].length;j++){
              console.log(curjson['children'][j].prod)
              if(curjson['children'][j].prod==curpere){
                console.log(3)
                curjson = curjson['children'][j];
                if(tab[i].manufacturer=='APR'){
                  curjson['children'].push({prod:tab[i].id,HTMLclass: "product-bot",text:{name:tab[i].product, numofs:tab[i].of, datdebpre:'Beg:'+result[0].datdebpre,datdebree:'Real:'+result[0].datdebree, datfinpre:'End:'+result[0].datfinpre, datfinree:'Real:'+result[0].datfinree, qty:'Quantity:'+result[0].qtepre+'/'+result[0].qtefai}, children:[]})
                  done = true;
                } else {
                  curjson['children'].push({prod:tab[i].id,HTMLclass: "product-bot",text:{name:tab[i].product, numofs:tab[i].of, datdebpre:'Beg:N/A',datdebree:'Real:'+tab[i].begin_date, datfinpre:'End:N/A', datfinree:'Real:'+tab[i].end_date, qty:'Quantity:'+tab[i].quantity}, children:[]})
                  done = true;
                }
              }
            }
          }
        })
        require('deasync').loopWhile(function(){return !done;});
      }
      console.log(JSON.stringify(json))
      //var result = '{"chart": {container: "#example-graph",levelSeparation: 45,rootOrientation: "WEST",nodeAlign: "BOTTOM",connectors: {type: "step",style: { "stroke-width": 2}},node: {HTMLclass: "big-commpany"},callback: {onClick: function (nodeId, node, event) {ctrl.selectEvent(nodeId, node, event);}.bind(this),onTreeLoaded: function () {console.log("Graph loaded!!");}}},"nodeStructure": '+JSON.stringify(json)+'}';
      res.send(json)
    })
  })
}

exports.generateTransfertVariable = function(req, res){
  script.getTransfertVariable(function(){
    res.send('done')
  });
}


function odbcConnector(request, callback){
  const id = {
    host : odbc_url,
      //path: '/api/odbcModels/requestdb?request='+escape(request),
      path:'/odbcvApp3/v1/api/odbcModels/requestdb?request='+escape(request),
      port: odbc_port,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'rejectUnauthorized':false
      }
    };  

    const idCallback = function(response) {
      let str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function(){
        var result = JSON.parse(str)
        callback(result.request);
      })
    }

    const idReq = https.request(id, idCallback);
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
      callback(err);
    }
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


  exports.getCssFiles = function(req, res){
    var file = req.params.file;
    res.writeHead(200, {"Content-Type": "text/css"});
    fs.readFile('./View/css/'+file, function(err, css){
      if(err){  
       throw err;
     }
     res.write(css);
     res.end();   
   })
  }

  function lxpConnector(request, callback){
  const id = {
    host : 'localhost',
    path: '/api/lxpModel/executeQuerry?query='+escape(request),
    port: 3002,
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
      var result = JSON.parse(str)
      callback(result.request);
    })
  }

  const idReq = http.request(id, idCallback);
  idReq.end();
}

// https://fperucic.github.io/treant-js/