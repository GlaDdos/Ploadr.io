var path = require('path');
var exphbs = require('express3-handlebars');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var express = require('express');
var errorHandler = require('errorhandler');
var moment = require('moment');

var routes = require('./routes');

module.exports = function(app){

  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutDir: app.get('views')  + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    helpers: {
      timeago: function(timestamp){
        return moment(timestamp).startOf('minute').fromNow();
      }
    }
  }).engine);

  app.set('view engine', 'handlebars');

  app.use(logger('dev'));
  app.use(bodyParser({
    uploadDir: path.join(__dirname, '../public/upload/temp')
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));
  app.use(app.router);
  app.use('/public/', express.static(path.join(__dirname, '../public')));

  if('development' === app.get('env')){
    app.use(errorHandler());
  }

  routes.initialize(app);
  return app;
};
