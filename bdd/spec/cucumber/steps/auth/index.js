import { Then, When } from 'cucumber';

When(/^Attach a valid login payload$/, function() {
  this.requestPayload = { loginId: `${process.env.API_LOGIN_ID}`, password: `${process.env.API_LOGIN_PASSWORD}`};
  this.request.send(this.requestPayload);
})
Then(/^payload contains an accessToken$/, function() {
  // console.log(this.response.text);
  const jsonRes = JSON.parse(this.response.text);
  if (!this.response.text || !jsonRes.accessToken) {
    throw new AssertionError({message: "Could not get accessToken"});
  }
});