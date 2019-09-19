import { Then } from 'cucumber';
import assert from 'assert';
import { sleep } from '../infra/utils';

Then(/^contains message (.+)$/, function(jsonMsg) {
    assert.equal(JSON.stringify(this.responsePayload), jsonMsg);
});

Then('call async func', async function() {
    await checkEmailInDb();
})

Then('say ok', function(cb) {
    console.log('OK');
    cb();
})
async function checkEmailInDb() {
    let retries = 0;
    const MAX_RETRIES = 2;
    const DELAY_MS = 10000;
    while (retries < MAX_RETRIES) {
        ++retries;
        // console.log(`Retry ${retries}`)
        await sleep(DELAY_MS)
    }
    return retries;
}