var ObjectId = require('mongodb').ObjectID;
var db = require('../middlewares/db');


exports.getAllTweets = function (from, to, noOfTweets, returnData) {
    var collection = db.get().collection('Tweets');
    if (from && to) {

        collection.find({
            $and: [{
                "date": {
                    $gte: Date.parse(from)
                }
            }, {
                "date": {
                    $lte: Date.parse(to)
                }
            }]
        }).toArray(function (err, docs) {
            //   res.json({comments: docs})
            returnData(docs);
        })
    } else if (noOfTweets) {
        collection.find().sort({
            "date": -1
        }).limit(parseInt(noOfTweets)).toArray(function (err, docs) {
            // res.json({comments: docs})
            returnData(docs);
        })
    } else {
        collection.find().toArray(function (err, docs) {
            // res.json({comments: docs})
            returnData(docs);
        })
    }
}

exports.postTweet = function (loggedInUsername, request, returnData) {
    db.get().collection('Users').find({
        'username': request.username
    }).toArray(function (err, docs) {
        if (docs.length != 0 && docs[0].username === loggedInUsername) {
            db.get().collection('Tweets').insert(
                new Tweet(request.tweet, request.username, Date.now())
            );
            returnData('User posted Tweet Successfully!!');

        } else if (docs[0].username !== loggedInUsername) {
            returnData('User is not authorized to post a Tweet for this username');
        } else {
            returnData("User not present!!!");
        }
    });
}

exports.editTweetById = function (loggedInUsername, id, request, returnData) {
    db.get().collection('Tweets').find(ObjectId(id)).toArray(function (err, docs) {
        // console.log(docs);
        if (docs.length != 0 && docs[0].username === loggedInUsername) {
            db.get().collection('Tweets').save({
                "_id": docs[0]._id,
                'tweet': request.tweet,
                'username': request.username,
                'date': Date.now()
            });
            returnData('Tweet updated Successfully!!');
        } else if (docs[0].username !== loggedInUsername) {
            returnData('User is not authorized to edit this Tweet');
        } else {
            returnData('Tweet not found!!');

        }
    });
}

exports.deleteTweet = function (loggedInUsername, id, returnData) {
    db.get().collection('Tweets').find(ObjectId(id)).toArray(function (err, docs) {
        if (docs.length != 0 && docs[0].username === loggedInUsername) {
            db.get().collection('Tweets').remove({
                "_id": docs[0]._id
            });
            returnData('Tweet Deleted Successfully');
        } else if (docs[0].username !== loggedInUsername) {
            returnData('User is not authorized to delete this Tweet');
        } else {
            returnData('Tweet not found!!');
        }
    });
}

function Tweet(tweet, username, date) {
    this.tweet = tweet;
    this.username = username;
    this.date = date;
}