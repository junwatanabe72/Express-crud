import { Model, DataTypes, Association } from "sequelize";
import  sequelize  from '../middlewares/sequelize';
import models from "../models/";
import postType from './post';
const Post = models.Post;

 class User extends Model {
   public id!: number;
   public loginId!: string;
   public authorize_token!: string;
   public name!: string;
   public iconUrl!: string;

   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;
   public static associations: {
     posts: Association<User, postType>;
   };
   public readonly posts?: postType[];
 }
User.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    loginId: {
      type: DataTypes.STRING(250),
    },
    authorize_token: {
      type: DataTypes.STRING(250),
    },
    name: {
      type: DataTypes.STRING(250),
    },
    iconUrl: {
      type: DataTypes.STRING(250),
    }
  },
  {
    tableName: 'users',
    sequelize: sequelize,
  },
);

User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: "posts",
});
 
export default User;