/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // GET /login
  router.get('/', (req, res) => {
    let query = `SELECT * FROM users`;
    console.log(query);
    db.query(query)
      .then((data) => {
        console.log(data);
        let users = data.rows;
        console.log('GETtemplate', users[0]);
        const templateVars = users[0];
        let loginId = users[0].id;
        req.session['user_id'] = loginId;
        res.render('index', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
