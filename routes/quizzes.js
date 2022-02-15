/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into api/quizzes,
 *   these routes are mounted onto /quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router


const express = require('express');
const router = express.Router();

module.exports = (db) => {

    //home page to see public quizzes
  router.get('/:user_id', (req, res) => {
    req.session.user_id = req.params.user_id;
    db.query(`
    SELECT * FROM quizzes WHERE isPrivate = FALSE;
    `)
    .then(data => {
console.log("we got our result from db querry")
      console.log("This is my data results" , data)
      const templateVar = {
        quizzes: data.rows,
        user_id: req.params.user_id
      };
      res.render('../views/index', templateVar);
    })
  });
  return router;
};

*/
