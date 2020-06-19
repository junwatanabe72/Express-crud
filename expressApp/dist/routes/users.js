"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const users_controller_1 = __importDefault(
  require("../controllers/users.controller")
);
const express = require("express");
const usersRouter = express.Router();
exports.usersRouter = usersRouter;
// Create a new user
usersRouter.post("/", users_controller_1.default.create);
// Retrieve an user
usersRouter.get("/:id", users_controller_1.default.findOne);
usersRouter.get("/", users_controller_1.default.findAll);
usersRouter.get("/posts", (req, res, next) => {
  res.json({ message: "ng" });
});
// Update an user
usersRouter.patch("/:id", users_controller_1.default.update);
// Delete an user
usersRouter.delete("/:id", users_controller_1.default.delete);
