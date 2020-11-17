import { render } from 'react-dom';

const React = require('react');

const RandomQuote = ({ randomQuote, saveQuote }) => {
  const data = randomQuote.data;
  if (!data) {
    return <div></div>;
  }
  return (
    <div>
      <h3>{data.character.firstname + ' ' + data.character.lastname}</h3>
      <p>{data.content}</p>
      <button onClick={saveQuote(data)}>Save Quote</button>
    </div>
  );
};

export default RandomQuote;
