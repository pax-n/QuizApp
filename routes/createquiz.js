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
    db.query(query, parameters)
      .then((data) => {
        templateVars.user = data.rows;
        res.render('createquiz', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    console.log(req.session)
    const query = `INSERT INTO quizzes (user_id, name, description, isPrivate) VALUES ($1, $2, $3, $4)
    RETURNING *;`
    const userId = req.session.user_id;
    const queryParams = [userId, req.body.quizTitle, req.body.quizDesc, false]
    db.query(query, queryParams)
      .then((result) => {
        const quizID = result.rows[0].id;
        res.redirect(`/editquiz/${quizID}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  })


  return router;
};
