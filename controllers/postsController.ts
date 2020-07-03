import { Request, Response } from "express";
import { Op } from "sequelize";
import sequelize from "../middlewares/sequelize";
import posts, { statusValues } from "../models/post";
import postCategories from "../models/postCategory";
import categories from "../models/category";

export default {
  async show(req: Request, res: Response) {
    const post = await posts.findOne({
      where: { id: req.params.id },
      raw: false,
      include: [
        {
          model: postCategories,
          as: "postCategories",
          required: false,
          include: [
            {
              model: categories,
              as: "categories",
              required: false,
            },
          ],
        },
      ],
    });
    if (!post) {
      return res.status(404).json({ message: "not exist" });
    }
    res.json({ post });
  },
  async index(req: Request, res: Response) {
    const queryStatus: any = req.query.status ? req.query.status : statusValues;
    const post = await posts.findAll({
      where: { status: queryStatus },
      raw: false,
      include: [
        {
          model: postCategories,
          as: "postCategories",
          required: false,
          include: [
            {
              model: categories,
              as: "categories",
              required: false,
            },
          ],
        },
      ],
    });
    if (!post) {
      return res.status(404).json({ message: "not exist" });
    }
    res.json({ post });
  },

  //transactionを貼る。
  async create(req: any, res: Response) {
    const {
      post: { categoryIds, ...rest },
    } = req.body;
    const params = { ...rest, userId: req.user.id };
    try {
      await sequelize.transaction(async (t) => {
        const newPost = await posts.create(
          {
            title: params.title,
            body: params.body,
            status: params.status,
            userId: params.userId,
          },
          { transaction: t }
        );
        for (let element of categoryIds) {
          await postCategories.create(
            {
              postId: newPost.id,
              categoryId: element,
            },
            { transaction: t }
          );
        }
        res.json({ newPost });
      });
    } catch (error) {
      res.status(400);
    }
  },

  async update(req: any, res: Response) {
    const targetPost: any = await posts.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!targetPost) {
      res.json({ message: "check this userId" });
    }
    const {
      post: { categoryIds, ...rest },
    } = req.body;
    const params = { ...rest };
    const updatePostId = req.params.id;
    //transactionを貼る。
    try {
      await sequelize.transaction(async (t) => {
        //postを更新する。
        await targetPost.update(
          {
            title: params.title,
            body: params.body,
            status: params.status,
          },
          { transaction: t }
        );

        if (categoryIds.length === 0) {
          res.json({});
        }
        //categoryを更新する。（新しくカテゴリ登録する。）
        for (let element of categoryIds) {
          await postCategories.findOrCreate({
            where: { postId: updatePostId, categoryId: element },
            defaults: {
              // 新規登録するデータ
              postId: updatePostId,
              categoryId: element,
            },
            transaction: t,
          });
        }
        const changedPost_categories = await postCategories.findAll({
          where: {
            postId: updatePostId,
            categoryId: { [Op.notIn]: categoryIds },
          },
          transaction: t,
        });
        //categoryを更新する。（該当しないカテゴリを削除する。）
        for (let element of changedPost_categories) {
          await postCategories.destroy({
            where: { postId: updatePostId, categoryId: element.categoryId },
            transaction: t,
          });
        }
        res.json({});
      });
    } catch (error) {
      res.status(400);
    }
  },

  async delete(req: any, res: Response) {
    const targetPost: any = await posts.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!targetPost) {
      res.json({ message: "check this userId" });
    }

    await targetPost.destroy();
    res.json({});
  },
};
