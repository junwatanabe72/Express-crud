// import db from "../../models/index";
// const users = db.users;
// const posts = db.posts;

// export default {
//   create(req, res) {
//     posts
//       .create({
//         title: req.body.title,
//         userId: req.body.userId,
//         body: req.body.body,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       })
//       .then((users) => {
//         res.send(users);
//       });
//   },
//   findAll(req, res) {
//     posts
//       .findAll({
//         include: [{ model: users, as: "users" }],
//       })
//       .then((posts) => {
//         res.send(posts);
//       });
//   },
//   findOne(req, res) {
//     posts
//       .findOne({
//         where: {
//           id: req.params.id,
//         },
//         include: [{ model: users, as: "users" }],
//       })
//       .then((post) => {
//         res.send(post);
//       });
//   },
//   update(req, res) {
//     posts
//       .update(
//         {
//           name: req.body.name,
//           iconUrl: req.body.iconUrl,
//           updatedAt: new Date(),
//         },
//         {
//           where: { id: req.params.id },
//         }
//       )
//       .then(() => {
//         res.status(200).send("Successfully updated a  user: " + req.params.id);
//       });
//   },
//   delete(req, res) {
//     posts
//       .destroy({
//         where: { id: req.params.id },
//       })
//       .then(() => {
//         res.status(200).send("Successfully deleted a user: " + req.params.id);
//       });
//   },
// };
