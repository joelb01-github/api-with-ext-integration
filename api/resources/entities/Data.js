const fields = {};

module.exports = class Data {
  static fields = fields;

  constructor(attrs) {
    Object.assign(this, attrs);
    this.fields = fields;
  }
};
