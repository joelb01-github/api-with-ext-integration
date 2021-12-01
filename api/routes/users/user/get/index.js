module.exports = (req, res) => {
  const { targetUser } = req.locals;

  return res.json(targetUser);
};
