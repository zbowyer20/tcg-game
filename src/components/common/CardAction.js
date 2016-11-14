import React, {PropTypes} from 'react';

const CardAction = ({player, card, action}) => {
  return (
    <div className="card_cta" onClick={action.action.bind(this, player, card)}>
      <span>{action.name}</span>
    </div>
  );
};

CardAction.propTypes = {
  player: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired
};

export default CardAction;
