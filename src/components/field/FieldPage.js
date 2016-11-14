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
        <LeftCards damageCards={this.props.field.damage} viewCard={this.props.viewCard}/>
        <MiddleCards forwardCards={this.props.field.forward} backupCards={this.props.field.backup} viewCard={this.props.viewCard}/>
        <RightCards player={this.props.player} deckHeight={this.props.field.deck} breakCards={this.props.field.break} drawCard={this.props.drawCard} viewCard={this.props.viewCard} />
      </div>
    );
  }
}

FieldPage.propTypes = {
  field: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  drawCard: PropTypes.func.isRequired,
  viewCard: PropTypes.func.isRequired
};

export default FieldPage;
