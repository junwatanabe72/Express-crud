import db from "../../models/index";
const users = db.users;
const posts = db.posts;

export default {
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
      .findAll({
        include: [{ model: posts, as: "posts" }],
      })
      .then((users) => {
        res.send(users);
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
      .then((user) => {
        res.send(user);
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
