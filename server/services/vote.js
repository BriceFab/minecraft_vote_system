const axios = require('axios');

module.exports.check = async (Ip) => {
    const test = await axios.get(`http://check.getipintel.net/check.php?ip=${Ip}&contact=bricefab123@gmail.com&format=json`);
    // console.log(test.data);

    return parseInt(test.data.result) >= 1;
};

module.exports.getIpInfo = async (Ip) => {
    const test = await axios.get(`http://ip-api.com/json/${Ip}`);
    // console.log(test.data);

    return {
        city: test.data.city,
        country: test.data.country,
        region: test.data.regionName,
    }
};