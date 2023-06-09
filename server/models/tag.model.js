module.exports = (sequelize, DataTypes) => {
    const tag = sequelize.define('tag', {
        id_tag: {
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

    tag.associate = (models) => {
        models.tag.hasMany(models.server_tag, { foreignKey: { name: 'id_tag', allowNull: false }, onDelete: 'CASCADE' });

        models.tag.belongsTo(models.type, {
            foreignKey: {
                name: 'id_type',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };

    return tag;
};