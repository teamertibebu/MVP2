const React = require('react');

const QuoteData = ({
  randomQuote,
  saveQuote,
  showButton,
  showAllFaves,
  showSaveButton,
}) => {
  const data = randomQuote.data;
  if (!data) {
    return <div></div>;
  }
  return (
    <div>
      <h3>{data.character.firstname + ' ' + data.character.lastname}</h3>
      <p>{data.content}</p>
      {showSaveButton ? (
        <button onClick={saveQuote.bind(this, data)}>Save Quote</button>
      ) : null}
      {showButton === true ? (
        <button onClick={showAllFaves.bind(this)}>Show All Faves</button>
      ) : null}
    </div>
  );
};

export default QuoteData;
