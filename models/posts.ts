"use strict";
module.exports = (sequelize: { define: (arg0: string, arg1: { userId: any; title: any; body: any; status: any; }) => any; }, DataTypes: { INTEGER: any; STRING: any; TEXT: any; }) => {
  const posts = sequelize.define("posts", {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    status: DataTypes.INTEGER,
  });
  posts.associate = function (models: { users: any; post_categories: any; }) {
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
