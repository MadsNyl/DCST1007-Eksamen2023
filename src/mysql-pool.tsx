import mysql from 'mysql2';
require('dotenv').config();

// Create a cache of connections to the mysql server.
// Read more about connection pools here: https://en.wikipedia.org/wiki/Connection_pool
export let pool = mysql.createPool({
  host: 'mysql-ait.stud.idi.ntnu.no',
  connectionLimit: 1, // Limit the number of simultaneous connections to avoid overloading the mysql server
  user: process.env.DB_USERNAME, // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
  password: process.env.DB_PASSWORD, // Replae "password" with your mysql-ait.stud.idi.ntnu.no password
  database: process.env.DB_USERNAME, // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
});
