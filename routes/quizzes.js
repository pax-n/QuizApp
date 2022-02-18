/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into api/quizzes,
 *   these routes are mounted onto /quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    let query = `SELECT * FROM quizzes`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/:quizid/questions', (req, res) => {
    const question = req.body.question;
    const answer = req.body.realAns;
    const options = req.body.newFakeAns;
    const quizID = req.params.quizid;
    const questionQuery = 'INSERT INTO questions (quiz_id, question) VALUES ($1, $2) RETURNING id;'
    const questionParams = [quizID, question]
    let questionID;
    console.log("create question", req.body)
    console.log("QuestionParams is", questionParams)
    db.query (questionQuery, questionParams)
    .then((result) => {
      questionID = result.rows[0].id
      const correctAnswerQuery = 'INSERT INTO answers (question_id, answer, isCorrect) VALUES ($1, $2, $3)'
      console.log("new questionID is", questionID)
      return db.query(correctAnswerQuery, [questionID, answer, true])
    }).then(() => {
      const placeholders = options.map((answer, index) => {   return `($${(index * 3) + 1}, $${(index * 3) + 2}, $${(index * 3) + 3})`;  }).join(', ');
      const wrongAnswerQuery = `INSERT INTO answers (question_id, answer, isCorrect) VALUES ${placeholders} RETURNING id`
      const wrongAnswerParams = options.map((answer) => [questionID, answer, false]).flat();
      console.log("wrong answer query", wrongAnswerQuery);
      console.log("wrong answer params", wrongAnswerParams);
      return db.query(wrongAnswerQuery, wrongAnswerParams);
    }).then((results)=> {
      console.log("successful new answers", results.rows);
      return res.status(200).json({ questionID })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })

  // router.delete('/:quizid/questions/:questionid', (req, res) => {

  // })

  // router.put('/:quizid/questions/:questionid', (req, res) => {

  // })
  return router;
};
