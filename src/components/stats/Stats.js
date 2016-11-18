import React, {PropTypes} from 'react';
import Stat from './Stat';

const Stats = ({me, opponent}) => {
  return (
    <div className="stats">
      <Stat label="Your CP" value={me.cp.amount + " [" + me.cp.elements.join(", ") + "]"} />
    </div>
  );
};

Stats.propTypes = {
  me: PropTypes.object.isRequired,
  opponent: PropTypes.object.isRequired
};

export default Stats;
