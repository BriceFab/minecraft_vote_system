const response = require('../services/response');
const { type } = require('../models');

module.exports.getAll = async (req, res) => {
    type.findAll().then(res_types => {
        return response.sendSuccess(res, res_types);
    }).catch(error => {
        return response.sendSequelizeError(res, error);
    });
};