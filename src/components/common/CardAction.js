import React, {PropTypes} from 'react';

const CardAction = ({card, playCard}) => {
  return (
    <div onClick={playCard.bind(this, card)}>
      <span className="card_cta">Play Card</span>
    </div>
  );
};

CardAction.propTypes = {
  card: PropTypes.object.isRequired,
  playCard: PropTypes.func.isRequired
};

export default CardAction;
