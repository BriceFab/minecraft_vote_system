module.exports = (sequelize, DataTypes) => {
    const vote = sequelize.define('vote', {
        id_vote: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isUUID: 4,
            }
        },
        ip: {type: DataTypes.STRING, allowNull: false},
        date: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
        hasUse: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        token: {type: DataTypes.STRING(1024), allowNull: false},
        city: {type: DataTypes.STRING, allowNull: true},
        country: {type: DataTypes.STRING, allowNull: true},
        region: {type: DataTypes.STRING, allowNull: true},
    }, {
        timestamps: false,
    });

    vote.associate = (models) => {
        models.vote.belongsTo(models.server, {
            foreignKey: {
                name: 'id_server',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };

    vote.beforeValidate(async (vote, options) => {
        if (!vote.token) {
            const jwt = require('jsonwebtoken');
            const config = require('../config/config');
            const {server} = require('../models');

            const {id_server} = vote.dataValues;
            const vote_server = await server.findByPk(id_server);

            const data = {
                id_vote: vote.dataValues.id_vote,
                id_server: id_server,
            };
            vote.token = jwt.sign({data: data}, config.jwt.encryption, {expiresIn: vote_server.dataValues.vote_duration});
        }
    });

    return vote;
};