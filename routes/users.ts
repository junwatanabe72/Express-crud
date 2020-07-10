import express from "express";
import usersController from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.get("/",usersController.show);
usersRouter.get("/posts", usersController.findPost);

export { usersRouter };
