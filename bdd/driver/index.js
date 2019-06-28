import superagent from 'superagent';
class Driver {
    constructor(httpMethod, uriPath) {
        this.httpMethod = httpMethod;
        this.uriPath = uriPath;
        const processedPath = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${this.uriPath}`;
        this.request = superagent(method, processedPath).set('Content-Type', 'application/json');
    }
    send() {
        return this.request
        .then((response) => {
            this.response = response.res;
        }).catch((error) => {
            console.log(error.response);
        });
    }
}

export default Driver;
