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
    let query = `SELECT * FROM quizzes LEFT OUTER JOIN users ON quizzes.user_id = users.id`;
    db.query(query)
      .then((data) => {
        const quizzes = data;
        console.log(quizzes);
        const templateVars = {
          user_id: 1,
          user: quizzes[0],
        };
        res.render('index', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
