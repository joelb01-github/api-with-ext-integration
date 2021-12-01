const restifyErrors = require('restify-errors');

module.exports = (dbMain) => async (req, res, next) => {
  const {
    logger, targetProperty, avmPayload, avmSqmPrice,
  } = req.locals;

  const valuationParams = {
    sqmPrice: avmSqmPrice,
    totalPrice: avmSqmPrice * avmPayload.totalArea,
  };

  try {
    await dbMain.sequelize.transaction(async (t) => {
      await dbMain.Valuation.destroy({
        where: {
          id: targetProperty.valuation.id,
        },
        transaction: t,
      });

      await targetProperty.update(
        {
          ...avmPayload,
          id: targetProperty.id,
        },
        {
          reset: true,
          transaction: t,
        },
      );

      await targetProperty.createValuation(
        {
          ...valuationParams,
        },
        {
          transaction: t,
        },
      );
    });
  } catch (err) {
    logger.error(`[properties-property-patch-updateDb] Sequelize Error: ${err}`);
    return next(new restifyErrors.InternalServerError());
  }

  return res.json('Property updated.');
};
