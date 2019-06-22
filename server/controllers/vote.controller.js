const response = require('../services/response');
const moment = require('moment');
const ipService = require('../services/ip');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const {vote, server} = require('../models');

const addVote = async (id_server, ip, req, res) => {
    //check is vpn
    const isVpn = await ipService.checkVpn(ip, req.headers);
    if (isVpn) return response.sendError(res, 'proxy are not allowed');

    //get ip info
    const ipInfo = await ipService.getInfo(ip);
    if (ipInfo === undefined) return response.sendError(res, 'unable to get ip info');

    const vote_data = await vote.create({
        id_server: id_server,
        date: moment(),
        ip: ip,
        ...ipInfo,
    });
    return response.sendSuccess(res, {token:vote_data.token});
};

/*
TODO add captcha
TODO add user_id if not anonyme
TODO add secret token for vote ?
TODO autoriser seulement certains pays
 */
const create = async (req, res) => {
    //check host
    const {host} = req.headers;
    if (!host) return response.sendError(res, 'not authorized');
    if (![config.app.host].includes(host)) return response.sendError(res, 'not authorized');

    //get server
    const {id_server} = req.params;
    if (!id_server) return response.sendError(res, 'unable to find server');

    const vote_server = await server.findByPk(id_server);
    if (!vote_server) return response.sendError(res, 'no server');

    //get ip
    const ip = await ipService.getIp();
    if (ip === undefined) return response.sendError(res, 'unable to get ip');

    //get last vote
    const last_vote = await vote.findOne({
        where: {
            id_server: id_server,
            ip: ip,
        },
        order: [
            ['date', 'DESC'],
        ],
    });

    if (last_vote) {
        const vote_date = moment(last_vote.date).add({minutes: vote_server.dataValues.vote_wait});
        const date = moment();

        if (date.isAfter(vote_date)) {
            return addVote(id_server, ip, req, res);
        } else {
            const date_diff = vote_date.diff(date, null, true);
            const duration = moment.duration(date_diff);

            return response.sendError(res, {
                waitTime: {
                    hours: duration.get('hours'),
                    minutes: duration.get('minutes'),
                    seconds: duration.get('seconds'),
                }
            })
        }
    } else {
        return addVote(id_server, ip, req, res);
    }
};
module.exports.create = create;

/*
TODO add secret token => only server site can verif or official site
 */
const check = async (req, res) => {
    let token_data = {};

    try {
        //remplacer par jwt.verify ? 
        const decode = jwt.decode(req.params.token, {complete: true});
        const expiration = decode.payload.exp;
        token_data = decode.payload.data;
        // console.log('token_decode', vote, expiration);

        if (Date.now() / 1000 > expiration) {
            return response.sendError(res, 'token has expired');
        }
    } catch (err) {
        return response.sendError(res, 'invalid token');
    }

    const vote_data = await vote.findByPk(token_data.id_vote);
    if (!vote_data) return response.sendError(res, 'invalid vote');

    if (vote_data.hasUse) {
        return response.sendError(res, 'reward already used');
    } else {
        vote_data.hasUse = true;
        vote_data.save();

        return response.sendSuccess(res, {
            token: 'token valid',
            canUse: true,
        });
    }
};
module.exports.check = check;