module.exports = (db) => {
  const {
    Property,
    Valuation,
  } = db;

  Property.Valuation = Property.hasOne(Valuation, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });

  Valuation.User = Valuation.belongsTo(Property);
};
