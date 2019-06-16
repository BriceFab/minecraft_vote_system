module.exports = (sequelize, DataTypes) => {
    const tag = sequelize.define('tag', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        label: {type: DataTypes.STRING, allowNull: false}
    });

    tag.associate = (models) => {
        models.tag.hasMany(models.server_tag, {onDelete: 'CASCADE'});
    };

    return tag;
};