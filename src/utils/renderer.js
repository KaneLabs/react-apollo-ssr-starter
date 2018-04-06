import React from 'react';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

import { API_URL } from './index.js';

import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

import { Helmet } from 'react-helmet';


import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from 'material-ui-next/styles';
import { green, red } from 'material-ui-next/colors';

import theme from './themes';

import routes from '../client/routes';

const renderer =  async (req) => {
  const link = createHttpLink({
    uri: `${API_URL}/graphql`,
    fetch: fetch,
    credentials: 'same-origin',
    headers: {
      cookie: req.header('Cookie'),
    }
  });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    ssrMode: true,
    link,
    cache,
  });

    // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  const generateClassName = createGenerateClassName();

  const content = await renderToStringWithData(
    <ApolloProvider client={client}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <StaticRouter location={req.path} context={{}}>
            {renderRoutes(routes)}
          </StaticRouter>
        </MuiThemeProvider>
      </JssProvider>
    </ApolloProvider>
  );

  const css = sheetsRegistry.toString()

  const helmet = Helmet.renderStatic()

  const html = `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
        <link href="/app.css" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
        <style id="jss-server-side">${css}</style>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id='root'>${content}</div>
        <script>
          window.__APOLLO_STATE__ = ${serialize(client.extract())};
        </script>

        <script src='/bundle.js'></script>
      </body>
    </html>
  `;

  return html;
}

export default renderer;
