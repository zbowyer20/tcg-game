import React, {PropTypes} from 'react';

const Card = ({card}) => {
  return (
    <div>
      <img className="card" src={card.src} />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
