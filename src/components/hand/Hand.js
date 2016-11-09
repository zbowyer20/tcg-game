import React, {PropTypes} from 'react';
import Card from '../common/Card';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Hand = ({cards}) => {
  return (
    <div className="hand">
      <ReactCSSTransitionGroup transitionName="handUpdate"
          transitionEnterTimeout = {500} >
        {cards.map(card =>
          <Card key={card.id} card={card} />
        )}
      </ReactCSSTransitionGroup>
    </div>
  );
};

Hand.propTypes = {
  cards: PropTypes.array.isRequired
};

export default Hand;
