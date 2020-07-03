import { Model,DataTypes } from "sequelize";
import  sequelize  from '../middlewares/sequelize';
import PostCategory from './postCategory';

const POST_STATUSES = {
  draft: 0,
  published: 100,
  deleted: 200,
};
export const statusValues = Object.values(POST_STATUSES);

export default class Post extends Model {
  public id!: number;
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
      defaultValue: POST_STATUSES.draft,
    },
  },
  {
    tableName: "posts",
    sequelize: sequelize,
  }
);

Post.hasMany(PostCategory, {
  sourceKey: 'id',
  foreignKey: 'postId',
  as: "postCategories",
  constraints: false
});
PostCategory.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: "CASCADE",
  constraints: false
});
  