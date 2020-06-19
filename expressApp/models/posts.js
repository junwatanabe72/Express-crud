"use strict";
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define("posts", {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    status: DataTypes.INTEGER,
  });
  posts.associate = function (models) {
    // associations can be defined here
    posts.belongsTo(models.users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    posts.hasMany(models.post_categories, {
      foreignKey: "postId",
      as: "post_categories",
    });
  };
  return posts;
};
