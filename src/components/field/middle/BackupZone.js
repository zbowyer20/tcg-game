import React, {PropTypes} from 'react';
import Card from '../../common/Card';

const BackupZone = ({cards}) => {
  return (
    <div className="backupZone">
      {cards.map(card =>
        <Card key={card.id} card={card} />
      )}
    </div>
  );
};

BackupZone.propTypes = {
  cards: PropTypes.array.isRequired
};

export default BackupZone;
