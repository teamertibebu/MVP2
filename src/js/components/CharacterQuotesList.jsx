const React = require('react');

const CharacterQuotesList = ({ charQuotes, showByUser }) => {
  console.log(charQuotes);
  return (
    <div>
      <h4>By: Who?</h4>
      <ol>
        {charQuotes.map((quote, i) => {
          return (
            <div key={i + quote.character.firstname}>
              <h1
                onClick={showByUser.bind(this, quote)}
                style={{ marginBottom: '-10px', color: 'firebrick' }}
              >
                {quote.character.firstname + ' ' + quote.character.lastname}
              </h1>
              <li
                style={{
                  padding: '10px',
                  border: '3px solid lightgrey',
                  boxShadow: '5px 4px lightgrey',
                  borderRadius: '8px',
                }}
              >
                {`${quote.content}`}
              </li>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

export default CharacterQuotesList;
