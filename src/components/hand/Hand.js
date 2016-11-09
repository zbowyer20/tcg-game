import React, {PropTypes} from 'react';
import Card from '../common/Card';

const Hand = ({cards}) => {
  return (
    <div className="hand">
      {cards.map(card =>
        <Card key={card.id} card={card} />
      )}
    </div>
  );
};

Hand.propTypes = {
  cards: PropTypes.array.isRequired
};

export default Hand;
