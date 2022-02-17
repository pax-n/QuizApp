/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

// const user = {
//   test: 'test',
// };
module.exports = (db) => {
  router.post('/', (req, res) => {
    // cookie-session middleware
    console.log('XXXXXXX', req.session.user_id);
    // // cookie-parser middleware
    res.cookie('user_id', req.session.user_id);
    // // send the user somewhere
    let answer_id = req.body.answer_id;
    console.log('XXXXXXXXXXXXXX', answer_id);
    console.log('req.body', req.body);
    console.log('req.key', Object.keys(req.body));
    console.log('req.value', Object.values(req.body));
    // const result = [req.body];
    const templateVars = {};
    // let newUser = ['Test Guy', 'test@abc.com', '123'];
    let scores = Object.values(req.body);
    let count = 0;
    for (let score of scores) {
      if (score === 'true') {
        // console.log('score =++++++++++ ', score);
        count++;
      }
    }
    console.log('score = ', count);
    let newScore = [answer_id, req.session.user_id, count];
    // let questions = `SELECT * FROM questions WHERE quiz_id = $1`;
    // let users = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
    let attempts =
      'INSERT INTO attempts (quiz_id, user_id, score) VALUES ($1, $2, $3)';
    // INSERT INTO users (name, email, password) VALUES ('Mark Roy', 'mark@gmail.com',	'123');
    db.query(attempts, newScore)
      .then((data) => {
        let attempt = `SELECT * FROM attempts`;
        db.query(attempt)
          .then((data) => {
            templateVars.attempts = data.rows;
            console.log('RESULTTTTTTTTT', templateVars);
            res.redirect(`/resultpage/${answer_id}`);
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    // db.query('INSERT INTO users SET ?', newUser, (err, res) => {
    //   if (err) throw err;

    //   console.log('Last insert ID:', res.insertId);
    // });
    // console.log('result post', user);
    // let aaa = Object.values(req.body);
    // let count = aaa.filter((n) => n === 'true').length;
    // console.log(count);
  });
  return router;
};
