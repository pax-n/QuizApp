/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    // cookie-session middleware
    console.log('XXXXXXX', req.session.user_id);
    // // cookie-parser middleware
    res.cookie('user_id', req.session.user_id);
    // // send the user somewhere
    console.log('req.body', req.body);
    let postQuiz = req.body;
    // console.log('req.key', Object.keys(req.body));
    // console.log('req.value', Object.values(req.body));

    // quizName: 'a',
    // quizDesc: 'b',
    // INSERT INTO quizzes (user_id, name, description, isPrivate) VALUES(1, 'Culture', 'Origin of the musical instruments', FALSE);
    // user_id
    // name
    // description
    // isPrivate
    let quizzes = {};

    // question1: 'c',
    // INSERT INTO questions (quiz_id, question) VALUES (1, 'Where was the Harp invented?');
    // INSERT INTO questions (quiz_id, question) VALUES (1, 'Where was the Piano invented?');
    // INSERT INTO questions (quiz_id, question) VALUES (1, 'Where was the Guitar invented?');
    // INSERT INTO questions (quiz_id, question) VALUES (1, 'Where was the Violin invented?');
    // quiz_id
    // question
    let questions = {};

    // 'answer3-1': 'd',
    // 'answer3-2': 'e',
    // 'answer3-3': '',
    // INSERT INTO answers (question_id, answer, isCorrect) VALUES (1, 'Italy', FALSE);
    // INSERT INTO answers (question_id, answer, isCorrect) VALUES (1, 'Greece', FALSE);
    // INSERT INTO answers (question_id, answer, isCorrect) VALUES (1, 'Iran', FALSE);
    // INSERT INTO answers (question_id, answer, isCorrect) VALUES (1, 'Egypt', TRUE);
    // question_id
    // answer
    // isCorrect
    let answers = {};
    // for (let sql in postQuiz) {
    //   // console.log(sql);
    //   // console.log(postQuiz[sql]);
    //   if (postQuiz[sql]) {
    //     console.log(sql);

    //     // if (sql === `question\[*\]`) {
    //     //   console.log(sql);
    //     // }
    //   }
    // }
    let sql = Object.entries(postQuiz);
    const regexQ = /question*/g;
    const regexA = /answer*/g;
    for (let i = 0; i < sql.length; i++) {
      // console.log(found);
      let renameQ = sql[i][0].match(regexQ);
      if (renameQ) {
        i++;
        let renameA = sql[i][0].match(regexA);
        if (renameA) {
          for (let z = i; z < sql.length; z++) {
            console.log(sql[z][0]);
          }
        }
      }
    }

    const templateVars = {};

    let query = `SELECT * FROM users WHERE id = $1`;
    const parameters = [req.session.user_id];
    let quizze = `SELECT * FROM quizzes`;
    let question = `SELECT * FROM questions`;
    let answer = `SELECT * FROM answers`;
    let quiz_id = req.body.quiz_id; // last quiz id
    db.query(query, parameters)
      .then((data) => {
        templateVars.user = data.rows;
        // res.redirect(`/quizpage/${quiz_id}`);
        res.render('createquiz', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

// module.exports = (db) => {
//   router.post('/')
// }
