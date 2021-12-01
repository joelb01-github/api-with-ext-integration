const { AbilityBuilder, Ability } = require('@casl/ability');
const { isAdmin } = require('../utils/utils');

module.exports = (user) => {
  const { can: allow, build } = new AbilityBuilder(Ability);

  if (isAdmin(user)) {
    allow(
      'getData',
      'Data',
    );
  }

  return build();
};
