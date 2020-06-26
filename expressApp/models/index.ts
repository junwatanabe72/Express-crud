import { Sequelize, Model } from "sequelize";
import User from "./user";
import Post from "./post";
import PostCategory from "./postCategory";
import Category from "./category";


// (1)モデルを一つのオブジェクトにまとめる
const models = {
  User,
  Post,
  PostCategory,
  Category,
};

// (2)テーブル同士の関係を作成する
// Object.keys(db).forEach((tableName) => {
//   const model = db[tableName];
//   if (model.associate) {
//     model.associate();
//   }
// });

export default models;
