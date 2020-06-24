import express, { NextFunction, Request, Response } from "express";

const indexRouter = express.Router();

/* GET users listing. */
indexRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "ok" });
});

export { indexRouter };
