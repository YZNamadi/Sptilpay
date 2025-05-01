const { DataTypes, Model } = require('sequelize');

class Group extends Model {
  static initModel(sequelize) {
    Group.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ownerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Group',
        tableName: 'groups',
      }
    );
  }

  static associate(models) {
    Group.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    Group.hasMany(models.GroupMember, { foreignKey: 'groupId', as: 'members' });
  }
}


module.exports = Group;
