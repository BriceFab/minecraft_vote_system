const axios = require('axios');
const log = require('./log');
const config = require('../config/config');
const publicIp = require('public-ip');

module.exports.getIp = async () => {
  return await publicIp.v4();
};

/**
 * Contrôle si les headers contient un header interdit
 * @param headers
 */
const safeHeaders = (headers) => {
    let isSafe = true;
    // console.log('headers', headers);
    config.vpn.headers.forEach(header => {
        if (Object.keys(headers).includes(header)) {
            isSafe = false;
        }
    });
    return isSafe;
};

/**
 * Contrôle des VPN
 * @param Ip
 * @param headers
 * @returns true if is vpn or proxy
 */
module.exports.checkVpn = async (Ip, headers) => {

    const isSafeHeaders = safeHeaders(headers);
    if (!isSafeHeaders) return true;

    const res = await axios.get(`http://check.getipintel.net/check.php?ip=${Ip}&contact=${config.app.contact}&format=json`);

    if (res.data && res.data.result) {
        return parseInt(res.data.result) >= 1;
    } else {
        log.logError(`unable to check vpn from ${Ip}`);
        return false;
    }
};

module.exports.getInfo = async (Ip) => {
    const res = await axios.get(`http://ip-api.com/json/${Ip}`);

    if (res.data) {
        return {
            city: res.data.city,
            country: res.data.country,
            region: res.data.regionName,
        }
    } else {
        log.logError(`unable to get ip info from ${Ip}`);
        return null;
    }
};