
/*const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const addUser = function (user){
  return pool
  .querry(`INSERT INTO users(name,email,password)
  VALUES($1, $2, $3)
  RETURNING *`
  ,[user.name, user.email, user.password])
  .then(res=>res.rows[0])
}
exports.addUser=addUser


const login = function(email, password) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1;
  `, [email])
  .then (res => {
    const user = res.rows[0];
    return user.password === password ? user : null;
  })
}
exports.login = login;
*/
