import React, {PropTypes} from 'react';
import Card from './Card';
import UnknownCard from './UnknownCard';

const HandCard = ({card, viewCard}) => {
  return (
    <div className="hand-element">
      {card.name && <Card card={card} viewCard={viewCard} />}
      {!card.name && <UnknownCard />}
    </div>
  );
};

HandCard.propTypes = {
  card: PropTypes.object.isRequired,
  viewCard: PropTypes.func
};

export default HandCard;
