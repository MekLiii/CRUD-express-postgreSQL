const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_database",
  password: "",
  port: 4000,
});

const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * from users ORDER BY id ASC", (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result.rows || {});
    });
  });
};
const createUser = (body) => {
  return new Promise((resolve, reject) => {
    const { name, email } = body;
    pool.query(
      "INSERT INTO users (name,email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
};
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM users WHERE id = $1", [id], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(`User deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};
