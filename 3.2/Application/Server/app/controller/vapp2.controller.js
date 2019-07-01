var request = require('../database/requestToDatabase.js')
var scriptFile = require('../script/testbi.js');
var dateFormat = require('dateFormat');
const https = require('https');
var http = require('http');
var fs = require('fs');
var FormData = require('form-data');
const alf_url = process.env.ALF_URL;
const alf_port = process.env.ALF_PORT;
const scan_url = process.env.SCAN_URL;
const scan_port = process.env.SCAN_PORT;
const odbc_url = process.env.ODBC_URL; 
const odbc_port = process.env.ODBC_PORT;
const apr_mail = process.env.APR_MAIL;
const tardy_mail = process.env.TARDY_MAIL;

exports.displayPage = function(req, res) {
  var page = req.params.page;
  console.log('displayPage');
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
    res.redirect('/Vapp2/Accueil.html');
  }

exports.displayLoginPage = function(req, res) {
  var page = req.params.page;
  /*console.log('Inside GET /login.html callback')
  console.log(req.session); 
  console.log(req.sessionID)*/
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
  /*console.log('Inside GET /login.html callback')
  console.log(req.session); 
  console.log(req.sessionID)*/
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
  var query = 'SELECT project_name, project_description, C.company, C.contact, C.email FROM Project P join Customer C on P.customer = C.customer_id '
	odbcConnector(query, function(result){
      res.send(result)
});
}

exports.getFeaturesForProject = function(req, res) {
	var project = req.params.project;
	query = 'select * FROM features F JOIN product P on F.feature_id=P.features JOIN project PR on P.project=PR.project_id WHERE project_name = "' + project +'";'
	odbcConnector(query, function(result) {
      res.write(JSON.stringify(result));
      res.end();
	})
}

exports.getFeatures = function(req, res) {
  var features = req.params.features;
  query = 'select * from features where feature_id = '+ features
  console.log(query);
  odbcConnector(query, function(result) {
      res.write(JSON.stringify(result));
      res.end();
  })
}

exports.getProjectInformation = function(req, res) {
	var project = req.params.project;
	query = 'SELECT project_id, project_name, project_description,internal_reference, status, company, contact, email, phone_number, expected_delivery '
				+ 'FROM Project P join Customer C on P.customer = C.customer_id WHERE project_name = "'+ project +'"';
	odbcConnector(query, function(result) {
		row = '{"project":{ "project_id":"' + result[0].project_id + '", '
		row = row + '"project_name": "' + result[0].project_name + '", '
		row = row + '"project_description": "' + result[0].project_description + '", '
    row = row + '"internal_reference": "' + result[0].internal_reference + '", '
    row = row + '"expected_delivery": "' + dateFormat(result[0].expected_delivery, "isoDate") + '", '
		row = row + '"customer": {"company": "' + result[0].company + '", '
		row = row + '"contact": "' + result[0].contact + '", '
		row = row + '"email": "' + result[0].email + '", '
		row = row + '"phone_number": "' + result[0].phone_number + '"}}}'
		
		res.write(row);
		res.end();
	})
}

exports.getCompanies = function (req, res) {
  query = 'SELECT DISTINCT company FROM customer;'
  odbcConnector(query, function(result) {
    var row = '{"companies": [';
    for (var i = 0; i < result.length; i++) {
      row = row + '{"company": "' + result[i].company + '"}, ';
    }
    row = row.substr(0, row.length -2);
    row = row + ']}'
    res.write(row);
    res.end();
  })
}

exports.getCustomerInformation = function(req, res) {
  var company = req.params.company;
  query = 'SELECT contact, email, phone_number FROM customer WHERE company = "' + company + '";';
  odbcConnector(query, function(result) {
    var row = '{"customer" : { "contact": "' + result[0].contact + '", '
    row = row + '"email": "' + result[0].email + '", '
    row = row + '"phone_number": "' + result[0].phone_number + '"}}'

    res.write(row);
    res.end();
  }) 
}

