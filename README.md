# Unit testing NodeJS with mochajs/chai.

This code demonstrates the unit testing of JavaScript Functions using **mochajs** test framework. 

> **Packages Used:**

> - [MochaJS](https://mochajs.org/) - MochaJS is a feature-rich JavaScript test framework.
> - [ChaiJS](http://chaijs.com/) - Chai is a BDD / TDD assertion library for node
> - [chai-as-promised](https://github.com/domenic/chai-as-promised) - Chai as Promised extends Chai with a fluent language for asserting facts about promises.

### Setup
```sh
# Install dependencies
$ npm install
# Run Tests
$ npm test
# Run Tests with coverage
$ npm run test_coverage
```

## Mocha Guide to Testing
Objective is to explain describe(), it(), and before()/etc hooks

 - `describe()` is merely for grouping, which you can nest as deep
 - `it()` is a test case
 - `before()`, `beforeEach()`, `after()`, `afterEach()` are hooks to run before/after first/each it() or describe().

```js
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
        before(function(){
            console.log('see.. before function is run ONCE only')
        });
        after(function(){
            console.log("see.. after function is run ONCE only; After all the tests. ")
        });
        beforeEach(function(){
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
        it("Promise Returns a List of Users, of Length 10.", function () {
            //This style will only work with chai-as-promised
            return usersApi.getUsersPromise().should.eventually.have.length(10);
        });
        // Third Test Case
        it("User 'Glenna Reichert' is in the list.", function (done) {
            usersApi.getUsers(function (err, data) {

                let found = false;
                for (let user of data){
                    if (user.name === 'Glenna Reichert'){
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
```
*If successful following output is produced.*

```sh
$ npm test

> social@1.0.0 test H:\grgttg\work\raj\social
> mocha --colors --reporter spec



  Comments API Test Suite
    Get Comments for Post with id 99
      √ Returns a List of Comments, of Length 5. (78ms)
      √ All posts returned has postId 5

  Posts API Test Suite
    Get Posts for User with id 10
      √ Returns a List of posts, of Length 10.
      √ All posts returned has userId 10

  Users API Test Suite
    Get Users
see.. before function is run ONCE only
see.. beforeEach function is run before every it
      √ Returns a List of Users, of Length 10.
see.. beforeEach function is run before every it
      √ Promise Returns a List of Users, of Length 10.
see.. beforeEach function is run before every it
      √ User 'Glenna Reichert' is in the list.
      - This test will show as pending in report
see.. after function is run ONCE only; After all the tests.


  7 passing (218ms)
  1 pending

```

#### Good Reads Aka Acknowledgements
- http://samwize.com/2014/02/08/a-guide-to-mochas-describe-it-and-setup-hooks/
- https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha
- https://mochajs.org/#getting-started
- https://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-callbacks/
- http://callbackhell.com/
- https://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron
- https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
- https://stackoverflow.com/a/44569471/508214
