import { Model, DataTypes } from "sequelize";
import  sequelize  from '../middlewares/sequelize';
import Post from './post';

 class User extends Model {
   public authorize_token!: string;
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

User.hasMany(Post);
Post.belongsTo(User);

export default User;