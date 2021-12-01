const fields = {
  patchUser: ['id', 'name', 'password', 'role'],
};

const rules = {
  patchUser: {
    basic: ['name', 'password'],
    admin: ['name', 'password', 'role'],
  },
};

module.exports = class User {
  static fields = fields;

  static rules = rules;

  constructor(attrs) {
    Object.assign(this, attrs);
    this.fields = fields;
  }
};
