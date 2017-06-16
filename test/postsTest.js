var postsApi = require("../src/posts");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
chai.should();

describe("Posts API Test Suite", function () {
    describe("Get Posts for User with id 10", function () {
        it("Returns a List of posts, of Length 10.", function (done) {
            postsApi.getPostsForUser(10, function (err, posts) {
                expect(posts.length).to.equal(10);
                done();
            });
        });
        it("All posts returned has userId 10", function (done) {
            postsApi.getPostsForUser(10, function (err, posts) {
                for (let post of posts) {
                    expect(post.userId).to.equal(10);
                }
                done();
            });
        });
        it("Returns a Promise with post[], of Length 10.", function () {
            return postsApi.getPostsForUserPromise(10).should.eventually.have.length(10);
        });
    })
})