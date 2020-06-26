import Sequelize from "sequelize";
import  sequelize  from '../middlewares/sequelize';
import models from "../models/";

// const Category = models.Category;

export default class PostCategory extends Sequelize.Model {
    public id!: number;
    public postId!: number;
    public categoryId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

PostCategory.init(
  {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    postId: {
      type: Sequelize.INTEGER,
    },
    categoryId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "post_categories",
    sequelize: sequelize,
  }
);

// PostCategory.belongsTo(Post, {
//   foreignKey: 'postId',
//   onDelete: "CASCADE",
//   constraints: false
// });

// PostCategory.belongsTo(Category, {
//   foreignKey: 'categoryId',
//   targetKey: 'id',
//   onDelete: "CASCADE",
//   as: "categories",
//   constraints: false
// });