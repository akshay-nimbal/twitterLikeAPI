var db = require('../middlewares/db');

exports.getAllUsers = function (returnData) {
    var collection = db.get().collection('Users');
    collection.find().toArray(function (err, docs) {
        return returnData(docs);
    });
}

exports.createUser = function (request, returnData) {
    db.get().collection('Users').find({
        'username': request.username
    }).toArray(function (err, docs) {
        if (docs.length != 0) {
            returnData("User already exists!!!");
        } else {
            db.get().collection('Users').insert(
                new User(request.firstName, request.lastName, request.age, request.username, request.password)
            );
            returnData('User Created Successfully!!');
        }
    });
}

exports.updateUser = function (loggedInUsername, username, request, returnData) {
    db.get().collection('Users').find({
        'username': username
    }).toArray(function (err, docs) {
        if (docs.length != 0 && docs[0].username === loggedInUsername) {
            db.get().collection('Users').save({
                "_id": docs[0]._id,
                'username': request.username,
                'firstName': request.firstName,
                'lastName': request.lastName,
                'age': request.age,
                'password': request.password
            });
            returnData('User updated Successfully');
        } else if (docs[0].username !== loggedInUsername) {
            returnData('User is not authorized to edit this User details');
        } else {
            returnData('User not found');

        }
    });
}

exports.getUserFeeds = function (username, returnData) {
    db.get().collection('Tweets').find({
        'username': username
    }).toArray(function (err, docs) {
        var tweets = [];
        if (docs.length != 0) {
            docs.forEach(function (element) {
                tweets.push(element.tweet);
            });
            returnData({
                tweets
            });
        } else {
            returnData("Tweets for this user not found!");
        }
    })
};

function User(first, last, age, username, password) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.username = username;
    this.password = password;
}