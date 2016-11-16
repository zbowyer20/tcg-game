// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
//import Header from './common/Header';
import {connect} from 'react-redux';
import io from 'socket.io-client';

let socket = io('http://localhost:3535');

class App extends React.Component {
  componentDidMount() {
    socket.on('init', function(data) {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  //loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
