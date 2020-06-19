"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../models/index"));
const users = index_1.default.users;
const posts = index_1.default.posts;
exports.default = {
  create(req, res) {
    users
      .create({
        name: req.body.name,
        loginId: req.body.loginId,
        authorize_token: req.body.authorize_token,
        iconUrl: req.body.iconUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((users) => {
        res.send(users);
      });
  },
  findAll(req, res) {
    users
      .findAll({ include: [{ model: posts, as: "posts" }] })
      .then((users) => {
        if (!users) {
          console.log("ユーザーデータを取得できませんでした");
          res.send("Error");
        } else {
          console.log("ユーザーデータを取得できました");
          res.send(users);
        }
      });
  },
  findOne(req, res) {
    users
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [{ model: posts, as: "posts" }],
      })
      .then((post) => {
        res.send(post);
      });
  },
  update(req, res) {
    users
      .update(
        {
          name: req.body.name,
          iconUrl: req.body.iconUrl,
          updatedAt: new Date(),
        },
        {
          where: { id: req.params.id },
        }
      )
      .then(() => {
        res.status(200).send("Successfully updated a  user: " + req.params.id);
      });
  },
  delete(req, res) {
    users
      .destroy({
        where: { id: req.params.id },
      })
      .then(() => {
        res.status(200).send("Successfully deleted a user: " + req.params.id);
      });
  },
};
