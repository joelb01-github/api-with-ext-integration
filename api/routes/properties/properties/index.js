const express = require('express');

const get = require('./get');
const post = require('./post');

const verifyPermission = require('../../../middlewares/permission/verifyPermission');
const validateInput = require('../../../middlewares/express/request/inputValidation/verifyInput');
const fetchAvmData = require('../../../middlewares/avmApi/fetchSqmPrice');

const router = express.Router();

module.exports = (appConfig, dbMain) => {
  router.get('/',
    verifyPermission('properties_properties', 'getProperties'),
    get(dbMain));

  router.post('/',
    post.processInput,
    validateInput,
    verifyPermission('properties_properties', 'createProperty'),
    post.prepareAvmPayload,
    fetchAvmData(appConfig),
    post.writeToDb(dbMain));

  return router;
};
