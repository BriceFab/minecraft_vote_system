module.exports = (sequelize, DataTypes) => {
    const type = sequelize.define('type', {
        id_type: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isUUID: 4,
            }
        },
        label: {type: DataTypes.STRING, allowNull: false}
    });

    type.associate = (models) => {
        models.type.hasMany(models.server, { foreignKey: { name: 'id_type', allowNull: false }, onDelete: 'CASCADE' });
        models.type.hasMany(models.tag, { foreignKey: { name: 'id_type', allowNull: false }, onDelete: 'CASCADE' });
    };

    return type;
};