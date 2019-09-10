const sql = require('mssql');
let mysql = require('mysql');
var dateformat = require('dateformat');
var http = require('http');
const _cliProgress = require('cli-progress');

const default_user = 'Test_3';
const default_password = 'aqwzsxedc';
const default_server = 'localhost';
const default_database = 'Lxp';

const convertInDays = 86400000;

var con;
var finalProduct = [];
var done;
var seller;
var size=0;

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

function getDataTARDY(request, callback){
  try{
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

exports.getTransfertVariable = function(callback){
  var oldquery = "UPDATE product_sequence SET age='old'"
  var getLinesFromAPR = "select * from cdeent where codcpt like 'TARDY%' or idecli = '71'";
  var getLinesFromTARDY = "select * from tardy_scheduler.tardydata where client like 'APR' and id_of=of_pere";
  odbcConnector(oldquery, function(){
    getDataAPR(getLinesFromAPR, function(resultAPR){
      getDataTARDY(getLinesFromTARDY, function(resultTardy){
        var taille = resultTardy.length+resultAPR.length
        for(i=0; i<resultAPR.length; i++){
          getFinalProduct(resultAPR[i].refcde,'APR', function(){
            if(finalProduct.length==resultAPR.length){
              for(j=0; j<resultTardy.length; j++){
                getFinalProduct(resultTardy[j].ref_commande_du_client, 'TARDY', function(){
                  if(finalProduct.length==taille){
                    console.log(finalProduct);
                    for(m=0;m<finalProduct.length;m++){
                      size+=finalProduct[m].length;
                    }
                    console.log('size: '+size)
                    setProductionSequence(function(){
                      console.log('finished');
                      callback();
                    });
                  }
                });
              }
            }
          })
        }
      })
    })
  })
}

function getFinalProduct(refCommande, company, callback){
  var tab = []
  if(company=='TARDY'){
    var query = "select distinct C.idelig, C.datdem, A.ideart, A.codart, A.libar1, CE.refcde, CE.codcpt , CE.idedoc, O.ideofs, O.numofs, O.datcre, O.qtepre, OS.idemvt as pere"
    query+=" from artgen A join ofsgen O on A.ideart=O.ideart left join cdelig C on A.ideart=C.ideart left join ofssof OS on O.ideofs=OS.ideofs left join cdalig CA on CA.ideart=A.ideart left join cdaent CE on CA.idedoc=CE.idedoc"
    query+=" where CE.refcde like '"+refCommande+"'"
    getDataAPR(query, function(result){
      var query2 = "select C.idelig, C.datdem, A.ideart, A.codart, A.libar1, CE.refcde, CE.codcpt , CE.idedoc, O.ideofs, O.numofs, O.datcre, O.qtepre, OS.idemvt as pere"
      query2+=" from artgen A join ofsgen O on A.ideart=O.ideart left join cdelig C on A.ideart=C.ideart left join ofssof OS on O.ideofs=OS.ideofs left join cdalig CA on CA.ideart=A.ideart left join cdaent CE on CA.idedoc=CE.idedoc"
      getDataAPR(query2, function(globalResult){
        for(i=0; i<result.length; i++){
          var j=0;
          var pere=result[i].pere;
          var product = result[i].ideart;
          var mo=result[i].ideofs;
          var date = result[i].datdem;
          var quantity = result[i].qtepre;
          var idcmde = result[i].idedoc;
          if(pere!=null){
            while(j<globalResult.length){
              if(pere==globalResult[j].ideofs){
                product = globalResult[j].ideart
                mo=globalResult[j].ideofs;
                date=globalResult[j].datdem;
                quantity=globalResult[j].qtepre;
                if(globalResult[j].pere==null){
                  break;
                } else {
                  pere = globalResult[j].pere;
                  j=-1;
                }
              }
              j++;
            }
            tab.push([product, dateformat(date,'isoDate'), quantity, mo, 'APR', idcmde]);
          }
        }
        finalProduct.push(tab);
        callback();
      })
    })
  } else if(company=='APR'){
    var query = "select * from tardypurchase P left join tardydata D on P.ty=D.commande where numero_commande like '"+refCommande+"' and id_of=of_pere;";
    getDataTARDY(query, function(result){
      if(result.length>0){
        for(i=0;i<result.length;i++){
          tab.push([result[i].id_article,result[i].Date_dem, result[i].qte_prepare, result[i].id_of, 'TARDY',result[i].Commande]);
        }
        finalProduct.push(tab)
      } else {
        finalProduct.push([]);
      }
      callback();
    })
  }
}

function setProductionSequence(callback){
  var res=[];
  var created = 0;
  const bar1 = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_classic);
  bar1.start(size,0);
  for(i=0;i<finalProduct.length;i++){
    if(finalProduct[i].length>0){
      for(j=0; j<finalProduct[i].length;j++){
        done=false;
        schedulerConnector(finalProduct[i][j][0],finalProduct[i][j][1],finalProduct[i][j][2],finalProduct[i][j][3],finalProduct[i][j][4], function(result){
          if(result['subProduct'].length>0){
            res.push(result);
            done=true;
          }
          done = true;
          created ++;
          bar1.update(created);
        })
        require('deasync').loopWhile(function(){return !done;});
      }
    }
  }
  bar1.stop();
  for(k=0; k<res.length; k++){
    var doneProduct = false;
    var transfert = 0;
    seller = res[k].manufacturer
    var query = 'SELECT max(groupe) as max FROM product_sequence;'
    odbcConnector(query, function(resultMax){
      var groupe = resultMax[0].max+1;
      setScheduleLineInDatabase(res[k],null,groupe, function(){
        var queryForSeller = 'SELECT * FROM product_sequence WHERE pere is null and groupe=(select max(groupe) from product_sequence)'
        odbcConnector(queryForSeller, function(data){
          if(seller=='APR'){
            console.log('APR')
            console.log(groupe)
            var queryAPR = "select * from product_sequence where groupe = "+groupe+" and manufacturer ='TARDY' and id = (select min(id) from product_sequence where groupe="+groupe+" and manufacturer='TARDY')"
            odbcConnector(queryAPR, function(dataTardy){
              if(dataTardy.length>0){
                console.log(dataTardy) 
                var date_fin = Date.parse(dataTardy[0].delivery_date.substr(6)+'-'+dataTardy[0].delivery_date.substr(3,2)+'-'+dataTardy[0].delivery_date.substr(0,2))
                console.log(date_fin)
                transfert = Math.round((Date.parse(data[0].begin_date) - date_fin)/convertInDays);
                console.log('var transfert: '+transfert);
                var insertquery = "INSERT INTO sequence_analysis(groupe, transfert) VALUES ("+groupe+","+transfert+")"
                odbcConnector(insertquery, function(insertData){
                  doneProduct = true;
                })
              }
            })
          } else if(seller=='TARDY'){
            console.log('TARDY');
            var queryTardy = "select * from product_sequence where pere="+data[0].id+" and manufacturer='APR'";
            odbcConnector(queryTardy, function(dataAPR){
              if(dataAPR.length>0){
                console.log(data[0].begin_date)
                var date_debut = Date.parse(data[0].begin_date.substr(6)+'-'+data[0].begin_date.substr(3,2)+'-'+data[0].begin_date.substr(0,2))
                console.log(date_debut)
                transfert = Math.round((date_debut - Date.parse(dataAPR[0].delivery_date))/convertInDays);
                console.log('var transfert: '+transfert);
                var insertquery = "INSERT INTO sequence_analysis(groupe, transfert) VALUES ("+groupe+","+transfert+")"
                odbcConnector(insertquery, function(insertData){
                  doneProduct = true;
                })
              }
            })
          }
        })
      })
    })
    require('deasync').loopWhile(function(){return !doneProduct;});
  }
  callback();
}

function setScheduleLineInDatabase(line, pere, groupe,callback){
  var done = false;
  var productionTime=0;
  if(line.manufacturer != seller){
    productionTime += (new Date(line.endDate)-new Date(line.beginDate))/convertInDays
  }
  var query = 'INSERT INTO product_sequence(product_id, product, manufacturer, begin_date, end_date, quantity, `of`, delivery_date, pere, groupe) VALUES '
  query += '('+line.id+', "'+line.product+'","'+line.manufacturer+'","'+line.beginDate+'","'+line.endDate+'",'+line.quantity+',"'+line.of+'","'+line.deliveryDate+'",'+pere+','+groupe+')'
  odbcConnector(query, function(result){
    var query2 = 'SELECT max(id) as id FROM product_sequence'
    odbcConnector(query2, function(resultId){
      if(line['subProduct'].length > 0){
        for(i=0;i<line['subProduct'].length;i++){
          done = false;
          setScheduleLineInDatabase(line['subProduct'][i],resultId[0].id,groupe, function(time){
            productionTime += time
            done = true;
          });
          require('deasync').loopWhile(function(){return !done;});
        }
      }
      callback(productionTime);
    })
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
      var result = JSON.parse(str)
      callback(result.request);
    })
  }

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

  const idSchedulerCallback = function(response) {
    let str = '';
    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function(){
      var result = JSON.parse(str)
      callback(result.schema);
    })
  }

  const idReq = http.request(id, idSchedulerCallback);
  idReq.end();
}

function lxpConnector(request, callback){
  const id = {
    host : 'localhost',
    path: '/api/lxpModels/executeQuerry?query='+escape(request),
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
