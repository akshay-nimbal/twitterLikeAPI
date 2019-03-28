var express = require('express')
, app = express(),
session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


  // Logout endpoint
  app.get('/hello', function (req, res) {
    // req.session.destroy();
    res.send("success!");
  });
   
// Connect to Mongo on start
  app.listen(3000, function() {
    //   db.get().collection('Tweets').remove();
    console.log('Listening on port 3000...')
  })