import React, {PropTypes} from 'react';
import LeftCards from './left/LeftCards';
import MiddleCards from './middle/MiddleCards';
import RightCards from './right/RightCards';

class FieldPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="field">
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

export default FieldPage;
