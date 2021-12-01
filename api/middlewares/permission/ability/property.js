const { AbilityBuilder, Ability } = require('@casl/ability');
const { isAdmin } = require('../utils/utils');
const { Property } = require('../../../resources/entities');

module.exports = (user) => {
  const { can: allow, build } = new AbilityBuilder(Ability);

  if (isAdmin(user)) {
    /** Properties */

    allow(
      'getProperties',
      'Property',
    );

    allow(
      'createProperty',
      'Property',
      Property.rules.createProperty.admin,
    );

    /** Property */

    allow(
      'getProperty',
      'Property',
    );

    allow(
      'patchProperty',
      'Property',
      Property.rules.patchProperty.admin,
    );

    allow(
      'deleteProperty',
      'Property',
    );
  }

  return build();
};
