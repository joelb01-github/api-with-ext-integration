const M = require('moment');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Valuation = sequelize.define('valuation', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    sqmPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return M(this.getDataValue('createdAt'), 'DD/MM/YYYY h:mm:ss').unix();
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return M(this.getDataValue('updatedAt'), 'DD/MM/YYYY h:mm:ss').unix();
      },
    },
  }, {
    tableName: 'valuations',
  });

  return Valuation;
};
