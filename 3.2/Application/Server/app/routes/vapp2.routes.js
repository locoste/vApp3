module.exports = function(app) {

    var controller = require('../controller/vapp2.controller.js');
    var contSession = require('../controller/vapp2.session.js');

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
      database: 'vapp2'
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

    // display all login page images
    app.get('/images/:image', controller.displayImages);

    // get favicon.ico
    app.get('/favicon.ico', controller.favicon)

    // display all project page
    app.get('/Vapp2/:page', contSession.authrequired, controller.displayPage);

    // get 3D script 
    app.get('/Vapp2/js/:script', contSession.authrequired, controller.get3DScript);

    // display all project page
    app.get('/Vapp2/controller/:script', contSession.authrequired, contSession.authrequired, controller.getController);

    // display all login controller
    app.get('/controller/:script', controller.getController);

    // display all images
    app.get('/Vapp2/images/:image', contSession.authrequired, controller.displayImages);

    // display all project
    app.get('/AllProjectInformation', contSession.authrequired, controller.findAllProject);

    //get all features for a project
    app.get('/features/:project', contSession.authrequired, controller.getFeaturesForProject);

    // get features from upload features
    app.get('/getFeatures/:features', contSession.authrequired, controller.getFeatures);

    //get project information
    app.get('/getProject/:project', contSession.authrequired, controller.getProjectInformation);

    //get all companies
    app.get('/getCompanies', contSession.authrequired, controller.getCompanies);

    //get customer information in function of a company
    app.get('/getCompanyInformation/:company', contSession.authrequired, controller.getCustomerInformation);

    //update a project
    app.put('/updateProject/:project', contSession.authrequired, controller.updateProject);

    // create new features
    app.post('/newFeatures/:project', contSession.authrequired, controller.newFeatures);

    // update features
    app.put('/updateFeatures', contSession.authrequired, controller.updateFeatures);

    // get product and project information for features
    app.get('/getProductInformation/:feature', contSession.authrequired, controller.getProductInformation);

    // get all quantities for a project
    app.get('/getQuantities/:project', contSession.authrequired, controller.getQuantities);

    // add a new quantity for a project
    app.post('/newQuantity/:project', contSession.authrequired, controller.newQuantity);

    // get decision for a project
    app.get('/getDecision/:project', contSession.authrequired, controller.getDecision);

    //set new decision on a project
    app.post('/setDecision/:project', contSession.authrequired, controller.setDecision);

    // get Project Summary for decision
    app.get('/getProjectSummary/:project', contSession.authrequired, controller.projectSummary);

    // update features validation
    app.put('/featuresValidation/:feature', contSession.authrequired, controller.featuresValidation);

    //set final feature decision
    app.put('/featuresFinalValidation/:feature', contSession.authrequired, controller.featuresFinalValidation);

    // set final feature comment
    app.put('/featuresFinalComment/:feature', contSession.authrequired, controller.featuresFinalComment);

    // get user company with id
    app.get('/getUserCompany', contSession.authrequired, controller.getCompanies);

    // get documents for a project
    app.get('/getProjectFiles/:project/:company', contSession.authrequired, controller.getProjectFiles);

    // get step document for a feature
    app.get('/getDocuments/:feature', contSession.authrequired, controller.getFiles);

    // get ticket DCME
    app.get('/getTicket', contSession.authrequired, controller.getTicket);

    //get adress id for a file
    app.get('/getFileId/:file/:feature', contSession.authrequired, controller.getFileId);

    // get bi data
    app.get('/getproductDataAnalysis/:project', controller.getproductDataAnalysis);
}