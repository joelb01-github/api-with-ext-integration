/**
 * List of validators used in this API
 *
 * Note: the npm package validator works strangely with Rambda.
 * As such, if a validator function from the npm package takes more
 * than 1 arguments, it's best to curry it and put a Rambda placeholder
 * with R.__
 */

/* eslint-disable no-underscore-dangle */
const validator = require('validator');
const R = require('ramda');
const { USERS } = require('../../../../resources/variables/variables.json');

/** IDENTICATION */

const uuid = R.allPass([
  R.compose(R.equals('String'), R.type),
  R.compose(R.not, R.isEmpty),
  R.curry(validator.isUUID)(R.__, 'all'),
]);

// Minimum eight characters, Maximum 64 characters
// at least one letter
// at least one number
// at least one special character
const password = R.allPass([
  R.compose(R.equals('String'), R.type),
  R.compose(R.not, R.isEmpty),
  R.test(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/),
]);

const role = R.allPass([
  R.compose(R.equals('String'), R.type),
  R.compose(R.not, R.isEmpty),
  R.includes(R.__, R.keys(USERS.ROLES)),
]);

/** STRING LENGTH */

const max64Length = R.allPass([
  R.compose(R.equals('String'), R.type),
  R.compose(R.not, R.isEmpty),
  R.curry(validator.isLength)(R.__, { min: 1, max: 64 }),
]);

const max255Length = R.allPass([
  R.compose(R.equals('String'), R.type),
  R.compose(R.not, R.isEmpty),
  R.curry(validator.isLength)(R.__, { min: 1, max: 255 }),
]);

const max255LengthMin0 = R.allPass([
  R.compose(R.equals('String'), R.type),
  R.curry(validator.isLength)(R.__, { max: 255 }),
]);

/** USER INFO */

const email = R.allPass([
  R.compose(R.equals('String'), R.type),
  R.compose(R.not, R.isEmpty),
  R.curry(validator.isEmail)(R.__, {}),
]);

/** OTHERS */

// source: https://rgxdb.com/r/3EZMSVWM
// Five digits
// first two indicate the province
// Third digit: large town, main delivery rounds
// Last 2 digits: delivery area, secondary delivery route or link to rural areas
const zipcode = R.allPass([
  R.compose(R.equals('String'), R.type),
  R.compose(R.not, R.isEmpty),
  R.test(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/),
]);

const latitude = R.allPass([
  R.compose(R.equals('Number'), R.type),
  Number.isFinite,
  (num) => Math.abs(num) <= 90,
]);

const longitude = R.allPass([
  R.compose(R.equals('Number'), R.type),
  Number.isFinite,
  (num) => Math.abs(num) <= 180,
]);

const boolean = R.compose(R.equals('Boolean'), R.type);

const integerGreaterThan0 = R.allPass([
  R.compose(R.equals('Number'), R.type),
  Number.isInteger,
  (num) => num > 0,
]);

const numberGreaterThan0 = R.allPass([
  R.compose(R.equals('Number'), R.type),
  Number.isFinite,
  (num) => num > 0,
]);

/** END */

module.exports = {
  boolean,
  email,
  max64Length,
  max255Length,
  max255LengthMin0,
  uuid,
  password,
  role,
  zipcode,
  latitude,
  longitude,
  integerGreaterThan0,
  numberGreaterThan0,
};
