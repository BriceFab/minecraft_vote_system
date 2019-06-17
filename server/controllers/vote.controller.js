const response = require('../services/response');
const moment = require('moment');
const ipService = require('../services/ip');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const {vote, server} = require('../models');

const addVote = async (server, ip, ipInfo, res) => {
    const vote_data = await vote.create({
        id_server: server,
        date: moment(),
        ip: ip,
        ...ipInfo,
    });
    return response.success(res, {token:vote_data.token}, 200);
};

/*
TODO add captcha
 */
const create = async (req, res) => {
    //get ip
    const ip = await ipService.getIp();
    if (ip === undefined) return response.error(res, 'unable to get ip');

    //check is vpn
    const isVpn = await ipService.checkVpn(ip);
    if (isVpn === undefined) return response.error(res, 'unable to check vpn');

    //check ip info
    const ipInfo = await ipService.getInfo(ip);
    if (ipInfo === undefined) return response.error(res, 'unable to get ip info');

    //check host
    const {host} = req.headers;
    if (!host) return response.error(res, 'unable to get host');
    if (![config.app.host].includes(host)) return response.error(res, 'invalid host');

    const {server} = req.body;
    if (!server) return response.error(res, 'no server');

    //get last vote
    // const last_vote = await vote.findOne({
    //     // attributes: ['id', 'date'],
    //     include: [ {
    //         model: server
    //     }],
    //     where: {
    //         id_server: server,
    //         // ip: '12',
    //     },
    //     // order: [
    //     //     ['date', 'DESC'],
    //     // ],
    //     // limit: 1,
    // });
    // return response.success(res, last_vote);

    if (false) {
        const vote_date = moment('2019-06-16 13:59:51').add({hour: 3});
        const date = moment();

        if (date.isAfter(vote_date)) {
            return addVote(server, ip, ipInfo, res);
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
    } else {
        return addVote(server, ip, ipInfo, res);
    }
};
module.exports.create = create;

//secret token => only by server site verif
const check = async (req, res) => {
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
module.exports.check = check;