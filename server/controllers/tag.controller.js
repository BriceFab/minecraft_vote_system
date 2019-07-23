const response = require('../services/response');
const { type, tag } = require('../models');

module.exports.getAllByType = async (req, res) => {
    const { id_type } = req.params;

    type.findByPk(id_type).then(res_type => {
        tag.findAll({
            where: {
                id_type: res_type.id_type
            }
        }).then(res_tags => {
            return response.sendSuccess(res, res_tags);
        }).catch(tags_error => {
            return response.sendSequelizeError(res, 'unable to get tags');
        })
    }).catch(error => {
        return response.sendSequelizeError(res, 'type not found');
    })
};