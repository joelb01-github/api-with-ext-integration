const restifyErrors = require('restify-errors');

module.exports = (dbMain) => async (req, res, next) => {
  const { logger, avmPayload, avmSqmPrice } = req.locals;

  let property;

  const propertyParams = {
    ...avmPayload,
    valuation: {
      sqmPrice: avmSqmPrice,
      totalPrice: avmSqmPrice * avmPayload.totalArea,
    },
  };

  try {
    property = await dbMain.Property.create({
      ...propertyParams,
    },
    {
      include: [{
        association: dbMain.Property.Valuation,
      }],
    });
  } catch (err) {
    logger.error(`[users-properties-create-writeToDb] Sequelize Error: ${err.message}`);
    return next(new restifyErrors.InternalServerError());
  }

  return res.json(property);
};
