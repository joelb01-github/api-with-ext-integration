const validators = require('../../../../middlewares/express/request/inputValidation/validators');

module.exports = (req, res, next) => {
  const inputToValidate = { ...req.body };

  req.locals.validationData = prepareValidationData(inputToValidate);

  return next();
};

function prepareValidationData(inputToValidate) {
  return {
    inputToValidate,
    inputValidators: {
      address: {
        validator: validators.max255LengthMin0,
        required: false,
        allowNull: false,
      },
      city: {
        validator: validators.max64Length,
        required: false,
        allowNull: false,
      },
      zipcode: {
        validator: validators.zipcode,
        required: false,
        allowNull: false,
      },
      latitude: {
        validator: validators.latitude,
        required: true,
        allowNull: false,
      },
      longitude: {
        validator: validators.longitude,
        required: true,
        allowNull: false,
      },
      yearOfConstruction: {
        validator: validators.integerGreaterThan0,
        required: false,
        allowNull: false,
      },
      yearOfRenovation: {
        validator: validators.integerGreaterThan0,
        required: false,
        allowNull: false,
      },
      hasElevator: {
        validator: validators.boolean,
        required: false,
        allowNull: false,
      },
      totalArea: {
        validator: validators.numberGreaterThan0,
        required: true,
        allowNull: false,
      },
    },
  };
}
