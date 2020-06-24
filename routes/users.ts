import express from "express";
import usersController from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/",usersController.findOne);
usersRouter.get("/posts", usersController.findPost);

export { usersRouter };
