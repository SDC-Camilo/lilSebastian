const { Pool } = require('pg');
const connection = new Pool({
  user: 'ubuntu',
  host: 'ec2-3-136-161-46.us-east-2.compute.amazonaws.com',
  database: 'Reviews',
  password: 'ubuntu',
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

  getAll: async function (response) {
    try {
      const res = await connection.query('SELECT * FROM "reviewList"."allReviews" LIMIT 5');
      console.log(res.rows);
      response.send(res.rows);
    } catch (err) {
      response.setStatusCode(404).send(err);
      console.log(err.stack);
    }
  },
  reviews: async function (page, count, sort, product_id, response) {
    page = page === 0 ? 1 : page;
    var offset = page * count;

    console.log('offset::', offset.toString());
    var order = '';
    if (sort === 'newest') {
      order = 'date';
    } else if (sort === 'helpful') {
      order = 'helpfulness';
      console.log('yess::');
    } else if (sort === 'relevant') {
      order = 'helpfulness';
    }

    try {
      const query = `SELECT
      "allReviews".id,
      rating,
      summary,
      recommend,
      response,
      body,
      date,
      reviewer_name,
      helpfulness,
      url
      FROM "reviewList"."allReviews"
      LEFT JOIN "reviewList"."reviews_photos" ON "allReviews".id = "reviews_photos".review_id
      WHERE product_id = ${product_id}
      ORDER BY ${order} DESC
      OFFSET ${offset}
      LIMIT ${count}
      `;
      const res = await connection.query(query);

      var outArr = [];
      for (let i = 0; i < res.rows.length; i++) {
        if (i > 0 && res.rows[i].id === outArr[outArr.length - 1].id) {
          outArr[outArr.length - 1]['photos'].push(res.rows[i].url);
        } else {
          var url = res.rows[i].url;
          var review = res.rows[i];
          review['photos'] = [url];
          delete review['url'];
          outArr.push(review);
        }
      }
      response.send(outArr);
    } catch (err) {
      response.send(err);
      console.log(err.stack);
    }
  }
};