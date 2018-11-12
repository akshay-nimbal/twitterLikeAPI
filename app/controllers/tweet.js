var express = require('express'),
    router = express.Router()
var ObjectId = require('mongodb').ObjectID;
var auth = require('../middlewares/session')
var tweet_model = require('../models/tweet_model');
// get all the tweets by all users i.e timeline
router.get('/tweets', auth.auth, function (req, res) {
    console.log(req.session.user);
    tweet_model.getAllTweets(req.query.from, req.query.to, req.query.noOfTweets, function (docs) {
        res.json(docs);
    });
})

// post a tweet
router.post('/tweets', auth.auth, function (req, res) {
    var request = req.body;
    // console.log;
    tweet_model.postTweet(req.session.user, request, function (docs) {
        res.json(docs);
    });
});

//edit the tweet by object Id
router.put('/tweets/:id', auth.auth, function (req, res) {
    var request = req.body;
    tweet_model.editTweetById(req.session.user, req.params.id, request, function (docs) {
        res.json(docs);
    })
});

// delete the tweet by object id
router.delete('/tweets/:id', auth.auth, function (req, res) {
    tweet_model.deleteTweet(req.session.user, req.params.id, function (docs) {
        res.json(docs);
    })
});


function Tweet(tweet, username, date) {
    this.tweet = tweet;
    this.username = username;
    this.date = date;
}
module.exports = router