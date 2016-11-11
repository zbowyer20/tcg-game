import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fieldActions from '../../actions/fieldActions';
import * as gameActions from '../../actions/gameActions';
import * as cardActions from '../../actions/cardActions';
import FieldPage from '../field/FieldPage';
import Hand from '../hand/Hand';
import ActiveCard from '../common/ActiveCard';

class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      field: Object.assign({}, this.props.field),
      hand: Object.assign({}, this.props.hand),
      game: Object.assign({}, this.props.game)
    };

    this.drawCard = this.drawCard.bind(this);
    this.viewCard = this.viewCard.bind(this);
    this.closeCard = this.closeCard.bind(this);
    this.playCard = this.playCard.bind(this);
  }

  drawCard() {
    this.props.actions.drawCard();
  }

  viewCard() {
    this.props.actions.viewCard();
  }

  closeCard() {
    this.props.actions.closeCard();
  }

  playCard() {
    this.props.actions.playCard();
  }

  render() {
    console.log(this.props.actions);
    return (
      <div>
        <FieldPage field={this.props.field} drawCard={this.props.actions.drawCard} viewCard={this.props.actions.viewCard}/>
        <Hand cards={this.props.hand} viewCard={this.props.actions.viewCard} />
        {this.props.game.viewingCard && <ActiveCard card={this.props.game.viewingCard} closeCard={this.props.actions.closeCard} playCard={this.props.actions.playCard} />}
      </div>
    );
  }
}

GamePage.propTypes = {
  field: PropTypes.object.isRequired,
  hand: PropTypes.array.isRequired,
  game: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

// ownProps is a reference to the component's own properties
function mapStateToProps(state) {
  // lets us access courses using props.courses
  return {
    field: state.field,
    hand: state.hand,
    game: state.game
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse is a function taking one parameter, course
    actions: bindActionCreators(Object.assign({}, fieldActions, gameActions, cardActions), dispatch)
  };
}

// connect allows components to communicate with redux
// that makes this a container component
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(GamePage);
