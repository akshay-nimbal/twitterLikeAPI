var express = require('express'),
  app = express(),
  session = require('express-session');
app.use(session({
  secret: 'akshay',
  resave: true,
  saveUninitialized: true
}));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var auth = function (req, res, next) {
  // console.log(req.query.username);
  // console.log(req.session.user);
  if (req.session && req.session.loggedIn)
    return next();
  else
    return res.sendStatus(401);
};
module.exports = {
  auth
};