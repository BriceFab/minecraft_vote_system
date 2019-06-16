module.exports = (sequelize, DataTypes) => {
    const server_tag = sequelize.define('server_tag', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isUUID: 4,
            }
        },
    });

    server_tag.associate = (models) => {
    };

    return server_tag;
};