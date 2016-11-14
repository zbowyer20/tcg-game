import React, {PropTypes} from 'react';
import DeckZone from './DeckZone';
import BreakZone from './BreakZone';

const RightCards = ({player, deckHeight, breakCards, drawCard, viewCard}) => {
  return (
    <div className="field__right">
      <DeckZone player={player} height={deckHeight} drawCard={drawCard} />
      <BreakZone cards={breakCards} viewCard={viewCard}/>
    </div>
  );
};

RightCards.propTypes = {
  player: PropTypes.object.isRequired,
  deckHeight: PropTypes.number.isRequired,
  breakCards: PropTypes.array.isRequired,
  drawCard: PropTypes.func.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default RightCards;
