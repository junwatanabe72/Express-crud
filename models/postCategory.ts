import { Model, DataTypes }from "sequelize";
import  sequelize  from '../middlewares/sequelize';

export default class PostCategory extends Model {
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
    tableName: "post_categories",
    sequelize: sequelize,
  }
);
