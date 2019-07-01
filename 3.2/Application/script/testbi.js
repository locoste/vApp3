const sql = require('mssql');
let mysql = require('mysql');
var fs = require("fs");
var dateformat = require('dateformat');

const default_user = 'Test_3';
const default_password = 'aqwzsxedc';
const default_server = 'localhost';
const default_database = 'Lxp';

const rebusMax = 1;

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
  con.query(request, function (err, result, moreResultSets) {
    if (err) 
    {
      console.log(err);
      result = err;
    }
    callback(result);
  });
}

function processMasteryDegree(refArticle, quantity, price, callback){
  var tpPrep=0;
  var tpprod=0;
  var tpgammeTheoCmde = 0;
  var coeffrebus = 0;
  var degreemasteryprocess = 0;
  var coutTheoProdCmde = 0;
  var margeProduction = 0;
  var query = "select A.ideart, A.codart, A.libar1, G.idegam, O.libope, O.tpspre, O.tpsexe, O.cadenc from artgen A join gamgen G on A.ideart=G.ideart join gamope O on G.idegam=O.idegam where A.codart='"+refArticle+"'"
  var ofsquery = "select A.ideart, A.codart, A.libar1, A.prevth, O.ideofs, O.qtepre, P.libope, P.tpspre, P.tpsexe, P.qtefai, P.qtereb from artgen A join ofsgen O on A.ideart=O.ideart join ofsope P on O.ideofs=P.ideofs where A.codart='"+refArticle+"'"
  getDataAPR(query, function(artGamme){
    for(i=0; i<artGamme.length; i++){
      tpPrep+=artGamme[i].tpspre;
      if(artGamme[i].tpsexe>0){
        tpprod+=artGamme[i].tpsexe/artGamme[i].cadenc
      }
    }
    tpprod=tpprod*quantity;
    tpgammeTheoCmde = tpPrep + tpprod;
    getDataAPR(ofsquery, function(ofsResult){
      var of=ofsResult[0].ideofs;
      var nbofs=1;
      var tppreof=0;
      var tpexeof=0;
      var tpGammeProdTheoCmde=0;
      var rebusProd=0;
      var rebusTot=0;
      var quantityOf=ofsResult[0].qtepre;
      for(j=0; j<ofsResult.length; j++){
        if(ofsResult[j].ideofs!=of){
          rebusTot+=rebusProd/quantityOf;
          nbofs++;
          of=ofsResult[j].ideofs;
          quantityOf = ofsResult[j].qtepre
          rebusProd = 0;
        }
        tppreof += ofsResult[j].tpspre;
        tpexeof += ofsResult[j].tpsexe/ofsResult[j].qtepre;
        rebusProd += ofsResult[j].qtereb;
      }
      rebusTot+=rebusProd/quantityOf;
      rebusTot=rebusTot/nbofs;
      tpexeof = tpexeof*quantity;
      tpGammeProdTheoCmde = (tppreof+tpexeof)/nbofs;
      switch(true) {
        case (rebusTot<=rebusMax):
          coeffrebus = 1;
          break;
        case (rebusTot>rebusMax && rebusTot<4*rebusMax):
          coeffrebus = 1.25;
          break;
        case (rebusTot>=4*rebusMax):
          coeffrebus = 1.5;
      }
      degreemasteryprocess = tpGammeProdTheoCmde/tpgammeTheoCmde*coeffrebus*100+100;
      coutTheoProdCmde = ofsResult[0].prevth*quantity;
      margeProduction = price-coutTheoProdCmde;
      callback(degreemasteryprocess, rebusTot*100, margeProduction);
    })
  })
}

function confidenceCoefficient(refArticle, quantity, price, callback){
  var query = "SELECT DISTINCT A.codart, A.libar1, O.ideofs, O.qtepre FROM artgen A join ofsgen O on A.ideart=O.ideart join ofsope OP on O.ideofs=OP.ideofs where codart='"+refArticle+"'"
  getDataAPR(query, function(result){
    if(result.length>0){
      knowarticle(result, quantity, function(coeff){
        processMasteryDegree(refArticle, quantity, price, function(degree, rebus, margeProd){
          callback(coeff, degree, rebus, margeProd)
        })
      })
    } else {
      unknowarticle(refArticle, quantity, function(coeff){
        callback(coeff,"", "", "");
      })
    }
  })
}

// return coeff
function knowarticle(resultAPR, quantity, callback){
  var tab = [];
  var min = 999999999999999;
  var coeff=1;
  for(i=0; i<resultAPR.length; i++){
    if(Math.abs(quantity-resultAPR[i].qtepre) < min){
      min = Math.abs(quantity-resultAPR[i].qtepre);
      coeff = 100 - Math.sqrt(min/10);
    }
  }
  callback(coeff);
}

