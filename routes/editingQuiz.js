/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get('/:quizID/', (req, res) => {
    // cookie-session middleware
    console.log('XXXXXXX', req.session.user_id);
    // // cookie-parser middleware
    res.cookie('user_id', req.session.user_id);
    // // send the user somewhere
    const templateVars = {quizID: req.params.quizID};
    let query = `SELECT * FROM users WHERE id = $1`;
    const parameters = [req.session.user_id];
    db.query(query, parameters)
      .then((data) => {
        templateVars.user = data.rows;
        res.render('editquiz', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    console.log(req.body)
    console.log(req.session.user_id)
    // const query = `
    // INSERT INTO questions (quiz_id, question VALUES ($1, $2)
    // RETURNING *;`
    // const userId = req.session.user_id;
    // const queryParams = []
    // db.query(query, queryParams)
    //   .then(() => {
    //     res.redirect('/');
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
  })

  return router;
};
