var fs = require('fs');
var path = require('path');
var sidebar = require('../helpers/sidebar');

module.exports = {
  index: function(request, response){
    sidebar(viewModel, function(er, viewModel){
      response.render('image', viewModel);
    });
  },

  create: function(request, response){
   var saveImage = function(){
      var possible = 'abcdefghijklmnoprstuvwxyz0123456789';
      var imgUrl ='';

      console.log(request.files);

      for(var i = 0; i < 6; i++){
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      var tempPath = request.files.file.path;
      var ext = path.extname(request.files.file.name).toLowerCase();
      var targetPath = path.resolve('./public/upload/' + imgUrl + ext);

      if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
        fs.rename(tempPath, targetPath, function(err){
          if(err) throw err;

          response.redirect('/images/' + imgUrl);
        });
      }else {
        fs.unlink(tempPath, function(err){
          if(err) throw err;

          response.json(500, {error: 'Only image files are allowed.'});
        });
      }
   };

   saveImage();
  },

  like: function(request, response){
    response.send('The image:like POST controller');
  },

  comment: function(request, response){
    response.send('The image:comment POST controller');
  }
};

var viewModel = {
  images: {
    uniqueId:    1,
    title:       'Sameple image 1',
    description: 'This is a sample image.',
    filename:    'sample1.jpg',
    views:       0,
    likes:       0,
    timestamp:   Date.now(),
  },
  comments: [
    {
      image_id: 1,
      email:    'test@test.com',
      name:     'test Tester',
      gravatar: 'http://lorempixel.com/75/75/animals/1',
      comment:  'This is a test coment...',
      timestamp: Date.now()
    },
    {
      image_id: 1,
      email:    'test@testing.com',
      name:     'Test tester',
      gravatar: 'http://lorempixel.com/75/75/animals/2',
      comment:  'Another comment!',
      timestamp: Date.now()
    }
  ]
};
