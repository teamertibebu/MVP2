const mongoose = require('mongoose');

const DATABASE = 'favQuotes';
const DB_URI = `mongodb://localhost:27017/${DATABASE}`;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Failed to connect to database', err));
const db = mongoose.connection;

const favQuotesSchema = mongoose.Schema({
  _id: String,
  quote: String,
  character: String,
});

const Quote = mongoose.model('repos', repoSchema, 'repos');

const saveQuote = (quote) => {
  console.log('saveQuote', quote);
};
