/**
 * @author chinv
 * Fetch email process steps definition
 */

import { Given, Then, When } from 'cucumber';
import driverClient from '../infra/driverClient';
import chai from 'chai';
import { sleep, getDriverApiUrl } from '../infra/utils';
import { seedData } from '../infra/driverCommon';

const UNCATEGORIED_FOLDER = 4 //Based on seed data in precondition.json file
const MAX_RETRIES = 4;
const DELAY_MS = 10000;

Given('Having users, teams, folders, mail_servers, mailing_list, mail_accounts, email preprocess rules', async function () {
    const data = require('../../features/email/fetchmail_pre.json');
    await seedData(data);
});

When('Customer send an email to the mail_group support without matching any preprocess rule', async function () {
    const email_data = require('../../features/email/customer-unknown-service-email.json');
    this.sentEmailMessageId = await sendEmail(email_data);
});

When('Check email in database', async function () {
    this.receivedEmail = await checkEmailInDbWithRetry(this.sentEmailMessageId);
})

Then('The email should have been fetched and classified into uncategoried folder', function (done) {
    chai.assert.isNotNull(this.receivedEmail);
    chai.assert.equal(this.receivedEmail.folder_id, UNCATEGORIED_FOLDER);
    done()
});

async function checkEmailInDbWithRetry(messageId) {
    let retries = 0;
    let receivedEmail = null;
    const driverApiUrl = getDriverApiUrl(`/driver/checkReceivingEmail?messageId=${messageId}`);
    while (retries < MAX_RETRIES && !receivedEmail) {
        ++retries;
        console.log(`Check fetch email in db, attempt = ${retries}`);
        await sleep(DELAY_MS);
        await driverClient.get(driverApiUrl)
        .then((response) => {
            if (response.status == 200) {
                receivedEmail = JSON.parse(response.text);                
            }
        })
        .catch(error => {
            //skip error for retrying
        });
    }
    if (!receivedEmail) {
        throw Error(`Email not found in db after ${retries} retries`);
    }
    return receivedEmail;
}

async function sendEmail(email_data) {
    let messageId = null;
    const driverApiUrl = getDriverApiUrl('/driver/sendmail');
    messageId = await driverClient.post(driverApiUrl, email_data)
        .then((response) => {
            if (response.status == 200) {
                const jsonRes = JSON.parse(response.text);
                return jsonRes.messageId;
            }         
        })
        .catch(error => { throw Error(error)});
    return messageId;
}