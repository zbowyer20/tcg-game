import React, {PropTypes} from 'react';
import DeckCard from '../../common/DeckCard';

const DeckZone = ({height}) => {
  return (
    <div className="deckZone">
      {height > 0 && <DeckCard />}
    </div>
  );
};

DeckZone.propTypes = {
  height: PropTypes.number.isRequired
};

export default DeckZone;
