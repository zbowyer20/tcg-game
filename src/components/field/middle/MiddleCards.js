import React, {PropTypes} from 'react';
import ForwardZone from './ForwardZone';
import BackupZone from './BackupZone';

const MiddleCards = ({forwardCards, backupCards}) => {
  return (
    <div className="field__middle">
      <ForwardZone cards={forwardCards} />
      <BackupZone cards={backupCards} />
    </div>
  );
};

MiddleCards.propTypes = {
  forwardCards: PropTypes.array.isRequired,
  backupCards: PropTypes.array.isRequired
};

export default MiddleCards;
