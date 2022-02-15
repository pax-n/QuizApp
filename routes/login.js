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
    res.redirect('/login/1');
    //   let query = `SELECT * FROM users`;
    //   db.query(query)
    //     .then((data) => {
    //       console.log(data);
    //       let users = data.rows;
    //       console.log('GETtemplate', users[0]);
    //       let loginId = users[0].id;
    //       req.session['user_id'] = loginId;
    //       const templateVars = {
    //         user_id: 1,
    //         user: users[0],
    //       };
    //       res.redirect(`/login/${user_id}`, templateVars);
    //     })
    //     .catch((err) => {
    //       res.status(500).json({ error: err.message });
    //     });
  });
  return router;
};
