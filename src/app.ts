import next from 'next';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, dir: './src/frontend' });

export default app;
