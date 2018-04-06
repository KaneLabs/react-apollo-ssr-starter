import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { renderRoutes } from 'react-router-config';


import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { MuiThemeProvider } from 'material-ui-next/styles';

import theme from '../utils/themes';

import routes from './routes';

import { API_URL } from '../utils';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink({ uri: `${API_URL}/graphql` }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </MuiThemeProvider>
  </ApolloProvider>
)

export default ReactDOM.hydrate(<App />, document.querySelector('#root'));
