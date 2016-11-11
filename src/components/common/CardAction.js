import React, {PropTypes} from 'react';

const CardAction = ({card, action}) => {
  return (
    <div className="card_cta" onClick={action.action.bind(this, card)}>
      <span>{action.name}</span>
    </div>
  );
};

CardAction.propTypes = {
  card: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired
};

export default CardAction;
