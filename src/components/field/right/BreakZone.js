import React, {PropTypes} from 'react';
import Card from '../../card/Card';

const BreakZone = ({cards, viewCard}) => {
  return (
    <div className="breakZone">
      {cards.map(card =>
        <Card key={card.id} card={card} viewCard={viewCard} />
      )}
    </div>
  );
};

BreakZone.propTypes = {
  cards: PropTypes.array.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default BreakZone;
