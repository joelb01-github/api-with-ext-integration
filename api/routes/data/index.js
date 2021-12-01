const express = require('express');

const get = require('./get');

const verifyPermission = require('../../middlewares/permission/verifyPermission');
const validateInput = require('../../middlewares/express/request/inputValidation/verifyInput');

const router = express.Router();

module.exports = (dbMain) => {
  router.get('/',
    get.processInput,
    validateInput,
    verifyPermission('data', 'getData'),
    get.fetchData(dbMain));

  return router;
};
