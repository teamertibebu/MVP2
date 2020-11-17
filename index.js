const express = require('express');
const $ = require('jquery');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { apiKey } = require('./config');
const { saveQuote, getFaves, showByUser, deleteQuote } = require('./schema.js');
app.use(express.json());
app.use(cors());

app.delete('/delete', (req, res) => {
  const quoteObj = req.body;
  return deleteQuote(quoteObj)
    .then((remainingQuotes) => {
      res.send(remainingQuotes);
    })
    .catch((err) => {
      console.log('Error Deleting Quote');
      res.send();
    });
});
app.post('/showByUser', (req, res) => {
  showByUser(req.body.user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/save', (req, res) => {
  const quoteObj = req.body.data;
  const showButtonBool = req.body.showButton;

  saveQuote(quoteObj).then(() => {
    if (!showButtonBool) {
      return getFaves((err, quotes) => {
        if (err) {
          res.send();
        } else {
          res.send(quotes);
        }
      });
    }
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
