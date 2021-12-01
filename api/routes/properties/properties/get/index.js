const restifyErrors = require('restify-errors');

module.exports = (dbMain) => async (req, res, next) => {
  const { logger } = req.locals;

  let properties;

  try {
    properties = await dbMain.Property.findAll({
      include: { all: true },
    });
  } catch (err) {
    logger.error(`[properties-properties-getProperties] Sequelize Error: ${err.message}`);
    return next(new restifyErrors.InternalServerError());
  }

  return res.json(properties);
};
