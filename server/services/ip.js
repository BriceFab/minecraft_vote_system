const axios = require('axios');
const log = require('./log');
const config = require('../config/config');
const publicIp = require('public-ip');

module.exports.getIp = async () => {
  return await publicIp.v4();
};

module.exports.checkVpn = async (Ip) => {
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