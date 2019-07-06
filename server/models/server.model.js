module.exports = (sequelize, DataTypes) => {
    const server = sequelize.define('server', {
        id_server: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isUUID: 4,
            }
        },
        name: {type: DataTypes.STRING, allowNull: false},
        url: {type: DataTypes.STRING, allowNull: false},
        ip: {type: DataTypes.STRING, allowNull: true},
        description: {type: DataTypes.STRING, allowNull: false},
        banner: {type: DataTypes.STRING, allowNull: true},
        vote_wait: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 180},
        vote_duration: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 30},
        enable: {type: DataTypes.BOOLEAN, defaultValue: false},
    });

    server.associate = (models) => {
        models.server.hasMany(models.vote, { foreignKey: { name: 'id_server', allowNull: false }, onDelete: 'CASCADE' });
        models.server.hasMany(models.server_tag, { foreignKey: { name: 'id_server', allowNull: false }, onDelete: 'CASCADE' });

        models.server.belongsTo(models.type, {
            foreignKey: {
                name: 'id_type',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        models.server.belongsTo(models.user, {
            foreignKey: {
                name: 'id_user',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };

    return server;
};