import React, {PropTypes} from 'react';
import DeckCard from '../../common/DeckCard';

const DeckZone = ({height, drawCard}) => {
  return (
    <div className="deckZone" onClick={drawCard}>
      {height > 0 && <DeckCard/>}
    </div>
  );
};

DeckZone.propTypes = {
  height: PropTypes.number.isRequired,
  drawCard: PropTypes.func.isRequired
};

export default DeckZone;
