const config = require('../config');
const request = require('request');
var rp = require('request-promise');

var url = config.base_url + '/users';

exports.getUsers = function (userCallback) {
    request(url, function (error, response, body) {
        userCallback(error, JSON.parse(body));
    });
}

exports.updateUsers = function (userCallback) {
    request(url, function (error, response, body) {
        userCallback(error, JSON.parse(body));
    });
}

/**
 * Return a Promise instead of using callback
 */
exports.getUsersPromise = function () {
    return rp(url)
        .then(function (body) {
            return JSON.parse(body);
        })
        .catch(function (err) {
            return err;
        });
}

/**
 * Return a Promise instead of using callback
 */
exports.getUsersByIdPromise = function (userId) {
    return rp(url + '/' + userId)
        .then(function (body) {
            return JSON.parse(body);
        })
        .catch(function (err) {
            console.log(err);
        });
}