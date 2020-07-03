import { Model, DataTypes }from "sequelize";
import  sequelize  from '../middlewares/sequelize';
import PostCategory from "./postCategory";

export default class Category extends Model {}
Category.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(250),
    },
    name: {
      type: DataTypes.STRING(250),
    },
  },
  {
    tableName: "categories",
    sequelize: sequelize,
  }
);

Category.hasMany(PostCategory, {
  sourceKey: "id",
  foreignKey: "categoryId",
  as: "categories",
});

PostCategory.belongsTo(Category, {
  foreignKey: 'categoryId',
  targetKey: 'id',
  onDelete: "CASCADE",
  as: "categories",
  constraints: false
});

