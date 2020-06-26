import { Request, Response } from "express";
import { Op } from "sequelize";
import posts from "../models/post";
import post_categories from "../models/postCategory";
import categories from "../models/category";

export default {
  async findOne(req: Request, res: Response) {
    const post = await posts.findOne({
      where: { id: req.params.id },
      raw: false,
      include: [
        {
          model: post_categories,
          as: "post_categories",
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
      return res.json({ message: 'not exist' });
    }
    res.json({ post });
  },
  async findAll(req: Request, res: Response) {
    const queryStatus: any = req.query.status ? req.query.status : [0, 100, 200];
    const post = await posts.findAll({
      where: { status: queryStatus },
      raw: false,
      include: [
        {
          model: post_categories,
          as: "post_categories",
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
      return res.json({ message: 'not exist' });
    }
    res.json({ post });
  },
  async create(req: any, res: Response) {
    const {
      post: { categoryIds, ...rest },
    } = req.body;
    const params = { ...rest, userId: req.user.id };
    const newPost = await posts.create({
      title: params.title,
      body: params.body,
      status: params.status,
      userId: params.userId,
    });
    for (let element of categoryIds) {
      await post_categories.create({
        postId: newPost.id,
        categoryId: element,
      });
    }
    res.json({ newPost });
  },
  async update(req: any, res: Response) {
    const targetPost: any = await posts.findOne({
      where: { id: req.params.id, userId: req.user.id },
    })
    if (!targetPost) { res.json({ message: "check this userId" });}
    const {
      post: { categoryIds, ...rest },
    } = req.body;
    const params = { ...rest };
    const updatePostId = req.params.id;
    //postsTable
    await targetPost.update(
      {
        title: params.title,
        body: params.body,
        status: params.status,
      }
    );

    if (categoryIds.length === 0) {
      res.json({});
    }

    for (let element of categoryIds) {
      await post_categories.findOrCreate({
        where: { postId: updatePostId, categoryId: element },
        defaults: {
          // 新規登録するデータ
          postId: updatePostId,
          categoryId: element,
        },
      });
    }
    const changedPost_categories = await post_categories.findAll({
      where: { postId: updatePostId, categoryId: { [Op.notIn]: categoryIds } },
    });
    for (let element of changedPost_categories) {
      await post_categories.destroy({
        where: { postId: updatePostId, categoryId: element.categoryId },
      });
    }
    res.json({});
  },
  async delete(req: any, res: Response) {
    const targetPost: any = await posts.findOne({
      where: { id: req.params.id, userId: req.user.id },
    })
    if (!targetPost) { 
      res.json({ message: "check this userId" });
    }

    await targetPost.destroy();
    res.json({});
  }
};
