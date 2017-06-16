var chai = require("chai");
var chaiAsPromised = require("chai-as-promised"); //Required for unit testing functions that returns a Promise
var usersApi = require("../src/users");
chai.use(chaiAsPromised); //For Promise
var expect = chai.expect;
chai.should();

// describe() are:
// - commonly known as test suites, which contains test cases
// - merely groups, and you can have groups within groups
// **Three test cases, but nested 2-level deep**
describe("Users API Test Suite", function () {
    describe("Get Users", function () {
        // **before() can be applied to describe() too**
        before(function () {
            console.log('see.. before function is run ONCE only')
        });
        after(function () {
            console.log("see.. after function is run ONCE only; After all the tests. ")
        });
        beforeEach(function () {
            console.log('see.. beforeEach function is run before every it')
        });
        // First Test Case
        // as long as no error within a it(), it() is considered PASSED
        it("Returns a List of Users, of Length 10.", function (done) {
            usersApi.getUsers(function (err, data) {
                expect(data.length).to.equal(10);
                done();
            });
        });
        /**
         * Demonstrates how to test a function that returns a Promise
         * See how clean it is.
         */
        // Second Test Case
        it("Returns a Promise with user[], of Length 10..", function () {
            //This style will only work with chai-as-promised
            return usersApi.getUsersPromise().should.eventually.have.length(10);
        });
        // Third Test Case
        it("User 'Glenna Reichert' is in the list.", function (done) {
            usersApi.getUsers(function (err, data) {

                let found = false;
                for (let user of data) {
                    if (user.name === 'Glenna Reichert') {
                        found = true;
                        break;
                    }
                }
                expect(found).to.equal(true);
                done();
            });
        });
        // Fourth Test Case - this will be shown as pending
        it('This test will show as pending in report');
    })
})