module.exports = (sequelize, DataTypes) => {
    const type = sequelize.define('type', {
        id: {
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
        models.type.hasMany(models.server, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return type;
};