const bcrypt = require('bcryptjs');

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
        username: {type: DataTypes.STRING, allowNull: false, unique: true },
        email: {type: DataTypes.STRING, allowNull: false, unique: true, validate: {isEmail: { msg: 'invalid email' }} },
        password: {type: DataTypes.STRING, allowNull: false },
    });

    user.associate = (models) => {
        models.user.hasMany(models.server, { foreignKey: { name: 'id_user', allowNull: false }, onDelete: 'CASCADE' });
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

    return user;
};