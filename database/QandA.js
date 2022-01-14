const { Pool } = require('pg');
const connection = new Pool({
  user: 'danielghaly',
  host: 'localhost',
  database: 'qanda',
  password: '',
  port: 5432
});

connection.connect((err) => {
  if (err) {
    console.log('error:', err);
  } else {
    console.log('Connected to postgres!');
  }
});
connection.connect();

module.exports = {
  getQandA: function (params, callback) {
    connection.query(`SELECT * FROM questions WHERE product_id IN (${params[0]})`, (err, QandA) => {
      if (err) {
        callback(err);
      } else {
        callback(null, QandA);
      }
    });
  },
  getAnswers: function (params, callback) {
    connection.query('SELECT * FROM answers LIMIT 5', (err, answers) => {
      if (err) {
        callback(err);
      } else {
        callback(null, answers);
      }
    });
  }
};