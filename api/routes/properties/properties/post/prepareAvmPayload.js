const { Property } = require('../../../../resources/entities');

module.exports = (req, res, next) => {
  const input = { ...req.body };

  const avmPayload = {};

  Property.fields.createProperty.forEach((field) => {
    avmPayload[field] = input[field] ? input[field] : null;
  });

  req.locals.avmPayload = { ...avmPayload };

  return next();
};
