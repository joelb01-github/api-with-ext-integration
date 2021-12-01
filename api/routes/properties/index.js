const express = require('express');

const properties = require('./properties');
const property = require('./property');

const processInput = require('./processInput');

const fetchRequestProperty = require('../../middlewares/dbFetch/property/fetchRequestProperty');
const validateInput = require('../../middlewares/express/request/inputValidation/verifyInput');

const router = express.Router();

module.exports = (appConfig, dbMain) => {
  router.use('/', properties(appConfig, dbMain));

  router.use('/:targetPropertyId',
    processInput,
    validateInput,
    fetchRequestProperty(dbMain),
    property(appConfig, dbMain));

  return router;
};
