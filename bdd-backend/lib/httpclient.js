import superagent from 'superagent';

class HttpClient {
    
    constructor(method, path) {
        this.method = method;
        if (path.includes('http')) {
            this.url = path;
        } else {
            this.url = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${path}`;
        }
        this.request = superagent(method, this.url).set('Content-Type', 'application/json');
    }

    send(payload) {
        if (payload == 'GET' || payload == 'DELETE') {
            return this.request.send();
        }
        return this.request.send(payload);
    }
}

export default HttpClient;
