"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "posts",
      [
        {
          userId: 14,
          title: "post1",
          body: "post1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 15,
          title: "post2",
          body: "post2",
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
      
    */
    return queryInterface.bulkDelete("posts", null, {});
  },
};
