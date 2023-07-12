import next from 'next';
import express from 'express';

import config from './backend/config';
import routes from './backend/routes';

const init = async () => {
  try {
    const dev = process.env.NODE_ENV !== 'production';

    const app = next({ dev, dir: './src/frontend' });

    const handle = app.getRequestHandler();

    const server = express();

    const {
      env: { port },
    } = config;

    await app.prepare();

    server.use(routes);

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, () => {
      try {
        console.log('Projects Manager running on port ', port);
      } catch (e) {
        throw e;
      }
    });
  } catch (e) {
    const err = JSON.stringify(e, null, 2);

    console.error('Error during Projects Manager initialization ', err);

    process.exit(1);
  }
};

init();
