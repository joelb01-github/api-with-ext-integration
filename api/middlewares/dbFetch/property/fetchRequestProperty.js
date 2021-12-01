const restifyErrors = require('restify-errors');
const R = require('ramda');

/**
 * This MW has the role to fetch the property from our DB for it
 * to be used in the rest of the API.
 */
module.exports = (dbMain) => async (req, res, next) => {
  const { logger, targetPropertyId } = req.locals;

  let targetProperty;

  try {
    targetProperty = await dbMain.Property.findOne({
      where: {
        id: targetPropertyId,
      },
      include: { all: true },
    });
  } catch (err) {
    logger.error(`[MW-dbFetch-property-fetchRequestProperty] Sequelize Error: ${err.message}`);
    return next(new restifyErrors.InternalServerError());
  }

  if (R.isNil(targetProperty)) {
    const errMessage = `Requested property: ${targetPropertyId} could not be found.`;
    logger.error(`[MW-dbFetch-property-fetchRequestProperty] ${errMessage}`);
    return next(new restifyErrors.NotFoundError(errMessage));
  }

  logger.debug(`[MW-dbFetch-property-fetchRequestProperty] propertyId: ${targetProperty.id}`);

  req.locals.targetProperty = targetProperty;

  return next();
};
