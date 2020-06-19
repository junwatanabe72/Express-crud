"use strict";
module.exports = (sequelize, DataTypes) => {
  const post_categories = sequelize.define("post_categories", {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  });
  post_categories.associate = function (models) {
    // associations can be defined here
    post_categories.belongsTo(models.posts, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
    post_categories.belongsTo(models.categories, {
      foreignKey: "categoryId",
      onDelete: "CASCADE",
    });
  };
  return post_categories;
};
