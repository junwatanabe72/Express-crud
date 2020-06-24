"use strict";
module.exports = (sequelize: { define: (arg0: string, arg1: { key: any; name: any; }) => any; }, DataTypes: { STRING: any; }) => {
  const categories = sequelize.define("categories", {
    key: DataTypes.STRING,
    name: DataTypes.STRING,
  });
  categories.associate = function (models: { post_categories: any; }) {
    // associations can be defined here
    categories.hasMany(models.post_categories, {
      foreignKey: "categoryId",
      as: "categories",
    });
  };
  return categories;
};
