import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fieldActions from '../../actions/fieldActions';
import FieldPage from '../field/FieldPage';
import Hand from '../hand/Hand';
import ActiveCard from '../common/ActiveCard';

class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      field: Object.assign({}, this.props.field),
      game: Object.assign({}, this.props.game)
    };

    this.drawCard = this.drawCard.bind(this);
    this.viewCard = this.viewCard.bind(this);
  }

  drawCard() {
    this.props.actions.drawCard();
  }

  viewCard() {
    this.props.actions.viewCard();
  }

  render() {
    return (
      <div>
        <FieldPage field={this.props.field} drawCard={this.props.actions.drawCard} viewCard={this.props.actions.viewCard}/>
        <Hand cards={this.props.game.hand} viewCard={this.props.actions.viewCard} />
        {this.props.game.viewingCard && <ActiveCard card={this.props.game.viewingCard} />}
      </div>
    );
  }
}

GamePage.propTypes = {
  field: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

// ownProps is a reference to the component's own properties
function mapStateToProps(state) {
  // lets us access courses using props.courses
  return {
    field: state.field,
    game: state.game,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse is a function taking one parameter, course
    actions: bindActionCreators(fieldActions, dispatch)
  };
}

// connect allows components to communicate with redux
// that makes this a container component
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(GamePage);
