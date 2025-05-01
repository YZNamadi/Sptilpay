const { DataTypes, Model } = require('sequelize');

class Bill extends Model {
  static initModel(sequelize) {
    Bill.init(
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
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        paidBy: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('unpaid', 'paid'),
            defaultValue: 'unpaid',
            allowNull: false,
          }
          
          
      },
      {
        sequelize,
        modelName: 'Bill',
        tableName: 'bills',
      }
    );
  }

  static associate(models) {
    Bill.belongsTo(models.Group, { foreignKey: 'groupId' });
    Bill.belongsTo(models.User, { foreignKey: 'paidBy', as: 'payer' });
    Bill.hasMany(models.BillShare, { foreignKey: 'billId', as: 'shares' });
  }
}

module.exports = Bill;
