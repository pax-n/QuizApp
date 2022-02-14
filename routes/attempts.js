/*
 * All routes for attempts are defined here
 * Since this file is loaded in server.js into api/attempts,
 *   these routes are mounted onto /attempts
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    let query = `SELECT * FROM attempts`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const attempts = data.rows;
        res.json({ attempts });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
