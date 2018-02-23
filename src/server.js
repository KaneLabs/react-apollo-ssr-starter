import sslRedirect from 'heroku-ssl-redirect';
import express from 'express';
import { matchRoutes } from 'react-router-config';

import favicon from 'serve-favicon';

import routes from './client/routes';
import renderer from './utils/renderer';

import { API_URL } from './utils';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(sslRedirect(['production'], 301));
}

app.use(express.static('public'));

app.get('*', async (req, res) => {
  const html = await renderer(req);

  res.send(html);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('listening on', port));
