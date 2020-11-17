const React = require('react');

const QuoteData = ({ randomQuote, saveQuote }) => {
  const data = randomQuote.data;
  if (!data) {
    return <div></div>;
  }
  return (
    <div>
      <h3>{data.character.firstname + ' ' + data.character.lastname}</h3>
      <p>{data.content}</p>
      <button onClick={saveQuote.bind(this, data)}>Save Quote</button>
    </div>
  );
};

export default QuoteData;
