const restifyErrors = require('restify-errors');
const entities = require('../../../resources/entities');

module.exports = (logger, locals, path) => {
  let target;

  switch (path) {
    case 'auth':
      target = new entities.Auth();
      break;
    case 'data':
      target = new entities.Data();
      break;
    case 'users_users':
      target = new entities.User();
      break;
    case 'users_user':
      target = new entities.User(locals.targetUser.toJSON());
      break;
    case 'properties_properties':
      target = new entities.Property();
      break;
    case 'properties_property':
      target = new entities.Property(locals.targetProperty.toJSON());
      break;
    default:
      // eslint-disable-next-line no-case-declarations
      const errMessage = 'Unexpected permission case.';
      logger.error(`[MW-defineTarget] ${errMessage}`);
      throw new restifyErrors.InternalServerError(errMessage);
  }

  return target;
};
