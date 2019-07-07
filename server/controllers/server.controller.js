const response = require('../services/response');
const { user, server } = require('../models');

module.exports.add = async (req, res) => {
    const id_user = user.getCurrentUser(req);

    server.create({ ...req.body, id_user }).then(res_server => {
        response.sendSuccess(res, res_server);
    }).catch(error => {
        return response.sendSequelizeError(res, error);
    })
};

module.exports.getAllMy = async (req, res) => {
    const id_user = user.getCurrentUser(req);
    server.findAll({
        where: {
            id_user: id_user
        }
    }).then(res_servers => {
        response.sendSuccess(res, res_servers);
    }).catch(error => {
        return response.sendSequelizeError(res, error);
    })
};

module.exports.deleteMy = async (req, res) => {
    server.findOne({
        where: {
            id_server: req.params.id_server,
            id_user: user.getCurrentUser(req),
        }
    }).then(res_server => {
        res_server.destroy();
        response.sendSuccess(res, 'deleted');
    }).catch(error => {
        return response.sendError(res, 'server not found');
    })
};

module.exports.editMy = async (req, res) => {
    server.findOne({
        where: {
            id_server: req.params.id_server,
            id_user: user.getCurrentUser(req),
        }
    }).then(res_server => {
        res_server.update(req.body);
        response.sendSuccess(res, res_server);
    }).catch(error => {
        return response.sendError(res, 'server not found');
    })
};