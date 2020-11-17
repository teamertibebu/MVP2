const express = require('express');
const $ = require('jquery');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { apiKey } = require('./config');
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {});
app.post('/', (req, res) => {
  const query = req.body.showTitle;
  const URL = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC7kvwZKyLjxGDmexve29WSaybKEPc42gg&type=video&part=snippet&maxResults=10&q=${query}`;

  axios
    .get(URL)
    .then((response) => {
      console.log(response);
      res.send(response.data.items);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8080, () => {
  console.log('Connected to Port 8080.');
});
