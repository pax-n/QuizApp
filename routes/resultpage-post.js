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
    let answer_id = req.body.answer_id;
    console.log('XXXXXXXXXXXXXX', answer_id);
    // let question1 = req.body.question1;
    // console.log('XXXXXXXXXXXXXX', question1);
    res.redirect(`/resultpage/${answer_id}`);
  });
  return router;
};
