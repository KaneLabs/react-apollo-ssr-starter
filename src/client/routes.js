import React from 'react';

import { Route } from 'react-router-dom';

import Nav from './components/Nav';

import App from './components/App';

import Books from './components/Books';
import Auth from './components/Auth';
import Profile from './components/Profile';


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
