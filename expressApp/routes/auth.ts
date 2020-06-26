import express, { Request, Response } from "express";
import models from "../models/";
import passport from "passport";
import jwt from "jsonwebtoken";
import {hash} from "bcrypt";

const users = models.User;

const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  passport.authenticate("local", { session: false }, (err: any, user: any) => {
    if (err || !user) {
      console.error("hoge", err);
      return res.status(400).json({
        message: "somthing is not right",
        user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const payload = { id: user.id, loginId: user.loginId };
      const token = jwt.sign(payload, "secret");
      user.authorize_token = "[Secret]";
      return res.json({ user, token });
    });
  })(req, res);
});


authRouter.post("/signup", async (req: Request, res: Response) => {
  const { user } = req.body;
  const _user = await users.findOne({ where: { loginId: user.loginId } });
  if (!user.password || user.password.length < 6) {
    return res.status(400).json({
      error: "パスワードは6文字以上を設定してください",
      code: "invalidPassword",
    });
  }
  if (_user) {
    return res.status(422).json({
      error: "すでに登録されているログインIDです",
      code: "alreadyRegistered",
    });
  }
  // const autorizeToken = user.password
  const autorizeToken = await hash(user.password, 10);
  delete user["password"];
  user.authorize_token = autorizeToken;
  await users.create(user);
  res.send(user);
});




  





export { authRouter };
