"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express = require("express");
const indexRouter = express.Router();
exports.indexRouter = indexRouter;
/* GET users listing. */
indexRouter.get("/", (req, res, next) => {
    res.json({ message: "ok" });
});
