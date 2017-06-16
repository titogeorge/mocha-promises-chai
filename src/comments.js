const config = require('../config');
const request = require('request');
var rp = require('request-promise');

var url = config.base_url + '/comments?postId=';

exports.getCommentsForPost = function (postId, commentsCallback) {
    request(url + postId, function (error, response, body) {
        commentsCallback(error, JSON.parse(body));
    });
}

/**
 * Return a Promise instead of using callback
 */
exports.getCommentsForPostPromise = function (postId) {
    return rp(url + postId)
        .then(function (body) {
            return JSON.parse(body);
        })
        .catch(function (err) {
            return err;
        });
}