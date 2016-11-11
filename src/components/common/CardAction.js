import React, {PropTypes} from 'react';

const CardAction = ({card, playCard}) => {
  return (
    <div className="card_cta" onClick={playCard.bind(this, card)}>
      <span>Play Card</span>
    </div>
  );
};

CardAction.propTypes = {
  card: PropTypes.object.isRequired,
  playCard: PropTypes.func.isRequired
};

export default CardAction;
