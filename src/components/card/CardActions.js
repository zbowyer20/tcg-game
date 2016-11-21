import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CardAction from './CardAction';
import * as cardActions from '../../actions/cardActions';
import * as terms from '../../constants/gameConstants';

class CardActions extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.play = this.play.bind(this);
  }

  inHand(card) {
    return this.props.hand.includes(card);
  }

  hasCP(player, card) {
    return player.cp.amount >= card.cost;
  }

  hasCPElement(player, card) {
    return player.cp.elements.indexOf(card.element) > -1;
  }

  hasCPRequirement(player, card){
    return this.hasCP(player, card) && this.hasCPElement(player, card);
  }

  playable(player, card) {
    return this.inHand(card) && this.hasCPRequirement(player, card) && this.hasCPElement(player, card);
  }

  play() {
    return {
      name: 'Play',
      action: this.props.actions.playCard
    };
  }

  active(card) {
    return card.position == terms.ACTIVE_STATE;
  }

  dull() {
    return {
      name: 'Dull',
      action: this.props.actions.dullCard
    };
  }

  discard() {
    return {
      name: 'Discard',
      action: this.props.actions.discardCard
    };
  }

  render() {
    return (
      <div className="cardActions">
        {this.playable(this.props.player,this.props.card) && <CardAction player={this.props.player} card={this.props.card} action={this.play()} />}
        {this.active(this.props.card) && <CardAction player={this.props.player} card={this.props.card} action={this.dull()} />}
        {this.inHand(this.props.card) && <CardAction player={this.props.player} card={this.props.card} action={this.discard()} />}
      </div>
    );
  }
}

CardActions.propTypes = {
  player: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  hand: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// ownProps is a reference to the component's own properties
function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse is a function taking one parameter, course
    actions: bindActionCreators(cardActions, dispatch)
  };
}

// connect allows components to communicate with redux
// that makes this a container component
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(CardActions);
