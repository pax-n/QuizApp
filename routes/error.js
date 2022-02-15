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
    let user_id = req.session.user_id;
    // //
    let query = `SELECT * FROM users`;
    db.query(query)
      .then((data) => {
        console.log(data);
        let users = data.rows;
        console.log('GETtemplate', users[user_id]);
        const templateVars = {
          user_id: user_id,
          user: users[user_id],
        };
        res.render('error', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    // res.render('error');
  });
  return router;
};
