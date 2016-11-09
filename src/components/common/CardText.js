import React, {PropTypes} from 'react';

const CardText = ({card}) => {
  return (
    <div>
      <span>{card.name}</span>
      <span>{card.element} - {card.cost} - {card.type}</span>
    </div>
  );
};

CardText.propTypes = {
  card: PropTypes.object.isRequired
};

export default CardText;
