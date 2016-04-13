var connect = require('connect');
var path = require('path');
exphbs = require('express-handlebars');

module.exports = function(app){

  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutDir: app.get('views')  + '/layouts',
    partialsDir: [app.get('views') + '/partials']
  }).engine);

  app.set('view engine', 'handlebars');

  return app;
};
