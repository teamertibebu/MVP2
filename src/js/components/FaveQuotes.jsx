const React = require('react');

const FaveQuotesList = ({ faves, showByUser }) => {
  return (
    <div className="faves">
      <h4>All Time Faves</h4>
      <ol>
        {faves.map((fave, i) => {
          return (
            <div key={i + fave.character} onClick={showByUser.bind(this, fave)}>
              <h1 style={{ marginBottom: '-10px', color: 'firebrick' }}>
                {fave.character}
              </h1>
              <li
                className="fave"
                style={{
                  padding: '10px',
                  border: '3px solid lightgrey',
                  boxShadow: '5px 4px lightgrey',
                  borderRadius: '8px',
                }}
              >{`${fave.quote}`}</li>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

module.exports.FaveQuotesList = FaveQuotesList;
