import React, {PropTypes} from 'react';
import DeckCard from '../../card/DeckCard';

const DeckZone = ({player, height, drawCard}) => {
  function handleDrawCard(player) {
    if (drawCard) {
      drawCard(player);
    }
  }

  return (
    <div className="deckZone" onClick={handleDrawCard.bind(this, player)}>
      {height > 0 && <DeckCard/>}
    </div>
  );
};

DeckZone.propTypes = {
  player: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  drawCard: PropTypes.func
};

export default DeckZone;
