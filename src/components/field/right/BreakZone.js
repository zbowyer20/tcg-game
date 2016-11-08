import React, {PropTypes} from 'react';
import Card from '../../common/Card';

const BreakZone = ({cards}) => {
  return (
    <div className="breakZone">
      {cards.map(card =>
        <Card key={card.id} card={card} />
      )}
    </div>
  );
};

BreakZone.propTypes = {
  cards: PropTypes.array.isRequired
};

export default BreakZone;
