import React, {PropTypes} from 'react';
import CardAction from './CardAction';

const CardActions = ({card, playCard}) => {
  return (
    <div>
      <CardAction card={card} playCard={playCard} />)
    </div>
  );
};

CardActions.propTypes = {
  card: PropTypes.object.isRequired,
  playCard: PropTypes.func.isRequired
};

export default CardActions;
