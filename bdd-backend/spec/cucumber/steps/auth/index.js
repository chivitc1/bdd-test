/**
 * @author chinv
 * Get user token process steps definition
 */

import { Then, When, Given } from 'cucumber';
import { getApiUrl } from '../infra/utils'
import { seedData, getAccessToken } from '../infra/driverCommon';
import chai from 'chai';

const DEFAULT_PASSWORD = '1234567';

Given('Having an user with role MEMBER in a team', async function () {
  const data = require('../../features/auth/precondition.json');
  await seedData(data);
  this.loginPayload = { "loginId": data.users[0].username, "password": DEFAULT_PASSWORD };
});

When(/^client post a request to api token authen (\/api\/v1\/auth\/token) with user credentials$/, async function (authPath) {
  const apiUrl = getApiUrl(authPath);
  const response = await getAccessToken(apiUrl, this.loginPayload);
  this.accessToken = response.data.accessToken;
  this.statusCode = response.statusCode;
});

Then('payload contains an accessToken', function (done) {
  chai.assert.isDefined(this.accessToken);
  done();
});
