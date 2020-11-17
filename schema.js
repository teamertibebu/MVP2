const mongoose = require('mongoose');
const { promisify } = require('util');
const { call } = require('when/node');

const DATABASE = 'favQuotes';
const DB_URI = `mongodb://localhost:27017/${DATABASE}`;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Failed to connect to database', err));
const db = mongoose.connections;
// console.log(db);
const favQuotesSchema = mongoose.Schema({
  _id: String,
  quote: String,
  character: String,
  charId: String,
});

const Quote = mongoose.model('quotes', favQuotesSchema, 'quotes');

let saveQuote = (quote, callback) => {
  Quote.count({ _id: quote._id }, (err, count) => {
    if (err) {
      return callback(err);
    }
    if (count === 0) {
      const newQuote = new Quote({
        _id: quote._id,
        quote: quote.content,
        character: `${quote.character.firstname} ${quote.character.lastname}`,
        charId: quote.character._id,
      });
      Quote.create(newQuote, (err, quote) => {
        if (err) {
          return callback(err);
        }
        callback(null, quote);
      });
    }
  });
};

let getFaves = (cb) => {
  return Quote.find()
    .then((quotes) => {
      return cb(null, quotes);
    })
    .catch((err) => {
      return cb(err);
    });
};

saveQuote = promisify(saveQuote);
getFaves = promisify(getFaves);

module.exports = {
  saveQuote,
  getFaves,
};
