const restifyErrors = require('restify-errors');
const R = require('ramda');

module.exports = (dbMain) => async (req, res, next) => {
  const { logger } = req.locals;

  let dbResults;

  const paramInput = { ...req.query };

  const queryParams = prepareQuery(dbMain, paramInput);

  try {
    dbResults = await dbMain.Property.findAll(queryParams);
  } catch (err) {
    logger.error(`[data-get-fetchData] Sequelize Error: ${err.message}`);
    return next(new restifyErrors.InternalServerError());
  }

  const data = processResults(dbResults);

  return res.json(data);
};

function prepareQuery(dbMain, paramInput) {
  const {
    city,
  } = paramInput;

  const { fn, col } = dbMain.sequelize;

  const queryParams = {
    where: {
      city,
    },
    include: [{
      model: dbMain.Valuation,
      as: 'valuation',
      attributes: [],
    }],
    attributes: [
      [fn('AVG', col('valuation.sqmPrice')), 'avgSqmPrice'],
    ],
    group: ['property.city'],
  };

  return queryParams;
}

function processResults(dbResults) {
  return R.isNil(dbResults) || R.isEmpty(dbResults)
    ? { avgSqmPrice: null }
    : R.head(dbResults);
}
