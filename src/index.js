import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.scss';
import initSocket from './socket';
//import {loadCourses} from './actions/courseActions';
//import {loadAuthors} from './actions/authorActions';

const store = configureStore();

let socket = initSocket(store);

render(
  // wrap entire application so it can be connected to the store
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
