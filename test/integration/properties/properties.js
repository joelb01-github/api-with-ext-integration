/* eslint-disable import/no-extraneous-dependencies */
const { assert } = require('chai');
const R = require('ramda');
const request = require('superagent');
const Db = require('../../../database/index');
const appConfig = require('../../../config/config');
const { USERS } = require('../../../api/resources/variables/variables.json');
const utils = require('../../utils');

const dbMain = Db(appConfig.get('db_main'));
const { host, port } = appConfig.get('server');

const baseUrl = `http://${host}:${port}`;

describe('Properties-Properties Component', () => {
  let users;
  let properties;
  const userCount = 3;

  before(async () => {
    // creating users
    users = await utils.registerUsers(userCount);

    // setting up first user as admin
    await dbMain.User.update(
      {
        role: USERS.ROLES.ADMIN,
      },
      {
        where: {
          id: users[0].id,
        },
      },
    );

    // creating some properties
    properties = R.range(0, 3).map((i) => ({
      name: `my property${i}`,
      city: `my city${i}`,
      totalArea: 100 + i,
      latitude: 20 + i,
      longitude: 20 + i,
    }));

    await dbMain.Property.bulkCreate(properties);
  });

  after(async () => {
    await utils.cleanDb();
    dbMain.sequelize.close();
  });

  describe('Get properties', () => {
    it('should return an error if the requester is not an admin.', (done) => {
      request
        .get(`${baseUrl}/properties`)
        .set('x-access-token', users[1].accessToken)
        .end((err, res) => {
          assert.equal(err.name, 'Error');
          assert.equal(err.message, 'Forbidden');
          assert.equal(err.status, 403);

          assert.deepEqual(res.body, {
            error: {
              code: 'Forbidden',
              message: 'user is not allowed to perform this operation.',
            },
          });

          done();
        });
    });

    it('should allow and admin to fetch all the properties.', (done) => {
      request
        .get(`${baseUrl}/properties`)
        .set('x-access-token', users[0].accessToken)
        .end((err, res) => {
          assert.equal(res.body.length, properties.length);

          done();
        });
    });
  });

  describe('Create properties', () => {
    it('should return an error if the requester is not an admin.', (done) => {
      const input = {
        address: 'my address',
        city: 'my city',
        totalArea: 100,
        latitude: 20,
        longitude: 20,
      };

      request
        .post(`${baseUrl}/properties`)
        .set('x-access-token', users[1].accessToken)
        .send(input)
        .end((err, res) => {
          assert.equal(err.name, 'Error');
          assert.equal(err.message, 'Forbidden');
          assert.equal(err.status, 403);

          assert.deepEqual(res.body, {
            error: {
              code: 'Forbidden',
              message: 'user is not allowed to perform this operation.',
            },
          });

          done();
        });
    });

    it('should allow and admin to create a property and store a valuation.', async () => {
      const input = {
        address: 'my address',
        city: 'my city',
        totalArea: 100,
        latitude: 20,
        longitude: 20,
      };

      const res1 = await request
        .post(`${baseUrl}/properties`)
        .set('x-access-token', users[0].accessToken)
        .send(input);

      const res2 = await request
        .get(`${baseUrl}/properties/${res1.body.id}`)
        .set('x-access-token', users[0].accessToken);

      assert.equal(res2.body.id, res1.body.id);
      assert.isTrue(R.has('valuation', res2.body));
    });
  });
});
