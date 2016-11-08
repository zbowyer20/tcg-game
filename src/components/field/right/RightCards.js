import React, {PropTypes} from 'react';
import DeckZone from './DeckZone';
import BreakZone from './BreakZone';

const RightCards = ({deckHeight, breakCards}) => {
  return (
    <div className="field__right">
      <DeckZone height={deckHeight} />
      <BreakZone cards={breakCards} />
    </div>
  );
};

RightCards.propTypes = {
  deckHeight: PropTypes.number.isRequired,
  breakCards: PropTypes.array.isRequired
};

export default RightCards;
