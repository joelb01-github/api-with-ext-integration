const restifyErrors = require('restify-errors');

module.exports = (dbMain) => async (req, res, next) => {
  const { logger } = req.locals;

  let users;

  try {
    users = await dbMain.User.findAll({
      attributes: { exclude: ['passwordHash'] },
    });
  } catch (err) {
    logger.error(`[users-users-getUsers] Sequelize Error: ${err.message}`);
    return next(new restifyErrors.InternalServerError());
  }

  return res.json(users);
};
