const express = require('express');
const $ = require('jquery');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { apiKey } = require('./config');
const { saveQuote, getFaves } = require('./schema.js');
app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {});

app.post('/save', (req, res) => {
  const quoteObj = req.body.data;
  saveQuote(quoteObj).then(() => {
    return getFaves((err, quotes) => {
      if (err) {
        res.send();
      } else {
        res.send(quotes);
      }
    });
  });
});
app.post('/', (req, res) => {
  const URL = 'https://officeapi.dev/api/quotes/random';

  axios
    .get(URL)
    .then((response) => {
      getFaves()
        .then((data) => {
          response.data['faves'] = data;
          res.send(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8080, () => {
  console.log('Connected to Port 8080.');
});
