/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    // cookie-session middleware
    console.log('XXXXXXX', req.session.user_id);
    // // cookie-parser middleware
    res.cookie('user_id', req.session.user_id);
    // // send the user somewhere

    const templateVars = {};
    let query = `SELECT * FROM users WHERE id = $1`;
    const parameters = [req.session.user_id];

    let quiz = `SELECT users.*, quizzes.*, users.name as username, quizzes.name as quizzname FROM quizzes
    JOIN users ON users.id=quizzes.user_id`;
    db.query(quiz)
      .then((data) => {
        // console.log('data from quizzes',data.rows)
        templateVars.quiz = data.rows;
        db.query(query, parameters)
          .then((data) => {
            // console.log('data from users',data.rows)
            templateVars.user = data.rows;
            // console.log('QUIZZZZZZZ', templateVars);
            res.render('index', templateVars);
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
