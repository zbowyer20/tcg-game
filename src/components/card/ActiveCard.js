import React, {PropTypes} from 'react';
import Veil from '../common/Veil';
import CardActions from './CardActions';

const ActiveCard = ({player, card, hand, closeCard, playCard}) => {
  return (
    <div className="active-view">
      <Veil onClick={closeCard}/>
      <div className="card__active">
        <img src={card.src} />
        <CardActions player={player} card={card} hand={hand} playCard={playCard}/>
      </div>
    </div>
  );
};

ActiveCard.propTypes = {
  player: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  hand: PropTypes.array.isRequired,
  closeCard: PropTypes.func.isRequired,
  playCard: PropTypes.func.isRequired
};

export default ActiveCard;
