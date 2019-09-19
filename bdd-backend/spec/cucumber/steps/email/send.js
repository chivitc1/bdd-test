/**
 * @author chinv
 * Send email process steps definition
 */

import { Given, Then, When } from 'cucumber';
import driverClient from '../infra/driverClient';
import chai from 'chai';
import { sleep, getApiUrl, getDriverApiUrl } from '../infra/utils';
import { seedData, getAccessToken } from '../infra/driverCommon';

const MAX_RETRIES = 4;
const DELAY_MS = 10000;
const DEFAULT_PASSWORD = '1234567';

Given('Have a replying email in CHECKED status', async function () {
    const data = require('../../features/email/sendmail_pre.json');
    await seedData(data);
    this.loginPayload = { "loginId": data.users[0].username, "password": DEFAULT_PASSWORD };
    this.customerEmail = data.emails[0];
    this.replyEmail = data.emails[1];
});

Given('Retrieve accessToken for user member1', async function () {
    const apiUrl = getApiUrl('/api/v1/auth/token');
    const response = await getAccessToken(apiUrl, this.loginPayload);
    this.accessToken = response.data.accessToken;
    chai.assert.isDefined(this.accessToken);
});

When(/^Post a SEND email request operation to (\/api\/v1\/mails)\/{id}\/(mails)$/, async function (apiBasePath, apiSubPath) {

    const replyMailApiPath = `${apiBasePath}/${this.customerEmail.id}/${apiSubPath}?operation=SEND`;
    const replyMailApiUrl = getApiUrl(replyMailApiPath);
    const replyMailPayload = {
        "id": this.replyEmail.id,
        "from": this.replyEmail.mail_from,
        "to": this.replyEmail.mail_to,
        "cc": this.replyEmail.mail_cc,
        "bcc": this.replyEmail.mail_bcc,
        "subject": this.replyEmail.mail_subject,
        "content": this.replyEmail.mail_content
    }

    const response = await createSendMailRequest(replyMailApiUrl, replyMailPayload, this.accessToken)
    chai.assert.isDefined(response);
    this.statusCode = response.statusCode;
});

When('Check sent email in database', async function () {
    this.deliveredEmailInfo = await checkEmailInDbWithRetry(this.replyEmail.id);
    chai.assert.isNotNull(this.deliveredEmailInfo);
})

Then('The replying email message_id should have been set', function (done) {
    chai.assert.isNotNull(this.deliveredEmailInfo.messageId);
    chai.assert.equal(this.deliveredEmailInfo.sysStatus, 'SENT');
    done();
});

async function checkEmailInDbWithRetry(id) {
    let retries = 0;
    let res = null;
    const driverApiUrl = getDriverApiUrl(`/driver/emails/${id}`);
    while (retries < MAX_RETRIES) {
        ++retries;
        console.log(`Check sending email in db, attempt = ${retries}`)
        await sleep(DELAY_MS);

        res = await driverClient.get(driverApiUrl)
            .then((response) => {
                if (response.status == 200) {
                    const jsonRes = JSON.parse(response.text);
                    return { "sysStatus": jsonRes.sys_status, "messageId": jsonRes.message_id };
                }
            })
            .catch(error => {
                //skip error for retrying
            });

        if (res && res.messageId) {
            break;
        }
    }

    if (!res || !res.messageId) {
        throw Error(`Delivery email not completed after ${retries} retries`);
    }
    return res;
}

async function createSendMailRequest(replyMailApiUrl, replyMailPayload, accessToken) {
    let res = null;
    res = await driverClient.post(replyMailApiUrl, replyMailPayload, accessToken)
        .then((response) => {
            if (response.status == 200) {
                const jsonRes = JSON.parse(response.text);
                return { "statusCode": 200, "data": jsonRes };
            }
        })
        .catch(error => { throw Error(error) });
    return res;
}