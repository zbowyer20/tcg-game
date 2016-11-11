import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import * as cardActions from '../../actions/cardActions';

class Card extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let classNames = classnames({
      'card': true,
      'card-dull': this.props.card.position == 'Dull',
      'card-active': this.props.card.position == 'Active'
    });
    return (
      <div className={classNames} onClick={this.props.viewCard.bind(this, this.props.card)}>
        <img src={this.props.card.src} />
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  viewCard: PropTypes.func.isRequired
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
export default connectedStateAndProps(Card);
