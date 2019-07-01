import {Given, Then, When} from 'cucumber';
import driver from '../../../../driver';
import chai from 'chai';

Given('Have a replying email in an email thread', function(cb){
    const seed_data = require('../../features/send-email/emails.json');
    console.log(seed_data)

    driver.post('/driver/db/seed', seed_data)
    .then((response) => {       
        if(response.status == 200) {
            this.replyingEmailId = seed_data.emails[1].id;
            cb();
        } else {
            cb(response.text)
        }
    })
    .catch(error => cb(error));;
})
When('Channel mail.postprocessed has a sending email request', function(cb) {
    driver.post('/driver/messaging', {"channel": "mail.postprocessed", "message": {"mailSourceId": this.replyingEmailId}})
    .then(response => {
        if(response.status == 200) {
            cb();
        } else {
            cb(response.text)
        }
    })
    .catch(error => cb(error.response.text));
})

When('When I get the replying email', function(cb) {
    driver.get(`/driver/emails/${this.replyingEmailId}`)
    .then(response => {
        if(response.status == 200) {
            const jsonRes = JSON.parse(response.text);
            this.replyingEmail = jsonRes;
            cb();
        } else {
            cb(response.text)
        }
    }).catch(error => { cb(error.response.text);});
})
Then('The replying email message_id should have been set', function(cb) {
    chai.assert.isNotNull(this.replyingEmail.message_id, 'The replying email\'s message_id should be set');
})