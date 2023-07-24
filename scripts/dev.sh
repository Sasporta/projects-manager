#!/bin/bash
function cleanup {
  docker-compose down
  docker volume prune -f
  docker image prune -f
}

docker-compose up -d
# TODO: replace with wait-for-it.sh or move db init to docker-compose
sleep 2
npx prisma migrate dev
npx prisma db seed
nodemon src/server.ts
trap cleanup exit
