const { DataTypes, Model } = require('sequelize');

class BillShare extends Model {
  static initModel(sequelize) {
    BillShare.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        billId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amountOwed: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'BillShare',
        tableName: 'bill_shares',
      }
    );
  }

  static associate(models) {
    BillShare.belongsTo(models.Bill, { foreignKey: 'billId' });
    BillShare.belongsTo(models.User, { foreignKey: 'userId' });
  }
}


module.exports = BillShare;
