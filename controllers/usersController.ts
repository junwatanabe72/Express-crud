import { Request, Response } from "express";
import posts, { statusValues } from "../models/post";
import postCategories from "../models/postCategory";
import categories from "../models/category";

export default {
  //authuserを返す
  async show(req: any, res: Response) {
    const { authorize_token, ...user } = req.user.toJSON();
    res.status(200).json({ user });
  },
  //authuserに紐づくpostを返す
  async findPost(req: any, res: Response) {
    const { ...user } = req.user.toJSON();
    const queryStatus = req.query.status ? req.query.status : statusValues;
    const id = user.id;
    const post = await posts.findAll({
      where: {
        userId: id,
        status: queryStatus,
      },
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
      return res.json({ message: 'not exist' });
    }
    res.status(200).json({ post });
  },
};
