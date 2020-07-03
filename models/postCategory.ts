import { Model, DataTypes }from "sequelize";
import  sequelize  from '../middlewares/sequelize';

export default class PostCategory extends Model {
    public categoryId!: number;
  }

PostCategory.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "postCategories",
    sequelize: sequelize,
  }
);
