import React, {PropTypes} from 'react';
import DeckZone from './DeckZone';
import BreakZone from './BreakZone';

const RightCards = ({deckHeight, breakCards, drawCard, viewCard}) => {
  return (
    <div className="field__right">
      <DeckZone height={deckHeight} drawCard={drawCard} />
      <BreakZone cards={breakCards} viewCard={viewCard}/>
    </div>
  );
};

RightCards.propTypes = {
  deckHeight: PropTypes.number.isRequired,
  breakCards: PropTypes.array.isRequired,
  drawCard: PropTypes.func.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default RightCards;
