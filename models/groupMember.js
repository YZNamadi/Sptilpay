const { DataTypes, Model } = require('sequelize');

class GroupMember extends Model {
  static initModel(sequelize) {
    GroupMember.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        groupId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'GroupMember',
        tableName: 'group_members',
      }
    );
  }

  static associate(models) {
    GroupMember.belongsTo(models.Group, { foreignKey: 'groupId' });
    GroupMember.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

module.exports = GroupMember;

