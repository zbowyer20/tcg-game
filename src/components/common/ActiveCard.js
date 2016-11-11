import React, {PropTypes} from 'react';
import Veil from './Veil';
import CardActions from './CardActions';

const ActiveCard = ({card, hand, closeCard, playCard}) => {
  return (
    <div className="active-view">
      <Veil onClick={closeCard}/>
      <div className="card__active">
        <img src={card.src} />
        <CardActions card={card} hand={hand} playCard={playCard}/>
      </div>
    </div>
  );
};

ActiveCard.propTypes = {
  card: PropTypes.object.isRequired,
  hand: PropTypes.array.isRequired,
  closeCard: PropTypes.func.isRequired,
  playCard: PropTypes.func.isRequired
};

export default ActiveCard;
