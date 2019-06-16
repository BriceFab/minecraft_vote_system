module.exports = (sequelize, DataTypes) => {
    const server = sequelize.define('server', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isUUID: 4,
            }
        },
        name: {type: DataTypes.STRING, allowNull: false, validate: {max:1}},
        url: {type: DataTypes.STRING, allowNull: false},
        ip: {type: DataTypes.STRING, allowNull: true},
        description: {type: DataTypes.STRING, allowNull: false},
        banner: {type: DataTypes.STRING, allowNull: true},
        vote_wait: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 180},
        vote_duration: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 30},
        enable: {type: DataTypes.BOOLEAN, defaultValue: true},
    });

    server.associate = (models) => {
        models.server.hasMany(models.vote, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            },
        });
        models.server.hasMany(models.server_tag);
    };

    return server;
};