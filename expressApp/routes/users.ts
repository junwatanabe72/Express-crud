import { NextFunction, Request, Response } from "express";
import usersController from "../controllers/users.controller";
const express = require("express");
const usersRouter = express.Router();

// Create a new user
usersRouter.post("/", usersController.create);

// Retrieve an user
usersRouter.get("/:id", usersController.findOne);

// Retrieve all users
usersRouter.get("/", usersController.findAll);

// Update an user
usersRouter.patch("/:id", usersController.update);

// Delete an user
usersRouter.delete("/:id", usersController.delete);

export { usersRouter };