exports.createNewProject = function(req, res) {
  var project = req.body.project;
  query = 'INSERT INTO decision(rank_plastic, rank_metal, first_decision) VALUES (2,2,2);'
  odbcConnector(query, function() {})
  query = 'INSERT INTO project(project_name, project_description, customer, status, expected_delivery, decision) VALUES ("' + project.projectName + '","' + project.projectDescription + '", (select customer_id from customer where company = "'+project.customer+'" LIMIT 1),"'+ project.status+'", "'+dateFormat(project.expectedDelivery, "isoDate")+'", (SELECT max(decision_id) FROM decision));'
  odbcConnector(query, function() {
    res.write('{"response": "project created!!"}');
    res.end();
  })
}

exports.updateProject=  function (req, res) {
  var projectid = req.params.project;
  var project = req.body.project;

  query = 'UPDATE project SET project_name = "' + project.project_name + '",internal_reference = "' + project.internal_reference + '",project_description = "' + project.project_description + '", customer = (SELECT customer_id FROM customer WHERE company = "' + project.customer + '" LIMIT 1) WHERE project_name = "'+ projectid +'";';
  odbcConnector(query, function() {
    res.write('project update');
    res.end();
  })
} 

exports.newFeatures = function(req, res) {
  var project = req.params.project;
  var features = req.body;
  var creation_date = dateFormat(Date.now(), "isoDate");

  query = 'INSERT INTO features (label, attribution, component, compound, ratio, material, heat_treatment, surface_treatment, width, lenght, height, volume, manufacturing, tolerance, rugosity, comments, part_reference, creation_date, feature_status)'
   + 'VALUES ("'+ features.label +'","'+ features.attribution +'","' + features.component+'", "' + features.compound+'", "' + features.ratio+'","' + features.material+'", "' + features.heat_treatment+'", "' + features.surface_treatment+'", "' + features.width +'", "' + features.lenght+'", "' + features.height+'", "' + features.volume+'", "' + features.manufacturing+'", "' + features.tolerance+'", "' + features.rugosity+'", "' + features.comments+'", "' + features.part_reference+'", "' + creation_date+'","Submitted");';
   odbcConnector(query, function(){});
  
  query = 'INSERT INTO product(product_name, is_metal, is_plastic, features, project) VALUES ("'+features.product_name+'",'+features.metal+','+features.plastic+',(SELECT max(feature_id) FROM features),(SELECT project_id FROM project WHERE project_name="'+project+'"));'
  odbcConnector(query, function(){
    res.write('features added!!!');
    res.end();
  })
}

exports.updateFeatures = function(req, res) {
  var features = req.body;
  query = 'UPDATE features SET label = "' + features.label + '", attribution = "' + features.attribution + '", component = "' + features.component + '", compound = "' + features.compound + '", ratio = "' + features.ratio + '", material = "' + features.material + '", heat_treatment = "' + features.heat_treatment + '", surface_treatment = "' + features.surface_treatment + '", width = "' + features.width + '", lenght = "' + features.lenght + '", height = "' + features.height + '", volume = "' + features.volume + '", manufacturing = "' + features.manufacturing + '", tolerance = "' + features.tolerance + '", rugosity = "' + features.rugosity + '", comments = "' + features.comments + '", part_reference = "' + features.part_reference + '", modification_date = "' + dateFormat(Date.now(), "isoDate") + '"'
  + ' WHERE feature_id = ' +features.feature_id
  console.log(query);
  odbcConnector(query, function(){
    res.write('features updated');
    res.end();
  })
}

exports.featuresValidation = function(req, res) {
  var feature=req.params.feature;
  var features = req.body;
  query = 'UPDATE features SET check_label = ' + features.check_label +', check_plastic = ' + features.check_plastic +', check_metal = ' + features.check_metal +', check_part_reference = ' + features.check_part_reference +', check_attribution = ' + features.check_attribution +', check_component = ' + features.check_component +', check_compound = ' + features.check_compound +', check_ratio = ' + features.check_ratio +', check_material = ' + features.check_material +', check_heat_treatment = ' + features.check_heat_treatment +', check_surface_treatment = ' + features.check_surface_treatment +', check_label = ' + features.check_label +', check_width = ' + features.check_width +', check_lenght = ' + features.check_lenght +', check_height = ' + features.check_height +', check_volume = ' + features.check_volume +', check_manufacturing = ' + features.check_manufacturing +', check_tolerance = ' + features.check_tolerance +', check_rugosity = ' + features.check_rugosity +', check_comments = ' + features.check_comments +' WHERE feature_id = ' + feature
  console.log(query)
  odbcConnector(query, function(){
    res.write('validation updated!!!')
    res.end();})
}

