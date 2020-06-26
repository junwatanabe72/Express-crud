"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "categories",
      [
        {
          key: "programming",
          name: "プログラミング",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: "career",
          name: "キャリア",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          key: "hobby",
          name: "趣味",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("categories", null, {});
  },
};
