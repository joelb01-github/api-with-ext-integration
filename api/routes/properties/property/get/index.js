module.exports = (req, res) => {
  const { targetProperty } = req.locals;

  return res.json(targetProperty);
};
