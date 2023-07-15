import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

const config = {
  env: {
    port: Number(env.PORT) || 3000,
  },
  db: {
    databaseLogs: env.DATABASE_LOGS === 'true',
  },
};

export default config;
