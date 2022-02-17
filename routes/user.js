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

    let quiz = `SELECT * FROM quizzes INNER JOIN attempts ON quizzes.id = attempts.quiz_id`;
    let question = `SELECT * FROM questions`;
    let edit = `SELECT * FROM quizzes`;

    db.query(quiz)
      .then((data) => {
        templateVars.quiz = data.rows;
        db.query(question)
          .then((data) => {
            templateVars.question = data.rows;
            const count = {};

            templateVars.question.forEach(function (i) {
              // console.log(i.quiz_id);
              count[i.quiz_id] = (count[i.quiz_id] || 0) + 1;
            });
            console.log(count);
            templateVars.count = count;
            db.query(edit)
              .then((data) => {
                templateVars.edit = data.rows;
                db.query(query, parameters)
                  .then((data) => {
                    templateVars.user = data.rows;
                    console.log('QUIZZZZZZZ', templateVars);
                    res.render('user', templateVars);
                  })
                  .catch((err) => {
                    res.status(500).json({ error: err.message });
                  });
              })
              .catch((err) => {
                res.status(500).json({ error: err.message });
              });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    // res.render('user');
  });
  return router;
};
