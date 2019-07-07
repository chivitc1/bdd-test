import { When, Then, setDefaultTimeout } from 'cucumber';
import HttpClient from '../../lib/httpclient';
import assert from 'assert';
import 'core-js';
import 'regenerator-runtime/runtime';

setDefaultTimeout(process.env.CUCUMBER_TEST_ASYNC_TIMEOUT);

When(/^client create a (GET|DELETE) request to (\/.+)$/, function(method, uri) {
    this.request = new HttpClient(method, uri);
});

When(/^send the request$/, async function() {
    let result = await this.request.send(this.payload);
    this.response = result.res;
    // console.log(this.response.text);
});

Then('the respond code should be {int}', function(statusCode) {
    assert.equal(this.response.statusCode, statusCode);
    this.responsePayload = JSON.parse(this.response.text);
});

Then('The respond payload should contains message {string}', function(jsonMsg) {
    chai.expect(JSON.stringify(this.responsePayload)).to.equal(jsonMsg)
});
