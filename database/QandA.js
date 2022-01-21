const { Pool } = require('pg');
const connection = new Pool({
  user: 'danielghaly',
  host: 'localhost',
  database: 'danielghaly',
  password: 'p',
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
    connection.query(`SELECT * FROM answers WHERE question_id = ${params[0]}`, (err, answers) => {
      if (err) {
        callback(err);
      } else {
        callback(null, answers);
      }
    });
  },
  getQuestionAnswers: function (params, callback) {
    connection.query(`SELECT * FROM answers WHERE question_id IN (${params[0]})`, (err, answers) => {
      if (err) {
        callback(err);
      } else {
        callback(null, answers);
      }
    });
  },
  QAJOIN: function (params, callback) {
    connection.query(`SELECT questions.id, answers.question_id, answers.body FROM questions LEFT JOIN answers ON questions.id = answers.question_id WHERE questions.product_id = ${params[0]}`, (err, QAJOIN) => {
      if (err) {
        callback(err);
      } else {
        callback(null, QAJOIN);
      }
    });
  },
  APJOIN: function (params, callback) {
    connection.query(`SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpful, photos.id, photos.answer_id, photos.url FROM answers INNER JOIN photos ON answers.id = photos.answer_id WHERE question_id IN (${params[0]})`, (err, APJOIN) => {
      if (err) {
        callback(err);
      } else {
        callback(null, APJOIN);
      }
    });
  }
};