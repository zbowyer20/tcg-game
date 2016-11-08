import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fieldActions from '../../actions/fieldActions';
import LeftCards from './left/LeftCards';
import MiddleCards from './middle/MiddleCards';
import RightCards from './right/RightCards';

class FieldPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <LeftCards damageCards={this.props.field.damage}/>
        <MiddleCards forwardCards={this.props.field.forward} backupCards={this.props.field.backup} />
        <RightCards deckHeight={this.props.field.deck} breakCards={this.props.field.break} />
      </div>
    );
  }
}

FieldPage.propTypes = {
  field: PropTypes.object.isRequired,
};

// ownProps is a reference to the component's own properties
function mapStateToProps(state) {
  // lets us access courses using props.courses
  return {
    field: state.field
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
export default connectedStateAndProps(FieldPage);
