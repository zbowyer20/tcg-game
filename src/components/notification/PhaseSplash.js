import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
/*eslint import/namespace: ['error', { allowComputed: true }]*/
import * as gameConstants from '../../constants/gameConstants';

class PhaseSplash extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    let self = this;
    setTimeout(() => {
      self.props.actions.cleanSplash();
    }, 2500);
  }

  render() {
    return (
      <div className="splash">
        <div className="text--large">{gameConstants[this.props.type]}</div>
        {this.props.players.map(player => {
          return <span key={player.id}>{player.id} </span>;
        })}
      </div>
    );
  }
}

PhaseSplash.propTypes = {
  players: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

// ownProps is a reference to the component's own properties
function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse is a function taking one parameter, course
    actions: bindActionCreators(gameActions, dispatch)
  };
}

// connect allows components to communicate with redux
// that makes this a container component
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(PhaseSplash);
