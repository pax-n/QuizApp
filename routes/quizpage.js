/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const { param } = require('express/lib/request');
const router = express.Router();
module.exports = (db) => {
  router.get('/:quiz_id', (req, res) => {
    // cookie-session middleware
    //console.log('XXXXXXX', req.session.user_id);
    // // cookie-parser middleware
    res.cookie('user_id', req.session.user_id);
    // // send the user somewhere
    const templateVars = {};
    let user = `SELECT * FROM users WHERE id = $1`;
    const userid = [req.session.user_id];
    let query = `SELECT * FROM questions WHERE quiz_id = $1`;
    const parameters = [req.params.quiz_id];
    db.query(query, parameters)
      .then((data) => {
        templateVars.questions = data.rows;
        const q_ids = [];
        templateVars.questions.forEach((element) => {
          q_ids.push(element.id);
        });
        let querynew = `SELECT * FROM answers WHERE question_id IN(${q_ids})`;
        db.query(querynew).then((data) => {
          templateVars.answers = data.rows;
          //console.log(templateVars)
          db.query(user, userid)
            .then((data) => {
              templateVars.user = data.rows;
              db.query(user, parameters)
                .then((data) => {
                  templateVars.author = data.rows;
                  console.log('QUIZ Page:', templateVars);
                  res.render('quizpage', templateVars);
                })
                .catch((err) => {
                  res.status(500).json({ error: err.message });
                });
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
