#!/bin/bash
npm run lint
npx tsc
docker-compose up -d
# TODO: replace with wait-for-it.sh or move db init to docker-compose
sleep 2
npx prisma migrate dev
jest --maxWorkers=1 --collectCoverage --silent $1
docker-compose down
docker volume prune -f
docker image prune -f
