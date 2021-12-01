const { AbilityBuilder, Ability } = require('@casl/ability');
const { User } = require('../../../resources/entities');
const { isAdmin } = require('../utils/utils');

module.exports = (user) => {
  const { can: allow, build } = new AbilityBuilder(Ability);

  /** Users */

  if (isAdmin(user)) {
    allow(
      'getUsers',
      'User',
    );
  }

  /** User */

  allow(
    'getUser',
    'User',
    {
      id: user.id,
    },
  );
  if (isAdmin(user)) {
    allow(
      'getUser',
      'User',
    );
  }

  allow(
    'patchUser',
    'User',
    User.rules.patchUser.basic,
    {
      id: user.id,
    },
  );
  if (isAdmin(user)) {
    allow(
      'patchUser',
      'User',
      User.rules.patchUser.admin,
    );
  }

  allow(
    'deleteUser',
    'User',
    {
      id: user.id,
    },
  );
  if (isAdmin(user)) {
    allow(
      'deleteUser',
      'User',
    );
  }

  return build();
};
