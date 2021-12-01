const M = require('moment');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('property', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
      },
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        max: 90,
        min: -90,
      },
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        max: 180,
        min: -180,
      },
    },
    yearOfConstruction: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    yearOfRenovation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    hasElevator: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    totalArea: {
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
    tableName: 'properties',
  });

  return Property;
};
