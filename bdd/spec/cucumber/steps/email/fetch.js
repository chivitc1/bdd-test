import {Given, Then, When} from 'cucumber';
import driver from '../../../../driver';
import chai from 'chai';

Given('Having Teams, folders, mail_servers, mail_accounts, mailing_list for kwmcjp1@gmail.com', function(cb){
    const seed_data = require('../../features/email/fetch-precondition.json');
    driver.post('/driver/db/seed', [{"teams": seed_data.teams}, 
        {"folders": seed_data.folders}, 
        {"mail_servers": seed_data.mail_servers}, 
        {"mail_accounts": seed_data.mail_accounts}, 
        {"mailing_list": seed_data.mailing_list}])
    .then((response) => {       
        if(response.status == 200) {
            this.mail_list = seed_data.mail_accounts.mail_account_email;
            cb();
        } else {
            cb(response.text)
        }
    })
    .catch(error => cb(error));
});

When('Sending an email to mailing_list kwmcjp1@gmail.com', function(cb) {
    const email_data = require('../../features/email/fetch-action-data.json');
    driver.post('/driver/email-messages', [{"email_messages": email_data.email_message}])
    .then((response) => {       
        if(response.status == 200) {
            const jsonRes = JSON.parse(response.text);
            this.new_email = jsonRes;
            cb();
        } else {
            cb(response.text)
        }
    })
    .catch(error => cb(error));;
});

Then('The email should be saved in database', function() {
    chai.assert.isObject(this.new_email, 'The new email should have been fetched');
});