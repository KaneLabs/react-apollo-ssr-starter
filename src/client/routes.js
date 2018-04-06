import React from 'react';

import { Route } from 'react-router-dom';

import Nav from './components/Nav';

import App from './components/App';

import Auth from './components/Auth';
import Profile from './components/Profile';

import LandingPage from './components/LandingPage';


const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        component: LandingPage,
        exact: true,
      },
      {
        path: '/auth',
        component: Auth,
      },
      {
        path: '/:name',
        component: Profile,
      },
    ],
  },
];

export default routes;
