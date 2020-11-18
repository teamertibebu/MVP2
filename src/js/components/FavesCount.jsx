import React from 'react';

const FavesCount = ({ count }) => {
  return (
    <div>
      {count === 1 ? (
        <h1>You Have {count} Fave</h1>
      ) : (
        <h1>You Have {count} Faves</h1>
      )}
    </div>
  );
};

export default FavesCount;
