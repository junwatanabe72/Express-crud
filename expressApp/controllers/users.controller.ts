import { Request, Response } from "express";
import models from "../models/";
import { Op } from "sequelize";
const users = models.User;
const posts = models.Post;
const post_categories = models.PostCategory;
const categories = models.Category;


export default {
  //authuserを返す
  async findOne(req: any, res: Response) {
    const { authorize_token, ...user } = req.user.toJSON();
    res.status(200).json({ user });
  },
  //authuserに紐づくpostを返す
  async findPost(req: any, res: Response) {
    const { ...user } = req.user.toJSON();
    const queryStatus = req.query.status ? req.query.status : [0, 100, 200];
    const id = user.id;
    const post = await posts.findAll({
      where: {
        userId: id,
        status: queryStatus,
      },
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
    res.status(200).json({ post });
  },
};
