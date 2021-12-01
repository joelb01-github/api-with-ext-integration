const fields = {
  signup: ['id', 'name', 'password'],
  signin: ['id', 'password'],
};

const rules = {
  signup: ['id', 'name', 'password'],
  signin: ['id', 'password'],
};

module.exports = class Auth {
  static fields = fields;

  static rules = rules;

  constructor(attrs) {
    Object.assign(this, attrs);
    this.fields = fields;
  }
};
