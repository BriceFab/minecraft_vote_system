module.exports = (sequelize, DataTypes) => {
    const vote = sequelize.define('vote', {
        id: {
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

    vote.beforeValidate((vote, options) => {
        if (!vote.token) {
            const jwt = require('jsonwebtoken');
            const config = require('../config/config');

            const data = {
                vote: vote.dataValues.id,
                server: vote.dataValues.serverId,
            };
            vote.token = jwt.sign({data: data}, config.jwt.encryption, {expiresIn: 60});
        }
    });

    return vote;
};