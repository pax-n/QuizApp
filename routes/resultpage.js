/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:answer_id', (req, res) => {
    // cookie-session middleware
    console.log('XXXXXXX', req.session.user_id);
    // // cookie-parser middleware
    res.cookie('user_id', req.session.user_id);
    // // send the user somewhere
    const templateVars = {};
    let query = `SELECT * FROM users WHERE id = $1`;
    const parameters = [req.session.user_id];

    let questions = `SELECT * FROM questions WHERE quiz_id = $1`;
    const answer_id = [req.params.answer_id];
    console.log('AAAAAAA', answer_id);
    db.query(query, answer_id)
      .then((data) => {
        templateVars.author = data.rows;
        db.query(questions, answer_id)
          .then((data) => {
            templateVars.questions = data.rows;
            const q_ids = [];
            templateVars.questions.forEach((element) => {
              q_ids.push(element.id);
            });
            let querynew = `SELECT * FROM answers WHERE question_id IN(${q_ids})`;
            db.query(querynew)
              .then((data) => {
                templateVars.answers = data.rows;
                db.query(query, parameters)
                  .then((data) => {
                    templateVars.user = data.rows;
                    console.log('RESULTTTTTTTTT', templateVars);
                    res.render('resultpage', templateVars);
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
        // res.render('resultpage');
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
