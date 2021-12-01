const jwt = require('jsonwebtoken');

module.exports = (appConfig) => (req, res) => {
  const { user } = req.locals;

  const token = jwt.sign(
    {
      id: user.id,
    },
    appConfig.get('jwt').secret,
    {
      expiresIn: 3600, // 1 hour
    },
  );

  return res.json({
    id: user.id,
    accessToken: token,
  });
};
