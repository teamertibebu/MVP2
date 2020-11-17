const express = require('express');
const $ = require('jquery');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { apiKey } = require('./config');
app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {});

app.post('/save', (req, res) => {
  console.log(req.body, '_________________________');
});
app.post('/', (req, res) => {
  const URL = 'https://officeapi.dev/api/quotes/random';

  axios
    .get(URL)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8080, () => {
  console.log('Connected to Port 8080.');
});
