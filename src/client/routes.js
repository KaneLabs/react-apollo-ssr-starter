import React from 'react';

import { renderRoutes } from 'react-router-config';

import { Route } from 'react-router-dom';

import Nav from './components/Nav';

import Books from './components/Books';
import Auth from './components/Auth';
import Profile from './components/Profile';

const App = ({ route }) => {
  return (
    <main id='App'>
      <Route component={Nav} />

      {renderRoutes(route.routes)}
    </main>
  );
};

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: Books,
        exact: true,
      },
      {
        path: '/auth',
        component: Auth,
      },
      {
        path: '/:id',
        component: Profile,
      },
    ],
  },
];

export default routes;
