import React, {PropTypes} from 'react';
import CardText from './CardText';

const ActiveCard = ({card}) => {
  return (
    <div className="card__active">
      <img src={card.src} />
      <CardText card={card} />
    </div>
  );
};

ActiveCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default ActiveCard;
