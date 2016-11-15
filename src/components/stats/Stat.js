import React, {PropTypes} from 'react';

const Stat = ({label, value}) => {
  return (
    <div>
      <span className="stat__label">{label}: </span>
      <span className="stat__value">{value}</span>
    </div>
  );
};

Stat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Stat;
