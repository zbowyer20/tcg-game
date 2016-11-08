import React, {PropTypes} from 'react';

const DeckZone = ({height}) => {
  return (
    <div className="deckZone">
      {height}
    </div>
  );
};

DeckZone.propTypes = {
  height: PropTypes.number.isRequired
};

export default DeckZone;
