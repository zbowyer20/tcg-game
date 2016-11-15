import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fieldActions from '../../actions/fieldActions';
import * as gameActions from '../../actions/gameActions';
import * as cardActions from '../../actions/cardActions';
import FieldPage from '../field/FieldPage';
import Hand from '../hand/Hand';
import ActiveCard from '../common/ActiveCard';
import Stats from '../stats/Stats';

class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      field: Object.assign({}, this.props.field),
      players: Object.assign({}, this.props.players),
      game: Object.assign({}, this.props.game)
    };

    this.drawCard = this.drawCard.bind(this);
    this.viewCard = this.viewCard.bind(this);
    this.closeCard = this.closeCard.bind(this);
    this.playCard = this.playCard.bind(this);
    this.discardCard = this.discardCard.bind(this);
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

  discardCard() {
    this.props.actions.discardCard();
  }

  render() {
    return (
      <div>
        <Stats players={this.props.players} />
        <FieldPage field={this.props.field.PLAYER_ONE} player={this.props.players.PLAYER_ONE} drawCard={this.props.actions.drawCard} viewCard={this.props.actions.viewCard}/>
        <Hand cards={this.props.players.PLAYER_ONE.hand} viewCard={this.props.actions.viewCard} />
        {this.props.game.viewingCard && <ActiveCard player={this.props.players.PLAYER_ONE} card={this.props.game.viewingCard} hand={this.props.players.PLAYER_ONE.hand} closeCard={this.props.actions.closeCard} playCard={this.props.actions.playCard} discardCard={this.props.actions.discardCard} />}
      </div>
    );
  }
}

GamePage.propTypes = {
  field: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

// ownProps is a reference to the component's own properties
function mapStateToProps(state) {
  // lets us access courses using props.courses
  return {
    field: state.field,
    players: state.players,
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
