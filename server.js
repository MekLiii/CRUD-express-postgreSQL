const express = require("express");

const app = express();
const port = 3001;

const users_model = require("./src/users_model/users_model");

app.use(express.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methonds", "GET,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
    "Access-Control-Allow-Header"
  );
  next();
});
app.get("/", (_, res) => {
    users_model
    .getUsers()
    .then((result) => {
      res.status(200).send(result);
      res.end();
      return;
    })
    .catch((err) => {
      res.status(500).send(err);
      res.end();
    });
});
app.post("/users", (req, res) => {
    users_model
    .createUser(req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete("/users/:id", (req, res) => {
    users_model
    .deleteUser(req.params.id)
    .then((result) => {
      res.status(200).send({
        message: result,
        text: "user deleted",
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.listen(port, () => console.log(`app is running on port ${port}`));
