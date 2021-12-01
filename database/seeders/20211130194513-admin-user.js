module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      id: 'john2@test.com',
      name: 'John Doe',
      passwordHash: '$2b$08$9/YZBVrS4hpkIxnvfMVt4.WmRchts0TbUI9qcWDJMK8ztXIFT.vq6',
      role: 'ADMIN',
      createdAt: '2021-11-30 19:40:55.301+00',
      updatedAt: '2021-11-30 19:40:55.301+00',
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
