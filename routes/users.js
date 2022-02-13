/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const helper = require('../helper');

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // users/new GET - goes to registration page

  router.get("/new", (req, res) => {
    //if user already loged in redirect home
    if (req.session.user_id) {
      res.redirect('../')
    }
    const templeVars = { user_id: req.session.user_id }
    res.render("user_login", templeVars)

  })


  // user/login GET -  Login page

  router.get("/login", (req, res) => {
    // if user is already logged in
    if (req.session.user_id) {
      res.redirect('../');
    }
    const templateVars = { user_id: req.session.user_id };
    res.render("user_login", templateVars);
  });


  // users/new POST : create new account, add user to db, redirect to home

  router.post("/", (req, res) => {
    const user = req.body
    helper.addUser(user)
      .then(user => {
        if (!user) {
          res.send({ error: 'ERORR : User/Password not found!' })
          return;
        }
        //cookie assigned with user_id for user
        req.session.user_id = user.id;
        // redirects to user page
        res.redirect(`/users/${user.id}`);
      })
      .catch(e => res.send(e));
  });


  // users/login POST  Login update session cookie

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    helper.login(email, password)
      .then(user => {
        if (!user) {
          res.send({ error: 'ERROR : username/password is incorrect!' });
          return;
        }
        // cookie assigned with user_id
        req.session.user_id = user.id;
        // redirects to user page
        res.redirect(`/users/${user.id}`);
      })
      .catch(e => res.send(e));
  });








  return router;
};


