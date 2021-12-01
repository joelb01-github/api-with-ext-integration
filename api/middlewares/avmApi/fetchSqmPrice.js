const restifyErrors = require('restify-errors');

/**
 * This MW would normally go and fetch via HTTP information from the AVM API.
 * Since we don't have this implemented, we generate a random price instead.
 */
const fetchSqmPrice = (appConfig) => async (req, res, next) => {
  const { logger, avmPayload } = req.locals;

  let avmSqmPrice;

  const { url } = appConfig.get('avm_api');

  try {
    avmSqmPrice = await fetch(url, avmPayload);
  } catch (err) {
    logger.error(`[MW-avmApi-fetchSqmPrice] API call Error: ${err.message}`);
    return next(new restifyErrors.InternalServerError());
  }

  req.locals.avmSqmPrice = avmSqmPrice;

  return next();
};

const fetch = async () => Math.random() * 10000000;

// We would normally use that fetch function
// const fetch = async (url, payload) => request
//   .post(url)
//   .body(payload)
//   .set('Accept', 'application/json');

module.exports = fetchSqmPrice;
