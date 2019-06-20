module.exports = (sequelize, DataTypes) => {
    const server_tag = sequelize.define('server_tag', {
        id_server_tag: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isUUID: 4,
            }
        },
    }, {
        timestamps: false
    });

    server_tag.associate = (models) => {
        models.server_tag.belongsTo(models.server, {
            foreignKey: {
                name: 'id_server',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });

        models.server_tag.belongsTo(models.tag, {
            foreignKey: {
                name: 'id_tag',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };

    return server_tag;
};