exports.getProductInformation = function(req, res) {
  var feature = req.params.feature;
  var row = '{ "project" : "';
  query = 'SELECT project_name FROM project PR join product P on P.project=PR.project_id join features F on P.features=F.feature_id WHERE feature_id = ' + feature
  odbcConnector(query, function(result){
    row += result[0].project_name + '",'
  })
  query = 'SELECT product_name, is_metal, is_plastic FROM product P JOIN features F on P.features=F.feature_id WHERE feature_id = ' + feature
  odbcConnector(query, function(result) {
    row += '"product": { "product_name": "'+ result[0].project_name + '",'
    row += '"metal": "' + result[0].is_metal +'", ' + '"plastic": "' + result[0].is_plastic + '"}}'
    res.write(row);
    res.end();
  })
}

exports.getQuantities = function(req, res)
{
  var project = req.params.project;
  var row = '{"quantities":[ ';
  query = 'SELECT quantity_id, Q.quantity , lot_size, number_of_lot, default_label FROM product_quantity Q join project P on Q.project = P.project_id WHERE project_name = "' + project + '";'
  odbcConnector(query, function(result){
    for (var i = 0; i < result.length; i++) {
        row = row + '{"quantity_id":"' + result[i].quantity_id + '",'
        row = row + '"quantity": "' + result[i].quantity + '",'
        row = row + '"lot_size":"' + result[i].lot_size + '",'
        row = row + '"number_of_lot":"' + result[i].number_of_lot + '",'
        row = row + '"default_label":"' + result[i].default_label + '"},'
        //console.log(row);
      }
      row = row.substr(0,row.length - 1);
      row = row + ']}'

      res.write(row);
      res.end();
  })
}

exports.newQuantity = function(req, res){
  var project = req.params.project;
  var bodyquantity = req.body.quantity;
  query = 'INSERT INTO product_quantity(quantity, lot_size, number_of_lot, default_label, project) VALUES (' + bodyquantity.quantity + ', ' + bodyquantity.lot_size + ', ' + bodyquantity.number_of_lot + ', "' + bodyquantity.default_label + '", (SELECT project_id FROM project WHERE project_name = "'+ project +'"))'
  //request.getRequestdb(query, function(){});
  //query = 'UPDATE project SET quantity = (SELECT max(quantity_id) FROM product_quantity) WHERE project_name = "' + project + '";'
  odbcConnector(query, function(){
    res.write("quantity added!!!!");
    res.end();
  })
}

exports.getDecision = function(req, res) {
  var project = req.params.project;
  var row = '{"decision":';
  var query = 'select decision_id, rank_metal, rank_plastic, first_decision, APR_decision, APRcomment, TARDY_decision, TARDYcomment, Final_decision, FinalComment from decision D join project P on D.decision_id=P.decision where project_name="' + project + '";'
  odbcConnector(query, function(result) {
    if (result.length > 0)
    {
      row += '{"decision_id":' + result[0].decision_id + ','
      row += '"rank_metal":' + result[0].rank_metal + ','
      row += '"rank_plastic":' + result[0].rank_plastic + ','
      row += '"first_decision":' + result[0].first_decision + ','
      row += '"APR_decision":' + result[0].APR_decision + ','
      row += '"APR_comment":"' + result[0].APRcomment + '",'
      row += '"TARDY_decision":' + result[0].TARDY_decision + ','
      row += '"TARDY_comment":"' + result[0].TARDYcomment + '",'
      row += '"Final_comment":"' + result[0].FinalComment + '",'
      row += '"Final_decision":' + result[0].Final_decision + '}}'
    }
    res.write(row);
    res.end();
  })
}

exports.setDecision = function (req, res) {
  var project = req.params.project;
  var decision = req.body;
  console.log(decision)
  var query = 'UPDATE decision SET ' + decision.column + ' = ' + decision.value + ', ' + decision.commentColumn + ' = "' + decision.comment + '" WHERE decision_id = (SELECT decision FROM project WHERE project_name = "' + project + '");' 
  console.log(query)
  odbcConnector(query, function(){
    res.end();
  })
}

