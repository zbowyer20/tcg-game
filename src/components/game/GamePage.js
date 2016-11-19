import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fieldActions from '../../actions/fieldActions';
import * as gameActions from '../../actions/gameActions';
import * as cardActions from '../../actions/cardActions';
import FieldPage from '../field/FieldPage';
import Hand from '../hand/Hand';
import ActiveCard from '../card/ActiveCard';
import Stats from '../stats/Stats';

class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let field = this.props.field,
        players = this.props.players,
        actions = this.props.actions,
        settings = this.props.settings,
        me = this.props.settings.me,
        opponent = this.props.settings.opponent;

    return (
      <div>
        <Stats me={players[me]} opponent={players[opponent]} />
        <div className="opponent">
          <FieldPage field={field[opponent]} player={players[opponent]} viewCard={actions.viewCard} />
          <Hand cards={players[opponent].hand} />
        </div>
        <FieldPage field={field[me]} player={players[me]} drawCard={actions.drawCard} viewCard={actions.viewCard}/>
        <Hand cards={players[me].hand} viewCard={actions.viewCard} />
        {settings.viewingCard &&
          <ActiveCard player={players[me]} card={settings.viewingCard} hand={players[me].hand} closeCard={actions.closeCard}
            playCard={actions.playCard} discardCard={actions.discardCard}
          />
        }
      </div>
    );
  }
}

GamePage.propTypes = {
  field: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

// ownProps is a reference to the component's own properties
function mapStateToProps(state) {
  // lets us access courses using props.courses
  return {
    field: state.field,
    players: state.players,
    settings: state.settings,
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
