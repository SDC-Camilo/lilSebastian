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


app.get('/loaderio-6000ca7a8d9355d672fe1be3028c3e9d.txt', (req,res) => {
  res.sendFile('/home/Ubuntu/lilSebastian/loaderio-6000ca7a8d9355d672fe1be3028c3e9d.txt');
});

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


    questions.rows.forEach(question => {
      var result = {
        question_id: question.id,
        question_body: question.body,
        question_date: question.date_written,
        asker_name: question.asker_name,
        reported: question.reported,
        question_helpfulness: question.helpful,
        // answers: {}
      };



      clientObj.results.push(result);

      // connection.QAJOIN(params[0], (err, results) => {
      //   results.rows.forEach(result => {
      //     // console.log(result)
      //     clientObj.results.forEach(question => {
      //       if(question.question_id === result.question_id) {
      //         console.log(question)
      //         // question.answers[result.id] = {};
      //       }
      //     })

      //   });


      //   debugger;
      //   if (err) {
      //     console.log(err);
      //   }
      //   // console.log(results);


      // });

    });


    // debugger;

    // clientObj.results.forEach(question => {
    //   var question_id = question.question_id;
    //   let params = [question_id];
    //   connection.getQuestionAnswers(params, (err, QuestionAnswers) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }

    //     console.log('QA1', QuestionAnswers);
    //     question.answers = {};
    //     QuestionAnswers.rows.forEach(answer => {
    //       // var answerObj = {};
    //       question.answers[answer.answer_id] = {
    //         id: answer.id,
    //         body: answer.body,
    //         date: answer.date_written,
    //         answerer_name: answer.answerer_name,
    //         helpfulness: answer.helpful
    //       };

    //       // clientObj.results.answers = answerObj;

    //     });

    //   });

    // });

    res.send(clientObj);

  });
});

app.get('/answers/:question_id', (req, res) => {
  let params = [req.params.question_id];
  connection.APJOIN(params, (err, results) => {
    if (err) {
      res.sendStatus(404);
      return;
    }
    // console.log(results);
    res.send(results);

  });

  // connection.getAnswers(params, (err, answers) => {
  //   if (err) {
  //     res.sendStatus(404);
  //     return;
  //   }
  //   var clientObj = {
  //     question: params[0],
  //     results: []
  //   };

  //   answers.rows.forEach(row => {
  //     var result = {
  //       answer_id: row.id,
  //       body: row.body,
  //       date: row.date_written,
  //       answerer_name: row.answerer_name,
  //       helpfulness: row.helpful
  //     };
  //     clientObj.results.push(result);
  //   });
  //   res.send(clientObj);

  // });

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
