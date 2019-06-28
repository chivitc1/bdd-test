import {Given, Then, When} from 'cucumber';
import Driver from '../../../../driver';

Given('Have a replying email in an email thread', function(cb){
    driver = new Driver('POST', '/driver/emails/thread')
    this.request.send(this.requestPayload);
    cb();
})