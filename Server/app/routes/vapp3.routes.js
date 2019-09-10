
module.exports = function(app) {

    var controller = require('../controller/vapp3.controller.js');
    var contSession = require('../controller/vapp3.session.js');
    var script = require('../script/SchedulerAnalysisModel.js')

    var bodyParser = require('body-parser');
    const uuid = require('uuid/v4')
    var session = require('express-session');
    var cookieParser = require('cookie-parser');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    var MySQLStore = require('express-mysql-session')(session);
    var busboy = require('connect-busboy');

    var fs = require('fs');

    /*var options = {
      host: process.env.DATABASE_HOST, 
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE
    };*/

    var options = {
      host: 'localhost', 
      port: '3306',
      user: 'root',
      password: 'root',
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
    secret: 'vfosvappthree',
    resave: true,
    rolling:true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000}
  }))

    app.use(passport.initialize());
    app.use(passport.session());

    setInterval(script.getTransfertVariable, 86400000);

    // redirecting 
    app.get('/', contSession.authrequired, contSession.redirecting);

    // Display login page
    app.get('/login.html', controller.displayLoginPage);

    // login
    app.post('/login', contSession.loginUser);

    // log out
    app.post('/logout', contSession.logoutUser);

    // get login controller
    app.get('/controller/:script', controller.getController);

    // get user company with id
    app.get('/getUserCompany', contSession.authrequired, controller.getUserCompany);

    // display all login page images
    app.get('/images/:image', controller.displayImages);

    // get css files
    app.get('/css/:file', controller.getCssFiles);

    // get favicon.ico
    app.get('/favicon.ico', controller.favicon)

    // display all project page
    app.get('/Vapp3/:page', contSession.authrequired, controller.displayPage);

    // get 3D script 
    app.get('/Vapp3/js/:script', contSession.authrequired, controller.get3DScript);

    // get treant files
    app.get('/Vapp3/tree/:page', contSession.authrequired, controller.getTreantFile);

    // display all project page
    app.get('/Vapp3/controller/:script', contSession.authrequired, controller.getController);

    // display all login controller
    app.get('/controller/:script', controller.getController);

    // display all images
    app.get('/Vapp3/images/:image', contSession.authrequired, controller.displayImages);

    // display all order
    app.get('/AllOrderInformation', contSession.authrequired, controller.findAllOrder);

    // get JSON tree for display
    app.get('/getJSONTree/:product', contSession.authrequired, controller.getJSONTree);

    // get all project information
    app.get('/getProject/:project', contSession.authrequired, controller.getProjectInformation);

    // launch sequence generator
    app.post('/generateTransfertVariable', controller.generateTransfertVariable);
}

