import express from "express";
import postsController from "../controllers/posts.controller";

const postsRouter = express.Router();

postsRouter.post("/", postsController.create);
postsRouter.get("/", postsController.findAll);
postsRouter.get("/:id", postsController.findOne);
postsRouter.patch("/:id", postsController.update);
postsRouter.delete("/:id", postsController.delete);

export { postsRouter };
