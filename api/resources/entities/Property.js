const fields = {
  createProperty: ['address', 'city', 'zipcode', 'latitude', 'longitude', 'yearOfConstruction', 'yearOfRenovation', 'hasElevator', 'totalArea'],
  patchProperty: ['address', 'city', 'zipcode', 'latitude', 'longitude', 'yearOfConstruction', 'yearOfRenovation', 'hasElevator', 'totalArea'],
};

const rules = {
  createProperty: {
    admin: ['address', 'city', 'zipcode', 'latitude', 'longitude', 'yearOfConstruction', 'yearOfRenovation', 'hasElevator', 'totalArea'],
  },
  patchProperty: {
    admin: ['address', 'city', 'zipcode', 'latitude', 'longitude', 'yearOfConstruction', 'yearOfRenovation', 'hasElevator', 'totalArea'],
  },
};

module.exports = class Property {
  static fields = fields;

  static rules = rules;

  constructor(attrs) {
    Object.assign(this, attrs);
    this.fields = fields;
  }
};
