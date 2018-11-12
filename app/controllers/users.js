var express = require('express'),
    router = express.Router()
var user_model = require('../models/user_model');
var auth = require('../middlewares/session')

//get All users
router.get('/all', function (req, res) {
    user_model.getAllUsers(function (docs) {
        res.json(docs);
    });
})

// create the user
router.post('/create', function (req, res) {
    var request = req.body;
    user_model.createUser(request, function (docs) {
        res.json(docs);
    })
});


// edit the user details by username
router.put('/update/:username', auth.auth, function (req, res) {
    // console.log(req.params.username);
    var request = req.body;
    user_model.updateUser(req.session.user, req.params.username, request, function (docs) {
        res.json(docs);
    })
});

// get the feeds for that particular user
router.get('/feeds/:username', auth.auth, function (req, res) {
    user_model.getUserFeeds(req.params.username, function (docs) {
        res.json(docs);
    })
});


function User(first, last, age, username, password) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.username = username;
    this.password = password;
}

module.exports =
    router;