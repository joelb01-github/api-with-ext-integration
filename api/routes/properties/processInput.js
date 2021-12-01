const validators = require('../../middlewares/express/request/inputValidation/validators');

module.exports = (req, res, next) => {
  const inputToValidate = {
    targetPropertyId: req.params?.targetPropertyId,
  };

  req.locals.validationData = prepareValidationData(inputToValidate);

  req.locals.targetPropertyId = req.params?.targetPropertyId;

  return next();
};

function prepareValidationData(inputToValidate) {
  return {
    inputToValidate,
    inputValidators: {
      targetPropertyId: {
        validator: validators.uuid,
        required: true,
        allowNull: false,
      },
    },
  };
}
