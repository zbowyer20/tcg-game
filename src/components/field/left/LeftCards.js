import React, {PropTypes} from 'react';
import DamageZone from './DamageZone';

const LeftCards = ({damageCards}) => {
  return (
    <div className="field__left">
      <DamageZone cards={damageCards} />
    </div>
  );
};

LeftCards.propTypes = {
  damageCards: PropTypes.array.isRequired
};

export default LeftCards;
