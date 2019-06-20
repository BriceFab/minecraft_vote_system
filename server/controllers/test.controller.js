const response = require('../services/response');
const moment = require('moment');
const ipService = require('../services/ip');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const {vote, server} = require('../models');

/*
TODO add captcha
 */
const postVote = async function(req, res){
    const ip = await ipService.getIp();
    if (ip === undefined) return response.error(res, "No ip");

    const isVpn = await ipService.checkVpn(ip);
    if (isVpn === undefined) return response.error(res, "unknow vpn");

    const ipInfo = await ipService.getInfo(ip);
    if (ipInfo === undefined) return response.error(res, "no ip info");

    const host = req.headers.host;

    if (!'https://www.orionmc.fr'.includes('orionmc.fr')) return response.error(res, 'invalid host');

    console.log('host', host);

    const vote_date = moment('2019-06-16 13:59:51').add({hour: 3});
    const date = moment();

    if (date.isAfter(vote_date)) {
        const vote_data = await vote.create({
            serverId: '320d394e-9060-11e9-b776-00ff8997ac6c',
            date: moment(),
            ip: ip,
            ...ipInfo,
        });

        return response.success(res, {token:vote_data.token}, 200);
    } else {
        const date_diff = vote_date.diff(date, null, true);
        const duration = moment.duration(date_diff);

        return response.error(res, {
            waitTime: {
                hours: duration.get('hours'),
                minutes: duration.get('minutes'),
                seconds: duration.get('seconds'),
            }
        })
    }
};
module.exports.postVote = postVote;

//secret token => only by server site verif
const checkVote = async function(req, res){
    try {
        const decode = jwt.decode(req.params.token, {complete: true});
        const vote = decode.payload.data;
        const expiration = decode.payload.exp;
        // console.log('token_decode', vote, expiration);

        if (Date.now() / 1000 > expiration) {
            return response.error(res, 'token has expired');
        } else {
            //verify if user have get recompense

            //set has use -> true

            return response.success(res, 'token valid', 200);
        }

    } catch (err) {
        return response.error(res, 'invalid token');
    }
};
module.exports.checkVote = checkVote;

const association = async (req, res, next) => {
    // console.log('next', next)
    const last_vote = await vote.findOne({
        include: [ {
            model: server
        }],
        limit: 1,
    });

    return response.success(res, last_vote);
};
module.exports.association = association;

module.exports.geoip = async (req, res) => {
    const geoip = require('geoip-lite');

    const ip = await ipService.getIp();
    console.log('ip', ip);
    const geo = geoip.lookup(ip);

    return response.success(res, {
        geoIp: geo
    })
};