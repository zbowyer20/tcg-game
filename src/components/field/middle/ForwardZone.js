import React, {PropTypes} from 'react';
import Card from '../../common/Card';

const ForwardZone = ({cards}) => {
  return (
    <div className="forwardZone">
      {cards.map(card =>
        <Card key={card.id} card={card} />
      )}
    </div>
  );
};

ForwardZone.propTypes = {
  cards: PropTypes.array.isRequired
};

export default ForwardZone;
