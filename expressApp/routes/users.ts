import express,{ Request, Response } from "express";
import usersController from "../controllers/users.controller";
import users from "../models/user";
import posts from "../models/post";
import post_categories from "../models/postCategory";
import categories from "../models/category";

const usersRouter = express.Router();

usersRouter.get("/",usersController.findOne);
usersRouter.get("/posts", usersController.findPost);

export { usersRouter };
