import next from 'next';
import express from 'express';

import config from '@config';
import routes from '@routes';
import errorHandler from '@middleware/errorHandler';

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

    server.use(express.json());

    server.use(routes);

    server.use(errorHandler);

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, () => {
      try {
        console.log('Projects Manager running on port ', port);
      } catch (e) {
        throw e;
      }
    });
  } catch (e) {
    if (e instanceof Error) {
      // TODO: replace with logger
      console.error(
        `Error during Projects Manager initialization, e.stack: ${e.stack}`,
      );
    }

    process.exit(1);
  }
};

init();
