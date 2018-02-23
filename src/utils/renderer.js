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

  const content = await renderToStringWithData(
    <ApolloProvider client={client}>
      <StaticRouter location={req.path} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </ApolloProvider>
  );

  const helmet = Helmet.renderStatic()

  const html = `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
        <link href="/app.css" rel="stylesheet">
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
