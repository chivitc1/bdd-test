import { Then, When } from 'cucumber';
import chai from 'chai';
import HttpClient from '../../lib/httpclient';

When(/^client create a (GET|POST|PATCH|PUT|DELETE) hello request to (\/.+)$/, function (method, uri) {
    this.request = new HttpClient(method, uri);
    this.method = method;
    if (this.method == 'GET') {
        const payload = require('./get_payload_expect.json');
        this.payload = payload;
    }
    if (this.method == 'PATCH') {
        const payload = require('./patch_payload.json');
        this.payload = payload;
    }
});

Then('The hello respond payload should contains expected message', function () {
    let expectedPayload = '';
    if (this.method == 'GET') {
        expectedPayload = require('./get_payload_expect.json');
        chai.expect(JSON.stringify(this.responsePayload)).to.equal(JSON.stringify(expectedPayload));
    }

    if (this.method == 'PATCH') {
        expectedPayload = require('./patch_payload_expect.json');
        chai.expect(JSON.stringify(this.responsePayload)).to.equal(JSON.stringify(expectedPayload));
    }
});
