/**
 * @author chinv
 * Abstract http client library from cucumber steps.
 */

import superagent from 'superagent';

function post(apiUrl, payload, accessToken=null) {
    var request = superagent('POST', apiUrl)
        .set('Content-Type', 'application/json')
        .set('token', accessToken);
    return request.send(payload);
}

function get(apiUrl, accessToken=null) {
    var request = superagent('GET', apiUrl)
        .set('Content-Type', 'application/json')
        .set('token', accessToken);
    return request.send();
}
export default { post, get };
