#!/bin/bash

pnpm install
cp .env.docker .env
pnpm nodeBuild
docker compose up --build