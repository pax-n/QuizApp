/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
// security for password
const bcrypt = require('bcryptjs');

// let a = 1;
// let b = 1;
// if (bcrypt.compareSync(a, b)) {
//   console.log('true');
// } else {
//   console.log('false');
// }

module.exports = (db) => {
  // POST /login
  router.post('/', (req, res) => {
    let query = `SELECT * FROM users`;
    // console.log(query);
    db.query(query)
      .then((data) => {
        console.log(data);
        let users = data.rows;
        console.log('POSTtemplate users', users);
        console.log('POSTtemplate password', users.password);

        // res.json({ users });

        let loginEmail = req.body.email;
        let loginPassword = req.body.password;
        console.log('post Email', loginEmail);
        console.log('post password', loginPassword);
        if (!loginEmail || !loginPassword) {
          return res
            .status(400)
            .send(
              '400 - Email and password cannot be blank. Please <a href="/login">try again!</a>'
            );
        }
        // new user can't use same email in our current users
        function findUserByEmail(email, users) {
          let usersArr = Object.values(users);
          for (const userId in usersArr) {
            const user = usersArr[userId];
            if (user.email === email) {
              return user;
            }
          }
          return null;
        }

        // global scope
        function generateRandomString() {
          var random = Math.random().toString(36).slice(7);
          return random;
        }
        const user = findUserByEmail(loginEmail, users);
        let hashedPassword = bcrypt.hashSync(user.password, 10);
        console.log('Find U', user);
        console.log('Match Pass', loginPassword);
        console.log('Find U pass', hashedPassword);
        if (!user) {
          return res
            .status(400)
            .send(
              '400 - A user with that Email does not exist. Please <a href="/login">try again!</a>'
            );
        }
        if (!bcrypt.compareSync(loginPassword, hashedPassword)) {
          // password check bcrypt.compareSync() // true password match, false password not match
          return res
            .status(400)
            .send(
              '400 - password does not match. Please <a href="/login">try again!</a>'
            );
        }
        // let loginId = user.id;
        // req.session['user_id'] = loginId; // storing the user id value with cookie session
        res.render('login');
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
