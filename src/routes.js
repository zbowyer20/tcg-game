import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import FieldPage from './components/field/FieldPage';
//import AboutPage from './components/about/AboutPage';
//import CoursesPage from './components/course/CoursesPage';
//import ManageCoursePage from './components/course/ManageCoursePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FieldPage} />
  </Route>
);
