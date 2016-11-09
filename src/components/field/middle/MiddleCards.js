import React, {PropTypes} from 'react';
import ForwardZone from './ForwardZone';
import BackupZone from './BackupZone';

const MiddleCards = ({forwardCards, backupCards, viewCard}) => {
  return (
    <div className="field__middle">
      <ForwardZone cards={forwardCards} viewCard={viewCard} />
      <BackupZone cards={backupCards} viewCard={viewCard} />
    </div>
  );
};

MiddleCards.propTypes = {
  forwardCards: PropTypes.array.isRequired,
  backupCards: PropTypes.array.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default MiddleCards;
