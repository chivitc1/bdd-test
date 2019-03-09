import { Then } from 'cucumber';
import assert from 'assert';

Then(/^contains message (.+)$/, function(jsonMsg) {
    assert.equal(JSON.stringify(this.responsePayload), jsonMsg);
});