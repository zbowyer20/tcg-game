import React, {PropTypes} from 'react';

const Card = ({card}) => {
  return (
    <div>
      {card.name}
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired
};

export default Card;
