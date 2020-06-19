"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "aaa",
          loginId: 1,
          authorize_token: 1,
          iconUrl: "aaa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "bbb",
          loginId: 2,
          authorize_token: 2,
          iconUrl: "bbb",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ccc",
          loginId: 3,
          authorize_token: 3,
          iconUrl: "ccc",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },

  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
};
