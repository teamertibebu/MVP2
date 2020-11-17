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

let showByUser = (character, cb) => {
  return Quote.find({ character: character.character })
    .then((data) => {
      return cb(null, data);
    })
    .catch((err) => {
      return cb(err);
    });
};

let deleteQuote = (quoteObj, cb) => {
  console.log(quoteObj);
  let showButtonBool = quoteObj.showButtonBool;
  quoteObj = quoteObj.quoteObj;
  console.log(showButtonBool);
  Quote.deleteOne({ _id: quoteObj._id }, (err, success) => {
    if (err) {
      cb(err);
    } else {
      console.log('Successfully Deleted Quote');
      if (showButtonBool) {
        Quote.find({ charId: quoteObj.charId }, (err, quotes) => {
          if (err) {
            cb(err);
          } else {
            cb(null, quotes);
          }
        });
      } else {
        Quote.find({}, (err, quotes) => {
          if (err) {
            cb(err);
          } else {
            cb(null, quotes);
          }
        });
      }
    }
  });
};

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
          callback(err);
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
showByUser = promisify(showByUser);
deleteQuote = promisify(deleteQuote);

module.exports = {
  saveQuote,
  getFaves,
  showByUser,
  deleteQuote,
};
