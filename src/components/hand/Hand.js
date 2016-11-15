import React, {PropTypes} from 'react';
import Card from '../card/Card';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Hand = ({cards, viewCard}) => {
  return (
    <div className="hand">
      <ReactCSSTransitionGroup transitionName="handUpdate"
          transitionEnterTimeout = {200}
          transitionLeaveTimeout = {200} >
        {cards.map(card =>
          <Card key={card.id} card={card} viewCard={viewCard} />
        )}
      </ReactCSSTransitionGroup>
    </div>
  );
};

Hand.propTypes = {
  cards: PropTypes.array.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default Hand;
