import React, {PropTypes} from 'react';
import Card from '../../common/Card';

const DamageZone = ({cards}) => {
  return (
    <div className="damageZone">
      {cards.map(card =>
        <Card key={card.id} card={card} />
      )}
    </div>
  );
};

DamageZone.propTypes = {
  cards: PropTypes.array.isRequired
};

export default DamageZone;
