import express from "express";
import bodyParser from "body-parser";
import path from "path";
import logger from "morgan";
import passport from 'passport';
import "./middlewares/passport";
import { indexRouter } from "./routes/index";
import { usersRouter } from "./routes/users";
import { authRouter } from "./routes/auth";
import { postsRouter } from "./routes/posts";
//create_app
const app = express();

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(passport.initialize());

//router
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", passport.authenticate("jwt", { session: false }), usersRouter);
app.use("/posts", passport.authenticate("jwt", { session: false }), postsRouter);

export { app };
