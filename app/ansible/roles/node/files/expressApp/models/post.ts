import { Model,DataTypes } from "sequelize";
import  sequelize  from '../middlewares/sequelize';
import PostCategory from './postCategory';

export default class Post extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public body!: string;
  public status!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING(250),
    },
    body: {
      type: DataTypes.STRING(250),
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  },
  {
    tableName: 'posts',
    sequelize: sequelize,
  },
);

Post.hasMany(PostCategory, {
  sourceKey: 'id',
  foreignKey: 'postId',
  as: "post_categories",
  constraints: false
});
PostCategory.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: "CASCADE",
  constraints: false
});
  