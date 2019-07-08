module.exports = function(app) {

    var controller = require('../controller/vapp3.controller.js');
    var contSession = require('../controller/vapp3.session.js');

    var bodyParser = require('body-parser');
    const uuid = require('uuid/v4')
    var session = require('express-session');
    var cookieParser = require('cookie-parser');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    var MySQLStore = require('express-mysql-session')(session);
    var busboy = require('connect-busboy');

    var fs = require('fs');

    var options = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Lamoule07130',
      database: 'vapp3'
    };

    var sessionStore = new MySQLStore(options);

    app.all("/*", function(req, res, next){
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
      next();
    });

    app.use(bodyParser.urlencoded({limit:'50mb', extended: true }))
    app.use(bodyParser.json({limit:'50mb'}))

    app.use(session({
    genid: (req) => {
      console.log('Inside session middleware genid function')
      console.log(`Request object sessionID from client: ${req.sessionID}`)
      return uuid() // use UUIDs for session IDs
    },
    store: sessionStore,
    secret: 'vfosvappone',
    resave: true,
    rolling:true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000}
  }))

    app.use(passport.initialize());
    app.use(passport.session());

    // redirecting 
    app.get('/', contSession.authrequired, contSession.redirecting);

    // Display login page
    app.get('/login.html', controller.displayLoginPage);

    // login
    app.post('/login', contSession.loginUser);

    // log out
    app.post('/logout', contSession.logoutUser);

    // display all login controller
    app.get('/controller/:script', controller.getController);

    // get user company with id
    app.get('/getUserCompany', contSession.authrequired, controller.getUserCompany);

    // display all login page images
    app.get('/images/:image', controller.displayImages);

    // get favicon.ico
    app.get('/favicon.ico', controller.favicon)

    // display all project page
    app.get('/Vapp3/:page', contSession.authrequired, controller.displayPage);

    // get 3D script 
    app.get('/Vapp3/js/:script', contSession.authrequired, controller.get3DScript);

    // display all project page
    app.get('/Vapp3/controller/:script', contSession.authrequired, controller.getController);

    // display all login controller
    app.get('/controller/:script', controller.getController);

    // display all images
    app.get('/Vapp3/images/:image', contSession.authrequired, controller.displayImages);

    // display all project
    app.get('/AllProjectInformation', contSession.authrequired, controller.findAllProject);

    //get project information
    app.get('/getProject/:project', contSession.authrequired, controller.getProjectInformation);

    //get all companies
    app.get('/getCompanies', contSession.authrequired, controller.getCompanies);

    // get user information
    app.get('/getUserInformation', contSession.authrequired, controller.getUserInformation);

    //get customer information in function of a company
    app.get('/getCompanyInformation', contSession.authrequired, controller.getCustomerInformation);

    // get product and project information for features
    app.get('/getProductInformation/:feature', contSession.authrequired, controller.getProductInformation);

    // get all quantities for a project
    app.get('/getQuantities/:project', contSession.authrequired, controller.getQuantities);

    // get Project Summary for decision
    app.get('/getProjectSummary/:project', contSession.authrequired, controller.projectSummary);

    // get proudct sequence
    app.get('/getProductSequence/:project', contSession.authrequired, controller.getProductSequence);

    //post new production sequence line
    app.post('/postSequenceLine/:project', contSession.authrequired, controller.postSequenceLine);

    // get label features for a project
    app.get('/getLabelFeatures/:project', contSession.authrequired, controller.getLabelFeatures);

    // Set product sequence decision
    app.put('/setSequenceDecision/:project', contSession.authrequired, controller.setSequenceDecision);

    //get product sequence Decision
    app.get('/getSequenceDecision/:project', contSession.authrequired, controller.getSequenceDecision);

    // delete product sequence line
    app.delete('/deleteSequenceLine/:num/:project', contSession.authrequired, controller.deleteSequenceLine);

    // update production line
    app.put('/updateLine/:project', contSession.authrequired, controller.updateLine);

    // up productionline
    app.put('/upProductionLine/:project', contSession.authrequired, controller.upProductionLine);

    // get all dependancies for a project
    app.get('/getDependancies/:project', contSession.authrequired, controller.getDependancies);

    // generate json file of the prod sequence
    app.post('/generateJSON/:project', contSession.authrequired, controller.generateJSON);
}