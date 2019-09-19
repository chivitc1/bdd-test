/**
 * @author chinv
 * Common steps definition
 */
import { When, Then, setDefaultTimeout } from 'cucumber';
import superagent from 'superagent';
import assert from 'assert';

setDefaultTimeout(process.env.CUCUMBER_TEST_ASYNC_TIMEOUT || 120000);

When(/^client create a (GET|POST|PUT|DELETE) request to (\/driver\/.+)$/, function(method, path) {
    const processedPath = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${path}`;
    this.request = superagent(method, processedPath);
});

When(/^client create a (GET|POST|PUT|DELETE) request to (\/api\/.+)$/, function(method, path) {
    const processedPath = `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}:${process.env.API_PORT}${path}`;
    // console.log(processedPath);
    this.request = superagent(method, processedPath).set('Content-Type', 'application/json');
});

When(/^send the request$/, function() {
    return this.request
        .then((response) => {
            this.response = response.res;
        }).catch((error) => {
            this.response = error.response;
        });
});

Then(/^the Driver should respond with a ([1-5]\d{2}) HTTP status code$/, function(statusCode) {
    assert.equal(this.response.statusCode, statusCode);
});

Then(/^the API should respond with a ([1-5]\d{2}) HTTP status code$/, function(statusCode) {
    assert.equal(this.statusCode, statusCode);
});

Then(/^payload should be a JSON object$/, function() {
    const contentType = this.response.headers['Content-Type'] || this.response.headers['content-type']
    if (!contentType || !contentType.includes('application/json')) {
        throw new AssertionError({ message: 'Response not of content-type application/json' });
    }

    try {
        this.responsePayload = JSON.parse(this.response.text);
      } catch (err) {
        throw new AssertionError({ message: 'Response not a valid JSON object' });
    }
});
