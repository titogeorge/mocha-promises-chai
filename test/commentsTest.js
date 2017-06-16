var commentsApi = require("../src/comments");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
chai.should();

describe("Comments API Test Suite", function () {
    describe("Get Comments for Post with id 99", function () {
        it("Returns a List of Comments, of Length 5.", function (done) {
            commentsApi.getCommentsForPost(5, function (err, posts) {
                expect(posts.length).to.equal(5);
                done();
            });
        });
        it("All posts returned has postId 5", function (done) {
            commentsApi.getCommentsForPost(5, function (err, comments) {
                for (let comment of comments) {
                    expect(comment.postId).to.equal(5);
                }
                done();
            });
        });
        it("Returns a Promise with comment[], of Length 5.", function () {
            //This style will only work with chai-as-promised
            return commentsApi.getCommentsForPostPromise(5).should.eventually.have.length(5);
        });
    })
})