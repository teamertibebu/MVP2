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
  charId: String,
});

const Quote = mongoose.model('quotes', favQuotesSchema, 'quotes');

const saveQuote = (quote) => {
  Quote.count({ _id: quote._id }, (err, count) => {
    console.log(count, '!!!!!');
    if (err) {
      console.log(err);
      return;
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
          console.log(err);
          return;
        }
        return quote;
      });
    }
  });
};

module.exports.saveQuote = saveQuote;
