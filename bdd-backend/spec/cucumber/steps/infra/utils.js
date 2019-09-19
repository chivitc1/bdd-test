/**
 * @author chinv
 * util functions without dependency should place here
 */
async function sleep(waitTimeInMs) { return new Promise(resolve => setTimeout(resolve, waitTimeInMs)) }

function getApiUrl(apiPath) {
    return `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}:${process.env.API_PORT}${apiPath}`;
}

function getDriverApiUrl(apiPath) {
    return `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${apiPath}`;
}

export { sleep, getApiUrl, getDriverApiUrl };
