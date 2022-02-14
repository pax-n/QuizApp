/*
 * All routes for answers are defined here
 * Since this file is loaded in server.js into api/answers,
 *   these routes are mounted onto /answers
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    let query = `SELECT * FROM answers`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const answers = data.rows;
        res.json({ answers });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
