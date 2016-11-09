import React, {PropTypes} from 'react';
import Card from '../../common/Card';

const DamageZone = ({cards, viewCard}) => {
  return (
    <div className="damageZone">
      {cards.map(card =>
        <Card key={card.id} card={card} viewCard={viewCard} />
      )}
    </div>
  );
};

DamageZone.propTypes = {
  cards: PropTypes.array.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default DamageZone;