exports.projectSummary = function(req, res) {
  var project = req.params.project;
  var query = 'SELECT company, part_reference, label FROM project P JOIN customer C on P.customer=C.customer_id JOIN product PR on P.project_id = PR.project JOIN features F on PR.features = F.feature_id WHERE project_name = "' + project + '";'
  odbcConnector(query, function(result) {
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

exports.featuresFinalValidation = function(req, res){
  var feature = req.params.feature;
  var decision = req.body;
  if(decision.decision==1){
    var status="Accepted"
  } else {
    var status = "Refused"
  }
  query = 'UPDATE features SET final_decision = ' + decision.decision + ', feature_status = "'+status+'" WHERE feature_id = ' + feature;
  odbcConnector(query, function(){
    res.end();
  })
}

exports.featuresFinalComment = function(req, res){
  var feature = req.params.feature;
  var comment = req.body;
  query = 'UPDATE features SET finalComment = "' + comment.comment + '" WHERE feature_id = ' + feature;
  odbcConnector(query, function(){
    res.end();
  })
}

exports.getCompanies = function (req, res) {
  var user = req.session.passport.user;
  query = 'SELECT DISTINCT company, login FROM customer C JOIN users U on C.customer_id=U.customer WHERE user_id='+user+';'
  odbcConnector(query, function(result) {
    var row = '{"companies": [';
    for (var i = 0; i < result.length; i++) {
      row = row + '{"company": "' + result[i].company + '", "login":"'+result[i].login+'"}, ';
    }
    row = row.substr(0, row.length -2);
    row = row + ']}'
    console.log(row)
    res.write(row);
    res.end();
  })
}

exports.getProjectFiles = function(req, res){
  var project = req.params.project;
  var company = req.params.company;
  var user = req.user.customer
  query = 'SELECT document_name, feature FROM documents WHERE project = (SELECT project_id FROM project WHERE project_name ="' + project +'" AND customer = '+user+')';
  odbcConnector(query, function(result){
    res.write(JSON.stringify(result));
    res.end();
  })
}

exports.getFiles = function(req, res){
  var feature = req.params.feature;
  query = 'SELECT document_name, feature FROM documents WHERE feature is null AND project = (SELECT project FROM features WHERE feature_id =' + feature +') UNION SELECT document_name, feature FROM documents WHERE feature='+feature;
  odbcConnector(query, function(result){
    res.write(JSON.stringify(result));
    res.end();
  })
}

exports.getproductDataAnalysis = function(req, res){
  var product = req.params.product;
  var quantity = req.params.quantity;
  var price = req.params.price;
  scriptFile.confidenceCoefficient(product, quantity, price, function(coeff, degree, rebus, margeProd){
    var result = {coefficient: coefficient, masteryDegree: degree, rebus: rebus, productionMarge: margeProd};
    res.send(result);
  })
}

exports.getTicket = function (req, res){
  console.log("i'm in the ticket controller")
  const initLogin = {
    host : 'localhost',
    path: '/alfresco/s/api/login',
    port: 8080,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const bodyLogin = '{"username":"admin", "password":"admin"}'
  console.log(bodyLogin)

  const loginCallback = function(response) {
    let str = '';
    var tamp;
    response.on('data', function(chunk) {
      str += chunk;
      console.log(str)
    });

    response.on('end', function(){
      tamp = JSON.parse(str);
      ticket = tamp.data.ticket;
      res.send(ticket);
    });

    
  }
  const logReq = http.request(initLogin, loginCallback);
  logReq.write(bodyLogin);
  logReq.end();
}

exports.getFileId = function(req, res){
  var file = req.params.file;
  var feature = req.params.feature
  var query = 'SELECT adress_id FROM documents WHERE document_name = "' + file + '" AND feature = ' + feature
  odbcConnector(query, function(result){
    res.send(JSON.stringify(result));
  }) 
}

function odbcConnector(request, callback){
  try {
  const id = {
        host : odbc_url,
        path: '/api/odbcModels/requestdb?request='+escape(request),
        port: odbc_port,
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
    } catch(e){
      console.log(e)
    }
}