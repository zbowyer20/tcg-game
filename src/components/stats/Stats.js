import React, {PropTypes} from 'react';
import Stat from './Stat';

const Stats = ({players}) => {
  return (
    <div className="stats">
      <Stat label="Your CP" value={players.PLAYER_ONE.cp + ""} />
    </div>
  );
};

Stats.propTypes = {
  players: PropTypes.object.isRequired,
};

export default Stats;
