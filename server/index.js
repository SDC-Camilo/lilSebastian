const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const axios = require('axios');
const API_KEY = require('../config/config.js');
const connection = require('../database/QandA.js');

const headers = {
  Authorization: API_KEY.API_KEY,
  'Content-Type': 'application/json',
};
const memo = {};
const outfitsMemo = {};
const cart = {};

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

app.use(express.static(path.join(__dirname + '/../client/dist')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/qanda', (req, res) => {
  let params = [req.query.product_id];
  connection.getQandA(params, (err, questions) => {
    if (err) {
      res.sendStatus(404);
      return;
    }
    res.status(200);
    var clientObj = {
      product_id: params[0],
      results: []
    };

    questions.rows.forEach(row => {
      var result = {
        question_id: row.id,
        question_body: row.body,
        question_date: row.date_written,
        asker_name: row.asker_name,
        reported: row.reported,
        helpful: row.helpful,
        answers: {}
      };

      clientObj.results.push(result);

    });

    connection.getAnswers(params, (err, answers) => {
      if (err) {
        console.log(err);
        return;
      }

      // answers.rows.forEach(row => {
      //   var id = row.id;
      //   clientObj.results.answers[id] = {
      //     id: row.id,
      //     body: row.body,
      //     date: row.date_written,
      //     answerer_name: row.answerer_name,
      //     helpfulness: row.helpful
      //   };
      // });
    });


    res.send(clientObj);

  });
});

app.get('/answers/:question_id', (req, res) => {
  let params = [req.params.question_id];
  connection.getAnswers(params, (err, answers) => {
    if (err) {
      res.sendStatus(404);
      return;
    }
    var clientObj = {
      question: params[0],
      results: []
    };

    answers.rows.forEach(row => {
      var result = {
        answer_id: row.id,
        body: row.body,
        date: row.date_written,
        answerer_name: row.answerer_name,
        helpfulness: row.helpful
      };
      clientObj.results.push(result);
    });
    res.send(clientObj);

  });

});

app.get('/', (req, res) => {
  res.send('Hello from the server!');

});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});

app.get(/products/, (req, res) => {
  if (memo[req.path]) {
    res.send(memo[req.path]);
  } else {
    axios({
      url: req.url,
      headers: headers,
      baseURL: baseURL,
    })
      .then((response) => {
        memo[req.path] = response.data;
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.get(/qa/, (req, res) => {
  if (memo[req.path + `?product_id=${req.query.product_id}`]) {
    res.send(memo[req.path + `?product_id=${req.query.product_id}`]);
  } else {
    axios({
      url: req.url,
      headers: headers,
      baseURL: baseURL,
    })
      .then((response) => {
        memo[req.path + `?product_id=${req.query.product_id}`] = response.data;
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.post(/answers/, (req, res) => {
  console.log(baseURL + req.url);
  axios({
    method: 'POST',
    url: req.url,
    headers: headers,
    data: req.body,
    baseURL: baseURL,
  })
    .then(() => {
      axios({
        url: `/qa/questions/?product_id=${req.body.item}`,
        headers: headers,
        baseURL: baseURL,
      })
        .then((response) => {
          memo[req.path + `?product_id=${req.body.item}`] = response.data;
          res.status(201).send(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.post('/qa/questions', (req, res) => {
  axios({
    method: 'POST',
    url: req.url,
    headers: headers,
    data: req.body,
    baseURL: baseURL,
  })
    .then(() => {
      console.log('response');
      res.status(201).send('Success');
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.put(/qa/, (req, res) => {
  axios({
    url: req.url,
    body: req.body,
    method: 'PUT',
    headers: headers,
    baseURL: baseURL,
  })
    .then(() => {
      axios({
        url: `/qa/questions/?product_id=${req.body.id}`,
        method: 'GET',
        headers: headers,
        baseURL: baseURL,
      })
        .then((response) => {
          memo[`/qa/questions?product_id=${req.body.id}`] = response.data;
          res.send(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get(/reviews/, (req, res) => {
  if (memo[req.path + `?product_id=${req.query.product_id}`]) {
    res.send(memo[req.path + `?product_id=${req.query.product_id}`]);
  } else {
    axios({
      url: req.url,
      headers: headers,
      baseURL: baseURL,
    })
      .then((response) => {
        memo[req.path + `?product_id=${req.query.product_id}`] = response.data;
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.get('/outfits', (req, res) => {
  res.send(outfitsMemo);
});

app.post('/outfits', (req, res) => {
  outfitsMemo[req.body.id] = req.body.id;
  res.send(outfitsMemo);
});

app.delete('/outfits', (req, res) => {
  delete outfitsMemo[req.body.id];
  res.send(outfitsMemo);
});

app.post(/interactions/, (req, res) => {
  axios({
    method: 'post',
    url: req.url,
    headers: headers,
    data: req.body,
    baseURL: baseURL,
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post(/cart/, (req, res) => {
  axios({
    method: 'post',
    url: req.url,
    headers: headers,
    data: req.body,
    baseURL: baseURL,
  })
    .then(() => {
      if (cart[req.body.sku_id]) {
        cart[req.body.sku_id].quantity += parseInt(req.body.quantity);
      } else {
        cart[req.body.sku_id] = {
          name: req.body.item.name,
          style: req.body.style.name,
          price: req.body.style.sale_price || req.body.style.original_price,
          pic: req.body.style.photos[0].thumbnail_url,
          size: req.body.style.skus[req.body.sku_id].size,
          quantity: parseInt(req.body.quantity),
        };
      }
      res.sendStatus(201);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get(/cart/, (req, res) => {
  res.send(Object.values(cart));
});
