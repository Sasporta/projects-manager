import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

const config = {
  env: {
    port: env.PORT || '3000',
  },
};

export default config;
