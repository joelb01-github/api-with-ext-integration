const restifyErrors = require('restify-errors');

const defineAuthAbility = require('./auth');
const defineDataAbility = require('./data');
const defineUserAbility = require('./user');
const definePropertyAbility = require('./property');

module.exports = (logger, path, user) => {
  let ability;

  const entity = path.split('_')[0];

  switch (entity) {
    case 'auth':
      ability = defineAuthAbility();
      break;
    case 'data':
      ability = defineDataAbility(user);
      break;
    case 'users':
      ability = defineUserAbility(user);
      break;
    case 'properties':
      ability = definePropertyAbility(user);
      break;
    default:
      // eslint-disable-next-line no-case-declarations
      const errMessage = 'Unexpected permission case.';
      logger.error(`[MW-defineAbility] ${errMessage}`);
      throw new restifyErrors.InternalServerError(errMessage);
  }

  return ability;
};
