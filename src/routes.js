import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import GamePage from './components/game/GamePage';
//import AboutPage from './components/about/AboutPage';
//import CoursesPage from './components/course/CoursesPage';
//import ManageCoursePage from './components/course/ManageCoursePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GamePage} />
  </Route>
);
