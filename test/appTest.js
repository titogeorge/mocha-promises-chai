var app = require("../src/app");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
const expect = require("chai").expect;

describe("App Test Suite", function () {
    it("Returns a user with posts", function () {
        return expect(app.getUserData(1))
            .to.eventually.have.property("posts")
            .that.is.an('array') //check if posts is an array
            .that.to.have.lengthOf(10).notify() //checks if there are 10 posts
            //TODO how to check if a post contain comments?
            ;
    });
    // it("Post should have comments", function () {
    //     //This style will only work with chai-as-promised
    //     return expect(app.getUserData(1)).to.eventually.have.deep.property("posts[0].comments");
    // });

})

var s = {
    a: {
        b: ['x', 'y']
    }
}