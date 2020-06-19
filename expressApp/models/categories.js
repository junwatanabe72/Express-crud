"use strict";
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define("categories", {
    key: DataTypes.STRING,
    name: DataTypes.STRING,
  });
  categories.associate = function (models) {
    // associations can be defined here
    categories.hasMany(models.post_categories, {
      foreignKey: "categoryId",
      as: "post_categories",
    });
  };
  return categories;
};
