"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    loginId: DataTypes.INTEGER,
    authorize_token: DataTypes.INTEGER,
    name: DataTypes.STRING,
    iconUrl: DataTypes.TEXT,
  });
  users.associate = function (models) {
    // associations can be defined here
    users.hasMany(models.posts, {
      foreignKey: "userId",
      as: "posts",
    });
  };
  return users;
};
