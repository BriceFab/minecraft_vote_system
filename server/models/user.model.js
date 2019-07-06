const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id_user: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isUUID: 4,
            }
        },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: { msg: 'invalid email' } } },
        password: { type: DataTypes.STRING, allowNull: false },
        confirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    });

    user.associate = (models) => {
        models.user.hasMany(models.server, { foreignKey: { name: 'id_user', allowNull: false }, onDelete: 'CASCADE' });
    };

    user.findUser = (username, email) => {
        let whereOp = {
            username: null,
        };

        if (username) {
            whereOp = {
                username: username
            };
        } else if (email) {
            whereOp = {
                email: email
            };
        }

        return sequelize.models.user.findOne({
            where: whereOp
        });
    };

    user.generateHash = (password) => {
        return bcrypt.hashSync(password, 10);
    };

    user.comparePassword = (password, hash) => {
        return bcrypt.compareSync(password, hash);
    };

    user.beforeCreate((user, options) => {
        user.password = sequelize.models.user.generateHash(user.password);
    });

    user.getCurrentUser = (req) => {
        let id_user = null;
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace('Bearer ', '');
            jwt.verify(token, config.jwt.encryption, (err, decode) => {
                if (err) id_user = null;
                id_user = decode.id_user;
            });
        }
        return id_user;
    };

    return user;
};