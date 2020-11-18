const React = require('react');

const FaveQuotesList = ({
  faves,
  showByUser,
  deleteFromFaves,
  character,
  count,
}) => {
  return (
    <div>
      <h4>All Time Faves{character.length > 0 ? ` - ${character}` : ''}</h4>
      <ol
        style={{
          position: 'inline-block',
        }}
      >
        {faves.map((fave, i) => {
          return (
            <div key={i + fave.character}>
              <h1
                onClick={showByUser.bind(this, fave)}
                style={{
                  marginBottom: '-10px',
                  color: 'floralwhite',
                }}
              >
                {fave.character}
              </h1>
              <li
                className="fave"
                style={{
                  padding: '10px',
                  border: '2px solid lightgrey',
                  boxShadow: '2px 0 0px 3px lightgrey',
                  borderRadius: '6px',
                  backgroundColor: 'gold',
                  fontStyle: 'oblique',
                  fontSize: '14px',
                  width: '50%',
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
