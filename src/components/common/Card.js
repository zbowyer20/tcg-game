import React, {PropTypes} from 'react';

const Card = ({card, viewCard}) => {
  console.log(viewCard);
  return (
    <div className="card" onClick={viewCard.bind(this, card)}>
      <img src={card.src} />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default Card;
