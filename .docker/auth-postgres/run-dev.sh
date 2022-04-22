#!/bin/bash

VOLUME="${PWD}/var/fuks-blog-auth-postgres"

docker stop fuks-blog-auth-postgres

docker run --name fuks-blog-auth-postgres \
    --rm -d \
    -e POSTGRES_PASSWORD=root \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=auth \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v "${VOLUME}":/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres:14.2-alpine
