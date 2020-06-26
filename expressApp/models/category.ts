import Sequelize from "sequelize";
import  sequelize  from '../middlewares/sequelize';
import models from "../models/";
// const PostCategory= models.PostCategory;

export default class Category extends Sequelize.Model {
  public id!: number;
  public key!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Category.init(
  {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: Sequelize.STRING(250),
    },
    name: {
      type: Sequelize.STRING(250),
    },
  },
  {
    tableName: "categories",
    sequelize: sequelize,
  }
);

// Category.hasMany(PostCategory, {
//   sourceKey: "id",
//   foreignKey: "categoryId",
//   as: "categories",
// });

