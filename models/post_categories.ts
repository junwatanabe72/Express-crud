"use strict";
module.exports = (sequelize: { define: (arg0: string, arg1: { postId: any; categoryId: any; }) => any; }, DataTypes: { INTEGER: any; }) => {
  const post_categories = sequelize.define("post_categories", {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  });
  post_categories.associate = function (models: { posts: any; categories: any; }) {
    // associations can be defined here
    post_categories.belongsTo(models.posts, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
    post_categories.belongsTo(models.categories, {
      foreignKey: "categoryId",
      onDelete: "CASCADE",
      as: "categories",
    });
  };
  return post_categories;
};


