module.exports = {
  index: function(request, response){
    response.render('image');
  },

  create: function(request, response){
    response.send('The image:create POST controller');
  },

  like: function(request, response){
    response.send('The image:like POST controller');
  },

  comment: function(request, response){
    response.send('The image:comment POST controller');
  }
}
