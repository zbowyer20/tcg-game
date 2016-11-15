import React, {PropTypes} from 'react';
import Card from '../../card/Card';

const ForwardZone = ({cards, viewCard}) => {
  return (
    <div className="forwardZone">
      {cards.map(card =>
        <Card key={card.id} card={card} viewCard={viewCard} />
      )}
    </div>
  );
};

ForwardZone.propTypes = {
  cards: PropTypes.array.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default ForwardZone;
