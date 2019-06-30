import superagent from 'superagent';

function post(uriPath, payload) {
    const processedPath = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${uriPath}`;
    var request = superagent('POST', processedPath)
    .set('Content-Type', 'application/json');
    return request.send(payload)
}

function get(uriPath) {
    const processedPath = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${uriPath}`;
    var request = superagent('GET', processedPath)
    .set('Content-Type', 'application/json');
    return request.send()
}
export default {post, get}
