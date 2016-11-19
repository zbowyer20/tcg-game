import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HandCard from '../card/HandCard';

const Hand = ({cards, viewCard}) => {
  return (
    <div className="hand">
      <ReactCSSTransitionGroup transitionName="handUpdate"
          transitionEnterTimeout = {200}
          transitionLeaveTimeout = {200} >
        {cards.map(card =>
          <HandCard key={card.id} card={card} viewCard={viewCard} />
        )}
      </ReactCSSTransitionGroup>
    </div>
  );
};

Hand.propTypes = {
  cards: PropTypes.array.isRequired,
  viewCard: PropTypes.func
};

export default Hand;
