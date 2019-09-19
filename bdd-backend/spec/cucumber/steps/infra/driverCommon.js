/**
 * @author chinv
 * Common functions to operate with api, driver should be place here. Don't place too specific function here.
 */

import driverClient from './driverClient';
import { getDriverApiUrl } from './utils';

async function seedData(seed_data) {
    const driverUrl = getDriverApiUrl('/driver/db/seed');
    await driverClient.post(driverUrl, seed_data)
        .then((response) => {
            if (response.status == 200) {
                return true;
            }
        })
        .catch(error => { throw Error(error) });
    return false;
}

async function getAccessToken(authUrl, payload) {
    let token = await driverClient.post(authUrl, payload)
        .then((response) => {
            if (response.status == 200) {
                const jsonRes = JSON.parse(response.text);
                return { "statusCode": response.status, "data": { "accessToken": jsonRes.accessToken } };
            }
        })
        .catch(error => {
            throw Error(error)
        });
    return token;
}

export { seedData, getAccessToken };