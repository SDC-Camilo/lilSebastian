const { Pool } = require('pg');
const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Reviews',
  password: 'root',
  port: 5432
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to postgres!');
  }
});
connection.connect();

module.exports = {
  getAll: function (callback) {
    connection.query('SELECT * FROM allReviews', (err, allReviews) => {
      if (err) {
        callback(err);
      } else {
        callback(err, allReviews);
      }
    });
    connection.end();
  }
};