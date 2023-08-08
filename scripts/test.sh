#!/bin/bash
npm run lint
npx tsc
docker-compose up -d
jest --maxWorkers=1 --collectCoverage --silent $1
docker-compose down
docker volume prune -f
docker image prune -f
