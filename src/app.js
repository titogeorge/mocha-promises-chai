const config = require('../config');
var usersApi = require("./users");
var postsApi = require("./posts");
var commentsApi = require("./comments");
var Promise = require('es6-promise').Promise;



exports.getUserData = function (userId) {
    // Start parallel requests for user and posts
    return Promise.all(
        [
            usersApi.getUsersByIdPromise(userId),
            postsApi.getPostsForUserPromise(userId)
        ]
    ).then(([user, posts]) => { // Note the destructuring
        // We have both user and posts, let's add the posts to the user
        user.posts = posts;

        // Send parallel queries for all the post comments, by
        // using `map` to get an array of promises for each post's
        // comments
        return Promise.all(user.posts.map(post =>
            commentsApi.getCommentsForPostPromise(post.id)
                .then(comments => {
                    // Have the comments for this post, remember them
                    post.comments = comments;
                })
        ))
            // When all of those comments requests are done, set the
            // user as the final resolution value in the chain
            .then(_ => user);
    });
}

/**
 * Although actually, we could start requesting the comments for the posts as soon as we have the posts, 
 * without waiting for the user until later:
 */
exports.getUserDataV2 = function (userId) {
    return Promise.all(
        [
            usersApi.getUsersByIdPromise(userId),
            postsApi.getPostsForUserPromise(userId).then(posts =>
                // We have the posts, start parallel requests for their comments                
                Promise.all(posts.map(post =>
                    commentsApi.getCommentsForPostPromise(post.id)
                        .then(comments => {
                            // Have the post's comments, remember them
                            post.comments = comments;
                        })
                ))
                    // We have all the comments, resolve with posts
                    .then(_ => posts)
            )
        ]
    ).then(([user, posts]) => { // Note the destructuring
        // We have both user and posts (with their filled-in comments)
        // Remember the posts on the user, and return the user as the final
        // resolution value in the chain
        console.log(posts);
        user.posts = posts;
        console.log(user);
        return user;
    });
}

