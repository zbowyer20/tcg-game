import React from 'react';

const DeckCard = () => {
  return (
    <div>
      <img className="card card__deck" src={require('../../images/cardBack.jpg')} />
    </div>
  );
};

export default DeckCard;
