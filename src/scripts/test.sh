#!/bin/bash
npm run lint
npx tsc
docker-compose up -d
# TODO: replace with wait-for-it.sh or move db init to docker-compose
sleep 2
npx prisma migrate dev
npx prisma db seed
jest --maxWorkers=50% $1
docker-compose down
docker volume prune -f
docker image prune -f
