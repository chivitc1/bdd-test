import axios from 'axios';
var querystring = require('querystring');

const API_PATH='/oauth2/token';
const getToken = (req, res) => {
    const processedPath = `${process.env.SERVER_PROTOCOL}://${process.env.SPIRAL_HOSTNAME}:${process.env.SPIRAL_PORT}${API_PATH}`;
    console.log(processedPath);

    //This stringify post data required for urlecoded post.
    //axios default use json serialize can work direct with object.
    const requestBody = querystring.stringify({
      grant_type: 'password',
      client_id: `hogehoge_${process.env.SPIRAL_USER_ID}`,
      client_secret: `fugafuga_${process.env.SPIRAL_USER_ID}`,
      username: 'user1@yopmail.com',
      password: '123456Aa@',
      account: `${process.env.SPIRAL_ACCOUNT_ID}`
    });
    
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apikey': `${process.env.SPIRAL_APIKEY}`,
      }
    }

    console.log(config)

    console.log(requestBody)

    axios.post(processedPath, requestBody, config)
      .then(response => {
        // console.log(response.data);
        return res.status(200)
          .json(response.data);
    }).catch(err => {
        res.status(500).send(err.response);
    });
}

export default { getToken }