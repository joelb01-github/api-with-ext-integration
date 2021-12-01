const express = require('express');

const get = require('./get');
const patch = require('./patch');
const del = require('./delete');

const verifyPermission = require('../../../middlewares/permission/verifyPermission');
const validateInput = require('../../../middlewares/express/request/inputValidation/verifyInput');
const fetchAvmData = require('../../../middlewares/avmApi/fetchSqmPrice');

const router = express.Router();

module.exports = (appConfig, dbMain) => {
  router.get('/',
    verifyPermission('properties_property', 'getProperty'),
    get);

  router.patch('/',
    patch.processInput,
    validateInput,
    verifyPermission('properties_property', 'patchProperty'),
    patch.prepareAvmPayload,
    fetchAvmData(appConfig),
    patch.updateDb(dbMain));

  router.delete('/',
    verifyPermission('properties_property', 'deleteProperty'),
    del);

  return router;
};
