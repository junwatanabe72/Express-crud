const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

import { indexRouter } from "./routes/index";
import { usersRouter } from "./routes/users";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, "public")));
const p = new Promise(() => {});
app.use("/", indexRouter);
app.use("/user", usersRouter);

export { app };
