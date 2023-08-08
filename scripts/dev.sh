#!/bin/bash
function cleanup {
  docker-compose down
  docker volume prune -f
  docker image prune -f
}

docker-compose up -d
nodemon src/server.ts
trap cleanup exit
