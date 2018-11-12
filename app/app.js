var express = require('express')
, app = express(),
session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
var bodyParser = require('body-parser');
var db = require('../app/middlewares/db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', require('./controllers/tweet'))
app.use('/users', require('./controllers/users'))

  // Login endpoint
  app.post('/login', function (req, res) {
    if (req.query.username) {
        db.get().collection('Users').find({'username':req.query.username}).toArray(function(err,docs){
            if (docs.length > 0) {
                if (req.query.password) {
                    if (req.query.password === docs[0].password) {
                        req.session.user = req.query.username;
                        req.session.loggedIn = true;
                          res.send("login success!");
                    } else {
                        res.send('login failed');  
                    }
                }
            } else {
                res.send("User not found!!");
            }
    });
}
  });
   
  // Logout endpoint
  app.delete('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
  });
   
// Connect to Mongo on start
// db.connect('mongodb://localhost/firstDB', function(err) {
db.connect('mongodb://akstay143:akpesit90@ds157843.mlab.com:57843/demo', function(err) {
if (err) {
  console.log('Unable to connect to Mongo.')
  process.exit(1)
} else {
  app.listen(3000, function() {
    //   db.get().collection('Tweets').remove();
    console.log('Listening on port 3000...')
  })
}
})