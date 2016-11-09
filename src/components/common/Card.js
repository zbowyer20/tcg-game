import React, {PropTypes} from 'react';

const Card = ({card}) => {
  return (
    <div className="card">
      <img src={card.src} />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
