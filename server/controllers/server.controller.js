const response = require('../services/response');
const { user, server, server_tag, type, sequelize } = require('../models');

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

module.exports.getAllByFilters = async (req, res) => {
    const { id_type } = req.params;
    const { tags } = req.body;
    const Op = sequelize.Op;

    if (!Array.isArray(tags)) {
        return response.sendError(res, 'tags invalide');
    }

    server.findAll({
        include: [server_tag],
        where: {
            id_type: id_type,
        }
    }).then(res_servers => {
        const filter_servers = res_servers.filter(act_server => {
            const act_tags = act_server.server_tags.map(act_server_tag => act_server_tag.id_tag);
            let has_all_tags = true;
            tags.forEach(req_act_tag => {
                if (!act_tags.includes(req_act_tag)) {
                    has_all_tags = false;
                    return false;
                }
            })
            return has_all_tags;
        });
        response.sendSuccess(res, filter_servers);
    }).catch(error => {
        return response.sendSequelizeError(res, error);
    });
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
    });
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
    });
};