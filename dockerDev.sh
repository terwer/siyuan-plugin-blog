#!/bin/bash

cp .env.docker .env
pnpm nodeBuild
docker compose up --build