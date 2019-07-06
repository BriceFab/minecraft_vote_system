const response = require('../services/response');
const { user, server } = require('../models');

module.exports.add = async (req, res) => {
    const id_user = user.getCurrentUser(req)

    server.create({...req.body, id_user}).then(res_server => {
        response.sendSuccess(res, res_server);
    }).catch(error => {
        return response.sendSequelizeError(res, error);
    })
};