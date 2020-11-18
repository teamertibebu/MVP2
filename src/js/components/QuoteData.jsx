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
    <div
      style={{
        padding: '10px',
        paddingTop: '0px',
        border: '2px solid lightgrey',
        boxShadow: '2px 0 0px 3px lightgrey',
        borderRadius: '6px',
        backgroundColor: '#212738',
        color: 'whitesmoke',
        fontSize: '18px',
        width: '80%',
        marginLeft: '0',
      }}
    >
      <h3>{data.character.firstname + ' ' + data.character.lastname}</h3>
      <p>{data.content}</p>
      {showSaveButton ? (
        <button
          onClick={saveQuote.bind(this, data)}
          style={{
            backgroundColor: '#ff6542',
            fontSize: '20px',
            position: 'relative',
            // left: '35%',
            // top: '25px',
            borderRadius: '0.25em',
            cursor: 'pointer',
          }}
        >
          Save Quote
        </button>
      ) : null}
      {showButton === true ? (
        <button
          onClick={showAllFaves.bind(this)}
          style={{
            backgroundColor: '#ff6542',
            fontSize: '20px',
            position: 'relative',
            // left: '35%',
            // top: '25px',
            borderRadius: '0.25em',
            cursor: 'pointer',
          }}
        >
          Show All Faves
        </button>
      ) : null}
    </div>
  );
};

export default QuoteData;
