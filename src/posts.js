const config = require('../config');
const request = require('request');
var rp = require('request-promise');

var url = config.base_url + '/posts?userId=';

exports.getPostsForUser = function(userId, postsCallback){    
    request(url+userId, function(error, response, body){   
        postsCallback(error, JSON.parse(body));
    });
}


/**
 * Return a Promise instead of using callback
 */
exports.getPostsForUserPromise = function (userId) {
    return rp(url+userId)
    .then(function (body) {
        return JSON.parse(body);
    })
    .catch(function (err) {
        return err;
    });
}