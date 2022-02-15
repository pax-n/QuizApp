/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:quiz_id', (req, res) => {
    // cookie-session middleware
    console.log('XXXXXXX', req.session.user_id);
    // // cookie-parser middleware
    res.cookie('user_id', req.session.user_id);
    // // send the user somewhere
    const templateVars = {};
    let query = `SELECT * FROM questions WHERE quiz_id = $1`;
    const parameters = [req.params.quiz_id];
    db.query(query, parameters)
      .then((data) => {
        templateVars.questions = data.rows;
        res.render('quizpage', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    // res.render('quizpage');
  });
  return router;
};
