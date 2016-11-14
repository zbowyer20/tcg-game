import React, {PropTypes} from 'react';
import DeckCard from '../../common/DeckCard';

const DeckZone = ({player, height, drawCard}) => {
  return (
    <div className="deckZone" onClick={drawCard.bind(this, player)}>
      {height > 0 && <DeckCard/>}
    </div>
  );
};

DeckZone.propTypes = {
  player: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  drawCard: PropTypes.func.isRequired
};

export default DeckZone;
