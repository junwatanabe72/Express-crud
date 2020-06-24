"use strict";
export default (sequelize: { define: (arg0: string, arg1: { loginId: any; authorize_token: any; name: any; iconUrl: any; }) => any; }, DataTypes: { STRING: any; TEXT: any; }) => {
  const users = sequelize.define("users", {
    loginId: DataTypes.STRING,
    authorize_token: DataTypes.STRING,
    name: DataTypes.STRING,
    iconUrl: DataTypes.TEXT,
  });
  users.associate = function (models: { posts: any; }) {
    // associations can be defined here
    users.hasMany(models.posts, {
      foreignKey: "userId",
      as: "posts",
    });
  };
  return users;
};
