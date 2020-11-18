const React = require('react');

const FaveQuotesList = ({
  faves,
  showByUser,
  deleteFromFaves,
  character,
  count,
}) => {
  return (
    <div className="faves">
      <h4>All Time Faves{character.length > 0 ? ` - ${character}` : ''}</h4>
      <ol>
        {faves.map((fave, i) => {
          return (
            <div key={i + fave.character}>
              <h1
                onClick={showByUser.bind(this, fave)}
                style={{ marginBottom: '-10px', color: 'firebrick' }}
              >
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
              >
                {`${fave.quote}`}
              </li>
              <button
                onClick={deleteFromFaves.bind(this, fave)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'firebrick',
                  borderRadius: '4px',
                  marginTop: '9px',
                  float: 'right',
                }}
              >
                Delete From Faves
              </button>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

module.exports.FaveQuotesList = FaveQuotesList;
