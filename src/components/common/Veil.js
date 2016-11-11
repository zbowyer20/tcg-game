import React, {PropTypes} from 'react';

const Veil = ({onClick}) => {
  return (
    <div className="veil" onClick={onClick} />
  );
};

Veil.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Veil;
