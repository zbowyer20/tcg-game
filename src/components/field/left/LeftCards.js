import React, {PropTypes} from 'react';
import DamageZone from './DamageZone';

const LeftCards = ({damageCards, viewCard}) => {
  return (
    <div className="field__left">
      <DamageZone cards={damageCards} viewCard={viewCard} />
    </div>
  );
};

LeftCards.propTypes = {
  damageCards: PropTypes.array.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default LeftCards;
