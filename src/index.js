import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadField} from './actions/fieldActions';
import {loadHand} from './actions/gameActions';
import './styles/styles.scss';
//import {loadCourses} from './actions/courseActions';
//import {loadAuthors} from './actions/authorActions';

const store = configureStore();
store.dispatch(loadField());
store.dispatch(loadHand());
//store.dispatch(loadAuthors());

render(
  // wrap entire application so it can be connected to the store
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
