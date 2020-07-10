import express from "express";
import postsController from "../controllers/postsController";

const postsRouter = express.Router();

postsRouter.post("/", postsController.create);
postsRouter.get("/", postsController.index);
postsRouter.get("/:id", postsController.show);
postsRouter.patch("/:id", postsController.update);
postsRouter.delete("/:id", postsController.delete);

export { postsRouter };
