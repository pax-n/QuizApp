// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const app = express();
const morgan = require('morgan');

// Body parser
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// parse application/json
app.use(bodyParser.json());

// security for password
// const bcrypt = require('bcryptjs');

// Cookie session
const cookieSession = require('cookie-session');

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  })
);

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/users');
const widgetsRoutes = require('./routes/widgets');
const quizzesRoutes = require('./routes/quizzes');
const questionsRoutes = require('./routes/questions');
const answersRoutes = require('./routes/answers');
const attemptsRoutes = require('./routes/attempts');
// const loginRoutes = require('./routes/login');
// const loginPostRoutes = require('./routes/login-post');
const quizpageRoutes = require('./routes/quizpage');
const resultpageRoutes = require('./routes/resultpage');
const createquizRoutes = require('./routes/createquiz');
const userRoutes = require('./routes/user');
const registerRoutes = require('./routes/register');
const resetRoutes = require('./routes/reset');
const errorRoutes = require('./routes/error');
const homeQuizRoutes = require('./routes/homequiz');
const logoutRoutes = require('./routes/logout');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use('/api/users', usersRoutes(db));
app.use('/api/widgets', widgetsRoutes(db));
app.use('/api/quizzes', quizzesRoutes(db));
app.use('/api/questions', questionsRoutes(db));
app.use('/api/answers', answersRoutes(db));
app.use('/api/attempts', attemptsRoutes(db));
// app.use('/login', loginRoutes(db));
// app.use('/login-post', urlencodedParser, loginPostRoutes(db));
app.use('/quizpage', quizpageRoutes(db));
app.use('/resultpage', resultpageRoutes(db));
app.use('/createquiz', createquizRoutes(db));
app.use('/user', userRoutes(db));
app.use('/register', registerRoutes(db));
app.use('/reset', resetRoutes(db));
app.use('/error', errorRoutes(db));
app.use('/logout', logoutRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get('/', (req, res) => {
//   console.log(req.session['user_id']);
//   res.render('index');
// });
// Homepage receive all quiz routes
app.use('/', homeQuizRoutes(db));

app.get('/demo_index', (req, res) => {
  res.render('demo_index');
});

// User cookie session
app.get('/login/:id', (req, res) => {
  // cookie-session middleware
  req.session.user_id = req.params.id;
  // cookie-parser middleware
  res.cookie('user_id', req.params.id);
  // send the user somewhere
  let user_id = req.params.id;
  //
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
      res.render('index', templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//
// POST /logout
//
app.post('/logout', (req, res) => {
  req.session.user_id = null;
  const templateVars = {
    user: undefined,
  };
  res.render('index', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