// return coeff
function unknowarticle(refArticle, quantity, callback){
  try{
    querygamtheo = "select A.ideart, A.codart, G.idegam, G.libgam, O.codope, O.libope from artgen A join gamgen G on A.ideart=G.ideart join gamope O on G.idegam=O.idegam where A.codart='"+refArticle+"'"
    querygamprod = "select A.ideart, A.codart, O.ideofs, O.qtepre, P.codope, P.libope from artgen A join ofsgen O on A.ideart=O.ideart join ofsope P on O.ideofs=P.ideofs"
    queryNomtheo = "select A.ideart as pf, A.codart, A.libar1, E.ideart, L.qtelie, E.libnom from artgen A join nomlig L on A.ideart=L.ideart join noment E on E.idenom=L.idenom where A.codart ='"+refArticle+"'"
    queryNomProd = "select A.ideart as pf, A.codart, A.libar1, E.ideart, L.qtelie, E.libnom from artgen A join nomlig L on A.ideart=L.ideart join noment E on E.idenom=L.idenom "
    getDataAPR(querygamtheo, function(gammeTheo){
      getDataAPR(querygamprod, function(gammeProd){
        getDataAPR(queryNomtheo, function(nomTheo){
          getDataAPR(queryNomProd, function(nomProd){
            var product=gammeProd[0].codart;
            var of=gammeProd[0].ideofs;
            var samegam=0;
            var prodlength=0;
            var quantityProduct=gammeProd[0].qtepre;
            var tab = [];
            var maxCoeff=0;
            var maxNom = 0;
            for(i=0; i<gammeProd.length; i++){
              if(gammeProd[i].codart!=product | gammeProd[i].ideofs!=of){
                var coeffGlobalProd = 0;
                if(gammeTheo.length>0){
                coeffGlobalProd = samegam/prodlength*0.25+samegam/gammeTheo.length*0.75
                }
                var done=false;
                var size=0;
                var sameNom=0;
                if(nomTheo.length>0){
                  for(l=0; l<nomProd.length; l++){
                    if(nomProd[l].codart==product){
                      done=true;
                      size++;
                      for (k=0; k<nomTheo.length; k++){
                        if(nomProd[l].libnom.toUpperCase()==nomTheo[k].libnom.toUpperCase()){
                          sameNom++;
                        }
                      }
                    } else if(done==true){
                      break;
                    }
                  }
                }
                var CoeffNomenclature = sameNom/nomTheo.length*0.75+sameNom/nomProd.length*0.25;
                var coeffForProduct = coeffGlobalProd*0.6 + CoeffNomenclature*0.4;
                var coeffWithQuantity = 0;
                if(coeffForProduct*100>Math.log(Math.abs(quantity - quantityProduct))){ 
                  var coeffWithQuantity = coeffForProduct*100 - (Math.log(Math.abs(quantity - quantityProduct)));
                }
                tab.push({product:product, of:of, coeffGamme: coeffGlobalProd, coeffNom:CoeffNomenclature, coeffProduct:coeffForProduct, quantity:quantityProduct, FinalCoeff:coeffWithQuantity});
                prodlength=0;
                samegam=0;
                product=gammeProd[i].codart;
                of=gammeProd[i].ideofs;
                quantityProduct = gammeProd[i].qtepre;
              }
              prodlength++;
              for(j=0; j<gammeTheo.length; j++){
                if(gammeProd[i].libope.toUpperCase()==gammeTheo[j].libope.toUpperCase()){
                  samegam ++;
                } else if(gammeProd[i].libope == "FINITION MANUEL" && gammeTheo[j].libope=="FINITION MANUELLE" || gammeProd[i].libope == "FINITION MANUELLE" && gammeTheo[j].libope=="FINITION MANUEL"){
                  samegam++;
                }
              }
            }
            tab.sort(function(x, y){
              return x.FinalCoeff-y.FinalCoeff;
            });
            callback(tab[tab.length -1].FinalCoeff);
          })
        })
      })
    })
  } catch(err) {
    console.log(err);
  }
}

//confidenceCoefficient("CUVE EPAISSEUR 12 MM", 175, "", function(coeff, degree){
confidenceCoefficient("F363956001", 175, 10000, function(coeff, degree, rebus, margeProd){
  console.log('###########################"');
  console.log('condient coefficient: '+coeff + '%');
  console.log('process mastery degree: '+ degree + '%');
  console.log('rebus part: '+rebus+'%');
  console.log('production marge: '+margeProd+'€');
});