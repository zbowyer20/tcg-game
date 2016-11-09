import React, {PropTypes} from 'react';
import Card from '../../common/Card';

const BackupZone = ({cards, viewCard}) => {
  return (
    <div className="backupZone">
      {cards.map(card =>
        <Card key={card.id} card={card} viewCard={viewCard} />
      )}
    </div>
  );
};

BackupZone.propTypes = {
  cards: PropTypes.array.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default BackupZone;
