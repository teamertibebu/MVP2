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
                  marginBottom: '-5px',
                  color: 'floralwhite',
                  position: 'relative',
                  left: '30px',
                  cursor: 'pointer',
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
                  backgroundColor: '#212738',
                  color: 'whitesmoke',
                  fontSize: '18px',
                  width: '50%',
                }}
              >
                {`${fave.quote}`}
                <div>
                  <button
                    onClick={deleteFromFaves.bind(this, fave)}
                    style={{
                      backgroundColor: '#ff6542',
                      fontSize: '20px',
                      position: 'relative',
                      left: '35%',
                      top: '25px',
                      borderRadius: '0.25em',
                      cursor: 'pointer',
                    }}
                  >
                    Delete From Faves
                  </button>
                </div>
              </li>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

module.exports.FaveQuotesList = FaveQuotesList;
